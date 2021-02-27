import React from 'react';
import { pushRealTimeProtocolTraffic } from '../actions/packetActions';
import { selectRealTimeProtocolTraffic } from '../selectors/packetSelector';
import { ProtocolCount } from '../socket/subscribe';
import InOutTab from './InOutTab';


export const ProtocolTab = ({}) => {

    const facts = [
        {
            title: 'TCP',
            color: 'white',
            isVisible: true,
        },
        {
            title: 'UDP',
            color: '#03cbac',
            isVisible: true,
        },
        {
            title: 'HTTP',
            color: '#d9b409',
            isVisible: true,
        },
        {
            title: 'DNS',
            color: 'red',
            isVisible: true,
        }
    ]

    return (
        <InOutTab
            apiSource={ProtocolCount}
            packetSelector={selectRealTimeProtocolTraffic}
            packetPusher={pushRealTimeProtocolTraffic}
            facts={facts}
            pageTitle={'Protocol Traffic'}
            pageSubtitle={'View network protocol traffic in real time' }
            graphTitle={'Network Traffic'}
            chartTitle={'Network'}
            chartSubtitle={'BYTES / SEC'}
            legendTitle={'Protocol'}
        />
    )
}