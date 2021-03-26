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
import SectionSubtitle from "../../components/SectionSubtitle";

export const TableHeader = ({
  sentColor,
  receivedColor,
}) => {
  return <BorderedSolidRow height='75px'>
    <SourceColumn>
      <FixedTitle title='Source' style={{marginLeft:'5%'}}/>
      <SolidRow>
        <TabColumn>
          <SectionSubtitle text='Name'/>
        </TabColumn>
      </SolidRow>
    </SourceColumn>
    <ArrowColumn/>
    <DestinationColumn>
      <FixedTitle title='Destination' style={{marginLeft:'23%'}}/>
      <SolidRow>
        <DestNameColumn>
          <SectionSubtitle text='Name'/>
        </DestNameColumn>
        <CountryColumn>
          <SectionSubtitle text='Country'/>
        </CountryColumn>
      </SolidRow>
    </DestinationColumn>
    <GraphColumn style={{textAlign:'center'}}>
      <div style={{display:'inline-grid', gridTemplateColumns:'auto auto auto', justifyContent:'start'}}>
        <FixedTitle style={{color:(sentColor ? sentColor : '#ff1e00')}} size='xsm' >
          Sent
        </FixedTitle>
        <FixedTitle>
          /
        </FixedTitle>
        <FixedTitle style={{color:(receivedColor ? receivedColor : '#0073ff')}} size='xsm' >
          Received
        </FixedTitle>
      </div>
    </GraphColumn>
    <MetricColumn>
      <FixedTitle style={{marginLeft:'20%'}} title='Traffic' size='xsm'/>
      <SolidRow>
        <MetricSymbolColumn/>
        <RecentMetricColumn>
          <SectionSubtitle text='5 sec'/>
        </RecentMetricColumn>
        <OverallMetricColumn>
          <SectionSubtitle text='60 sec'/>
        </OverallMetricColumn>
      </SolidRow>
    </MetricColumn>
  </BorderedSolidRow>
}

TableHeader.propTypes = {
  sentColor: PropTypes.string,
  receivedColor: PropTypes.string,
}
