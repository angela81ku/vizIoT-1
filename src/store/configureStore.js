import {createStore, combineReducers} from 'redux';
import devices from '../reducers/devices/devices';
import aggregateSample from '../reducers/aggregateSampleReducer';
import {
  startAnalyze,
  successAnalyze,
  failureAnalyze,
  startCoreAnalyze,
  successCoreAnalyze,
  failureCoreAnalyze,
  startMacToHits,
  successMacToHits,
  failureMacToHits, analyticActionBundle,
} from '../actions/analyzeActions';
import chartConfig from '../reducers/chartConfig';
import analytics from '../reducers/analytics/analytics';
import packets from '../reducers/packets/packets';
import packetActions from 'VizIoT/actions/packetActions';
import {assignAll} from 'redux-act';
import deviceActions from 'VizIoT/actions/deviceActions';
import analyticImm from 'VizIoT/reducers/analytics/analyticImm';

// Store creation
export default () => {
  const store = createStore(
    combineReducers({
      devices,
      aggregateSample,
      chartConfig,
      analytics,
      packets,
      analyticImm,
    }),
    // This is for Redux DevTools
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  startAnalyze.assignTo(store);
  successAnalyze.assignTo(store);
  failureAnalyze.assignTo(store);

  startCoreAnalyze.assignTo(store);
  successCoreAnalyze.assignTo(store);
  failureCoreAnalyze.assignTo(store);

  startMacToHits.assignTo(store);
  successMacToHits.assignTo(store);
  failureMacToHits.assignTo(store);

  assignAll(deviceActions, store);
  assignAll(packetActions, store);
  assignAll(analyticActionBundle, store);
  return store;
};

// // Subscribe: returns a method that lets us unsubscribe in the future.
// const unsubscribe = store.subscribe(() => {
//   console.log(store.getState());
// });
//
// // After this, future calls to store will not trigger that one we set above.
// unsubscribe()
