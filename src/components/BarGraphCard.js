import React from 'react'
import { connect } from 'react-redux'
import CardWrapper from './BeanUILibrary/CardWrapper'
import BarChart from './d3/BarChart'

class BarGraphCard extends React.Component {
  BarGraphCard (props) {
    this.props = props
  }

  render () {
    const { device, data , timerange} = this.props;
    const { ip, port } = device;
    const { start, end } = timerange;
    const size = [16000, 300];
    return (
      <CardWrapper>
        <h4><strong>{ip}</strong>:{port}</h4>
        <h3>From: {start.toString()} To: {end.toString()}</h3>
        <div className="medium-spacer"/>
        <BarChart data={data} size={size}/>
        <div className="medium-spacer"/>
      </CardWrapper>
    )
  }
}
export default connect((state)=> ({state}))(BarGraphCard)