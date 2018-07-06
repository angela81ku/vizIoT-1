'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { shouldUpdate } from 'recompose';

import Flex, { FlexDirection } from 'UIBean/Flex';
import FlexChild from 'UIBean/FlexChild';
import FlexSize from 'UIBean/FlexSize';
import BCard from 'UIBean/BCard';
import BIcon from 'UIBean/BIcon';
import {
  LIGHT_BLACK,
  OFF_BLACK,
  ORANGE_PEEL,
  LINK_BLUE,
} from 'VizIoT/styles/base/viz-theme';
import TypographyComponent from 'UIBean/TypographyComponent';
const { H2, H6, H5, Paragraph } = TypographyComponent;

const borderRadius = '15px';

const DCard = styled(BCard)`
  min-width: 260px;
  height: 218px;
  background-color: white;
  color: ${OFF_BLACK};

  border-width: 3px;
  // border-style: solid;
  border-color: ${ORANGE_PEEL};
  border-radius: ${borderRadius};

  border-left-width: ${borderRadius};
  border-left-style: solid;
  // border-left-color: red;
  // border-left-style: groove;

  transition: 0.5s;
  transition-timing-function: ease;
  z-index: 0;
  &:hover {
    transform: scale(1.1);
    z-index: 30;
  }
  opacity: ${({ active }) => (active ? 0.5 : 1)};
`;

const DName = styled(H6)`
  font-weight: 800;
  text-transform: uppercase;
`;

const DCategory = styled(H6)`
  font-weight: 400;
  margin-bottom: 4px;
  color: ${LIGHT_BLACK};
`;

const ConnectionsLabel = styled(H5)`
  color: ${OFF_BLACK};
  font-weight: normal;
`;

const ConnectionsValue = styled.span`
  font-weight: 800;
`;

const ConnectionDestination = styled(Paragraph)`
  margin-top: 6px;
  color: ${LIGHT_BLACK};
`;

const ConnectionDestinationHost = styled.span`
  color: ${LINK_BLUE};
  font-weight: 700;
`;

const DeviceSecurityMetrics = styled(FlexSize)`
  text-align: right;
`;

const MetricsNumber = styled.div`
  font-weight: ${700};
  color: ${ORANGE_PEEL};
`;

const DContent = shouldUpdate((props, nextProps) => false)(styled(Flex)`
  height: 100%;
`);

const DLeft = styled(FlexChild)`
  position: relative;
`;

const GraphCurrentValue = styled(FlexChild)`
  text-align: center;
`;

const DRight = styled(FlexChild)`
  box-shadow: #e4e4e4 -18px 0px 27px -15px;
`;

const Symbol = styled(BIcon)`
  position: absolute;
  font-size: 75px;
  opacity: 0.2;
  top: 30%;
  width: 100%;
  text-align: center;
`;

const DeviceCard = ({
  onHover,
  onLeaveHover,
  active,
  device: { id, alias },
}) => {
  const lastSeen = 'Several seconds ago';

  return (
    <DCard
      onMouseEnter={onHover}
      onMouseLeave={onLeaveHover}
      compact={false}
      active={active}
      noPadding={true}
    >
      <DContent>
        <DLeft grow={5}>
          <Symbol name={'keyboard_voice'} />
          <Flex
            direction={FlexDirection.COLUMN}
            fill={true}
            className={'p-tb-4'}
          >
            <GraphCurrentValue grow={1}>
              <H2>
                <strong>{'3'}</strong>
              </H2>
              <Paragraph>{'kb/s'}</Paragraph>
            </GraphCurrentValue>
            <FlexChild alignSelf={'center'}>
              <Paragraph>{lastSeen}</Paragraph>
            </FlexChild>
          </Flex>
        </DLeft>
        <DRight grow={10}>
          <FlexSize space="p-top-6 p-lr-4">
            <DCategory>{'Voice Assistant'}</DCategory>
            <DName>{alias}</DName>
          </FlexSize>
          <FlexSize space="m-top-8 p-lr-4">
            <ConnectionsLabel>
              <ConnectionsValue>{id}</ConnectionsValue>
              {' connections'}
              <ConnectionDestination>
                {'90.5% to '}
                <ConnectionDestinationHost>
                  google.com
                </ConnectionDestinationHost>
              </ConnectionDestination>
            </ConnectionsLabel>
          </FlexSize>
          <FlexSize space="m-top-9 p-lr-4">
            <Flex>
              <FlexSize size={{ xs: 4 }} alignSelf={'start'}>
                <div>
                  <strong>1.3 Gb</strong>
                </div>
                <H6>out</H6>
              </FlexSize>
              <FlexSize size={{ xs: 4 }} alignSelf={'start'}>
                <div>
                  <strong>2.5 Gb</strong>
                </div>
                <H6>in</H6>
              </FlexSize>
              <DeviceSecurityMetrics size={{ xs: 4 }} alignSelf={'end'}>
                <MetricsNumber>34%</MetricsNumber>
                <H6>unsecured</H6>
              </DeviceSecurityMetrics>
            </Flex>
          </FlexSize>
        </DRight>
      </DContent>
    </DCard>
  );
};

DeviceCard.defaultProps = {
  onHover: () => {},
  onLeaveHover: () => {},
  active: false,
};

DeviceCard.propTypes = {
  device: PropTypes.object.isRequired,
  onHover: PropTypes.func,
  onLeaveHover: PropTypes.func,
  active: PropTypes.bool,
};

export default shouldUpdate((props, nextProps) => {
  return props.active !== nextProps.active;
})(DeviceCard);
