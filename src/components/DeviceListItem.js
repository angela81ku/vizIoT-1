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
    const {socketAddr, alias, lastSeen} = device

    return (
      <div className="deviceListItem__wrapper">
        <Grid>
          <div className="deviceListItem__deviceInfo">
            {socketAddr}
            <h6 className='deviceListItem__deviceName'>
              {alias}
            </h6>
            {moment.unix(lastSeen / 1000.0).format('MMM Do YYYY, h:mm:ss a')}
          </div>
          <div className="deviceListItem__countWrapper flex-center-parent">
            <div>
              <h4 className="deviceListItem__count m-right-1">
                {testCount}
              </h4>
              <span>Requests</span>
            </div>
          </div>
        </Grid>
      </div>
    )
  }

}