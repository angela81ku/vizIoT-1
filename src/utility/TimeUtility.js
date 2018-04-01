'use es6';

import { DateConstants, DateToRegex } from '../constants/DateConstants';
import moment from 'moment';

export const convertDateTypeToString = {
  [DateConstants.NOW]: () => 'now',
  [DateConstants.TODAY]: () => 'today',
  [DateConstants.YESTERDAY]: () => 'yesterday',
  [DateConstants.N_DAYS_AGO]: days => `${days}daysAgo`,
  [DateConstants.N_SECONDS_AGO]: seconds => `${seconds}daysAgo`,
  [DateConstants.DATE]: moment => moment.format('YYYY-MM-DD'),
};

export const convertStringDateToMoment = stringDate => {
  const nDaysAgoReg = DateToRegex[DateConstants.N_DAYS_AGO];
  const nSecondsAgoReg = DateToRegex[DateConstants.N_SECONDS_AGO];
  const dateReg = DateToRegex[DateConstants.DATE];

  if (nDaysAgoReg.test(stringDate)) {
    const days = nDaysAgoReg.exec(stringDate)[0];
    return moment()
      .subtract(days, 'days')
      .startOf('day');
  } else if (nSecondsAgoReg.test(nSecondsAgoReg)) {
    const seconds = nSecondsAgoReg.exec(stringDate)[0];
    return moment().subtract(seconds, 'seconds');
  } else if (dateReg.test(stringDate)) {
    return moment(stringDate, 'YYYY-MM-DD');
  } else if (stringDate === DateConstants.NOW) {
    return moment();
  } else if (stringDate === DateConstants.TODAY) {
    return moment().startOf('day');
  } else if (stringDate === DateConstants.YESTERDAY) {
    return moment()
      .subtract(1, 'days')
      .startOf('day');
  } else {
    return null;
  }
};
