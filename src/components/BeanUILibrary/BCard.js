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

  background: ${CARD_COLOR};
  box-shadow: ${CARD_SHADOW};
  // border-radius: 0.1875rem;
  border-radius: 10px;
`;

class BCard extends React.Component {
  render() {
    const {
      noShadow,
      noBorder,
      noBackground,
      className,
      children,
    } = this.props;

    const classNames = ['bean--card'].concat(
      className ? className.split(' ') : []
    );
    if (noShadow) {
      classNames.push('noShadow');
    }
    if (noBorder) {
      classNames.push('noBorder');
    }
    if (noBackground) {
      classNames.push('noBackground');
    }

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
