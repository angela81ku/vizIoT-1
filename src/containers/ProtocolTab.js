import React from 'react';
import {pushRealTimeProtocolTraffic} from '../actions/packetActions';
import {selectRealTimeProtocolTraffic} from '../selectors/packetSelector';
import {ProtocolCount} from '../socket/subscribe';
import LineGraphPage from './LineGraphPage';
import {resourceFactory} from '../Factories/ResourceFactory';
import {factFactory} from '../Factories/FactFactory';


export const ProtocolTab = ({}) => {

    const tcpFact = factFactory('TCP', 'white', true);
    const udpFact = factFactory('UDP', '#03cbac', true);
    const httpFact = factFactory('HTTP', '#d9b409', true);
    const dnsFact = factFactory('DNS', 'red', true);

    const facts = [tcpFact, udpFact, httpFact, dnsFact]

    const resources = resourceFactory(ProtocolCount, selectRealTimeProtocolTraffic, pushRealTimeProtocolTraffic)
    resources.inUse = true;

    return (
        <LineGraphPage
            graphResource={resources}
            graphSocketOverride={true}
            //metricSocketOverride={false}
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