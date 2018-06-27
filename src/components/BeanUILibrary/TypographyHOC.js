'use es6';

import TypographyStyles from './TypographyStyles';
import React from 'react';
import styled from 'styled-components';

const withTypography = typographyKey => component => {
  return styled(component)`
    ${TypographyStyles[typographyKey]};
  `;
};

export default withTypography;
