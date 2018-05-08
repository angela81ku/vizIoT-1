'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';

import CardWrapper from '../components/BeanUILibrary/CardWrapper';
import AutoFitComponent from '../components/AutoFitComponent';
import TemporalHeatTable from '../components/BeanUILibrary/TemporalHeatTable';
import SectionTitle from '../components/SectionTitle';
import SectionSubtitle from '../components/SectionSubtitle';
import { SPACING } from '../data/records/Spacing';

const dayFormat = 'M DD, YYYY';
const timeFormat = 'hh:ss';

const AutofitWithHeight = styled(AutoFitComponent)`
  height: 470px;
`;

const logMoment = (m, prefix) => {
  console.log(
    `${prefix} ${m.month()} ${m.date()}, ${m.hours()}:${m.minutes()}:${m.seconds()}`
  );
};

const createPlaceholderData = () => {
  let rows = [];

  const now = moment();
  const nowFlooredHour = moment(now).startOf('hour');
  const startOfDayAWeekAgo = moment(now)
    .subtract('week', 1)
    .startOf('day');

  logMoment(now, 'now');
  logMoment(nowFlooredHour, 'nowFlooredHour');
  logMoment(startOfDayAWeekAgo, 'startOfDayAWeekAgo');

  let iTime = nowFlooredHour;
  while (iTime.unix() >= startOfDayAWeekAgo.unix()) {
    logMoment(iTime, 'generating for: ');

    rows = [
      {
        dimensions: [iTime.format(dayFormat), iTime.format(timeFormat)],
        metrics: [Math.floor(Math.random() * 100)],
      },
      ...rows,
    ];
    iTime.subtract('hour', 1);
  }

  console.log(rows);
  return rows;
};

const ScheduleCard = ({ className }) => {
  return (
    <CardWrapper>
      <SectionTitle title="SCHEDULE VIEW" />
      <SectionSubtitle
        text="THROUGHPUT BY HOUR OVER LAST WEEK"
        padding={new SPACING({ l: 20 })}
      />
      <AutofitWithHeight>
        <TemporalHeatTable
          // dimension={{
          //   width: 0,
          //   height: 0,
          // }}
          dimension={{ width: 487, height: 470 }}
          padding={new SPACING({ l: 20, r: 20, t: 20, b: 20 })}
          data={createPlaceholderData()}
        />
      </AutofitWithHeight>
    </CardWrapper>
  );
};

ScheduleCard.defaultProps = {
  className: null,
};

ScheduleCard.propTypes = {
  className: PropTypes.string,
};

export default ScheduleCard;
