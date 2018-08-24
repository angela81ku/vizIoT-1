'use es6';

import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { DARK_BLUE_GRADIENT } from 'VizIoT/styles/base/viz-theme';
import TypographyComponent from 'UIBean/TypographyComponent';

const { H2 } = TypographyComponent;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${DARK_BLUE_GRADIENT};
  position: relative;
`;

const Header = styled(H2)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
`;

export default () => (
  <Container>
    <Header>
      404 Not Found! <NavLink to="/">Home</NavLink>
    </Header>
  </Container>
);
