import React from 'react';
import { pushRealTimeIOTraffic } from '../actions/packetActions';
import { selectRealTimeIOTraffic } from '../selectors/packetSelector';
import { IOCount } from '../socket/subscribe';
import LineGraphPage from './LineGraphPage';


export const IOTab = ({}) => {

    const facts = [
        {
            title: 'Total',
            color: 'white',
            isGraphed: false,
        },
        {
            title: 'Received',
            color: '#03cbac',
            isGraphed: true,
        },
        {
            title: 'Sent',
            color: '#d9b409',
            isGraphed: true,
        }
    ]

    const resources = {
        apiSource: IOCount,
        packetSelector: selectRealTimeIOTraffic,
        packetPusher: pushRealTimeIOTraffic,
    }

    return (
        <LineGraphPage
            graphResource={resources}
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