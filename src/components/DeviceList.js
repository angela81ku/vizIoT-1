import React from 'react';
import DeviceListItem from './DeviceListItem';
import moment from 'moment';
import BeanList from './BeanList';

export default class DeviceList extends React.Component {
  render() {
    const { devices, deviceToNumConnection, lastSeen } = this.props;
    return (
      <BeanList>
        {devices
          .filter(
            ({ macAddr }) =>
              lastSeen[macAddr] ? lastSeen.diff(moment()) > 1000 : true
          )
          .sort((a, b) => {
            return (
              deviceToNumConnection[b.macAddr] -
              deviceToNumConnection[a.macAddr]
            );
          })
          .map(device => {
            return (
              <DeviceListItem
                key={device.macAddr}
                device={device}
                testCount={deviceToNumConnection[device.macAddr]}
              />
            );
          })}
      </BeanList>
    );
  }
}
