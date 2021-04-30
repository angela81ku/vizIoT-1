'use es6';

import React from 'react';
import {TypographyStyles} from 'UIBean/functional-css/TypographyStyles';
import withTypography from 'UIBean/TypographyHOC';

export default Object.keys(TypographyStyles).reduce((acc, key) => {
  return {
    ...acc,
    [key]: withTypography(key)('div'),
  };
}, {});
