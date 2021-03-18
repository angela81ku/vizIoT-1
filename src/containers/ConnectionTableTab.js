import React from 'react';
import styled from "styled-components";

import SectionTitle from "../components/SectionTitle";
import SectionSubtitle from "../components/SectionSubtitle";


const TabContainer = styled.div`
  padding: 0 11.8rem;
  padding-top: 80px;
  margin: 0 auto;
`;

export const ConnectionTableTab = ({}) => {

  return <TabContainer>
    <SectionTitle title="Destination Table" size="lg" cardPadding={false}/>
    <SectionSubtitle text="View destinations by device connection" margins={true}/>
    <div className="small-spacer"/>

    <div className="xl-spacer"/>
  </TabContainer>

}