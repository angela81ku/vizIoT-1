import React, {useState} from 'react';
import PropTypes from 'prop-types';

import SolidRow from "../../components/BeanUILibrary/SolidRow";
import TabColumn from "../../components/BeanUILibrary/TabColumn";
import BIcon from "../../components/BeanUILibrary/BIcon";
import {
  ArrowColumn, ArrowContainerColumn, BorderedSolidRow,
  CountryColumn,
  DestinationColumn,
  FixedTitle, GraphColumn,
  DestNameColumn, MetricColumn, MetricSymbolColumn, OverallMetricColumn, RecentMetricColumn,
  SourceColumn
} from "./ColumnStyles";

export const BlankRow = ({
  sentColor,
  receivedColor,
  height,
}) => {
  return <BorderedSolidRow height={`${height}px`} style={{minHeight:'50px'}}>
    <SourceColumn>
      <SolidRow>
        <TabColumn>
          ~
        </TabColumn>
      </SolidRow>
    </SourceColumn>
    <ArrowColumn>
      <SolidRow>
        <ArrowContainerColumn>
          <BIcon name='arrow-back-outline' type='eva' size={28} color={(receivedColor ? receivedColor : '#0073ff')}/>
        </ArrowContainerColumn>
        <ArrowContainerColumn>
          <BIcon name='arrow-forward-outline' type='eva' size={28} color={(sentColor ? sentColor : '#ff1e00')}/>
        </ArrowContainerColumn>
      </SolidRow>
    </ArrowColumn>
    <DestinationColumn>
      <SolidRow>
        <DestNameColumn>
          ~
        </DestNameColumn>
        <CountryColumn>
          ~
        </CountryColumn>
      </SolidRow>
    </DestinationColumn>
    <GraphColumn style={{alignContent:'center'}}>
      ~
    </GraphColumn>
    <MetricColumn>
      <SolidRow height='50%'>
        <MetricSymbolColumn style={{paddingLeft:'5%'}}>
          <BIcon name='arrow-circle-up-outline' type='eva' size={28} color={(sentColor ? sentColor : '#ff1e00')}/>
        </MetricSymbolColumn>
        <RecentMetricColumn>
          ~ B/s
        </RecentMetricColumn>
        <OverallMetricColumn>
          ~ B/s
        </OverallMetricColumn>
      </SolidRow>
      <SolidRow height='50%'>
        <MetricSymbolColumn style={{paddingLeft:'5%'}}>
          <BIcon name='arrow-circle-down-outline' type='eva' size={28} color={(receivedColor ? receivedColor : '#0073ff')}/>
        </MetricSymbolColumn>
        <RecentMetricColumn>
          ~ B/s
        </RecentMetricColumn>
        <OverallMetricColumn>
          ~ B/s
        </OverallMetricColumn>
      </SolidRow>
    </MetricColumn>
  </BorderedSolidRow>
}

BlankRow.propTypes = {
  sentColor: PropTypes.string,
  receivedColor: PropTypes.string,
  height: PropTypes.number.isRequired,
}