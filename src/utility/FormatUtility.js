'use es6';

export const formatBytes = (val, denomUnit) => {

  if (!val) {
    return val;
  }

  const denom = denomUnit ? ' / ' + denomUnit : '' ;

  const byteRanges = [
    {
      unit: `GB${denom}`,
      limit: Math.pow(10, 9)
    },
    {
      unit: `MB${denom}`,
      limit: Math.pow(10, 6)
    },
    {
      unit: `KB${denom}`,
      limit: Math.pow(10, 3)
    },
    {
      unit: `B${denom}`,
      limit: 0
    },
  ];

  const { limit, unit } = byteRanges.find(({ limit }) => val > limit);

  if (limit) {
    return `${parseFloat(val / parseFloat(limit)).toFixed(2)} ${unit}`;
  }
  return `${parseFloat(val).toFixed(2)} ${unit}`;
};