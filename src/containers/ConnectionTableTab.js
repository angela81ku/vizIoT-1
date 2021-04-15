import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SectionTitle from '../components/SectionTitle';
import SectionSubtitle from '../components/SectionSubtitle';
import {ConnectionTable} from './ConnectionTable';


const TabContainer = styled.div`
  padding: 0 11.8rem;
  padding-top: 80px;
  margin: 0 auto;
`;

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

  return <TabContainer>
    <SectionTitle title="Destination Table" size="lg" cardPadding={false}/>
    <SectionSubtitle text="View destinations by device connection" margins={true}/>
    <div id='spacer-bottom' className="small-spacer"/>
    <div style={{height: graphString}}>
      <ConnectionTable
        rows={5}
        xTicks={3}
        timeFrame={30}
        sentColor={'#ff1e00'}
        receivedColor={'#0073ff'}
      />
    </div>
  </TabContainer>

}
