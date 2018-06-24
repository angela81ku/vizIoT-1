import React from 'react';
import classNames from 'classnames';
import keyMirror from 'keymirror';
import PropTypes from 'prop-types';

const FlexDirection = keyMirror({
  ROW: null,
  COLUMN: null,
});
const FlexDirectionList = Object.keys(FlexDirection);

class Grid extends React.Component {
  render() {
    const { direction, gutter, className, animate } = this.props;
    return (
      <div className={classNames(className,
        {
          [`gutter-${gutter}`]: gutter,
          'fade': animate,
          'flex-row': direction === FlexDirection.ROW,
          'flex-column': direction === FlexDirection.COLUMN,
        }
      )}>
        {this.props.children}
      </div>
    );
  }
}

Grid.defaultProps = {
  animate: true,
  direction: FlexDirection.ROW,
  gutter: 0,
};

Grid.propTypes = {
  animate: PropTypes.bool,
  direction: PropTypes.oneOf(FlexDirectionList),
  gutter: PropTypes.number,
};

export default Grid;
