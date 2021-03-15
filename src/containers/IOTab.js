import React from 'react';
import { pushRealTimeIOTraffic, pushRealTimeIOMetricTraffic } from '../actions/packetActions';
import { selectRealTimeIOTraffic, selectRealTimeIOMetricTraffic } from '../selectors/packetSelector';
import {IOCount, IOMetric, TopThreeIO} from '../socket/subscribe';
import LineGraphPage from './LineGraphPage';
import {factFactory} from '../Factories/FactFactory';
import {resourceFactory} from '../Factories/ResourceFactory';
import {getTopThreeIOData} from "../data/aggregators/TopThreeIOAggregator";
import {parseTop3IO} from "../data/api/packetApi";
import {fetcherFactory} from "../Factories/FetcherFactory";
import {fetchDeviceData} from "../data/api/devicesApi";
import {getDeviceIOData, getDevices} from "../data/aggregators/DeviceAggregator";


export const IOTab = ({}) => {

    const totalFact = factFactory('Total', 'white', false);
    const receivedFact = factFactory('Received', '#03cbac', true);
    const sentFact = factFactory('Sent', '#d9b409', true);

    const facts = [totalFact, receivedFact, sentFact]

    const graphResources = resourceFactory(IOCount, selectRealTimeIOTraffic, pushRealTimeIOTraffic)
    const metricResources = resourceFactory(IOMetric, selectRealTimeIOMetricTraffic, pushRealTimeIOMetricTraffic)
    const individualGraphResources = resourceFactory(TopThreeIO, getTopThreeIOData, parseTop3IO)
    const deviceFetcher = fetcherFactory(fetchDeviceData, getDeviceIOData, 15000)

    // console.log(individualGraphResources)

    // TODO: Debug overrides -- without specifying overrides, sockets are being called twice after ~6 packet collections
    return (
        <LineGraphPage
            graphResource={graphResources}
            graphSocketOverride={true}
            metricResource={metricResources}
            metricSocketOverride={true}
            individualGraphResource={individualGraphResources}
            individualGraphSize='device-medium-chart'
            individualDeviceFetcher={deviceFetcher}
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