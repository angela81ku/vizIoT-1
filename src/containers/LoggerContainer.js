import React from 'react';
import Flex, { JustifyContent } from 'UIBean/Flex';
import FlexSize from 'UIBean/FlexSize';
import { connect } from 'react-redux';
import BubbleChart from 'VizIoT/components/d3/BubbleChart';
import { SPACING } from 'VizIoT/data/records/Spacing';
import AutoFitComponent from 'VizIoT/components/AutoFitComponent';
import BucketUnitConstants from 'VizIoT/constants/BucketUnit';
// import FlexWrapper from 'UIBean/FlexWrapper';
import { analyzeAggregationByDomain } from 'VizIoT/actions/analyzeActions';
import { selectDomainsToday } from 'VizIoT/selectors/analyticsSelector';
import { DateConstants } from 'VizIoT/constants/DateConstants';
import { convertDateTypeToString } from 'VizIoT/utility/TimeUtility';
import DataTable from 'UIBean/DataTable';
import FlexChild from 'UIBean/FlexChild';
import { requestRecentPackets } from 'VizIoT/actions/packetActions';
import { selectRecentPackets } from 'VizIoT/selectors/packetSelector';

const DATA_REFRESH_DELAY_MS = 2000;

class LoggerContainer extends React.Component {

  componentWillMount() {
    const dataFetchLoop = setInterval(() => {
      requestRecentPackets({ pastMS: 2000 });
    }, DATA_REFRESH_DELAY_MS);

    this.setState(() => ({
      dataFetchLoop: dataFetchLoop,
    }));
  }

  componentWillUnmount() {
    clearInterval(this.state.dataFetchLoop);
  }

  state = {
    packetData: [],
  };

  componentWillReceiveProps({ recentPackets }) {
    // Put new packets into packetData array
    const newData = recentPackets.reduce((acc, packet) => {
      const { src_ip, dst_ip, dst_mac, src_mac, dst_port, src_port, timestamp } = packet;
      const newKey = `${timestamp}${src_ip}`;

      if (acc.findIndex(({ key }) => key === newKey) >= 0) {
        console.log(`skipping ${newKey}`);
        return acc;
      }

      const item = { key: newKey, time: timestamp.toString(), device: src_mac, dest: dst_mac, size: 'N/A'};
      const newAcc = acc;
      newAcc.unshift(item);
      return newAcc;
    }, this.state.packetData);
    console.log(newData);
    this.setState({
      packetData: newData,
    });
  }

  render() {
    const tempHeaders = [
      {label: 'Time', key: 'time', width: 133},
      {label: 'Device', key: 'device', width: 210},
      {label: 'Destination', key: 'dest', width: 270},
      {label: 'Bytes', key: 'size', width: 95}
    ];

    return (
      <div className="location-bubble-tab">
        <Flex gutter={3} justifyContent={JustifyContent.CENTER}>
          <FlexChild>
            <DataTable headerData={tempHeaders} rowData={this.state.packetData}/>
          </FlexChild>
        </Flex>
      </div>
    );
  }
}

LoggerContainer.defaultProps = {};

const mapStateToProps = state => {
  return {
    recentPackets: selectRecentPackets(state),
  };
};
export default connect(mapStateToProps)(LoggerContainer);
