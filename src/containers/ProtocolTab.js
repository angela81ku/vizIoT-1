import React from 'react';
import {pushRealTimeProtocolTraffic} from '../actions/packetActions';
import {selectRealTimeProtocolTraffic} from '../selectors/packetSelector';
import {ProtocolCount, TopThreeIO, TopThreeProtocol} from '../socket/subscribe';
import LineGraphPage from './LineGraphPage';
import {resourceFactory} from '../Factories/ResourceFactory';
import {factFactory} from '../Factories/FactFactory';
import {getTopThreeIOData} from "../data/aggregators/TopThreeIOAggregator";
import {parseTop3IO, parseTop3Protocol} from "../data/api/packetApi";
import {fetcherFactory} from "../Factories/FetcherFactory";
import {fetchDeviceData} from "../data/api/devicesApi";
import {getDeviceProtocolData, getDevices} from "../data/aggregators/DeviceAggregator";
import {getTopThreeProtocolData} from "../data/aggregators/TopThreeProtocolAggregator";


export const ProtocolTab = ({}) => {

    const tcpFact = factFactory('TCP', 'white', true);
    const udpFact = factFactory('UDP', '#03cbac', true);
    const httpFact = factFactory('HTTP', '#d9b409', true);
    const dnsFact = factFactory('DNS', 'red', true);

    const facts = [tcpFact, udpFact, httpFact, dnsFact]

    const resources = resourceFactory(ProtocolCount, selectRealTimeProtocolTraffic, pushRealTimeProtocolTraffic)

    const individualGraphResources = resourceFactory(TopThreeProtocol, getTopThreeProtocolData, parseTop3Protocol)
    const deviceFetcher = fetcherFactory(fetchDeviceData, getDeviceProtocolData, 15000)

    resources.inUse = true;

    return (
        <LineGraphPage
            graphResource={resources}
            graphSocketOverride={true}
            individualGraphResource={individualGraphResources}
            individualGraphSize='device-large-chart'
            individualDeviceFetcher={deviceFetcher}
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