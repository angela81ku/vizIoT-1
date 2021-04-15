import React from 'react';
import Flex, {JustifyContent} from 'UIBean/Flex';
import {connect} from 'react-redux';
import DataTable from 'UIBean/DataTable';
import FlexChild from 'UIBean/FlexChild';
import {requestRecentPackets} from 'VizIoT/actionsRequest/packetRequest';
import {selectRecentPackets} from 'VizIoT/selectors/packetSelector';

const DATA_REFRESH_DELAY_MS = 2000;

class LoggerContainer extends React.Component {

  componentWillMount() {
    const dataFetchLoop = setInterval(() => {
      requestRecentPackets({pastMS: 2000})
        .catch(console.error)
        .done();
    }, DATA_REFRESH_DELAY_MS);

    this.setState(() => ({dataFetchLoop}));
  }

  componentWillUnmount() {
    clearInterval(this.state.dataFetchLoop);
  }

  render() {
    const {packetData} = this.props;
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
            <DataTable headerData={tempHeaders} rowData={packetData}/>
          </FlexChild>
        </Flex>
      </div>
    );
  }
}

LoggerContainer.defaultProps = {
  packetData: [],
};

const mapStateToProps = state => {

  const recentPackets = selectRecentPackets(state) || [];

  // Put new packets into packetData array
  const packetData = recentPackets.reduce((acc, packet) => {
    const {src_ip, dst_ip, dst_mac, src_mac, dst_port, src_port, timestamp} = packet;
    const newKey = `${timestamp}${src_ip}`;

    if (acc.findIndex(({key}) => key === newKey) >= 0) {
      return acc;
    }

    const item = {key: newKey, time: timestamp.toString(), device: src_mac, dest: dst_mac, size: 'N/A'};
    const newAcc = acc;
    newAcc.push(item);
    return newAcc;
  }, []);

  return {
    packetData,
  };
};
export default connect(mapStateToProps)(LoggerContainer);
