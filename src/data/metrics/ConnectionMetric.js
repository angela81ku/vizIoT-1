import DataType from '../DataType';

export const ConnectionMetric = {
  HITS: 'hit',
  PERCENT_SECURED: 'percentSecured',
  PERCENT_UNSECURED: 'percentUnsecured',
};

export const metricToDataType = {
  [ConnectionMetric.HITS]: DataType.INTEGER,
};
