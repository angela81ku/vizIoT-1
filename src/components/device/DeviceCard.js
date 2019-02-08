'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { shouldUpdate } from 'recompose';

import Flex, { JustifyContent } from 'UIBean/Flex';
import FlexChild from 'UIBean/FlexChild';
import BCard from 'UIBean/BCard';
import BIcon from 'UIBean/BIcon';
import {
  OFF_BLACK,
  ORANGE_PEEL,
  TRON, EXTRA_LIGHT_COLOR, OFF_WHITE,
} from 'VizIoT/styles/base/viz-theme';
import TypographyComponent from 'UIBean/TypographyComponent';
import { formatBytes } from 'VizIoT/utility/FormatUtility';
import LineChart from 'VizIoT/components/LineChart';
import AutoFitComponent from 'VizIoT/components/AutoFitComponent';
const { H5 } = TypographyComponent;

const borderRadius = '10px';

const DCard = styled(BCard)`
  min-width: 260px;
  min-height: 218px;
  
  // White version
  // background-color: white;
  // color: ${OFF_BLACK};
  
  // Tron version
  background-color: #67a8d812;
  border: #0f3b5c 1px solid;

  // border-style: solid;
  // border-color: ${ORANGE_PEEL};
  border-radius: ${borderRadius};

  transition: 0.3s;
  transition-timing-function: ease;
  z-index: 0;
  &:hover {
    transform: scale(1.02) translateY(-5px);
    z-index: 30;   
    box-shadow: #5fffd18c 0 0 40px;
  }
  &:hover:after {
      content: '';
      display: block;
      position: absolute;
      top: -3px;
      bottom: -3px;
      left: -3px;
      right: -3px;
      border-radius: 10px;
      border: ${TRON} 4px solid;
  }
  opacity: ${({ active }) => (active ? 0.2 : 1)};
`;

const DName = styled(H5)`
  font-weight: 800;
  margin: 0;
`;

const DCategory = styled.div`
  font-weight: 400;
  margin-bottom: 4px;
  color: ${OFF_WHITE};
  text-transform: uppercase;
  font-size: 1.1rem;
  letter-spacing: 2px;
`;

const ConnectionsLabel = styled(H5)`
  color: ${TRON};
  font-weight: 500;
`;

const ConnectionsValue = styled.span`
  font-weight: 500;
`;

const ConnectionDestination = styled.span`
  margin-top: 6px;
  font-size: 1.2rem;
`;

const ConnectionDestinationHost = styled.span`
  font-weight: 700;
`;

const DeviceDownloadMetrics = styled(FlexChild)`
  text-align: right;
  // color: ${TRON};
  opacity: 0.70;
`;

const DContent = styled(Flex)`
  height: 100%;
`;

const DRight = styled(FlexChild)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const DEFAULT_VAL = '~';

const DeviceCard = ({
  onHover,
  onLeaveHover,
  active,
  device: { id, name, category, macAddress },
  velocity,
  total,
  dataIn,
  dataOut,
  graphData,
  chartConfig: {
    dataWindowSize,
  },
}) => {
  return (
    <DCard
      onMouseEnter={onHover}
      onMouseLeave={onLeaveHover}
      compact={false}
      active={active}
      noPadding={true}
    >
      <DContent>
        <DRight className="p-4" grow={10}>
          <AutoFitComponent>
            <LineChart
              className="device-small-chart"
              dataWindowSize={dataWindowSize}
              data={graphData}
            />
          </AutoFitComponent>
          <FlexChild>
            <DCategory className="p-bot-1">{category}</DCategory>
            <DName>{name || macAddress}</DName>
          </FlexChild>
          <FlexChild>
            <ConnectionsLabel className="m-top-2 m-bot-4">
              <ConnectionsValue>{(velocity && formatBytes(velocity, 's')) || DEFAULT_VAL}</ConnectionsValue>
            </ConnectionsLabel>
            {/*<ConnectionDestination>*/}
                {/*{'90.5% to '}*/}
                {/*<ConnectionDestinationHost>*/}
                  {/*{'google.com'}*/}
                {/*</ConnectionDestinationHost>*/}
            {/*</ConnectionDestination>*/}
          </FlexChild>
          <FlexChild className="m-top-2">
            <Flex noWrap={true} fill justifyContent={JustifyContent.SPACE_BETWEEN}>
              <DeviceDownloadMetrics size={{ xs: 4 }}>
                <BIcon type={'fas'} name="box" className="m-right-1" /> {total || DEFAULT_VAL}
              </DeviceDownloadMetrics>
              <DeviceDownloadMetrics size={{ xs: 4 }}>
                <BIcon type={'fas'} name="arrow-alt-circle-up" className="m-right-1" /> {dataIn || DEFAULT_VAL}
              </DeviceDownloadMetrics>
              <DeviceDownloadMetrics size={{ xs: 4 }}>
                <BIcon type={'fas'} name="arrow-alt-circle-down" className="m-right-1" /> {dataOut || DEFAULT_VAL}
              </DeviceDownloadMetrics>
            </Flex>
          </FlexChild>
        </DRight>
      </DContent>
    </DCard>
  );
};

DeviceCard.defaultProps = {
  onHover: () => {},
  onLeaveHover: () => {},
  active: false,
  velocity: null,
  total: null,
  dataIn: null,
  dataOut: null,
};

DeviceCard.propTypes = {
  device: PropTypes.object.isRequired,
  onHover: PropTypes.func,
  onLeaveHover: PropTypes.func,
  active: PropTypes.bool,
  velocity: PropTypes.number,
  total: PropTypes.number,
  dataIn: PropTypes.number,
  dataOut: PropTypes.number,
  chartConfig: PropTypes.object.isRequired,
};

export default shouldUpdate((props, nextProps) => {
  return props.active !== nextProps.active ||
    props.device !== nextProps.device;
})(DeviceCard);
