import React, {useState, useEffect, useRef} from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';

import BCard from "../components/BeanUILibrary/BCard";
import {useSocket} from "../components/BeanUILibrary/hooks/useSocket";
import {
  DeviceConnection,
  DeviceConnectionPackets1s,
  DeviceConnectionPackets5s,
  DeviceConnectionPackets60s,
} from "../socket/subscribe";
import {
  addConnectionListener,
  addPacketListener,
  getConnections,
  getPackets, removeConnectionListener, removePacketListener
} from "../data/aggregators/ConnectionAggregator";
import { BlankRow } from "./TableRows/BlankRow";
import {TableHeader} from "./TableRows/TableHeader";
import {TableRow} from "./TableRows/TableRow";
import {
  fetchFiveSecondConnections, fetchSecondConnections, fetchThirtySecondConnections,
  parseConnectionPackets,
  parseConnections,
  parseFiveSecondConnectionPackets,
  parseSecondConnectionPackets, parseSixtySecondConnectionPackets
} from "../data/api/connectionsApi";
import {useTimedFetcher} from "../components/BeanUILibrary/hooks/useTimedFetcher";
import {fetchDeviceConnections} from "../data/api/devicesApi";
import {useDimensions} from "../components/BeanUILibrary/hooks/useDimensions";

// top level
const ConnectionCard = styled(BCard)`
  min-width: 600px;
`

export const ConnectionTable = ({
  rows,
  timeFrame,
  xTicks,
  sentColor,
  receivedColor,
}) => {
  const [connections, setConnections] = useState([]);
  const [packets, setPackets] = useState({})
  const [timeStamp, setTimeStamp] = useState(Date.now());

  // set up fetchers and sockets
  useSocket(DeviceConnectionPackets1s, parseSecondConnectionPackets)

  useTimedFetcher(fetchDeviceConnections, 1000)
  useTimedFetcher(fetchFiveSecondConnections, 1000)
  useTimedFetcher(fetchThirtySecondConnections, 1000)

  // set up height refs to pass heights to child components
  const cardRef = useRef();
  const dimensions = useDimensions(cardRef);

  // do height calculations
  const heightDivisor = rows + 0.75;
  const adjustedHeight = dimensions.height - (2 * convertRemToPixels(1));
  const rowSize = Math.floor(adjustedHeight/heightDivisor);
  const headerSize = Math.floor(rowSize * 0.75);

  // get width of container
  const width = dimensions.width;

  // get the min height of the total graph based on mins for tablerow and header and margins
  const minHeight = (rows * 50) + 53 + (2 * convertRemToPixels(1));
  const minHeightStr = `${minHeight}px`;

  // set connection update hook
  useEffect(() => {

    const updateConnections = (conns) => {
      setConnections(conns);
    }

    const updatePackets = (p) => {
      // console.log(p)
      const nP = {};
      connections.forEach(conn => {
        const stream = p[conn.id];
        if (stream) {
          nP[conn.id] = stream;
        } else {
          nP[conn.id] = {
            second: undefined,
            five: undefined,
            thirty: undefined,
          };
        }
      })
      setPackets(nP);
    }

    addPacketListener(updatePackets);
    addConnectionListener(updateConnections);

    return () => {
      removePacketListener(updatePackets);
      removeConnectionListener(updateConnections);
    }
  }, [connections, packets])

  // set the time stamp value to Date.Now()
  // calling set state forces rerender, passing new timestamp to all graphs
  useEffect(() => {
    const handleTimeStamp = () => {
      setTimeStamp(Date.now())
    }
    // setTimeout such that every 1000 milliseconds, state is always reset
    const id = setInterval(handleTimeStamp, 1000);

    return () => {
      clearTimeout(id);
    }
  }, [timeStamp])

  // create a useEffect with empty dependences so it only runs on mount
  // otherwise causes two rerenders which floods the backend temporarily
  useEffect(() => {
    fetchSecondConnections();
  }, [])


  let displayConnections = connections;

  // associate the streamed connection values with their id
  for (let i = 0; displayConnections && i < displayConnections.length; ++i) {
    const currConnection = displayConnections[i];
    const packet = packets[currConnection.id];
    if(packet) {
      if (packet['five'] !== undefined) {
        currConnection['sentFive'] = packet['five'][0];
        currConnection['receivedFive'] = packet['five'][1];
      }
      if (packet['thirty'] !== undefined) {
        currConnection['sentThirty'] = packet['thirty'][0];
        currConnection['receivedThirty'] = packet['thirty'][1];
      }
    }
  }

  // remove connections that have no data in the last 30 seconds
  displayConnections = displayConnections.filter(entry =>
    (entry.receivedThirty !== undefined || entry.sentThirty !== undefined)
    &&
    (entry.sentThirty !== 0 || entry.receivedThirty !== 0))

  // presort connections before shearing off lower connections
  displayConnections.sort((a, b) => (b.receivedThirty + b.sentThirty) -  (a.receivedThirty + a.sentThirty));

  if (displayConnections.length > rows) {
    displayConnections = displayConnections.slice(0, rows)
  }

  let renderIndex = 0;

  return <div ref={cardRef} style={{height:'100%', minHeight:minHeightStr}}>
    <ConnectionCard style={{height:'100%'}}>
      <TableHeader
        sentColor={sentColor}
        receivedColor={receivedColor}
        height={headerSize}
        width={width}
      />
      {displayConnections.map(conn => {
        ++renderIndex;
        // console.log(conn)
        // console.log(packets)
        const packetData = packets[conn.id];
        let currentPackets;
        if (packetData) { currentPackets = packetData['one']}
        if (currentPackets && currentPackets.length > 35) { currentPackets = currentPackets.slice(-35)}
        // console.log(currentPackets)
        return <TableRow
          name={conn.name}
          destName={conn.destName}
          data={currentPackets ? currentPackets : []}
          country={conn.country}
          sentFive={conn.sentFive}
          sentThirty={conn.sentThirty}
          receivedFive={conn.receivedFive}
          receivedThirty={conn.receivedThirty}
          timeFrame={timeFrame}
          timeStamp={timeStamp}
          ticks={xTicks}
          sentColor={sentColor}
          receivedColor={receivedColor}
          height={rowSize}
          width={width}
        />
      })}
      {[...Array(rows - renderIndex)].map(x => {
        return <BlankRow
          sentColor={sentColor}
          receivedColor={receivedColor}
          height={rowSize}
          width={width}
        />;
      })}

    </ConnectionCard>
    </div>

}

ConnectionTable.propTypes = {
  rows: PropTypes.number.isRequired,
  timeFrame: PropTypes.number,
  xTicks: PropTypes.number,
  sentColor: PropTypes.string,
  receivedColor: PropTypes.string,
}

function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}