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
  fetchFiveSecondConnections, fetchSecondConnections, fetchSixtySecondConnections,
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
  min-height: 400px;
  min-width: 800px;
`

export const ConnectionTable = ({
  rows,
  timeFrame,
  xTicks,
  sentColor,
  receivedColor,
  tableHeight
}) => {
  const [connections, setConnections] = useState([]);
  const [packets, setPackets] = useState({})
  const [timeStamp, setTimeStamp] = useState(Date.now());
  const [prelimFetch, setPrelimFetch] = useState(false);

  // set up fetchers and sockets
  useSocket(DeviceConnectionPackets1s, parseSecondConnectionPackets)

  useTimedFetcher(fetchDeviceConnections, 1000)
  useTimedFetcher(fetchFiveSecondConnections, 5000)
  useTimedFetcher(fetchSixtySecondConnections, 60000)

  // set height values

  // set up height refs to pass heights to child components
  const cardRef = useRef();
  const dimensions = useDimensions(cardRef);

  // do height calculations
  const heightDivisor = rows + 0.75;
  const adjustedHeight = dimensions.height - (2 * convertRemToPixels(1));
  const rowSize = Math.floor(adjustedHeight/heightDivisor);
  const headerSize = Math.floor(rowSize * 0.75);

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
            sixty: undefined,
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

  // create a useEffect that fetches the initial connections a single time
  // and never is called again
  // double security -- check prelimFetch before call and make it a dependency that is only set inside
  // the current useEffect
  useEffect(() => {
    if (!prelimFetch) {
      fetchSecondConnections();
      setPrelimFetch(true);
    }
  }, [prelimFetch])


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
      if (packet['sixty'] !== undefined) {
        currConnection['sentSixty'] = packet['sixty'][0];
        currConnection['receivedSixty'] = packet['sixty'][1];
      }
    }
  }

  if (displayConnections.length > rows) {
    displayConnections = displayConnections.slice(0, rows)
  }

  let renderIndex = 0;

  return <div ref={cardRef} style={{height:'100%'}}>
    <ConnectionCard style={{height:'100%'}}>
      <TableHeader
        sentColor={sentColor}
        receivedColor={receivedColor}
        height={headerSize}
      />
      {displayConnections.sort((a, b) => (b.receivedSixty + b.sentSixty) -  (a.receivedSixty + a.sentSixty)).map(conn => {
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
          sentSixty={conn.sentSixty}
          receivedFive={conn.receivedFive}
          receivedSixty={conn.receivedSixty}
          timeFrame={timeFrame}
          timeStamp={timeStamp}
          ticks={xTicks}
          sentColor={sentColor}
          receivedColor={receivedColor}
          height={rowSize}
        />
      })}
      {[...Array(rows - renderIndex)].map(x => {
        return <BlankRow sentColor={sentColor} receivedColor={receivedColor} height={rowSize}/>;
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
  tableHeight: PropTypes.number,
}

function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}