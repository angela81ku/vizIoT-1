import React from 'react';
import { pushRealTimeIOTraffic, pushRealTimeIOMetricTraffic } from '../actions/packetActions';
import { selectRealTimeIOTraffic, selectRealTimeIOMetricTraffic } from '../selectors/packetSelector';
import { IOCount, IOMetric } from '../socket/subscribe';
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

    const metricResources = {
        apiSource: IOMetric,
        packetSelector: selectRealTimeIOMetricTraffic,
        packetPusher: pushRealTimeIOMetricTraffic,
    }

    return (
        <LineGraphPage
            graphResource={resources}
            metricResource={metricResources}
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