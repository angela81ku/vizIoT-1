import React, {useState, useEffect} from 'react';
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
}) => {
  const [connections, setConnections] = useState([]);
  const [packets, setPackets] = useState({})
  const [timeStamp, setTimeStamp] = useState(Date.now());
  const [prelimFetch, setPrelimFetch] = useState(false);

  useSocket(DeviceConnectionPackets1s, parseSecondConnectionPackets)

  useTimedFetcher(fetchDeviceConnections, 10000)
  useTimedFetcher(fetchFiveSecondConnections, 5000)
  useTimedFetcher(fetchSixtySecondConnections, 60000)

  const updateConnections = (connections) => {
    setConnections(connections);
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

  useEffect(() => {
    addPacketListener(updatePackets);
    addConnectionListener(updateConnections);

    return () => {
      removePacketListener(updatePackets);
      removeConnectionListener(updateConnections);
    }
  })

  // set the time stamp value to Date.Now()
  // calling set state forces rerender, passing new timestamp to all graphs
  useEffect(() => {
    const handleTimeStamp = () => {
      setTimeStamp(Date.now())
    }
    // setTimeout such that every 1000 milliseconds, state is always reset
    const id = setTimeout(handleTimeStamp, 1000);

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

  return <ConnectionCard>
      <TableHeader
        sentColor={sentColor}
        receivedColor={receivedColor}
      />
      {displayConnections.sort((a, b) => (b.receivedSixty + b.sentSixty) -  (a.receivedSixty + a.sentSixty)).map(conn => {
        ++renderIndex;
        // console.log(conn)
        // console.log(packets)
        const packetData = packets[conn.id];
        let currentPackets;
        if (packetData) { currentPackets = packetData['one']}
        if (currentPackets && currentPackets.length > 35) { currentPackets = currentPackets.slice(-35)}
        return <TableRow
          name={conn.name}
          ip={conn.ip}
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
        />
      })}
      {[...Array(rows - renderIndex)].map(x => {
        return <BlankRow sentColor={sentColor} receivedColor={receivedColor}/>;
      })}

    </ConnectionCard>

}

ConnectionTable.propTypes = {
  rows: PropTypes.number.isRequired,
  timeFrame: PropTypes.number,
  xTicks: PropTypes.number,
  sentColor: PropTypes.string,
  receivedColor: PropTypes.string,
}