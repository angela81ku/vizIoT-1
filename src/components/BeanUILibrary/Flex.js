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
  DEFAULT: 'default',
  CENTER: 'center',
  FLEX_START: 'flex-start',
};

const JustifyContentList = Object.keys(JustifyContent).map(
  k => JustifyContent[k]
);

const FlexContainer = styled.div`
  justify-content: ${getProp('justifyContent')};
  align-content: ${getProp('alignContent')}
    ${({ fillAll }) => fillAll && 'width: 100%; height: 100%;'};
`;

/**
 * Can use as a simple container, or as a bootstrap style row or column grid system
 */
class Flex extends React.Component {
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
    } = this.props;
    return (
      <FlexContainer
        justifyContent={justifyContent}
        alignContent={alignContent}
        fillAll={fillAll}
        className={classNames(className, {
          flex: true,
          [`gutter-${gutter}`]: gutter,
          fade: animate,
          'flex-row': direction === FlexDirection.ROW,
          'flex-column': direction === FlexDirection.COLUMN,
          fillWidth: fill && direction === FlexDirection.ROW,
          fillHeight: fill && direction === FlexDirection.COLUMN,
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
  noWrap: false,
  justifyContent: 'initial',
  alignContent: 'initial',
};

Flex.propTypes = {
  animate: PropTypes.bool,
  direction: PropTypes.oneOf(FlexDirectionList),
  gutter: PropTypes.number,
  fill: PropTypes.bool,
  noWrap: PropTypes.bool,
  justifyContent: PropTypes.oneOf(JustifyContentList),
  alignContent: PropTypes.oneOf(JustifyContentList),
};

export default Flex;
