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
const colLabelFormat = 'dd';
const timeFormat = 'HHA';

const AutofitWithHeight = styled(AutoFitComponent)`
  height: 520px;
  padding: 20px;
`;

const logMoment = (m, prefix) => {
  console.log(
    `${prefix} ${m.month()} ${m.date()}, ${m.hour()}:${m.minutes()}:${m.seconds()}`
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
          padding={new SPACING({ l: 5 })}
          data={createPlaceholderData()}
          renderRowLabel={rowValue => {
            const date = moment(rowValue, 'HH');
            const hourNumber = date.hours();
            return hourNumber % 2 === 0 ? date.format(timeFormat) : ''
          }}
          renderColumnLabel={colValue => moment(colValue, dayFormat).format(colLabelFormat).toUpperCase()}
          mapDimensionsToRowColValue={({ rowDimension, colDimension }) => {
            const rowValue = moment(rowDimension, timeFormat).hour();
            const colValue = colDimension;
            return { rowValue, colValue };
          }}
          rowValuesGenerator={() => {
            const hours = [];
            for (let h = 0; h < 24; ++h) {
              hours.push(h);
            }
            return hours;
          }}
          colValuesGenerator={() => {
            const now = moment();
            const nowFlooredDay = moment(now).startOf('day');
            const aWeekAgo = moment(nowFlooredDay).subtract('week', 1);

            let dates = [];
            let iTime = aWeekAgo;
            while (iTime.unix() < now.unix()) {
              dates = [
                ...dates,
                iTime.format(dayFormat)
              ];
              iTime = moment(iTime).add('day', 1);
            }
            return dates;
          }}
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
