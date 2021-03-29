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
  SourceColumn, RELCOLWIDTHS, numberToPercentString,
} from "./ColumnStyles";
import SectionSubtitle from "../../components/SectionSubtitle";
import styled from "styled-components";

export const TableHeader = ({
  sentColor,
  receivedColor,
  height,
  width,
}) => {

  const minHeight = 53;
  const relHeight = height < minHeight ? minHeight : height;

  const relWidths = width < 800 ? RELCOLWIDTHS.small : RELCOLWIDTHS.normal;

  const sourceWidth = numberToPercentString(relWidths.SourceColumn);
  const arrowWidth = numberToPercentString(relWidths.ArrowColumn);
  const arrowContainerWidth = numberToPercentString(relWidths.ArrowContainerColumn);
  const destWidth = numberToPercentString(relWidths.DestinationColumn);
  const destNameWidth = numberToPercentString(relWidths.DestNameColumn);
  const destCountryWidth = numberToPercentString(relWidths.DestCountryColumn);
  const graphWidth = numberToPercentString(relWidths.GraphColumn);
  const metricWidth = numberToPercentString(relWidths.MetricColumn);
  const metricSymbolWidth = numberToPercentString(relWidths.MetricSymbolColumn);
  const recentMetricWidth = numberToPercentString(relWidths.RecentMetricColumn);
  const overallMetricWidth = numberToPercentString(relWidths.OverallMetricColumn);

  return <BorderedSolidRow height={`${relHeight}px`}>
    <SourceColumn colWidth={sourceWidth} style={{display:'flex', alignItems:'flex-start'}}>
      <FixedTitle title='Source' style={{width:'100%', textAlign:'center'}}/>
      <SectionSubtitle text='Name' style={{width:'100%', textAlign:'center'}}/>
    </SourceColumn>
    <ArrowColumn colWidth={arrowWidth}/>
    <DestinationColumn colWidth={destWidth} style={{display:'flex', alignItems:'flex-start'}}>
      <FixedTitle title='Destination' style={{marginLeft:'20%', width:'80%', textAlign:'center'}}/>
      <div style={{width:'100%', display:'inline-grid', gridTemplateColumns:`${destNameWidth} ${destCountryWidth}`}}>
        <SectionSubtitle text='Name' style={{textAlign:'center'}}/>
        <SectionSubtitle text='Country' style={{textAlign: 'center', overflow:'hidden'}}/>
      </div>
    </DestinationColumn>
    <GraphColumn colWidth={graphWidth} style={{textAlign:'center'}}>
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
    <MetricColumn colWidth={metricWidth} style={{display:'flex', alignItems:'flex-start'}}>
      <FixedTitle style={{paddingLeft:'17%', width:'100%', textAlign:'center'}} title='Traffic' size='xsm'/>
      <div style={{display:'inline-grid', gridTemplateColumns:`${metricSymbolWidth} ${recentMetricWidth} ${overallMetricWidth}`, justifyContent:'start', width:'100%'}}>
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
  width: PropTypes.number.isRequired,
}
