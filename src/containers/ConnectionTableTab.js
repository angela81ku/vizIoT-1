import React, {useState} from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';

import SectionTitle from "../components/SectionTitle";
import SectionSubtitle from "../components/SectionSubtitle";
import BCard from "../components/BeanUILibrary/BCard";
import SolidRow from '../components/BeanUILibrary/SolidRow';
import TabColumn from "../components/BeanUILibrary/TabColumn";
import BIcon from "../components/BeanUILibrary/BIcon";
import {useSocket} from "../components/BeanUILibrary/hooks/useSocket";
import {DeviceConnection} from "../socket/subscribe";
import {addConnections, getConnections} from "../data/aggregators/ConnectionAggregator";
import {ConnectionTable} from "./ConnectionTable";


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
    <ConnectionTable rows={5}/>

    <div className="xl-spacer"/>
  </TabContainer>

}
