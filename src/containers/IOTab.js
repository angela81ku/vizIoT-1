import React from 'react';
import {pushRealTimeIOTraffic} from '../actions/packetActions';
import { selectRealTimeIOTraffic } from '../selectors/packetSelector';
import { IOCount } from '../socket/subscribe';
import InOutTab from './InOutTab';


export const IOTab = ({}) => {

    const facts = [
        'Total', 'Received', 'Sent'
    ]

    return (
        <InOutTab
            apiSource={IOCount}
            packetSelector={selectRealTimeIOTraffic}
            packetPusher={pushRealTimeIOTraffic}
            displayStreams={[1, 2]}
            lineColors={[ 'white', '#03cbac', '#d9b409']}
            pageTitle={'In/Out Traffic'}
            pageSubtitle={'View network in/out traffic in real time' }
            graphTitle={'Network Traffic'}
            chartTitle={'Network'}
            chartSubtitle={'BYTES / SEC'}
            legendTitle={'In/Out'}
            displayFacts={facts}
        />
    )
}