
import {alertActions} from '../modules';

export const actionKeywords={
  ACTION_STARTED:'STARTED',
  ACTION_SUCCEEDED: 'SUCCEEDED',
  ACTION_FAILED: 'FAILED',
}

const alertsMiddleware=state=>next=>action=>{
  //filter out the actions that contain _STARTED, _SUCCEEDED, _FAILED'
  if(action.type.includes(actionKeywords.ACTION_STARTED)){
    next(alertActions.clear());
    next(action);
  } else if(action.type.includes(actionKeywords.ACTION_SUCCEEDED)){
    next(alertActions.success('Successful'));
    next(action);
  }else if(action.type.includes(actionKeywords.ACTION_FAILED)){
    next(alertActions.failure('Failed',action.error));
    next(action);
  }
  next(action);
}

export default alertsMiddleware;
