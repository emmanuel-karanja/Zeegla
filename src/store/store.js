import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from '../modules';
import apiMiddleware from '../middleware/api.middleware';
import alertsMiddleware from '../middleware/alerts.middleware';
import {persistStore} from '../enhancers';
import sagaMiddleware from '../sagas';
import {rootSaga} from '../sagas'


const store=createStore(rootReducer,
    composeWithDevTools(applyMiddleware(thunk,sagaMiddleware),persistStore())
);

sagaMiddleware.run(rootSaga);

export default store;
