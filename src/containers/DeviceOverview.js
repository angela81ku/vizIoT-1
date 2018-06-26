'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Flex from 'UIBean/Flex';
import BCard from 'UIBean/BCard';
import FlexSize from 'UIBean/FlexSize';
import H6 from 'UIBean/H6';

import { selectDeviceList } from 'VizIoT/selectors/deviceSelectors';
import { OFF_BLACK } from 'VizIoT/styles/base/viz-theme';

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

const DeviceCard = styled(BCard)`
  min-width: 260px;
  height: 160px;
  background-color: white;
  color: ${OFF_BLACK};
  border-radius: 14px;
`;

const DeviceName = styled(H6)`
  font-weight: 800;
  text-transform: uppercase;
`;

const DeviceCategory = styled(H6)`
  font-weight: 400;
  margin-bottom: 4px;
`;

const ConnectionsLabel = styled(H6)`
  color: ${OFF_BLACK} 
  font-weight: normal;
  text-align: center;
`;

const ConnectionsValue = styled.span`
  font-weight: 800;
`;

class DeviceOverview extends Component {
  static renderDevicesAsCards(devices) {
    return devices.map(({ id, alias }) => {
      return (
        <DeviceCardWrapper key={id} size={{ xs: 2 }} space="m-bot-3">
          <DeviceCard compact={false}>
            <Flex>
              <FlexSize padding={false}>
                <DeviceCategory>{'Voice Assistant'}</DeviceCategory>
                <DeviceName>{alias}</DeviceName>
              </FlexSize>
              <FlexSize padding={false} space="m-top-3">
                <ConnectionsLabel>
                  <ConnectionsValue>{id}</ConnectionsValue>
                  {' connections'}
                  <h6>Mostly visits google.com</h6>
                </ConnectionsLabel>
              </FlexSize>
            </Flex>
          </DeviceCard>
        </DeviceCardWrapper>
      );
    });
  }

  render() {
    const { devices } = this.props;
    return (
      <PageBackground>
        <PageContent>
          <BCard>
            <Flex gutter={2}>
              {DeviceOverview.renderDevicesAsCards(devices)}
            </Flex>
          </BCard>
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
