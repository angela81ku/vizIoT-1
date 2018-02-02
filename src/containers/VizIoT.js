import React from 'react'
import AppTitle from '../components/AppTitle'
import { connect } from 'react-redux'
import Grid from '../components/BeanUILibrary/Grid'
import GridItem from '../components/BeanUILibrary/GridItem'
import BarGraphCard from '../components/BarGraphCard'
import {
  selectAllDevices,
} from '../selectors/deviceSelectors'
import { fetchActionGetTestLogEvents } from '../actions/test'
import CardWrapper from '../components/BeanUILibrary/CardWrapper'
import DeviceList from '../components/DeviceList'
import moment from 'moment'
import { selectAggregateSample } from '../selectors/aggregateSampleSelector';

class VizIoT extends React.Component {
  state = {
    showDeviceList: true,
  }

  componentWillMount() {
    fetchActionGetTestLogEvents()
  }

  renderBarChartCards () {
    const { devices, aggregatedByTime } = this.props;

    const dataWindowSize = 60
    const xUnit = 'SECONDS'

    console.log('all aggregated data by time:');
    console.log(aggregatedByTime);

    return devices.map((device, i) => {
      const {ip, port} = device
      const deviceKey = `${ip}:${port}`
      console.log('Making chart for ${deviceKey}')

      let possibleLog = aggregatedByTime[deviceKey];
      const sourceData = (possibleLog && possibleLog.length !== 0) && possibleLog
      console.log('sourceData:')
      console.log(sourceData)

      let graphData = []
      if (sourceData && sourceData.length) {
        // Temporary Code for replaying old sourceData:
        const momentNow = moment()
        const momentFirst = sourceData[0].time_stamp
        const catchUpSeconds = momentNow.diff(momentFirst, 'seconds')
        console.log(`catchUpSeconds = ${catchUpSeconds}`)

        graphData = sourceData.map(({time_stamp, tally}) => {
          return {xData: time_stamp.clone().add(catchUpSeconds, 'seconds').toDate(), yData: tally}
        })
      }

      return (
        <GridItem
          key={deviceKey + i}
          size={{'xs': 12, 'md': 12, 'lg': 4}}
          space="p-bot-6">
          <BarGraphCard
            dataWindowSize={dataWindowSize}
            device={device}
            data={graphData} />
        </GridItem>
      );
    })
  }

  render () {
    const {devices} = this.props
    return (
      <div className="">
        <div className="tint-background">
          <div className="padded-container">
            <div className="medium-spacer"/>
            <AppTitle/>
            <div className="small-spacer"/>

            <Grid gutter={3}>
              <GridItem size={{'md': 12, 'lg': 3}}>
                <h6 className="wide-letter deviceList__title">DEVICES</h6>
                <CardWrapper noPadding={true}>
                  <DeviceList devices={devices}/>
                </CardWrapper>
              </GridItem>
              <GridItem size={{'md': 12, 'lg': 9}}>
                <h6 className="wide-letter deviceList__title">ACTIVITY<i className="material-icons">trending_up</i></h6>
                <Grid gutter={1}>
                  {this.renderBarChartCards()}
                </Grid>
              </GridItem>
            </Grid>
            <div className="large-spacer"/>
            <div className="large-spacer"/>
            <div className="large-spacer"/>
            <div className="large-spacer"/>
            <div className="large-spacer"/>
            <div className="large-spacer"/>
            <div className="large-spacer"/>
            <div className="large-spacer"/>
          </div>
        </div>
      </div>
    )
  }
}

VizIoT.propTypes = {

};

const mapStateToProps = (state) => {
  return {
    devices: selectAllDevices(state),
    aggregatedByTime: selectAggregateSample(state),
  }
}

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps)(VizIoT)
