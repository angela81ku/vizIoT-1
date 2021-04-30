'use es6';

export const verifyRow = (row, numDimensions, numMetrics) => {
  const {dimensions, metrics} = row;
  return (
    dimensions &&
    metrics &&
    dimensions.length === numDimensions &&
    metrics.length === numMetrics
  );
};
