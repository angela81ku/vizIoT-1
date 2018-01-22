import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { selectAllDevices } from './selectors/logEventSelector'
// import { actionStartStream } from "./actions/test";


import "normalize.css/normalize.css"
import "./styles/app.scss";

const store = configureStore();
// store.dispatch(actionStartStream({ dispatch: store.dispatch }));
console.log(selectAllDevices(store.getState()));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

const renderApp = () => {
  const appRoot = document.getElementById("app")
  ReactDOM.render(jsx, appRoot);
};
renderApp();

// const requireAuthentication = (WrappedComponent) => {
//   return (props) => (
//     <div>
//       {props.isAuth && <p>Authed Info</p>}
//       <WrappedComponent {...props} />
//     </div>
//   );
// };
//
// const Info = (props) => (
//   <div>
//     <h1>Information</h1>
//   </div>
// );
//
// const HigherOrderComponentAuth = requireAuthentication(Info);

// render(<HigherOrderComponentAuth />)