import React from 'react'
import AppTitle from '../components/AppTitle'
import { connect } from 'react-redux'
import Grid from '../components/BeanUILibrary/Grid'
import GridItem from '../components/BeanUILibrary/GridItem'
import { selectAllDevices } from '../selectors/deviceSelectors'
import { fetchAggregationForDevice } from '../actions/test'
import { fetchDevices } from '../actions/deviceActions'
import CardWrapper from '../components/BeanUILibrary/CardWrapper'
import DeviceList from '../components/DeviceList'
import PropTypes from 'prop-types'
import DeviceActivityChart from './DeviceActivityChart'
import { API_REQ_RECORDS } from '../constants/RequestConstants'

class VizIoT extends React.Component {
  state = {
    showDeviceList: true,
    chartConfig: {
      bucketConfig: {
        bucketSize: 1,
        bucketProps: ['ACTIVITY_COUNT'],
        bucketUnit: 'SECOND'
      },
      dataWindowSize: 60,
    },
    networkId: 42,
  }

  componentWillMount () {
    fetchDevices().then(() => {
      const {devices} = this.props
      const {chartConfig: {bucketConfig}, networkId} = this.state;
      const startMS = "1517967550000";
      const endMS = "1517967570000";
      devices.forEach(({macAddr}) => {
        fetchAggregationForDevice(macAddr, new API_REQ_RECORDS.aggregateDataByTime({
          forNetwork: networkId,
          forDevice: macAddr,
          ...bucketConfig,
          startMS,
          endMS,
        }), bucketConfig)
      })
    })
  }

  renderBarChartCards () {
    const {devices} = this.props
    const {chartConfig} = this.state

    return devices.map((d) => {
      return (
        <GridItem
          key={d.macAddr}
          size={{'xs': 12, 'md': 12, 'lg': 4}}
          space="p-bot-6">
          <DeviceActivityChart
            device={d}
            chartConfig={chartConfig} />
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

VizIoT.propTypes = {
  devices: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => {
  return {
    devices: selectAllDevices(state),
  }
}

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps)(VizIoT)
