import {userApi} from '../api';

export const userService={
  fetchUsers,createUser,editUser,deleteUser,getUserByEmail,
}

function fetchUsers(){
  return userApi.fetchUsers();
}

function createUser(newUser){
  return userApi.createUser(newUser);
}

function editUser(updatingUser){
  return userApi.editUser(updatingUser);
}

function deleteUser(user){
  return userApi.deleteUser(user);
}

function getUserByEmail(email){
  return userApi.getUserByEmail(email);
}
