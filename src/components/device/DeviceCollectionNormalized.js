'use es6';

import React, { Component } from 'react';
import styled from 'styled-components';

import Flex, { FlexDirection } from 'UIBean/Flex';
import FlexSize from 'UIBean/FlexSize';

import DeviceCard from 'VizIoT/components/device/DeviceCard';
import PropTypes from 'prop-types';
import moment from 'moment';
import {connect} from "react-redux";
import chartConfig from "../../reducers/chartConfig";

const DeviceCardWrapper = styled(FlexSize)`
  display: inline-flex;
  justify-content: center;
  width: 100%;
  
`;

class DeviceCollectionNormalized extends Component {

  // shouldComponentUpdate(prevProps, s, c) {
  // }

  state = {
    hoveredDevice: null,
    devices: null,
  };

  onCardHover = id => e => {
    this.setState({
      hoveredDevice: id,
    });
  };

  onCardLeaveHover = e => {
    this.setState({
      hoveredDevice: null,
    });
  };

  mockSet = () => {
    this.setState({})
  }

  render() {
    const { hoveredDevice } = this.state;
    const { devices, chartConfig } = this.props;

    setTimeout(this.mockSet.bind(this), 500)

    return (
      <Flex gutter={2} className="p-top-5">
        {Object.keys(devices).map( key => {
          const deviceVals = devices[key];
          const {_id, data, inTraffic, outTraffic, totalTraffic } = deviceVals;

          let graphData = [];
          if (data && data.length) {
            const catchUpSeconds = 0;
            graphData = data.map(({startMS, size: yData}) => {
              return {
                xData: moment
                  .unix(startMS / 1000.0)
                  .add(catchUpSeconds, 'seconds')
                  .toDate(),
                yData,
              };
            });
          }

          const graphDataNested = [graphData]

          // console.log(graphData)
          // console.log(chartConfig)

          return (
            <DeviceCardWrapper
              key={_id}
              size={{xs: 12, sm: 12, md: 12, lg: 6, xl: 4, xxl: 4, xxxl: 2}}
              space="m-bot-4"
            >
              <DeviceCard
                onHover={this.onCardHover(_id)}
                onLeaveHover={this.onCardLeaveHover}
                active={hoveredDevice !== null && hoveredDevice !== _id}
                device={deviceVals}
                dataIn={inTraffic}
                dataOut={outTraffic}
                total={totalTraffic}
                graphData={graphData}
                chartConfig={chartConfig.chartConfig}
              />
            </DeviceCardWrapper>
          );
        })
        }
      </Flex>
    );
  }
}

DeviceCollectionNormalized.propTypes = {
  dataCollector: PropTypes.func.isRequired,
  devices: PropTypes.object.isRequired,
  chartConfig: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => {

  const data = props.dataCollector();

  return {
    devices: data,
    chartConfig: props.chartConfig
  };
}

export default connect(mapStateToProps)(DeviceCollectionNormalized);

// when to update:
// after fetching, if devices are same, do not update
// when samples change, update