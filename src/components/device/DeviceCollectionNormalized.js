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
import {parseTop3} from "../../data/api/packetApi";
import {useSocket} from "../BeanUILibrary/hooks/useSocket";
import {call} from "ramda";
import {transformData} from "../../data/processors/TransformGraphData";
import {findColors} from "../../utility/ColorUtility";

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
    const { devices, packets, chartConfig, graphColors } = this.props;

    // console.log(devices)
    // console.log(packets)
    // console.log(chartConfig)

    const aggregatedDevices = {};
    Object.keys(devices).forEach(device => {
      const deviceVals = devices[device];
      const {_id, macAddress, name, category, inTraffic, outTraffic, totalTraffic, velocity } = deviceVals;
      if (packets.hasOwnProperty(macAddress)) {
        const packetEntry = packets[macAddress]
        const data = packetEntry.data;

        aggregatedDevices[macAddress] = {
          _id: _id,
          macAddress: macAddress,
          name: name,
          category: category,
          data: data,
          inTraffic: inTraffic,
          outTraffic: outTraffic,
          totalTraffic: totalTraffic,
          velocity: velocity,
        }
      }

    })

    return (
      <Flex gutter={2} className="p-top-5">
        {Object.keys(aggregatedDevices).map( key => {
          const deviceVals = aggregatedDevices[key];
          const {_id, data, inTraffic, outTraffic, totalTraffic, velocity } = deviceVals;

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
                velocity={velocity}
                graphData={graphData}
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