export const alertConstants={
   ALERT_SUCCESS: 'ALERT_SUCCESS',
   ALERT_FAILED: 'ALERT_FAILED',
   ALERT_CLEAR: 'ALERT_CLEAR',
};

export const alertActions={
  success,failure,clear
}

export default function alertsReducer(alerts={message:'',error:'',type:'', isLoading:false}, action){
  switch(action.type){
    case alertConstants.ALERT_SUCCESS:{
       return {
         type: 'success',
         message:action.payload.message,
         isLoading: false,
       };
    }

    case alertConstants.ALERT_FAILED:{
      return{
      type: 'failed',
      message: action.payload.message,
      error: action.payload.error,
      isLoading: false,
      };
    }

    case alertConstants.ALERT_CLEAR:{
        return {
          isLoading: true,
        };
    }

   default:
     return alerts;
  }
}



  function success(message){
  return {
      type: alertConstants.ALERT_SUCCESS,
      payload:{
        message:message,
      }

      };
}

function failure(error,message){
  return {
    type: alertConstants.ALERT_FAILED,
    payload:{
       message:message,
       error:error,
     }
  };
}

function clear(){
  return{
    type: alertConstants.ALERT_CLEAR,
    payload:{
       message:'',
       error: '',
     },
  };
}
