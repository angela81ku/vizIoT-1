import React from 'react'
import Grid from './BeanUILibrary/Grid'
import GridItem from './BeanUILibrary/GridItem'
import moment from 'moment'

export default class DeviceListItem extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {device, testCount} = this.props
    const {deviceKey, alias, lastSeen} = device

    return (
      <div className="deviceListItem__wrapper">
        <Grid>
          <div className="deviceListItem__deviceInfo">
            {deviceKey}
            <h6 className='deviceListItem__deviceName'>
              {alias}
            </h6>
            {moment.unix(lastSeen / 1000.0).format('MMM Do YYYY, h:mm:ss a')}
          </div>
          <div className="deviceListItem__countWrapper flex-center-parent">
            <h4 className="deviceListItem__count">
              {testCount}
            </h4>
            <div>
              Requests
            </div>
            <div>
              Today
            </div>
          </div>
        </Grid>
      </div>
    )
  }

}