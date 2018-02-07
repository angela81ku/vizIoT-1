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
    const { device, chartConfig: {dataWindowSize, bucketConfig: {bucketProps} }, data } = this.props;
    const {socketAddr, macAddr, alias} = device
    console.log(`Making chart for ${socketAddr} AKA ${macAddr} AKA ${alias}`)

    const sourceData = data
    console.log('sourceData:')
    console.log(sourceData)

    let graphData = []
    if (sourceData && sourceData.length) {
      // Temporary Code for replaying old sourceData:
      const momentNow = moment()
      const momentFirst = moment(sourceData[0].timestampMS)
      const catchUpSeconds = momentNow.diff(momentFirst, 'seconds')
      console.log(`catchUpSeconds = ${catchUpSeconds}`)

      graphData = sourceData.map(({timestampMS, [bucketProps[0]]: yData}) => {
        return {xData: moment(timestampMS).add(catchUpSeconds, 'seconds').toDate(), yData}
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