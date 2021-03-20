import React, {useState} from 'react';
import PropTypes from "prop-types";

import {
  ArrowColumn,
  ArrowContainerColumn,
  BorderedSolidRow, CountryColumn,
  DestinationColumn, GraphColumn,
  IPColumn, MetricColumn, MetricSymbolColumn, OverallMetricColumn, RecentMetricColumn,
  SourceColumn
} from "./ColumnStyles";
import SolidRow from "../../components/BeanUILibrary/SolidRow";
import TabColumn from "../../components/BeanUILibrary/TabColumn";
import BIcon from "../../components/BeanUILibrary/BIcon";
import {DualLineGraph} from "../../components/d3/DualLineGraph";
import {ConnectionTable} from "../ConnectionTable";

export const TableRow = ({
   name,
   ip,
   country,
   sentFive,
   sentSixty,
   receivedFive,
   receivedSixty
}) => {

  const [dimensions, setDimensions] = useState({width: undefined, height: undefined})

  return <BorderedSolidRow height='100px' >
    <SourceColumn>
      <SolidRow>
        <TabColumn>
          {handleUndefinedValue(name)}
        </TabColumn>
      </SolidRow>
    </SourceColumn>
    <ArrowColumn>
      <SolidRow>
        <ArrowContainerColumn>
          <BIcon name='arrow-back-outline' type='eva' size={28} color='blue'/>
        </ArrowContainerColumn>
        <ArrowContainerColumn>
          <BIcon name='arrow-forward-outline' type='eva' size={28} color='red'/>
        </ArrowContainerColumn>
      </SolidRow>
    </ArrowColumn>
    <DestinationColumn>
      <SolidRow>
        <IPColumn>
          {handleUndefinedValue(ip)}
        </IPColumn>
        <CountryColumn>
          {handleUndefinedValue(country)}
        </CountryColumn>
      </SolidRow>
    </DestinationColumn>
    <GraphColumn style={{alignContent:'center'}}>
      <DualLineGraph/>
    </GraphColumn>
    <MetricColumn>
      <SolidRow height='50%'>
        <MetricSymbolColumn style={{paddingLeft:'5%'}}>
          <BIcon name='arrow-circle-up-outline' type='eva' size={28} color='red'/>
        </MetricSymbolColumn>
        <RecentMetricColumn>
          {handleUndefinedValue(sentFive)} B/S
        </RecentMetricColumn>
        <OverallMetricColumn>
          {handleUndefinedValue(sentSixty)} B/S
        </OverallMetricColumn>
      </SolidRow>
      <SolidRow height='50%'>
        <MetricSymbolColumn style={{paddingLeft:'5%'}}>
          <BIcon name='arrow-circle-down-outline' type='eva' size={28} color='blue'/>
        </MetricSymbolColumn>
        <RecentMetricColumn>
          {handleUndefinedValue(receivedFive)} B/S
        </RecentMetricColumn>
        <OverallMetricColumn>
          {handleUndefinedValue(receivedSixty)} B/S
        </OverallMetricColumn>
      </SolidRow>
    </MetricColumn>
  </BorderedSolidRow>
}

TableRow.propTypes = {
  name: PropTypes.string.isRequired,
  ip: PropTypes.string.isRequired,
  country: PropTypes.string,
  sentFive: PropTypes.number.isRequired,
  sentSixty: PropTypes.number.isRequired,
  receivedFive: PropTypes.number.isRequired,
  receivedSixty: PropTypes.number.isRequired,
}

const handleUndefinedValue = val => {
  if (val) { return val; }
  return '~'
}