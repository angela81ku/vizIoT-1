// these are the primary columns, in order

// main col
import styled from "styled-components";
import TabColumn from "../../components/BeanUILibrary/TabColumn";
import SolidRow from "../../components/BeanUILibrary/SolidRow";
import SectionTitle from "../../components/SectionTitle";

export const RELCOLWIDTHS = {
  xsmall: {
    SourceColumn: 15,
    ArrowColumn: 10,
    ArrowContainerColumn: 50,
    DestinationColumn: 22.5,
    DestNameColumn: 100,
    DestCountryColumn: 0,
    GraphColumn: 35,
    MetricColumn: 17.5,
    MetricSymbolColumn: 30,
    RecentMetricColumn: 0,
    OverallMetricColumn: 70,
  },
  small: {
    SourceColumn: 15,
    ArrowColumn: 10,
    ArrowContainerColumn: 50,
    DestinationColumn: 22.5,
    DestNameColumn: 100,
    DestCountryColumn: 0,
    GraphColumn: 26.5,
    MetricColumn: 26,
    MetricSymbolColumn: 20,
    RecentMetricColumn: 40,
    OverallMetricColumn: 40,
  },
  normal: {
    SourceColumn: 15,
    ArrowColumn: 10,
    ArrowContainerColumn: 50,
    DestinationColumn: 30,
    DestNameColumn: 65,
    DestCountryColumn: 35,
    GraphColumn: 25,
    MetricColumn: 20,
    MetricSymbolColumn: 20,
    RecentMetricColumn: 40,
    OverallMetricColumn: 40,
  }
}

export const getRelColWidths = (width) => {
  return width < 800 ? width < 650 ? RELCOLWIDTHS.xsmall : RELCOLWIDTHS.small : RELCOLWIDTHS.normal;
}

export const numberToPercentString = (num) => {
  return `${num}%`;
}

export const getPercentageStrings = (relWidths) => {
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

  return {
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
  }
}

export const SourceColumn = styled(TabColumn)`
  width: ${props => props.colWidth};
  height: 100%;
  justify-content: center;
`

// sub col
export const ArrowColumn = styled(TabColumn)`
  width: ${props => props.colWidth};
  height: 100%;
  justify-content: center;
`

// sub sub col
export const ArrowContainerColumn = styled(TabColumn)`
  width: ${props => props.colWidth};
  height: 100%;
  justify-content: center;
`

// main col
export const DestinationColumn = styled(TabColumn)`
  width: ${props => props.colWidth};
  height: 100%;
  justify-content: center;
`

// sub col
export const DestNameColumn = styled(TabColumn)`
  width: ${props => props.colWidth};
  overflow: hidden;
`

// sub col
export const CountryColumn = styled(TabColumn)`
  width: ${props => props.colWidth};
  overflow: hidden;
`

// main col
export const GraphColumn = styled(TabColumn)`
  width: ${props => props.colWidth};
  height: 100%;
  border-left: 1px solid rgba(255, 255, 255, .5);
`

// main col
export const MetricColumn = styled(TabColumn)`
  width: ${props => props.colWidth};
  height: 100%;
  border-left: 1px solid rgba(255, 255, 255, .5);
  justify-content: center;
`

// sub col
export const MetricSymbolColumn = styled(TabColumn)`
  width: ${props => props.colWidth};
`

// sub col
export const RecentMetricColumn = styled(TabColumn)`
  width: ${props => props.colWidth};
  overflow: hidden;
`

// sub col
export const OverallMetricColumn = styled(TabColumn)`
  width: ${props => props.colWidth};
`

export const BorderedSolidRow = styled(SolidRow)`
  // border-top: 1px solid rgba(255, 255, 255, .5);
  border-bottom: 1px solid rgba(255, 255, 255, .5);
`

export const FixedTitle = styled(SectionTitle)`
  margin: 0 0 0 0;
`