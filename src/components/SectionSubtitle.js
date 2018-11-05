'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BODY_TEXT_COLOR_LIGHTER } from '../styles/base/viz-theme';
import TypographyComponents from 'UIBean/TypographyComponent';

const { H6 } = TypographyComponents;

const StyledH6 = styled(H6)`
  color: ${BODY_TEXT_COLOR_LIGHTER};
`;

const SectionSubtitle = ({ text }) => {
  return (
    <StyledH6>{text}</StyledH6>
  );
};

SectionSubtitle.defaultProps = {
  text: '',
};

SectionSubtitle.propTypes = {
  text: PropTypes.any,
};

export default SectionSubtitle;
