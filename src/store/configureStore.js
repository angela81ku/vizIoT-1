import { createStore, combineReducers } from 'redux'
import devices from '../reducers/devices'
import logEvents from '../reducers/logEvents'
import aggregateSample from '../reducers/aggregateSampleReducer'
import { start, success, failure } from '../actions/test';

// Store creation
export default () => {
  const store = createStore(
    combineReducers({
      devices,
      logEvents,
      aggregateSample
    }),
    // This is for Redux DevTools
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  start.assignTo(store)
  success.assignTo(store)
  failure.assignTo(store)
  return store
}

// // Subscribe: returns a method that lets us unsubscribe in the future.
// const unsubscribe = store.subscribe(() => {
//   console.log(store.getState());
// });
//
// // After this, future calls to store will not trigger that one we set above.
// unsubscribe()

