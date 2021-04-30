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
  SourceColumn, RELCOLWIDTHS, numberToPercentString, getRelColWidths, getPercentageStrings
} from "./ColumnStyles";

export const BlankRow = ({
                           sentColor,
                           receivedColor,
                           height,
                           width,
                         }) => {

  const minHeight = 50;
  const relHeight = height < minHeight ? minHeight : height;

  const relWidths = getRelColWidths(width);

  const {
    sourceWidth,
    arrowWidth,
    arrowContainerWidth,
    destWidth,
    destNameWidth,
    destCountryWidth,
    graphWidth,
    metricWidth,
    metricSymbolWidth,
    recentMetricWidth,
    overallMetricWidth,
  } = getPercentageStrings(relWidths);

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
    <GraphColumn colWidth={graphWidth} style={{alignContent: 'center'}}>
      ~
    </GraphColumn>
    <MetricColumn colWidth={metricWidth}>
      <SolidRow height='50%'>
        <MetricSymbolColumn colWidth={metricSymbolWidth} style={{paddingLeft: '5%'}}>
          <BIcon name='arrow-circle-up-outline' type='eva' size={28} color={(sentColor ? sentColor : '#ff1e00')}/>
        </MetricSymbolColumn>
        {renderBlankRecentMetricColumn(relWidths.RecentMetricColumn, recentMetricWidth)}
        <OverallMetricColumn colWidth={overallMetricWidth}>
          ~ B
        </OverallMetricColumn>
      </SolidRow>
      <SolidRow height='50%'>
        <MetricSymbolColumn colWidth={metricSymbolWidth} style={{paddingLeft: '5%'}}>
          <BIcon name='arrow-circle-down-outline' type='eva' size={28}
                 color={(receivedColor ? receivedColor : '#0073ff')}/>
        </MetricSymbolColumn>
        {renderBlankRecentMetricColumn(relWidths.RecentMetricColumn, recentMetricWidth)}
        <OverallMetricColumn colWidth={overallMetricWidth}>
          ~ B
        </OverallMetricColumn>
      </SolidRow>
    </MetricColumn>
  </BorderedSolidRow>
}

const renderBlankRecentMetricColumn = (numericWidth, recentMetricWidth) => {
  if (numericWidth !== 0) {
    return <RecentMetricColumn colWidth={recentMetricWidth}>
      ~ B
    </RecentMetricColumn>
  }
}

BlankRow.propTypes = {
  sentColor: PropTypes.string,
  receivedColor: PropTypes.string,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}