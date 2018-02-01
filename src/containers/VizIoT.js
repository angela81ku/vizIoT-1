import React from 'react'
import AppTitle from '../components/AppTitle'
import { connect } from 'react-redux'
import Grid from '../components/BeanUILibrary/Grid'
import GridItem from '../components/BeanUILibrary/GridItem'
import BarGraphCard from '../components/BarGraphCard'
import {
  selectAllDevices, selectAllLogsAsMap, selectAllLogsAsRequestsPerSecond,
  selectAllTimeranges
} from '../selectors/logEventSelector'
import { actionGetTestLogEvents, fetchActionGetTestLogEvents } from '../actions/test'
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

  createDummyData() {
    const toReturn = [];
    const curTime = moment();
    for (let i = 0; i < 100; i++) {
      toReturn.push({ time_stamp: curTime.clone().add(i, 'seconds'), tally: 0 })
    }
    return toReturn;
  }

  renderBarChartCards () {
    return this.props.devices.map((device, i) => {
      const {ip, port} = device
      const deviceKey = `${ip}:${port}`
      console.log(`deviceKey = ${deviceKey}`)

      console.log("this.props.histogramLogs");
      console.log(this.props.histogramLogs);
      let possibleLog = this.props.histogramLogs[deviceKey];
      const thisHistData = (possibleLog && possibleLog.length !== 0) ? possibleLog : this.createDummyData()
      const thisTimerange = {start: moment(), end: moment().add(30, 'seconds')}
      console.log('thisHistData')
      console.log(thisHistData)
      console.log('thisTR')
      console.log(thisTimerange)

      const momentNow = moment()
      const momentFirst = thisHistData[0].time_stamp
      const catchUpSeconds = momentNow.diff(momentFirst, 'seconds')
      console.log(`catchUpSeconds = ${catchUpSeconds}`)

      return (
        <GridItem
          key={deviceKey + i}
          size={{'xs': 12, 'md': 12, 'lg': 4}}
          space="p-bot-6">
          <BarGraphCard
            timerange={thisTimerange}
            device={device}
            data={thisHistData.map(({time_stamp, tally}) => {
              return {xData: time_stamp.clone().add(catchUpSeconds, 'seconds').toDate(), yData: tally}
            })
            }/>
        </GridItem>
      )
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

const mapStateToProps = (state) => {
  return {
    devices: selectAllDevices(state),
    histogramLogs: selectAggregateSample(state),
    timeranges: selectAllTimeranges(state),
  }
}

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps, {fetchActionGetTestLogEvents})(VizIoT)
