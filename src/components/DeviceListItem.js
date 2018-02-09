import React from 'react'
import Grid from './BeanUILibrary/Grid'
import GridItem from './BeanUILibrary/GridItem'
import moment from 'moment'
import CardWrapper from './BeanUILibrary/CardWrapper'

export default class DeviceListItem extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {device, testCount} = this.props
    const {macAddr, alias, lastSeen} = device

    return (
      <CardWrapper className="deviceListItem__wrapper m-bot-4" noPadding={true}>
        <Grid>
          <div className="deviceListItem__deviceInfo">
            {macAddr}
            <h6 className='deviceListItem__deviceName m-top-1'>
              {alias}
            </h6>
            {moment.unix(lastSeen / 1000.0).format('MMM Do YYYY, h:mm:ss a')}
          </div>
          <div className="deviceListItem__countWrapper flex-center-parent">
            <div>
              <h4 className="deviceListItem__count m-right-1">
                {testCount}
              </h4>
              <span>REQUESTS</span>
            </div>
          </div>
        </Grid>
      </CardWrapper>
    )
  }

}