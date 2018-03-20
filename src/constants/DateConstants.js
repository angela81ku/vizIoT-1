'use es6';

export default {
  NOW: 'now',
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  FORMAT_N_DAYS_AGO: days => `${days}daysAgo`,
  FORMAT_DATE: moment => moment.format('YYYY-MM-DD'),
};
