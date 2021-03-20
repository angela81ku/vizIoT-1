// these are the primary columns, in order

// main col
import styled from "styled-components";
import TabColumn from "../../components/BeanUILibrary/TabColumn";
import SolidRow from "../../components/BeanUILibrary/SolidRow";
import SectionTitle from "../../components/SectionTitle";

export const SourceColumn = styled(TabColumn)`
  width: 15%;
  height: 100%;
  justify-content: center;
`

// sub col
export const ArrowColumn = styled(TabColumn)`
  width: 10%;
  height: 100%;
`

// sub sub col
export const ArrowContainerColumn = styled(TabColumn)`
  width: 50%;
  height: 100%;
`

// main col
export const DestinationColumn = styled(TabColumn)`
  width: 30%;
  height: 100%;
`

// sub col
export const IPColumn = styled(TabColumn)`
  width: 65%;
  height: 100%;
`

// sub col
export const CountryColumn = styled(TabColumn)`
  width: 35%;
  height: 100%;
`

// main col
export const GraphColumn = styled(TabColumn)`
  width: 25%;
  height: 100%;
  border-left: 1px solid rgba(255, 255, 255, .5);
`

// main col
export const MetricColumn = styled(TabColumn)`
  width: 20%;
  height: 100%;
  border-left: 1px solid rgba(255, 255, 255, .5);
`

// sub col
export const MetricSymbolColumn = styled(TabColumn)`
  width: 20%;
  height: 100%;
`

// sub col
export const RecentMetricColumn = styled(TabColumn)`
  width: 40%;
  height: 100%;
`

// sub col
export const OverallMetricColumn = styled(TabColumn)`
  width: 40%;
  height: 100%;
`

export const BorderedSolidRow = styled(SolidRow)`
  // border-top: 1px solid rgba(255, 255, 255, .5);
  border-bottom: 1px solid rgba(255, 255, 255, .5);
`

export const FixedTitle = styled(SectionTitle)`
  margin: 0 0 0 0;
`