import {taskConstants} from './tasks';

export default function searchReducer(searchTerm='', action){
  switch(action.type){
    case taskConstants.FILTER_TASKS:{
      return action.payload;
    }
    default:{
      return searchTerm;
    }
  }
}
