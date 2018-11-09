'use es6';

import React from 'react';
import classNames from 'classnames';
import keyMirror from 'keymirror';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getProp } from 'UIBean/UtilGet';

export const FlexDirection = keyMirror({
  ROW: null,
  COLUMN: null,
});
const FlexDirectionList = Object.keys(FlexDirection);

export const JustifyContent = {
  INITIAL: 'initial',
  CENTER: 'center',
  FLEX_START: 'flex-start',
  SPACE_BETWEEN: 'space-between',
  SPACE_AROUND: 'space-around',
};

const JustifyContentList = Object.keys(JustifyContent).map(
  k => JustifyContent[k]
);

const FlexContainer = styled.div`
  display: flex;
  justify-content: ${getProp('justifyContent')};
  align-content: ${getProp('alignContent')};
  align-items: ${getProp('alignItems')};
  ${({ fillAll }) => fillAll && 'width: 100%; height: 100%;'};
  ${({ fillHeight }) => fillHeight && 'height: 100%;'};
  ${({ fillWidth }) => fillWidth && 'width: 100%;'};
  ${({ direction }) => {
    if (direction === FlexDirection.ROW) {
      return 'flex-direction: row';
    } else if (direction === FlexDirection.COLUMN) {
      return 'flex-direction: column';
    }
  }}
`;

/**
 * Can use as a simple container, or as a bootstrap style row or column grid system
 */
class Flex extends React.Component {
  // TODO fix to use ...props
  render() {
    const {
      direction,
      noWrap,
      gutter,
      className,
      animate,
      fill,
      fillAll,
      justifyContent,
      alignContent,
      alignItems,
    } = this.props;
    return (
      <FlexContainer
        justifyContent={justifyContent}
        alignContent={alignContent}
        alignItems={alignItems}
        fillAll={fillAll}
        fillWidth={fill && direction === FlexDirection.ROW}
        fillHeight={fill && direction === FlexDirection.COLUMN}
        direction={direction}
        className={classNames(className, {
          flex: true,
          [`gutter-${gutter}`]: gutter,
          fade: animate,
          noWrap: noWrap,
        })}
      >
        {this.props.children}
      </FlexContainer>
    );
  }
}

Flex.defaultProps = {
  animate: true,
  direction: FlexDirection.ROW,
  gutter: 0,
  fill: false,
  fillAll: false,
  noWrap: false,
  justifyContent: 'initial',
  alignContent: 'initial',
  alignItems: 'initial',
};

Flex.propTypes = {
  animate: PropTypes.bool,
  direction: PropTypes.oneOf(FlexDirectionList),
  gutter: PropTypes.number,
  fill: PropTypes.bool,
  fillAll: PropTypes.bool,
  noWrap: PropTypes.bool,
  justifyContent: PropTypes.oneOf(JustifyContentList),
  alignContent: PropTypes.oneOf(JustifyContentList),
  alignItems: PropTypes.oneOf(JustifyContentList),
};

export default Flex;
