'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  HEADING_TEXT_COLOR,
  CARD_CONTENT_PADDING,
} from '../styles/base/viz-theme';
import BIcon from 'UIBean/BIcon';
import { H0, H1, H3, H5 } from 'UIBean/functional-css/TypographyStyles';

const Sizes = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
};

const getLetterSpacing = ({ size }) => {
  console.log(size);
  if (size !== Sizes.LARGE) {
    return 'letter-spacing: 4px;';
  }
  return '';
};

const SectionTitleWrapper = styled.div`
  margin: ${props => props.cardPadding && CARD_CONTENT_PADDING};
  margin-bottom: 0.5rem;
  color: ${HEADING_TEXT_COLOR};
`;

const getFont = ({ size }) => {
  switch (size) {
    case Sizes.SMALL:
      return H5;
    case Sizes.MEDIUM:
      return H3;
    case Sizes.LARGE:
      return H0;
    default:
      return '';
  }
};

const Title = styled.div`
  ${getFont}
  ${getLetterSpacing}
  font-weight: 300;
`;

const ListOfSizes = Object.keys(Sizes).map(k => Sizes[k]);

const SectionTitle = ({ icon, size, title, cardPadding, ...props }) => (
  <SectionTitleWrapper cardPadding={cardPadding}
                       {...props}>
    {icon ? <BIcon name={icon} size={16} className="m-right-2" /> : null}
    <Title size={size}>{title}</Title>
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
