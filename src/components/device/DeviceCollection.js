'use es6';

import React, { Component } from 'react';
import styled from 'styled-components';
import { getIn } from 'immutable';

import Flex, { FlexDirection } from 'UIBean/Flex';
import FlexSize from 'UIBean/FlexSize';
import DataTable from 'UIBean/DataTable';
import { H6 } from 'UIBean/functional-css/TypographyStyles';

import DeviceCard from 'VizIoT/components/device/DeviceCard';
import { OFF_WHITE, TEXT, TRON } from 'VizIoT/styles/base/viz-theme';
import PropTypes from 'prop-types';
import SectionTitle from 'VizIoT/components/SectionTitle';
import * as R from 'ramda';

const StyledTable = styled(DataTable)`
  margin-bottom: 50px;

  & .ReactVirtualized__Table__rowColumn:nth-child(2) {
    font-weight: 600;
  }
  
  & > .ReactVirtualized__Table__headerRow {
    text-transform: initial;
    ${H6}
    font-weight: 300;
    color: ${OFF_WHITE};
  }
  
  & .ReactVirtualized__Grid__innerScrollContainer {
    overflow: visible !important;
  }
  
  & .ReactVirtualized__Table__Grid {
    overflow: visible !important;
  }
  
  & .ReactVirtualized__Table__row {
    // background: rgba(255, 255, 255, 0.05);
    ${H6}
    font-weight: 300;
    color: ${OFF_WHITE};
    // padding: 0 10px;
    box-sizing: border-box;
    // background: ${TRON}08;
   
    .ReactVirtualized__Table__rowColumn {
      line-height: initial;
    }
    
    &:hover {
      border: 2px solid ${TRON};
      color: ${TEXT};
      box-shadow: 0px 0px 43px ${TRON}59, 0px 0px 20px ${TRON}7a inset;
      background: ${TRON}42;
      margin: 0 -2px; /* this prevents shifting due to border */
      cursor: pointer;
    }
  }
  
  .ReactVirtualized__Table__rowColumn:first-child {
    color: ${OFF_WHITE};
  }
`;

const DeviceCardWrapper = styled(FlexSize)`
  display: inline-flex;
  justify-content: center;
  width: 100%;
  
  /* The element to apply the animation to */
  // & > div {
  //   animation-name: example;
  //   animation-duration: 2s;
  //   animation-iteration-count: infinite;
  //   animation-direction: alternate;
  // }
  
`;

const CustomRow = styled.div`
  ${({ index }) => index % 2 ? `background: ${TRON}08;` : `background: ${TRON}03;`}
`;

const deviceRowRenderer = ({
  className,
  columns,
  index,
  style,
  key
}) => {

  const a11yProps = {'aria-rowindex': index + 1};

  // debugger
  return (
    <CustomRow
      key={key}
      className={className}
      role="row"
      style={style}
      index={index}
      {...a11yProps}
    >
      {columns}
    </CustomRow>
  )
};

export default class DeviceCollection extends Component {

  state = {
    hoveredDevice: null,
  };

  onCardHover = id => e => {
    this.setState({
      hoveredDevice: id,
    });
  };

  onCardLeaveHover = e => {
    this.setState({
      hoveredDevice: null,
    });
  };

  static renderDevicesAsCards(
    devices,
    deviceToData,
    hoveredDevice,
    onCardHover,
    onCardLeaveHover,
  ) {
    return (
      <Flex gutter={2} className="p-top-5">
        {
          devices.map(device => {
            const { id } = device;
            const deviceData = deviceToData[id];
            const velocity = getIn(deviceData, ['velocity']);
            const total = getIn(deviceData, ['total']);
            const dataIn = getIn(deviceData, ['dataIn']);
            const dataOut = getIn(deviceData, ['dataOut']);

            return (
              <DeviceCardWrapper
                key={id}
                size={{ xs: 12, sm: 12, md: 12, lg: 6, xl: 4, xxl: 4, xxxl: 2 }}
                space="m-bot-4"
              >
                <DeviceCard
                  onHover={onCardHover(id)}
                  onLeaveHover={onCardLeaveHover}
                  active={hoveredDevice !== null && hoveredDevice !== id}
                  device={device}
                  velocity={velocity}
                  total={total}
                  dataIn={dataIn}
                  dataOut={dataOut}
                />
              </DeviceCardWrapper>
            );
          })
        }
      </Flex>
    );
  };

  static renderDevicesAsList(devices, deviceToData) {

    const headerData = [
      {label: '', key: 'starred', width: 20},
      {label: 'Name', key: 'name', width: 192},
      {label: 'Packets', key: 'total', width: 72},
      {label: 'In', key: 'dataIn', width: 72},
      {label: 'Out', key: 'dataOut', width: 72},
      {label: 'Velocity', key: 'velocity', width: 160}
    ];

    const width = R.compose(R.sum, R.map(({ width }) => width))(headerData);

    const rowData = devices.reduce((acc, device) => {
      const { id, name } = device;
      const { total, dataIn, dataOut, velocity } = deviceToData[id];

      const item = {
        key: id,
        name,
        total,
        dataIn,
        dataOut,
        velocity,
      };
      return [
        ...acc,
        item,
      ];
    }, []);

    const list = (
      <StyledTable headerData={headerData}
                   rowData={rowData}
                   headerHeight={41}
                   rowHeight={41}
                   height={41 * (rowData.length + 1)}
                   width={width}
                   rowRenderer={deviceRowRenderer}
      />
    );

    return (
      <Flex className="p-top-5" direction={FlexDirection.COLUMN}>
        <SectionTitle size={'sm'} title={'VOICE ASSISTANT'} cardPadding={false} />
        {list}
        <SectionTitle size={'sm'} title={'APPLIANCES'} cardPadding={false} />
        {list}
        <SectionTitle size={'sm'} title={'ACTUATORS'} cardPadding={false} />
        {list}
      </Flex>
    )
  }

  render() {
    const { hoveredDevice } = this.state;
    const { mode, devices, deviceToData } = this.props;

    if (mode === 'CARD') {
      return DeviceCollection.renderDevicesAsCards(
        devices,
        deviceToData,
        hoveredDevice,
        this.onCardHover,
        this.onCardLeaveHover,
      );
    } else if (mode === 'LIST') {
      return DeviceCollection.renderDevicesAsList(devices, deviceToData);
    }
    return null;
  }
}

DeviceCollection.propTypes = {
  devices: PropTypes.array.isRequired,
  deviceToData: PropTypes.objectOf({
    velocity: PropTypes.number,
    total: PropTypes.number,
  }),
  mode: PropTypes.oneOf('CARD', 'LIST'),
};

DeviceCollection.defaultProps = {
  devices: [],
  deviceToData: {},
  mode: 'LIST',
};
