export const userConstants={
  FETCH_USERS_STARTED:'FETCH_USERS_STARTED',
  FETCH_USERS_SUCCEEDED: 'FETCH_USERS_SUCCEEDED',
  FETCH_USERS_FAILED: 'FETCH_USERS_FAILED',

  EDIT_USER_STARTED: 'EDIT_USER_STARTED',
  EDIT_USER_SUCCEEDED: 'EDIT_USER_SUCCEEDED',
  EDIT_USER_FAILED: 'EDIT_USER_FAILED',

  CREATE_USER_STARTED: 'CREATE_USER_STARTED',
  CREATE_USER_SUCCEEDED: 'CREATE_USER_SUCCEEDED',
  CREATE_USER_FAILED: 'CREATE_USER_FAILED',

  DELETE_USER_STARTED: 'DELETE_USER_STARTED',
  DELETE_USER_SUCCEEDED: 'DELETE_USER_SUCCEEDED',
  DELETE_USER_FAILED: 'DELETE_USER_FAILED',
};



export default function usersReducer(users=[], action){
  switch(action.type){
    case userConstants.FETCH_USERS_SUCCEEDED:{
      return action.payload;
    }

    case userConstants.CREATE_USER_SUCCEEDED:{
      return users.concat(action.payload);
    }

    case userConstants.EDIT_USER_SUCCEEDED:{
      const nextUsers=users.map(user=>{
        if(user._id===action.payload._id){
            Object.assign({},user,action.payload);
        }
        return user;
      });
      return nextUsers;
    }

    case userConstants.DELETE_USER_SUCCEEDED:{
      const nextUsers=users.filter(user=>user._id !== action.payload._id);
      return nextUsers;
    }

   default:
    return users;
  }
}
