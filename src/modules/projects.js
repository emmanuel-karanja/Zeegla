
import {tasksActions} from './tasks';
import {alertActions} from './alerts';
import {projectService} from '../services';

export const projectConstants={
   FETCH_PROJECTS_SUCCEEDED: 'FETCH_PROJECTS_SUCCEEDED',
   CREATE_PROJECT_SUCCEEDED: 'CREATE_PROJECT_SUCCEEDED',
   EDIT_PROJECT_SUCCEEDED: 'EDIT_PROJECT_SUCCEEDED',
   DELETE_PROJECT_SUCCEEDED: 'DELETE_PROJECT_SUCCEEDED',

   CURRENT_PROJECT_CHANGED:'CURRENT_PROJECT_CHANGED',
   SET_CURRENT_PROJECT:'SET_CURRENT_PROJECT',
   //editing the taskIds per project
   ADD_TASK: 'ADD_TASK',
   EDIT_TASK:'EDIT_TASK',
   DELETE_TASK:'DELETE_TASK',

};

export const projectStatusConstants={
  NOT_STARTED: 'Not-Started',
  ONGOING: 'Ongoing',
  COMPLETED: 'Completed',
  SUSPENDED:'Suspended',
  CANCELLED: 'Cancelled',
};

export const projectActions={
  fetchProjects, createProject, editProject, deleteProject, fetchProject,addTask,editTask,deleteTask
}

export default function projectsReducer(projects=[],action){

  switch(action.type){
    case projectConstants.FETCH_PROJECTS_SUCCEEDED :{
      return  action.payload;
    }

    case projectConstants.CREATE_PROJECT_SUCCEEDED:{
       return  projects.concat(action.payload);
    }

    case projectConstants.EDIT_PROJECT_SUCCEEDED:{
      const nextProjects=projects.map(project=>{
        if(project._id===action.payload._id){
            Object.assign({},project,action.payload);
        }
        return project;
      });
      return nextProjects;
    }

    case projectConstants.DELETE_PROJECT_SUCCEEDED:{
      const nextProjects=projects.filter(project=>project._id !== action.payload);
      return  nextProjects;
    }


default:{
      return projects;
    }
  }
}

//modifies state for one project



function fetchProjects(){
  return  async (dispatch,getState)=>{
    dispatch(alertActions.clear());
    try{
      const {data}=await projectService.fetchProjects();
    dispatch(fetchProjectsSucceeded(data));
        const defaultProjectId=data[0]._id;
        dispatch(fetchProject(defaultProjectId));
      dispatch(alertActions.success('Projects fetched successfully'))
    }catch(error){
      dispatch(alertActions.failure('Failed to fetch projects',error.message));
    }
  }
}

 function fetchProjectsSucceeded(projects){
   return{
     type: projectConstants.FETCH_PROJECTS_SUCCEEDED,
     payload:projects
   }
 }


 function createProject({title, description, status=projectStatusConstants.NOT_STARTED}){
   const newProject={title,description,status};
   return async dispatch=>{
     dispatch(alertActions.clear())
     try{
       const {data}=await projectService.createProject(newProject);
       dispatch(createProjectSucceeded(data));
       dispatch(alertActions.success('Project Created Succesfully'));
       dispatch(fetchProject(data._id));
     }catch(error){
      dispatch(alertActions.failure('Failed to createProject',error.message));
     }
   }
 }

 function createProjectSucceeded(newProject){
   return{
     type: projectConstants.CREATE_PROJECT_SUCCEEDED,
     payload: newProject,
   };
 }

 function editProject(project){
   return async dispatch=>{
     dispatch(alertActions.clear())
     try{
        const {data}=await projectService.editProject(project);
        dispatch(editProjectSucceeded(data));
        dispatch(alertActions.success('Project Updated'));
        dispatch(fetchProject(data._id));
     }catch(error){
       dispatch(alertActions.failure('Failed to update project',error.message));
     }
   }
 }

 function editProjectSucceeded(updatedProject){
   return{
     type:projectConstants.EDIT_PROJECT_SUCCEEDED,
     payload: updatedProject
   }
 }

 function deleteProject(id){
   return async dispatch=>{
     dispatch(alertActions.clear());
     try{
       await projectService.deleteProject(id)
       dispatch(deleteProjectSucceeded(id));
       dispatch(alertActions.success('Project Deleted'));
     }catch(error){
       dispatch(alertActions.failure('Failed to delete project',error.message));
     }
   }
 }

 function deleteProjectSucceeded(id){
   return {
     type: projectConstants.DELETE_PROJECT_SUCCEEDED,
     payload:id
   };
 }


function fetchProject(id){
  return async dispatch=>{
    try{
      const {data}=await projectService.getProjectById(id);
      dispatch(setCurrentProject(data));
      dispatch(alertActions.success(`Project ${data.title} fetched successfuly`))
    }catch(error){
     dispatch(alertActions.failure('Failed to fetch project',error.message));
    }
  }
}

function  setCurrentProject(project){
  return {
    type: projectConstants.SET_CURRENT_PROJECT,
    payload: project
  }
}


function addTask(newTask){
  return {
    type: projectConstants.ADD_TASK,
    payload: newTask
  }
}

function editTask(task){
  return{
    type: projectConstants.EDIT_TASK,
    payload: task
  }
}

function deleteTask(id){
  return{
    type: projectConstants.DELETE_TASK,
    payload: id
  }
}
