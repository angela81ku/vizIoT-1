import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';

import BCard from "../components/BeanUILibrary/BCard";
import {useSocket} from "../components/BeanUILibrary/hooks/useSocket";
import {DeviceConnection, DeviceConnectionPackets} from "../socket/subscribe";
import {
  addConnectionListener,
  addPacketListener,
  getConnections,
  getPackets, removeConnectionListener, removePacketListener
} from "../data/aggregators/ConnectionAggregator";
import { BlankRow } from "./TableRows/BlankRow";
import {TableHeader} from "./TableRows/TableHeader";
import {TableRow} from "./TableRows/TableRow";
import {parseConnectionPackets, parseConnections} from "../data/api/connectionsApi";

// top level
const ConnectionCard = styled(BCard)`
  min-height: 400px;
  min-width: 800px;
`

export const ConnectionTable = ({
  rows
}) => {
  const [connections, setConnections] = useState([]);
  const [packets, setPackets] = useState({})

  useSocket(DeviceConnection, parseConnections);
  useSocket(DeviceConnectionPackets, parseConnectionPackets)

  const updateConnections = (connections) => {
    setConnections(connections);
  }

  const updatePackets = (packets) => {
    setPackets(packets);
  }

  useEffect(() => {
    addPacketListener(updatePackets);
    addConnectionListener(updateConnections);

    return () => {
      removePacketListener(updatePackets);
      removeConnectionListener(updateConnections);
    }
  })

  let displayConnections;
  if (connections > rows) {
    displayConnections = connections.slice(0, rows)
  } else {
    displayConnections = connections;
  }

  let renderIndex = 0;

  return <ConnectionCard>
      <TableHeader/>
      {displayConnections.sort((a, b) => (b.receivedSixty + b.sentSixty) -  (a.receivedSixty + a.sentSixty)).map(conn => {
        ++renderIndex;
        const currentPackets = packets[conn.id];
        return <TableRow
          name={conn.name}
          ip={conn.ip}
          data={currentPackets ? currentPackets : []}
          country={conn.country}
          sentFive={conn.sentFive}
          sentSixty={conn.sentSixty}
          receivedFive={conn.receivedFive}
          receivedSixty={conn.receivedSixty}
        />
      })}
      {[...Array(rows - renderIndex)].map(x => {
        return <BlankRow/>;
      })}

    </ConnectionCard>

}

ConnectionTable.propTypes = {
  rows: PropTypes.number.isRequired,
}