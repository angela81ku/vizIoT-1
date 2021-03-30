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
  SourceColumn, RELCOLWIDTHS, numberToPercentString
} from "./ColumnStyles";

export const BlankRow = ({
  sentColor,
  receivedColor,
  height,
  width,
}) => {

  const minHeight = 50;
  const relHeight = height < minHeight ? minHeight : height;

  const relWidths = width < 800 ? width < 650 ? RELCOLWIDTHS.xsmall : RELCOLWIDTHS.small : RELCOLWIDTHS.normal;

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
          ~
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
          ~
        </DestNameColumn>
        <CountryColumn colWidth={destCountryWidth}>
          ~
        </CountryColumn>
      </SolidRow>
    </DestinationColumn>
    <GraphColumn colWidth={graphWidth} style={{alignContent:'center'}}>
      ~
    </GraphColumn>
    <MetricColumn colWidth={metricWidth}>
      <SolidRow height='50%'>
        <MetricSymbolColumn colWidth={metricSymbolWidth} style={{paddingLeft:'5%'}}>
          <BIcon name='arrow-circle-up-outline' type='eva' size={28} color={(sentColor ? sentColor : '#ff1e00')}/>
        </MetricSymbolColumn>
        <RecentMetricColumn colWidth={recentMetricWidth}>
          ~ B/s
        </RecentMetricColumn>
        <OverallMetricColumn colWidth={overallMetricWidth}>
          ~ B/s
        </OverallMetricColumn>
      </SolidRow>
      <SolidRow height='50%'>
        <MetricSymbolColumn colWidth={metricSymbolWidth} style={{paddingLeft:'5%'}}>
          <BIcon name='arrow-circle-down-outline' type='eva' size={28} color={(receivedColor ? receivedColor : '#0073ff')}/>
        </MetricSymbolColumn>
        <RecentMetricColumn colWidth={recentMetricWidth}>
          ~ B/s
        </RecentMetricColumn>
        <OverallMetricColumn colWidth={overallMetricWidth}>
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
  width: PropTypes.number.isRequired,
}