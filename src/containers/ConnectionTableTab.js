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
  width: 750px;
  height: 700px;
`

// these are the primary columns, in order

// main col
const SourceColumn = styled(TabColumn)`
  width: 20%;
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
  width: 40%;
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
  width: 20%;
  height: 100%;
  border-left: 1px solid rgba(255, 255, 255, .5);
`

const BorderedSolidRow = styled(SolidRow)`
  // border-top: 1px solid rgba(255, 255, 255, .5);
  border-bottom: 1px solid rgba(255, 255, 255, .5);
`

const FixedTitle = styled(SectionTitle)`
  margin: 0 0 0 0;
`

export const ConnectionTableTab = ({}) => {

  return <TabContainer>
    <SectionTitle title="Destination Table" size="lg" cardPadding={false}/>
    <SectionSubtitle text="View destinations by device connection" margins={true}/>
    <div className="small-spacer"/>
    <ConnectionCard>

      <BorderedSolidRow height='75px'>
        <SourceColumn>
          <FixedTitle title='Source'/>
          <SolidRow>
            <TabColumn>
              <SectionSubtitle text='Name'/>
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
        <GraphColumn>
          I'm a graph!
        </GraphColumn>
      </BorderedSolidRow>


      <BorderedSolidRow>
        <SourceColumn>
          I'm a column
        </SourceColumn>
        <SourceColumn>
          I'm another column
        </SourceColumn>
      </BorderedSolidRow>

    </ConnectionCard>

    <div className="xl-spacer"/>
  </TabContainer>

}