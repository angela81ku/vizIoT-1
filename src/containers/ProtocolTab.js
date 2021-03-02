import React from 'react';
import {pushRealTimeProtocolTraffic} from '../actions/packetActions';
import {selectRealTimeProtocolTraffic} from '../selectors/packetSelector';
import {ProtocolCount} from '../socket/subscribe';
import LineGraphPage from './LineGraphPage';


export const ProtocolTab = ({}) => {

    const facts = [
        {
            title: 'TCP',
            color: 'white',
            isGraphed: true,
        },
        {
            title: 'UDP',
            color: '#03cbac',
            isGraphed: true,
        },
        {
            title: 'HTTP',
            color: '#d9b409',
            isGraphed: true,
        },
        {
            title: 'DNS',
            color: 'red',
            isGraphed: true,
        },
        {
            title: 'TCP',
            color: 'white',
            isGraphed: true,
        },
        {
            title: 'UDP',
            color: '#03cbac',
            isGraphed: true,
        },
        {
            title: 'HTTP',
            color: '#d9b409',
            isGraphed: true,
        },
        {
            title: 'DNS',
            color: 'red',
            isGraphed: true,
        }
    ]

    const resources = {
        apiSource: ProtocolCount,
        packetSelector: selectRealTimeProtocolTraffic,
        packetPusher: pushRealTimeProtocolTraffic,
    }

    return (
        <LineGraphPage
            graphResource={resources}
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