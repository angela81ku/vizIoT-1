import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CARD_COLOR, CARD_SHADOW } from '../../styles/base/viz-theme';

const StyledBCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 1rem;

  background: ${CARD_COLOR};
  box-shadow: ${CARD_SHADOW};
  border-radius: 0.1875rem;
`;

class BCard extends React.Component {
  render() {
    const {
      noShadow,
      noBorder,
      noPadding,
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
    if (noPadding) {
      classNames.push('noPadding');
    }
    if (noBackground) {
      classNames.push('noBackground');
    }

    return <StyledBCard className={classNames.join(' ')}>{children}</StyledBCard>;
  }
}

BCard.propTypes = {
  noShadow: PropTypes.bool,
  noBorder: PropTypes.bool,
  noPadding: PropTypes.bool,
  noBackground: PropTypes.bool,
  className: PropTypes.string,
};

export default BCard;
