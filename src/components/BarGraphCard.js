import React from 'react'
import { connect } from 'react-redux'
import CardWrapper from './BeanUILibrary/CardWrapper'
import BarChart from './d3/BarChart'

class BarGraphCard extends React.Component {
  constructor (props) {
    super(props)
  }

  state = {
    containerWidth: 300,
    containerHeight: 200,
  }

  fitChartToContainer = () => {
    this.setState(() => {
      return {
        containerWidth: this.chartContainer.getBoundingClientRect().width,
        containerHeight: this.chartContainer.getBoundingClientRect().height,
      }
    })
  }

  componentDidMount () {
    this.fitChartToContainer()
    window.addEventListener('resize', this.fitChartToContainer)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.fitChartToContainer)
  }

  render () {
    const {device, data, dataWindowSize} = this.props
    const {ip, port, alias} = device

    debugger
    const shouldRenderChart = this.state.containerWidth && this.state.containerHeight

    // const dimension = {width: 300, height: 200}
    return (
      <CardWrapper noBackground={true} noShadow={true}>
        <h6 className="barGraphCard__addr"><strong>{ip}</strong>:{port}</h6>
        <h4 className="barGraphCard__alias">{alias}</h4>
        {/*<h5>{start.toString()}</h5>*/}
        {/*<h5>{end.toString()}</h5>*/}
        <div className="small-spacer"/>
        <div
          ref={(el) => { this.chartContainer = el }}
          className={this.props.className}
        >
          {shouldRenderChart &&
          <BarChart
            data={data}
            dataWindowSize={dataWindowSize}
            dimension={{width: this.state.containerWidth, height: this.state.containerHeight}}
            margins={{left: 20, right: 20, top: 20, bottom: 20}}/>
          }
        </div>
      </CardWrapper>
    )
  }
}

export default connect((state) => ({state}))(BarGraphCard)