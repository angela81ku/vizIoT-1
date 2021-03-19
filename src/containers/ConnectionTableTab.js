import React from 'react';
import styled from "styled-components";

import SectionTitle from "../components/SectionTitle";
import SectionSubtitle from "../components/SectionSubtitle";
import BCard from "../components/BeanUILibrary/BCard";
import SolidRow from '../components/BeanUILibrary/SolidRow';
import TabColumn from "../components/BeanUILibrary/TabColumn";
import BIcon from "../components/BeanUILibrary/BIcon";


const TabContainer = styled.div`
  padding: 0 11.8rem;
  padding-top: 80px;
  margin: 0 auto;
`;

// top level
const ConnectionCard = styled(BCard)`
  width: 1000px;
  height: 700px;
`

// these are the primary columns, in order

// main col
const SourceColumn = styled(TabColumn)`
  width: 15%;
  height: 100%;
  justify-content: center;
`

// sub col
const ArrowColumn = styled(TabColumn)`
  width: 10%;
  height: 100%;
`

// sub sub col
const ArrowContainerColumn = styled(TabColumn)`
  width: 50%;
  height: 100%;
`

// main col
const DestinationColumn = styled(TabColumn)`
  width: 30%;
  height: 100%;
`

// sub col
const IPColumn = styled(TabColumn)`
  width: 65%;
  height: 100%;
`

// sub col
const CountryColumn = styled(TabColumn)`
  width: 35%;
  height: 100%;
`

// main col
const GraphColumn = styled(TabColumn)`
  width: 25%;
  height: 100%;
  border-left: 1px solid rgba(255, 255, 255, .5);
`

// main col
const MetricColumn = styled(TabColumn)`
  width: 20%;
  height: 100%;
  border-left: 1px solid rgba(255, 255, 255, .5);
`

// sub col
const MetricSymbolColumn = styled(TabColumn)`
  width: 20%;
  height: 100%;
`

// sub col
const RecentMetricColumn = styled(TabColumn)`
  width: 40%;
  height: 100%;
`

// sub col
const OverallMetricColumn = styled(TabColumn)`
  width: 40%;
  height: 100%;
`

const BorderedSolidRow = styled(SolidRow)`
  // border-top: 1px solid rgba(255, 255, 255, .5);
  border-bottom: 1px solid rgba(255, 255, 255, .5);
`

const FixedTitle = styled(SectionTitle)`
  margin: 0 0 0 0;
`

const renderTableHeader = () => {
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
      <FixedTitle title='Destination' style={{paddingLeft:'23%'}}/>
      <SolidRow>
        <IPColumn>
          <SectionSubtitle text='IP'/>
        </IPColumn>
        <CountryColumn>
          <SectionSubtitle text='Country'/>
        </CountryColumn>
      </SolidRow>
    </DestinationColumn>
    <GraphColumn style={{padding:'3%', display:'inline-grid', gridTemplateColumns:'auto auto auto', alignContent:'center'}}>
      <FixedTitle style={{color:'red'}} size='xsm' >
        Sent
      </FixedTitle>
      <FixedTitle>
        /
      </FixedTitle>
      <FixedTitle style={{color:'blue'}} size='xsm' >
        Received
      </FixedTitle>
    </GraphColumn>
    <MetricColumn>
      <FixedTitle style={{paddingLeft:'20%'}} title='Traffic' size='xsm'/>
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

const renderTableRow = (name, ip, country, sentFive, sentSixty, receivedFive, receivedSixty) => {
  return <BorderedSolidRow height='100px'>
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
      I'm a graph...
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

const handleUndefinedValue = val => {
  if (val) { return val; }
  return '~'
}

export const ConnectionTableTab = ({}) => {

  const facts = [
    {
      name: 'AppleTV',
      ip: '255.255.255.255',
      sentFive: 50,
      sentSixty: 100,
      receivedFive: 10,
      receivedSixty: 25,
    },
    {
      name: 'AppleTV',
      ip: '8.8.8.8',
      country: 'US',
      sentFive: 102,
      sentSixty: 500,
      receivedFive: 102,
      receivedSixty:500,
    },
    {
      name: 'IKettle',
      ip: '54.24.12.34',
      country: 'RU',
      sentFive: 21,
      receivedFive: 100,
      receivedSixty: 120,
    }
  ]

  return <TabContainer>
    <SectionTitle title="Destination Table" size="lg" cardPadding={false}/>
    <SectionSubtitle text="View destinations by device connection" margins={true}/>
    <div className="small-spacer"/>
    <ConnectionCard>

      {renderTableHeader()}
      {/*{renderTableRow('appletv', '255.255.255.255', 'UK', 500, 600, 700, 800)}*/}
      {facts.map(conn => {
        return renderTableRow(conn.name, conn.ip, conn.country, conn.sentFive, conn.sentSixty, conn.receivedFive, conn.receivedSixty)
      })}

    </ConnectionCard>

    <div className="xl-spacer"/>
  </TabContainer>

}