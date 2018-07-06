'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Flex from 'UIBean/Flex';
import FlexSize from 'UIBean/FlexSize';
import DeviceCard from '../components/device/DeviceCard';

import { selectDeviceList } from 'VizIoT/selectors/deviceSelectors';

const PageBackground = styled.div`
  background-image: linear-gradient(rgb(12, 26, 56) 3%, rgb(19, 24, 41));
  min-height: 500px; // page min height
  height: 100vh;
`;

const PageContent = styled.div`
  padding-top: 80px;
  padding-left: 80px;
  padding-right: 80px;
`;

const DeviceCardWrapper = styled(FlexSize)`
  display: inline-flex;
  justify-content: center;
  width: 100%;
`;

class DeviceOverview extends Component {
  static renderDevicesAsCards(
    devices,
    hoveredDevice,
    onCardHover,
    onCardLeaveHover
  ) {
    return devices.map(device => {
      const { id } = device;
      return (
        <DeviceCardWrapper
          key={id}
          size={{ xs: 12, sm: 12, md: 12, lg: 6, xl: 4, xxl: 4, xxxl: 3 }}
          space="m-bot-4"
        >
          <DeviceCard
            onHover={onCardHover(id)}
            onLeaveHover={onCardLeaveHover}
            active={hoveredDevice !== null && hoveredDevice !== id}
            device={device}
          />
        </DeviceCardWrapper>
      );
    });
  }

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

  state = {
    hoveredDevice: null,
  };

  render() {
    const { devices } = this.props;
    const { hoveredDevice } = this.state;
    return (
      <PageBackground>
        <PageContent>
          <Flex gutter={2}>
            {DeviceOverview.renderDevicesAsCards(
              devices,
              hoveredDevice,
              this.onCardHover,
              this.onCardLeaveHover
            )}
          </Flex>
        </PageContent>
      </PageBackground>
    );
  }
}

DeviceOverview.propTypes = {
  devices: PropTypes.array.isRequired,
};

const dummyDevices = [
  { id: 0, alias: 'Google Home Mini' },
  { id: 1, alias: 'Xiaomi' },
  { id: 2, alias: 'Echo-1' },
  { id: 3, alias: 'Philips' },
  { id: 4, alias: 'Name 4' },
  { id: 5, alias: 'Name 5' },
  { id: 6, alias: 'Name 6' },
];

export default connect(state => ({
  devices:
    (selectDeviceList(state).length && selectDeviceList(state)) || dummyDevices,
}))(DeviceOverview);
