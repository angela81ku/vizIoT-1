'use es6';

import ScheduleCard from 'VizIoT/containers/ScheduleCard';
import React from 'react';
import SectionTitle from 'VizIoT/components/SectionTitle';
import styled from 'styled-components';
import SectionSubtitle from 'VizIoT/components/SectionSubtitle';

const Padded = styled.div`
  padding: 0 6%; 
`;

const TitleSection = styled.div`
`;

export default () => {
  return (
    <Padded>
      <TitleSection className={'m-tb-10'}>
        <SectionTitle title="Timeline" size={'lg'} cardPadding={false}/>
        <SectionSubtitle text={'Jump across time to explore temporal patterns in traffic'}/>
      </TitleSection>
      <ScheduleCard />
    </Padded>
  );
};
