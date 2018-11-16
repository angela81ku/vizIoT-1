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

const { H5, H3, H2 } = TypographyComponent;

const SectionTitleWrapper = styled.div`
  margin: ${props => props.cardPadding && CARD_CONTENT_PADDING};
  margin-bottom: 0.5rem;
  color: ${HEADING_TEXT_COLOR};
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
      return <H3>{title}</H3>;
    case Sizes.LARGE:
      return <H2>{title}</H2>;
  }
};

const ListOfSizes = Object.keys(Sizes).map(k => Sizes[k]);

const SectionTitle = ({ icon, size, title, cardPadding, ...props }) => (
  <SectionTitleWrapper className="wide-letter"
                       cardPadding={cardPadding}
                       {...props}>
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
