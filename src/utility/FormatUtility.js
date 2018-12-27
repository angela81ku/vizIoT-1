'use es6';

export const formatBytes = (val) => {

  if (!val) {
    return val;
  }

  const byteRanges = [
    {
      unit: 'GB',
      limit: Math.pow(10, 9)
    },
    {
      unit: 'MB',
      limit: Math.pow(10, 6)
    },
    {
      unit: 'KB',
      limit: Math.pow(10, 3)
    },
    {
      unit: 'B',
      limit: 0
    },
  ];

  const { limit, unit } = byteRanges.find(({ limit }) => val > limit);

  if (limit) {
    return `${parseFloat(val / parseFloat(limit)).toFixed(2)} ${unit}`;
  }
  return `${parseFloat(val).toFixed(2)} ${unit}`;
};