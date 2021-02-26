import React from 'react';
import PropTypes from 'prop-types';
import {pushRealTimeIOTraffic} from '../actions/packetActions';
import { selectRealTimeIOTraffic } from '../selectors/packetSelector';
import { IOCount } from '../socket/subscribe';
import InOutTab from './InOutTab';


export const IOTab = ({}) => {

    return (
        <InOutTab
            apiSource={IOCount}
            packetSelector={selectRealTimeIOTraffic}
            packetPusher={pushRealTimeIOTraffic}
            displayStreams={[1, 2]}
            lineColors={[ '#03cbac', '#d9b409']}
            pageTitle={'In/Out Traffic'}
            pageSubtitle={'View network in/out traffic in real time' }
            graphTitle={'Network Traffic'}
            chartTitle={'Network'}
            chartSubtitle={'BYTES / SEC'}
        />
    )
}