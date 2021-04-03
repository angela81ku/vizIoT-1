'use es6';

export const formatBytes = (val, denomUnit, precision = 2, spaces = true) => {

  if (val === undefined || val === null) {
    return val;
  }

  const denom = spaces ? denomUnit ? ' / ' + denomUnit : '' : denomUnit ? '/' + denomUnit : '';

  if (val === 0) {
    return `0 B${denom}`
  }

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

  const res = byteRanges.filter(arrVal => val > arrVal.limit)[0];

  if (res.limit > 0) {
    return `${parseFloat(val / parseFloat(res.limit)).toFixed(precision)} ${res.unit}`;
  } else {
    return `${parseFloat(val).toFixed(precision)} ${res.unit}`;
  }
};