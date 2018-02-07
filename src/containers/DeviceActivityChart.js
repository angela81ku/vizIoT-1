import React from 'react'
import { connect } from 'react-redux'
import { getBucketKeyWithConfig } from '../utility/BucketUtility'
import { selectSingleAggregation } from '../selectors/aggregateSampleSelector'
import moment from 'moment'
import BarGraphCard from '../components/BarGraphCard'


class DeviceActivityChart extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { device, chartConfig: {dataWindowSize, bucketObjects}, data } = this.props;
    const {socketAddr, macAddr, alias} = device
    console.log(`Making chart for ${socketAddr} AKA ${macAddr} AKA ${alias}`)

    const sourceData = data
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
      <BarGraphCard
        dataWindowSize={dataWindowSize}
        device={device}
        data={graphData} />
    )
  }


}

export default connect((state, props) => {
  const {device: {macAddr}, chartConfig: {bucketConfig}} = props;
  return ({
    data: selectSingleAggregation(state, macAddr, getBucketKeyWithConfig(bucketConfig))
  })
})(DeviceActivityChart)