'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  HEADING_TEXT_COLOR,
  CARD_CONTENT_PADDING,
} from '../styles/base/viz-theme';

const SectionTitleWrapper = styled.div`
  padding: ${props => props.cardPadding && CARD_CONTENT_PADDING};
  padding-bottom: 20px;
  padding-top: 30px;
  color: ${HEADING_TEXT_COLOR};
  display: flex;
  align-items: center;
  height: 5rem;
  font-size: 1.8rem;
`;

const Icon = styled.div`
  font-size: 1.6rem;
`;

const SectionTitle = ({ icon, title, cardPadding }) => (
  <SectionTitleWrapper className="wide-letter" cardPadding={cardPadding}>
    {icon ? <Icon className="material-icons m-right-2">{icon}</Icon> : null}
    {title}
  </SectionTitleWrapper>
);

SectionTitle.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  cardPadding: PropTypes.bool,
};

SectionTitle.defaultProps = {
  cardPadding: true,
};

export default SectionTitle;
