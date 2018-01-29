import React from 'react';
import DeviceListItem from './DeviceListItem'

export default class DeviceList extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {devices} = this.props
    return (
      <div>
        {
          devices.map((device) => {
            return (
              <DeviceListItem key={device.deviceKey} device={device} testCount={10}/>
            )
          })
        }
      </div>
    )
  }
}