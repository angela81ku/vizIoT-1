import React from 'react';
import { pushRealTimeIOTraffic } from '../actions/packetActions';
import { selectRealTimeIOTraffic } from '../selectors/packetSelector';
import { IOCount } from '../socket/subscribe';
import InOutTab from './LineGraphPage';


export const IOTab = ({}) => {

    const facts = [
        {
            title: 'Total',
            color: 'white',
            isVisible: false,
        },
        {
            title: 'Received',
            color: '#03cbac',
            isVisible: true,
        },
        {
            title: 'Sent',
            color: '#d9b409',
            isVisible: true,
        }
    ]

    return (
        <InOutTab
            apiSource={IOCount}
            packetSelector={selectRealTimeIOTraffic}
            packetPusher={pushRealTimeIOTraffic}
            facts={facts}
            pageTitle={'In/Out Traffic'}
            pageSubtitle={'View network in/out traffic in real time' }
            graphTitle={'Network Traffic'}
            chartTitle={'Network'}
            chartSubtitle={'BYTES / SEC'}
            legendTitle={'In/Out'}
        />
    )
}