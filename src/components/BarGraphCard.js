import React from 'react'
import { connect } from 'react-redux'
import CardWrapper from './BeanUILibrary/CardWrapper'
import BarChart from './d3/BarChart'

class BarGraphCard extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {device, data, timerange} = this.props
    const {ip, port} = device
    const {start, end} = timerange
    const dimension = [16000, 200]
    return (
      <CardWrapper>
        <h4><strong>{ip}</strong>:{port}</h4>
        {/*<h5>{start.toString()}</h5>*/}
        {/*<h5>{end.toString()}</h5>*/}
        <div className="small-spacer"/>
        <BarChart
          data={data}
          startMoment={start}
          endMoment={end}
          dimension={dimension}/>
      </CardWrapper>
    )
  }
}

export default connect((state) => ({state}))(BarGraphCard)