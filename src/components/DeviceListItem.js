import React from 'react';
import Grid from './BeanUILibrary/Grid';
import moment from 'moment';
import CardWrapper from './BeanUILibrary/CardWrapper';
import TruncateString from './BeanUILibrary/TruncateString';

export default class DeviceListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { device, testCount } = this.props;
    const { macAddr, alias, lastSeen } = device;

    return (
      <CardWrapper className="deviceListItem__wrapper m-bot-3" noPadding={true}>
        <Grid>
          <div className="deviceListItem__deviceInfo">
            {macAddr}
            <h6 className="deviceListItem__deviceName m-top-1">
              {alias ? alias : macAddr}
            </h6>
            {lastSeen
              ? moment.unix(lastSeen / 1000.0).format('MMM Do YYYY, h:mm:ss a')
              : 'Unknown last seen'}
          </div>
          <div className="deviceListItem__countWrapper flex-center-parent">
            <div>
              <TruncateString className="deviceListItem__count m-right-1">
                {testCount}
              </TruncateString>
              <span>msg</span>
            </div>
          </div>
        </Grid>
      </CardWrapper>
    );
  }
}
