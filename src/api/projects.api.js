import axios from 'axios';

const API_BASE_URL='http://localhost:3001/api';

const client=axios.create({
  baseURL: API_BASE_URL,
  headers: {
     'Content-Type': 'application/json',
  },
});

export const projectApi={
  fetchProjects, editProject, createProject, deleteProject, getProjectById
}
function fetchProjects(){
  return client.get('/projects');
}


function editProject(project){
  return client.put(`/projects/${project._id}`,project);
}

function createProject(newProject){
  return client.post('/projects',newProject);
}

function deleteProject(id){
  return client.delete(`/projects/${id}`);
}

function getProjectById(id){
  return client.get(`/projects/${id}`);
}
