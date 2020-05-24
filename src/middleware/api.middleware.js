import axios from 'axios';
const API_BASE_URL='http://localhost:3001/api';

export const callMethod={
  GET:'GET',
  POST: 'POST',
  PUT:'PUT',
  DELETE: 'DELETE',
}

export const CALL_API='CALL_API';


const apiMiddleware=({dispatch})=>next=>action=>{
  const callApi=action[CALL_API];
  if(typeof callApi==='undefined'){
   return next(action);
  }

  const [requestStartedType,successType,failureType]=callApi.types;
  //dispatch the _STARTED action
  next({type:requestStartedType});

//each of the CRUD operations//
return makeCall(callApi.endpoint,callApi.method,callApi.body).then(response=>{
  next({type: successType, payload: response.data.record});
  }, error=>{
  next({type:failureType,error:error.message});
   },
 );
};

async function makeCall(endpoint, method=callMethod.GET,body){
  const url=`${API_BASE_URL}${endpoint}`;
  const params={
    method:method,
    url,
    data:body,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axios(params);
    return response;
  }
  catch (err) {
    return err;
  }
}

export default apiMiddleware;
