import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

import {
  ArrowColumn,
  ArrowContainerColumn,
  BorderedSolidRow, CountryColumn,
  DestinationColumn, GraphColumn,
  DestNameColumn, MetricColumn, MetricSymbolColumn, OverallMetricColumn, RecentMetricColumn,
  SourceColumn, RELCOLWIDTHS, numberToPercentString,
} from './ColumnStyles';
import SolidRow from '../../components/BeanUILibrary/SolidRow';
import TabColumn from '../../components/BeanUILibrary/TabColumn';
import BIcon from '../../components/BeanUILibrary/BIcon';
import {DualLineGraph} from '../../components/d3/DualLineGraph';
import {ConnectionTable} from '../ConnectionTable';
import {formatBytes} from "../../utility/FormatUtility";
import styled from "styled-components";
import {useDimensions} from "../../components/BeanUILibrary/hooks/useDimensions";

const TruncatedText = styled.div`
  width:100%; 
  text-align:center; 
  overflow:hidden; 
  text-overflow:ellipsis;
`

export const TableRow = ({
  name,
  destName,
  country,
  data,
  sentFive,
  sentSixty,
  receivedFive,
  receivedSixty,
  timeFrame,
  timeStamp,
  ticks,
  sentColor,
  receivedColor,
  height,
  width,
}) => {

  const graphRef = useRef();
  const dimensions = useDimensions(graphRef)

  const minHeight = 50;
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
    <SourceColumn colWidth={sourceWidth}>
      <SolidRow>
        <TabColumn>
          <TruncatedText>
            {handleUndefinedValue(name)}
          </TruncatedText>
        </TabColumn>
      </SolidRow>
    </SourceColumn>
    <ArrowColumn colWidth={arrowWidth}>
      <SolidRow>
        <ArrowContainerColumn colWidth={arrowContainerWidth}>
          <BIcon name='arrow-back-outline' type='eva' size={28} color={(receivedColor ? receivedColor : '#0073ff')}/>
        </ArrowContainerColumn>
        <ArrowContainerColumn colWidth={arrowContainerWidth}>
          <BIcon name='arrow-forward-outline' type='eva' size={28} color={(sentColor ? sentColor : '#ff1e00')}/>
        </ArrowContainerColumn>
      </SolidRow>
    </ArrowColumn>
    <DestinationColumn colWidth={destWidth}>
      <SolidRow>
        <DestNameColumn colWidth={destNameWidth}>
          <TruncatedText>
            {handleUndefinedValue(destName)}
          </TruncatedText>
        </DestNameColumn>
        <CountryColumn colWidth={destCountryWidth}>
          {handleUndefinedValue(country)}
        </CountryColumn>
      </SolidRow>
    </DestinationColumn>
    <GraphColumn colWidth={graphWidth} style={{alignContent:'center'}}>
      <div style={{height:'100%', width:'100%'}} ref={graphRef}>
        <DualLineGraph
          height={dimensions.height}
          width={dimensions.width}
          data={data}
          timeFrame={timeFrame}
          timeStamp={timeStamp}
          ticks={ticks}
          topColor={sentColor}
          bottomColor={receivedColor}
        />
      </div>
    </GraphColumn>
    <MetricColumn colWidth={metricWidth}>
      <SolidRow height='50%'>
        <MetricSymbolColumn colWidth={metricSymbolWidth} style={{paddingLeft:'5%'}}>
          <BIcon name='arrow-circle-up-outline' type='eva' size={28} color={(sentColor ? sentColor : '#ff1e00')}/>
        </MetricSymbolColumn>
        <RecentMetricColumn colWidth={recentMetricWidth}>
          {handleUndefinedNumeric(sentFive)}
        </RecentMetricColumn>
        <OverallMetricColumn colWidth={overallMetricWidth}>
          {handleUndefinedNumeric(sentSixty)}
        </OverallMetricColumn>
      </SolidRow>
      <SolidRow height='50%'>
        <MetricSymbolColumn colWidth={metricSymbolWidth} style={{paddingLeft:'5%'}}>
          <BIcon name='arrow-circle-down-outline' type='eva' size={28} color={(receivedColor ? receivedColor : '#0073ff')}/>
        </MetricSymbolColumn>
        <RecentMetricColumn colWidth={recentMetricWidth}>
          {handleUndefinedNumeric(receivedFive)}
        </RecentMetricColumn>
        <OverallMetricColumn colWidth={overallMetricWidth}>
          {handleUndefinedNumeric(receivedSixty)}
        </OverallMetricColumn>
      </SolidRow>
    </MetricColumn>
  </BorderedSolidRow>
}

TableRow.propTypes = {
  name: PropTypes.string.isRequired,
  destName: PropTypes.string.isRequired,
  country: PropTypes.string,
  data: PropTypes.array.isRequired,
  sentFive: PropTypes.number,
  sentSixty: PropTypes.number,
  receivedFive: PropTypes.number,
  receivedSixty: PropTypes.number,
  timeFrame: PropTypes.number,
  timeStamp: PropTypes.number.isRequired,
  ticks: PropTypes.number,
  sentColor: PropTypes.string,
  receivedColor: PropTypes.string,
  height: PropTypes.number.isRequired,
}

const handleUndefinedValue = val => {
  if (val !== undefined) { return val; }
  return '~'
}

const handleUndefinedNumeric = num => {
  if (num) { return formatBytes(num, 's', 0, false); }
  return '~ B/s'
}