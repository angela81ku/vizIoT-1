import React from 'react'
import AppTitle from '../components/AppTitle'
import { connect } from 'react-redux'
import Grid from '../components/BeanUILibrary/Grid'
import GridItem from '../components/BeanUILibrary/GridItem'
import BarGraphCard from '../components/BarGraphCard'
import { selectAllDevices } from '../selectors/deviceSelectors'
import { fetchActionGetTestLogEvents } from '../actions/test'
import { fetchDevices } from '../actions/deviceActions'
import CardWrapper from '../components/BeanUILibrary/CardWrapper'
import DeviceList from '../components/DeviceList'
import moment from 'moment'
import { selectAllAggregations } from '../selectors/aggregateSampleSelector'
import PropTypes from 'prop-types'
import { getBucketKey } from '../utility/BucketUtility'
import { getIn } from 'immutable'

class VizIoT extends React.Component {
  state = {
    showDeviceList: true,
    chartConfig: {
      bucketSize: 1,
      bucketUnit: 'SECOND',
      bucketObjects: ['COUNT'],
      dataWindowSize: 60,
    }
  }

  componentWillMount () {
    fetchDevices().then(() => {
      const {devices} = this.props
      devices.forEach(({macAddr}) => {
        fetchActionGetTestLogEvents(macAddr)
      })
    })
  }

  renderBarChartCards () {
    const {devices, mapDeviceToData} = this.props
    const {chartConfig: {bucketUnit, bucketSize, bucketObjects, dataWindowSize}} = this.state

    return devices.map((d) => {
      const {socketAddr, macAddr, alias} = d
      console.log(`Making chart for ${socketAddr} AKA ${macAddr} AKA ${alias}`)

      const sourceData = getIn(mapDeviceToData, [macAddr, getBucketKey(bucketUnit, bucketSize, bucketObjects)], [])
      console.log('sourceData:')
      console.log(sourceData)

      let graphData = []
      if (sourceData && sourceData.length) {
        // Temporary Code for replaying old sourceData:
        const momentNow = moment()
        const momentFirst = moment.unix(sourceData[0].time_stamp)
        const catchUpSeconds = momentNow.diff(momentFirst, 'seconds')
        console.log(`catchUpSeconds = ${catchUpSeconds}`)

        graphData = sourceData.map(({time_stamp, [bucketObjects[0]]: yData}) => {
          return {xData: moment.unix(time_stamp).add(catchUpSeconds, 'seconds').toDate(), yData}
        })
      }

      return (
        <GridItem
          key={macAddr}
          size={{'xs': 12, 'md': 12, 'lg': 4}}
          space="p-bot-6">
          <BarGraphCard
            dataWindowSize={dataWindowSize}
            device={d}
            data={graphData}/>
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
  mapDeviceToData: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    devices: selectAllDevices(state),
    mapDeviceToData: selectAllAggregations(state),
  }
}

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps)(VizIoT)
