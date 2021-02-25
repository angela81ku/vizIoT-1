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
        />
    )
}