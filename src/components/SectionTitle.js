'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  HEADING_TEXT_COLOR,
  CARD_CONTENT_PADDING,
} from '../styles/base/viz-theme';
import TypographyComponent from 'UIBean/TypographyComponent';
import BIcon from 'UIBean/BIcon';

const { H5, H4, H3 } = TypographyComponent;

const SectionTitleWrapper = styled.div`
  padding: ${props => props.cardPadding && CARD_CONTENT_PADDING};
  padding-bottom: 20px;
  padding-top: 30px;
  color: ${HEADING_TEXT_COLOR};
  display: flex;
  align-items: center;
  height: 5rem;
`;

const Sizes = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
};

const renderSize = (size, title) => {
  switch (size) {
    case Sizes.SMALL:
      return <H5>{title}</H5>;
    case Sizes.MEDIUM:
      return <H4>{title}</H4>;
    case Sizes.LARGE:
      return <H3>{title}</H3>;
  }
};

const ListOfSizes = Object.keys(Sizes).map(k => Sizes[k]);

const SectionTitle = ({ icon, size, title, cardPadding }) => (
  <SectionTitleWrapper className="wide-letter" cardPadding={cardPadding}>
    {icon ? <BIcon name={icon} size={16} className="m-right-2" /> : null}
    {renderSize(size, title)}
  </SectionTitleWrapper>
);

SectionTitle.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  cardPadding: PropTypes.bool,
  size: PropTypes.oneOf(ListOfSizes),
};

SectionTitle.defaultProps = {
  cardPadding: true,
  size: Sizes.SMALL,
};

export default SectionTitle;
