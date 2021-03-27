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
import styled from "styled-components";

export const TableHeader = ({
  sentColor,
  receivedColor,
  height,
}) => {
  return <BorderedSolidRow height={`${height}px`} style={{minHeight:'53px'}}>
    <SourceColumn style={{display:'flex', alignItems:'flex-start'}}>
      <FixedTitle title='Source' style={{width:'100%', textAlign:'center'}}/>
      <SectionSubtitle text='Name' style={{width:'100%', textAlign:'center'}}/>
    </SourceColumn>
    <ArrowColumn/>
    <DestinationColumn style={{display:'flex', alignItems:'flex-start'}}>
      <FixedTitle title='Destination' style={{marginLeft:'20%', width:'80%', textAlign:'center'}}/>
      <div style={{width:'100%', display:'inline-grid', gridTemplateColumns:'65% 35%'}}>
        <SectionSubtitle text='Name' style={{textAlign:'center'}}/>
        <SectionSubtitle text='Country' style={{textAlign:'center'}}/>
      </div>
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
    <MetricColumn style={{display:'flex', alignItems:'flex-start'}}>
      <FixedTitle style={{paddingLeft:'17%', width:'100%', textAlign:'center'}} title='Traffic' size='xsm'/>
      <div style={{display:'inline-grid', gridTemplateColumns:'20% 40% 40%', justifyContent:'start', width:'100%'}}>
          <div style={{width:'100%'}}/>
          <SectionSubtitle text='5 sec' style={{textAlign:'center'}}/>
          <SectionSubtitle text='60 sec' style={{textAlign:'center'}}/>
      </div>

    </MetricColumn>
  </BorderedSolidRow>
}

TableHeader.propTypes = {
  sentColor: PropTypes.string,
  receivedColor: PropTypes.string,
  height: PropTypes.number.isRequired,
}
