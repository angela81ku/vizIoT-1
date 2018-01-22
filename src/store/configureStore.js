import { createStore, combineReducers } from 'redux'
import devices from '../reducers/devices'
import logEvents from '../reducers/logEvents'

// Store creation
export default () => {
  return createStore(
    combineReducers({
      devices,
      logEvents,
    }),
    // This is for Redux DevTools
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}

// // Subscribe: returns a method that lets us unsubscribe in the future.
// const unsubscribe = store.subscribe(() => {
//   console.log(store.getState());
// });
//
// // After this, future calls to store will not trigger that one we set above.
// unsubscribe()

