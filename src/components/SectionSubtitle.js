'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SPACING } from '../data/records/Spacing';
import { BODY_TEXT_COLOR_LIGHTER } from '../styles/base/viz-theme';

const SectionSubtitleWrapper = styled.h6`
  font-size: 1.2rem;
  color: ${BODY_TEXT_COLOR_LIGHTER};
  padding: ${({ padding: { l, r, t, b } }) => `${t}px ${r}px ${b}px ${l}px`};
`;

const SectionSubtitle = ({ text, padding }) => {
  return (
    <SectionSubtitleWrapper padding={padding}>{text}</SectionSubtitleWrapper>
  );
};

SectionSubtitle.defaultProps = {
  text: '',
  padding: new SPACING(),
};

SectionSubtitle.propTypes = {
  text: PropTypes.any,
  padding: PropTypes.instanceOf(SPACING),
};

export default SectionSubtitle;
