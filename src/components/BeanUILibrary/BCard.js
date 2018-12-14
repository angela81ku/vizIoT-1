'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CARD_COLOR, CARD_SHADOW } from '../../styles/base/viz-theme';

const StyledBCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: ${({ compact, noPadding }) => {
    return noPadding ? '0' : compact ? '1rem' : '2rem';
  }};

  background: ${({ noBackground }) =>
    noBackground ? 'transparent none' : CARD_COLOR};
  box-shadow: ${({ noShadow }) => (noShadow ? 'none' : CARD_SHADOW)};
  // border-radius: 0.1875rem;
  
  background-color: #67a8d812;
  color: #ffffff; 
  border: ${({ noBorder }) => (noBorder ? 'none' : '#0f3b5c 1px solid')};
  border-radius: 10px;
`;

class BCard extends React.Component {
  render() {
    const { className, children } = this.props;

    const classNames = ['bean--card'].concat(
      className ? className.split(' ') : []
    );

    return (
      <StyledBCard className={classNames.join(' ')} {...this.props}>
        {children}
      </StyledBCard>
    );
  }
}

BCard.defaultProps = {
  noShadow: false,
  noBorder: false,
  noPadding: false,
  noBackground: false,
  compact: true,
  className: null,
};

BCard.propTypes = {
  noShadow: PropTypes.bool,
  noBorder: PropTypes.bool,
  noPadding: PropTypes.bool,
  noBackground: PropTypes.bool,
  compact: PropTypes.bool,
  className: PropTypes.string,
};

export default BCard;
