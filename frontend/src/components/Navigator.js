'use es6';

import {JustifyContent} from './BeanUILibrary/Flex';
import {getTabByPath, tabKeys, Tabs} from '../constants/TabNavigation';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TabColumn from '../components/BeanUILibrary/TabColumn';
import TabItem from '../components/BeanUILibrary/TabItem';
import {TRON} from '../styles/base/viz-theme';
import {H3} from './BeanUILibrary/functional-css/TypographyStyles';
import Flex from '../components/BeanUILibrary/Flex';
import {_sticky} from './BeanUILibrary/functional-css/layout';

const NavMenu = styled(TabColumn)`
  width: 100%;
  height: 60rem;
`;

const TabItemStyled = styled(TabItem)`
  ${({active}) => active && `
    border-left: 1px solid ${TRON};
    border-right: 1px solid ${TRON};
    background-color: ${TRON}26;
    box-shadow: 0px 0px 43px #13d4b730, 0px 0px 30px #13d4b726 inset;
  `}
  padding: 0 2rem;
  // width: 100%;
`;

const MenuText = styled.div`
  ${H3}
  letter-spacing: 4px;
  text-transform: uppercase;
  font-weight: 600;
  margin: 0;
  ${({active}) => active && `
    color: ${TRON};
  `}
`;

const Navigator = styled(Flex)`
  ${_sticky()};
  top: 0;
  left: 0;
  height: 100vh;
  width: 40rem;
  z-index: 10;
  background: linear-gradient( to bottom,#040b17ed 0%,#040b17F0 48%,#040b17ed 100%);
`;

const withHideable = (Component, hideStyle = '', visibleStyle = '', style = '') => {

  const EnhancedWithHiddenStyles = styled(Component)`
    ${style}
    ${({isHidden}) => isHidden ? hideStyle : visibleStyle}
  `;

  const HoC = ({children, ...props}) =>
    (
      <EnhancedWithHiddenStyles {...props}>
        {children}
      </EnhancedWithHiddenStyles>
    );

  HoC.defaultProps = {
    isHidden: false,
    visibleStyle: '',
    hideStyle: '',
  };

  HoC.propTypes = {
    isHidden: PropTypes.bool,
    visibleStyle: PropTypes.string,
    hideStyle: PropTypes.string,
    children: PropTypes.any,
  };

  return HoC;
};

const NavigatorComponent = ({location, ...rest}) => {

  const maybeTab = getTabByPath(location.pathname);
  const {key} = maybeTab || {};

  return (
    <Navigator alignItems={JustifyContent.CENTER}
               justifyContent={JustifyContent.CENTER}
               {...rest}
    >
      <NavMenu>
        {Object.keys(tabKeys).map(k => {
          const {title, path} = Tabs[k];
          return (
            <TabItemStyled key={k} active={key === k} to={path}>
              <MenuText active={key === k}>{title}</MenuText>
            </TabItemStyled>
          );
        })}
      </NavMenu>
    </Navigator>
  );
};

const hideableNavigator = withHideable(
  NavigatorComponent,
  `
    opacity: 0;
    transform: translateX(-330px);
  `,
  `
    opacity: 1;
    transform: translateX(0);
  `,
  `
    transition: opacity 1s ease-in-out, transform 0.7s;
  `);

hideableNavigator.propType = {
  location: PropTypes.object,
};

export default hideableNavigator;
