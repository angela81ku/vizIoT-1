import DataType from '../DataType';

export const ConnectionMetric = {
  HITS: 'hit',
};

export const metricToDataType = {
  [ConnectionMetric.HITS]: DataType.INTEGER,
};
