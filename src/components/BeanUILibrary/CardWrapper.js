import React from 'react';
import PropTypes from 'prop-types';

class CardWrapper extends React.Component {
  render() {
    const {
      noShadow,
      noBorder,
      noPadding,
      noBackground,
      className,
      children,
    } = this.props;

    const classNames = ['cardWrapper'].concat(
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

    return <div className={classNames.join(' ')}>{children}</div>;
  }
}

CardWrapper.propTypes = {
  noShadow: PropTypes.bool,
  noBorder: PropTypes.bool,
  noPadding: PropTypes.bool,
  noBackground: PropTypes.bool,
  className: PropTypes.string,
};

export default CardWrapper;
