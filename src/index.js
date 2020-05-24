import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/containers/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';

import store from '../src/store/store';

  ReactDOM.render(
    <Provider store={store}>
       <App/>
    </Provider>
  ,document.getElementById('root'));


if(module.hot){
   module.hot.accept('../src/containers/App',()=>{
     const NextApp = require('../src/containers/App').default;
     ReactDOM.render(
       <Provider store={store}>
          <NextApp/>
       </Provider>
     ,document.getElementById('root'));
   });
  }


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


serviceWorker.unregister();
