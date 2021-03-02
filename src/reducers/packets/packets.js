'use es6';

import { createReducer } from 'redux-act';
import {
  pushIndividualSizeToday,
  recentsActionBundle,
  pushPacketCountToday,
  pushRealtimeVelocitySample,
  pushRealtimeVelocitySizeSample,
  pushSizeToday,
  pushSize1Min,
  pushRealtimeIndividualVelocitySizeSample,
  pushRealTimeIOTraffic,
  pushRealTimeProtocolTraffic,
} from 'VizIoT/actions/packetActions';
import { combineReducers } from 'redux';
import { createRequestReducer } from 'VizIoT/reducers/requests/requestState';
import { createDeviceDataMap, mergeDeviceDataMaps, updateDeviceDataMaps } from 'VizIoT/data/device/DeviceDataLenses';
import {pushRealTimeIOMetricTraffic} from '../../actions/packetActions';
// import {pushRealTimeIOTraffic} from '../../actions/packetActions';

const isMocking = true;
const genMock = count => ({
      src_ip: 'src_ip',
      dst_ip: 'dest_ip',
      dst_mac: 'src_mac',
      src_mac: 'dest_mac',
      dst_port: 'dst_port',
      src_port: 'src_port',
      timestamp: `${count} timestamp`,
    });

const pushPacketCount = createReducer({
    [pushPacketCountToday]: (state, newCount) => {
      return {
        ...state,
        data: newCount,
      }
    },
  },
  { data: null }
);

const pushSize = createReducer({
  [pushSizeToday]: (state, newVal) => {
    return {
      ...state,
      data: newVal,
    }
  }
},
  { data : null});

const pushSize1MinStore = createReducer({
    [pushSize1Min]: (state, newVal) => {
      return {
        ...state,
        data: newVal,
      }
    }
  },
  { data : null});

const realtimeVelocitySample = createReducer({
  [pushRealtimeVelocitySample]: (state, newEntry) => {
    return {
      ...state,
      data: state.data === null ? [newEntry] : [...state.data, newEntry].slice(-70),
    }
  },
}, { data: null });

const middleware = (state, rawRequestData) => {
  const { payload, requestBody } = rawRequestData;
  const { packetListing: prevPacketListing } = state;

  const packetListing = prevPacketListing || [];
  if (isMocking) {
    return {
      packetListing: [
        genMock(packetListing.length),
        ...packetListing,
      ]
    };
  }

  return {
    packetListing: payload,
  };
};

const packetPerDevice = createReducer({
  [pushIndividualSizeToday]: (state, newEntry) => {
    return {
      ...state,
      data: newEntry,
    }
  },
}, { packetPerDevice: null });

const packets = createRequestReducer(
  { packetListing: null },
  recentsActionBundle,
  middleware
);

const realtimeVelocitySizeSample = createReducer({
  [pushRealtimeVelocitySizeSample]: (state, newEntry) => {
    return {
      ...state,
      data: state.data === null ? [newEntry] : [...state.data, newEntry].slice(-70),
    }
  },
}, { data: null });

const realtimeIndividualVelocitySizeSample = createReducer({
  [pushRealtimeIndividualVelocitySizeSample]: (state, message) => {
    // console.log('new message' + message.toString());
    return {
      ...state,
      data: updateDeviceDataMaps(state.data, createDeviceDataMap(message)),
    }
  }
}, { data: null });

// my reducer
const realTimeIOTraffic = createReducer({
  [pushRealTimeIOTraffic]: (state, newEntry) => {
    return {
      ...state,
      data: state.data === null ? [newEntry] : [...state.data, newEntry].slice(-70),
    }
  },
}, { data: null });

const realTimeIOMetricTraffic = createReducer({
  [pushRealTimeIOMetricTraffic]: (state, newEntry) => {
    return {
      ...state,
      data: state.data === null ? [newEntry] : [...state.data, newEntry].slice(-70),
    }
  },
}, { data: null })

const realTimeProtocolTraffic = createReducer({
  [pushRealTimeProtocolTraffic]: (state, newEntry) => {
    return {
      ...state,
      data: state.data === null ? [newEntry] : [...state.data, newEntry].slice(-70),
    }
  },
}, { data: null });

export default combineReducers({
  packetPerDevice,
  pushSize,
  pushSize1MinStore,
  pushPacketCount,
  realtimeVelocitySample,
  realtimeVelocitySizeSample,
  realtimeIndividualVelocitySizeSample,
  packets,
  realTimeIOTraffic,
  realTimeIOMetricTraffic,
  realTimeProtocolTraffic,
});
