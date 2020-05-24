import {taskApi} from '../api';

export const taskService={
  fetchTasks, editTask, createTask, deleteTask, getTaskById
}

function fetchTasks(projectId){
   return taskApi.fetchTasks(projectId);
}

function createTask(projectId,newTask){
  return taskApi.createTask(projectId,newTask);
}

function editTask(projectId,task){
  return taskApi.editTask(projectId,task);
}

function getTaskById(projectId,id){
  return taskApi.getTaskById(projectId,id);
}

function deleteTask(projectId,id){
  return taskApi.deleteTask(projectId,id);
}
