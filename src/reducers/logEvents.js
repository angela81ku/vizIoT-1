import NetworkState from '../constants/NetworkState';

const defaultState = {
  mappedLogs: {},
  networkState: NetworkState.READY,
};

export default (state = defaultState, action) => {
  switch (action) {
    default:
      return state;
  }
};
