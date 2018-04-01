import React from 'react';
import DeviceListItem from './DeviceListItem';
import FlipMove from 'react-flip-move';
import moment from 'moment';

export default class DeviceList extends React.Component {
  render() {
    const { devices, deviceToNumConnection, lastSeen } = this.props;
    return (
      <div>
        <FlipMove duration={750} easing="ease-out">
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
        </FlipMove>
      </div>
    );
  }
}
