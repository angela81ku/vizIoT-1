import React from 'react';
import { pushRealTimeIOTraffic, pushRealTimeIOMetricTraffic } from '../actions/packetActions';
import { selectRealTimeIOTraffic, selectRealTimeIOMetricTraffic } from '../selectors/packetSelector';
import { IOCount, IOMetric } from '../socket/subscribe';
import LineGraphPage from './LineGraphPage';
import {factFactory} from '../Factories/FactFactory';
import {resourceFactory} from '../Factories/ResourceFactory';


export const IOTab = ({}) => {

    const totalFact = factFactory('Total', 'white', false);
    const receivedFact = factFactory('Received', '#03cbac', true);
    const sentFact = factFactory('Sent', '#d9b409', true);

    const facts = [totalFact, receivedFact, sentFact]

    const graphResources = resourceFactory(IOCount, selectRealTimeIOTraffic, pushRealTimeIOTraffic)
    const metricResources = resourceFactory(IOMetric, selectRealTimeIOMetricTraffic, pushRealTimeIOMetricTraffic)

    // TODO: Debug overrides -- without specifying overrides, sockets are being called twice after ~6 packet collections
    return (
        <LineGraphPage
            graphResource={graphResources}
            graphSocketOverride={true}
            metricResource={metricResources}
            metricSocketOverride={true}
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