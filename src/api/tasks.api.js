import axios from 'axios';

const API_BASE_URL='http://localhost:3001/api/projects/';

const client=axios.create({
  baseURL: API_BASE_URL,
  headers: {
     'Content-Type': 'application/json',
  },
});

export const taskApi={
  fetchTasks, editTask, createTask, deleteTask, getTaskById
}
function fetchTasks(projectId){
  return client.get(`${projectId}/tasks`);
}

function editTask(projectId,task){
  return client.put(`${projectId}/tasks/${task._id}`,task);
}

function createTask(projectId,newTask){
  console.log('inside tasksAPI createTask:',projectId);
  return client.post(`${projectId}/tasks`,newTask);
}

function deleteTask(projectId,id){
  return client.delete(`${projectId}/tasks/${id}`);
}

function getTaskById(projectId,id){
  return client.get(`${projectId}/tasks/${id}`);
}
