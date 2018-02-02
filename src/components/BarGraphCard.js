import React from 'react'
import { connect } from 'react-redux'
import CardWrapper from './BeanUILibrary/CardWrapper'
import BarChart from './d3/BarChart'

class BarGraphCard extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {device, data, dataWindowSize} = this.props
    const {ip, port, alias} = device
    const dimension = {width: 300, height: 200}
    return (
      <CardWrapper noBackground={true} noShadow={true}>
        <h6 className="barGraphCard__addr"><strong>{ip}</strong>:{port}</h6>
        <h4 className="barGraphCard__alias">{alias}</h4>
        {/*<h5>{start.toString()}</h5>*/}
        {/*<h5>{end.toString()}</h5>*/}
        <div className="small-spacer"/>
        <BarChart
          data={data}
          dataWindowSize={dataWindowSize}
          dimension={dimension}
          margins={{left: 20, right: 20, top: 20, bottom: 20}} />
      </CardWrapper>
    )
  }
}

export default connect((state) => ({state}))(BarGraphCard)