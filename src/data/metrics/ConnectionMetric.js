import DataType from '../DataType';

export const ConnectionMetric = {
  HITS: 'hits',
};

export const metricToDataType = {
  [ConnectionMetric.HITS]: DataType.INTEGER,
};
