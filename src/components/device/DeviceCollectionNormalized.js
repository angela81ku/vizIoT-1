'use es6';

import React, { Component } from 'react';
import styled from 'styled-components';

import Flex, { FlexDirection } from 'UIBean/Flex';
import FlexSize from 'UIBean/FlexSize';

import DeviceCard from 'VizIoT/components/device/DeviceCard';
import PropTypes from 'prop-types';
import moment from 'moment';
import {connect} from "react-redux";
import { TopThree } from '../../socket/subscribe'
import {parseTop3IO} from "../../data/api/packetApi";
import {useSocket} from "../BeanUILibrary/hooks/useSocket";
import {call} from "ramda";
import {transformData} from "../../data/processors/TransformGraphData";
import {findColors} from "../../utility/ColorUtility";

const DeviceCardWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  margin-right: 10px;
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
    const { devices, packets, chartConfig, graphColors, graphSize } = this.props;

    // console.log(devices)
    // console.log(packets)
    // console.log(chartConfig)

    const aggregatedDevices = {};
    Object.keys(devices).forEach(device => {
      const deviceVals = devices[device];
      const {_id, macAddress, name, category, dataStreams, velocity } = deviceVals;
      if (packets.hasOwnProperty(macAddress)) {
        const packetEntry = packets[macAddress]
        const data = packetEntry.data;

        aggregatedDevices[macAddress] = {
          _id: _id,
          macAddress: macAddress,
          name: name,
          category: category,
          data: data,
          velocity: velocity,
          dataStreams: dataStreams,
        }
      }

    })

    return (
      <Flex gutter={2} className="p-top-5" >
        {Object.keys(aggregatedDevices).map( key => {
          const deviceVals = aggregatedDevices[key];
          const {_id, data, dataStreams, velocity } = deviceVals;
          
          const graphData = transformData(data);

          let colors = graphColors;
          if (colors === undefined || colors.length === 0 && graphData.length && graphData.length > 0) {
            if (graphData[0].length) {
              colors = findColors(graphData[0].length)
            } else {
              colors = findColors(1);
            }
          }

          return (
            <DeviceCardWrapper
              key={_id}
              space="m-bot-4"
            >
              <DeviceCard
                onHover={this.onCardHover(_id)}
                onLeaveHover={this.onCardLeaveHover}
                active={hoveredDevice !== null && hoveredDevice !== _id}
                device={deviceVals}
                dataStreams={dataStreams}
                velocity={velocity}
                graphData={graphData}
                graphSize={graphSize}
                chartConfig={chartConfig}
                graphColors={colors}
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
  deviceCollector: PropTypes.func.isRequired,
  packetCollector: PropTypes.func.isRequired,
  devices: PropTypes.object.isRequired,
  chartConfig: PropTypes.object.isRequired,
  graphSize: PropTypes.string,
  graphColors: PropTypes.array,
};

const mapStateToProps = (state, props) => {

  const deviceData = props.deviceCollector();
  const packetData = props.packetCollector();

  return {
    devices: deviceData,
    packets: packetData,
    chartConfig: props.chartConfig
  };
}

export default connect(mapStateToProps)(DeviceCollectionNormalized);

// when to update:
// after fetching, if devices are same, do not update
// when samples change, update