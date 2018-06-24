'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Grid from 'UIBean/Grid';
import BCard from 'UIBean/BCard';
import GridItem from 'UIBean/GridItem';
import styled from 'styled-components';
import { selectDeviceList } from '../selectors/deviceSelectors';
import { OFF_BLACK } from '../styles/base/viz-theme';

const PageBackground = styled.div`
  background-image: linear-gradient(rgb(12, 26, 56) 3%, rgb(19, 24, 41));
  min-height: 500px; // page min height
  height: 100vh;
`;

const PageContent = styled.div`
  padding-top: 80px;
`;

const DeviceCardWrapper = styled(GridItem)`
  display: inline-flex;
  justify-content: center;
  width: 100%;
`;

const DeviceCard = styled(BCard)`
  min-width: 260px;
  height: 140px;
  background-color: white;
  color: ${OFF_BLACK};
  border-radius: 14px;
`;

const DeviceName = styled.div`
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
`;

const DeviceCategory = styled.div`
  font-size: 12px;
  font-weight: 400;
  margin-top: 4px;
`;

class DeviceOverview extends Component {
  static renderDevicesAsCards(devices) {
    return devices.map(({ id, alias }) => {
      return (
        <DeviceCardWrapper key={id} size={{ xs: 2 }} space="m-bot-3">
          <DeviceCard>
            <Grid>
              <GridItem>
                <DeviceName>{alias}</DeviceName>
                <DeviceCategory>{'Voice Assistant'}</DeviceCategory>
              </GridItem>
              <GridItem>{`hello world ${id}`}</GridItem>
            </Grid>
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
            <Grid gutter={3}>
              {DeviceOverview.renderDevicesAsCards(devices)}
            </Grid>
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
  { id: 1, alias: 'Name 1' },
  { id: 2, alias: 'Name 2' },
  { id: 3, alias: 'Name 3' },
  { id: 4, alias: 'Name 4' },
  { id: 5, alias: 'Name 5' },
  { id: 6, alias: 'Name 6' },
];
export default connect(state => ({
  devices:
    (selectDeviceList(state).length && selectDeviceList(state)) || dummyDevices,
}))(DeviceOverview);
