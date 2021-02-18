'use es6';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/app.scss';
import whyDidYouUpdate from 'why-did-you-update';
import SocketProvider from './components/BeanUILibrary/provider/SocketProvider';

if (process.env.NODE_ENV !== 'production') {
  // whyDidYouUpdate(React);
}

const store = configureStore();
// store.dispatch(actionStartStream({ dispatch: store.dispatch }));

const jsx = (
  <Provider store={store}>
    <SocketProvider>
      <AppRouter />
    </SocketProvider>
  </Provider>
);

const renderApp = () => {
  const appRoot = document.getElementById('app');
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
