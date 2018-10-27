import { createReducer } from 'redux-act';
import { failureRecentPackets, startRecentPackets, successRecentPackets } from 'VizIoT/actions/packetActions';
import NetworkState from 'VizIoT/constants/NetworkState';

const defaultState = {
  packetListing: [],
  networkState: NetworkState.READY,
};

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

const onStart = state => {
  return {
    ...state,
    networkState: NetworkState.LOADING,
  };
};

const onSuccess = (state, { payload, requestBody }) => {
  if (isMocking) {
    const packetListing = state.packetListing;
    return {
      ...state,
      packetListing: [
        genMock(packetListing.length),
        ...packetListing,
      ],
      networkState: NetworkState.READY,
    };
  }

  return {
    ...state,
    networkState: NetworkState.READY,
    packetListing: payload,
  }
};

const onFailure = state => {
  if (isMocking) {
    const packetListing = state.packetListing;
    return {
      ...state,
      packetListing: [
        genMock(packetListing.length),
        ...packetListing,
      ],
      networkState: NetworkState.READY,
    };
  }

  return {
    ...state,
    networkState: NetworkState.READY,
  };
};

export default createReducer(
  {
    [startRecentPackets]: onStart,
    [successRecentPackets]: onSuccess,
    [failureRecentPackets]: onFailure,
  },
  defaultState
);
