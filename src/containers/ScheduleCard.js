'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';

import BCard from 'UIBean/BCard';
import AutoFitComponent from '../components/AutoFitComponent';
import TemporalHeatTable from 'UIBean/TemporalHeatTable';
import {SPACING} from '../data/records/Spacing';
import {H5} from 'UIBean/functional-css/TypographyStyles';

const dayFormat = 'M DD, YYYY';
const colLabelFormat = 'dd';
const timeFormat = 'HHA';

const AutofitWithHeight = styled(AutoFitComponent)`
  height: 538px;
  padding: 20px;
`;

const Title = styled.div`
  ${H5}
  font-weight: 800;
  margin: 0;
`;

const logMoment = (m, prefix) => {
  // console.log(
  //   `${prefix} ${m.month()} ${m.date()}, ${m.hour()}:${m.minutes()}:${m.seconds()}`
  // );
};

const createPlaceholderData = () => {
  let rows = [];

  const now = moment();
  const nowFlooredHour = moment(now).startOf('hour');
  const nowEndDay = moment(now).endOf('day');

  const startOfDayAWeekAgo = moment(now)
    .subtract(1, 'week')
    .startOf('day');

  logMoment(now, 'now');
  logMoment(nowFlooredHour, 'nowFlooredHour');
  logMoment(startOfDayAWeekAgo, 'startOfDayAWeekAgo');

  let iTime = nowEndDay;
  while (iTime.unix() >= startOfDayAWeekAgo.unix()) {
    logMoment(iTime, 'generating for: ');

    let metricValue = [Math.floor(Math.random() * 100)];

    if (iTime.unix() > now.unix()) {
      metricValue = [null];
    }

    rows = [
      {
        dimensions: [iTime.format(dayFormat), iTime.format(timeFormat)],
        metrics: metricValue,
      },
      ...rows,
    ];
    iTime.subtract(1, 'hour');
  }

  return rows;
};

const ScheduleCard = ({className}) => {
  return (
    <BCard>
      <Title className="m-left-5 m-top-5">
        Hourly Throughput (Packets)
      </Title>
      <AutofitWithHeight>
        <TemporalHeatTable
          padding={new SPACING({l: 5})}
          data={createPlaceholderData()}
          renderRowLabel={rowValue => {
            const date = moment(rowValue, 'HH');
            const hourNumber = date.hours();
            return hourNumber % 2 === 0 ? date.format(timeFormat) : '';
          }}
          renderColumnLabel={colValue =>
            moment(colValue, dayFormat)
              .format(colLabelFormat)
              .toUpperCase()
          }
          mapDimensionsToRowColValue={({rowDimension, colDimension}) => {
            const rowValue = moment(rowDimension, timeFormat).hour();
            const colValue = colDimension;
            return {rowValue, colValue};
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
            const aWeekAgo = moment(nowFlooredDay).subtract(1, 'week');

            let dates = [];
            let iTime = aWeekAgo;
            while (iTime.unix() < now.unix()) {
              dates = [...dates, iTime.format(dayFormat)];
              iTime = moment(iTime).add(1, 'day');
            }
            return dates;
          }}
        />
      </AutofitWithHeight>
    </BCard>
  );
};

ScheduleCard.defaultProps = {
  className: null,
};

ScheduleCard.propTypes = {
  className: PropTypes.string,
};

export default ScheduleCard;
