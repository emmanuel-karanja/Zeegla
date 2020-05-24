import {projectApi} from '../api';

export const projectService={
  fetchProjects, editProject, createProject, deleteProject, getProjectById
}

function fetchProjects(){
   return projectApi.fetchProjects();
}

function createProject(newProject){
  return projectApi.createProject(newProject);
}

function editProject(project){
  return projectApi.editProject(project);
}

function getProjectById(id){
  return projectApi.getProjectById(id);
}

function deleteProject(id){
  return projectApi.deleteProject(id);
}
