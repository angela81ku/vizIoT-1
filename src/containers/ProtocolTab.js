import React from 'react';
import { pushRealTimeProtocolTraffic } from '../actions/packetActions';
import { selectRealTimeProtocolTraffic } from '../selectors/packetSelector';
import { ProtocolCount } from '../socket/subscribe';
import InOutTab from './InOutTab';


export const ProtocolTab = ({}) => {

    const facts = [
        'TCP', 'UDP', 'HTTP', 'DNS'
    ]

    return (
        <InOutTab
            apiSource={ProtocolCount}
            packetSelector={selectRealTimeProtocolTraffic}
            packetPusher={pushRealTimeProtocolTraffic}
            displayFacts={facts}
            numberOfStreams={4}
            lineColors={[ 'white', '#03cbac', '#d9b409', 'red']}
            displayStreams={[0, 1, 2, 3]}
            pageTitle={'Protocol Traffic'}
            pageSubtitle={'View network protocol traffic in real time' }
            graphTitle={'Network Traffic'}
            chartTitle={'Network'}
            chartSubtitle={'BYTES / SEC'}
            legendTitle={'Protocol'}
        />
    )
}