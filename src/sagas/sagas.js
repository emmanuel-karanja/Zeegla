import {fork,take,call, put, takeEvery,takeLatest,delay} from 'redux-saga/effects';
//import {delay} from 'redux-saga';
import{taskConstants} from '../modules';


export function * rootSaga(){
  yield takeEvery(taskConstants.TIMER_STARTED, handleProgressTimer);
}

function * handleProgressTimer({payload}){
  while(true){
    yield delay(1000);
    yield put({
      type: taskConstants.TIMER_INCREMENT,
      payload: payload
    });
  }
}
