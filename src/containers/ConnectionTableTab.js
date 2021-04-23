import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SectionTitle from '../components/SectionTitle';
import SectionSubtitle from '../components/SectionSubtitle';
import {ConnectionTable} from './ConnectionTable';
import {SelectableDeviceList} from './SelectableDeviceList';


const TabContainer = styled.div`
  padding: 0 11.8rem;
  padding-top: 80px;
  margin: 0 auto;
`;

const GridContainer = styled.div`
  display: inline-grid;
  grid-template-columns: 20% 80%;
  grid-column-gap: 20px;
`

const setHeight = () => {
  const lastSpacer = document.getElementById('spacer-bottom');
  if (lastSpacer) {
    const spacerBottom = lastSpacer.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;
    return Math.max(windowHeight - spacerBottom - 30, 0);
  } else {
    return undefined
  }
}

export const ConnectionTableTab = ({}) => {
  const [graphHeight, setGraphHeight] = useState(undefined);

  const val = setHeight();
  if (graphHeight !== val) {
    setGraphHeight(val)
  }

  useEffect(() => {
    const resizeSetHeight = () => {
      setGraphHeight(setHeight());
    }

    window.addEventListener('resize', resizeSetHeight);
    return () => {
      window.removeEventListener('resize', resizeSetHeight)
    }
  }, [graphHeight])

  const graphString = `${graphHeight}px`

  const sentColor = '#ff1e00'
  const receivedColor = '#0073ff'
  const timeFrame = 30
  const xTicks = 3
  const rows = 5

  return <TabContainer>
    <SectionTitle title="Connection Table" size="lg" cardPadding={false}/>
    <SectionSubtitle text="View sent/received traffic by device connection" margins={true}/>
    <div id='spacer-bottom' className="small-spacer"/>
    <GridContainer style={{height: graphString, width: '100%'}}>
      <SelectableDeviceList deviceSelector={() => {}} height={graphString}/>
      <ConnectionTable
        height={graphString}
        rows={rows}
        xTicks={xTicks}
        timeFrame={timeFrame}
        sentColor={sentColor}
        receivedColor={receivedColor}
      />
    </GridContainer>
  </TabContainer>

}
