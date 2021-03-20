import React, {useState} from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';

import SectionTitle from "../components/SectionTitle";
import SectionSubtitle from "../components/SectionSubtitle";
import BCard from "../components/BeanUILibrary/BCard";
import SolidRow from '../components/BeanUILibrary/SolidRow';
import TabColumn from "../components/BeanUILibrary/TabColumn";
import BIcon from "../components/BeanUILibrary/BIcon";
import {useSocket} from "../components/BeanUILibrary/hooks/useSocket";
import {DeviceConnection} from "../socket/subscribe";
import {addConnections, getConnections} from "../data/aggregators/ConnectionAggregator";
import {DualLineGraph} from "../components/d3/DualLineGraph";
import { BlankRow } from "./TableRows/BlankRow";
import {
  ArrowColumn, ArrowContainerColumn, BorderedSolidRow,
  CountryColumn,
  DestinationColumn,
  FixedTitle, GraphColumn,
  IPColumn, MetricColumn, MetricSymbolColumn, OverallMetricColumn, RecentMetricColumn,
  SourceColumn
} from "./TableRows/ColumnStyles";
import {TableHeader} from "./TableRows/TableHeader";
import {TableRow} from "./TableRows/TableRow";

// top level
const ConnectionCard = styled(BCard)`
  min-height: 400px;
  min-width: 800px;
`

export const ConnectionTable = ({
  rows
}) => {
  const [connections, setConnections] = useState([]);

  useSocket(DeviceConnection, addConnections);

  setInterval(()=> {
    const nConnect = getConnections();
    if (nConnect !== connections) { setConnections(nConnect) }
  }, 100)

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
        return <TableRow
          name={conn.name}
          ip={conn.ip}
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