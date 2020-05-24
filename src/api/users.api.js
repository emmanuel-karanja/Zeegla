import axios from 'axios';

const API_BASE_URL='http://localhost:3001/api/';

//the user authentication header has to be a little involved
const client=axios.create({
  baseURL: API_BASE_URL,
  headers: {
     'Content-Type': 'application/json',
  },
});

export const userApi={
  fetchUsers,createUser,editUser,getUserByEmail,deleteUser
}

///let me just say that there is more to it than meets the eye here...

function fetchUsers(){
  return client.get('/users');
}

function editUser(user){
  return client.put(`/users/${user._id}`,user);
}

function createUser(newUser){
  return client.post('/users',newUser);
}

function deleteUser(user){
  return client.delete(`/users/${user._id}`);
}

function getUserByEmail(email){
  return client.get(`/users/${email}`);
}
