'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BODY_TEXT_COLOR_LIGHTER } from '../styles/base/viz-theme';
import TypographyComponents from 'UIBean/TypographyComponent';

const { H5 } = TypographyComponents;

const StyledH6 = styled(H5)`
  color: ${BODY_TEXT_COLOR_LIGHTER};
  ${({ margins }) => margins && 'margin-top: 1.0rem;'}
`;

const SectionSubtitle = ({ text, ...rest }) => {
  return (
    <StyledH6 {...rest}>{text}</StyledH6>
  );
};

SectionSubtitle.defaultProps = {
  text: '',
  margins: false,
};

SectionSubtitle.propTypes = {
  text: PropTypes.any,
  margins: PropTypes.bool,
};

export default SectionSubtitle;
