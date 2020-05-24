import {projectActions} from './projects';
import {alertActions}  from './alerts';
import {taskService}  from '../services'

export const taskConstants={
   FETCH_TASKS_SUCCEEDED: 'FETCH_TASKS_SUCCEEDED',
   CREATE_TASK_SUCCEEDED: 'CREATE_TASK_SUCCEEDED',
   EDIT_TASK_SUCCEEDED: 'EDIT_TASK_SUCCEEDED',
   DELETE_TASK_SUCCEEDED: 'DELETE_TASK_SUCCEEDED',
   FILTER_TASKS:'FILTER_TASKS',

   TIMER_STARTED:'TIMER_STARTED',
   TIMER_INCREMENT: 'TIMER_INCREMENT',
};

export const taskStatusConstants={
  NOT_STARTED: 'Not-Started',
  ONGOING: 'Ongoing',
  COMPLETED: 'Completed',
  SUSPENDED:'Suspended',
  CANCELLED: 'Cancelled',
};

export const TASK_STATUSES=[
  taskStatusConstants.NOT_STARTED,
  taskStatusConstants.ONGOING,
  taskStatusConstants.COMPLETED,
  taskStatusConstants.SUSPENDED,
  taskStatusConstants.CANCELLED
];


export const taskActions={
  fetchTasks, createTask, editTask, deleteTask,fetchTasksSucceeded,filterTasks
}


function fetchTasks(){
  return  async (dispatch,getState)=>{
    dispatch(alertActions.clear());
    try{
      if(getState.currentProjectId==='' || getState.currentProjectId ===null || getState.currentProjectId==='undefined') {
         throw new Error('Current Project Not Selected');
      }
      const{data}=await taskService.fetchTasks(getState().currentProjectId);
      dispatch(fetchTasksSucceeded(data));
      dispatch(alertActions.success('Tasks fetched successfully'))
    }catch(error){
      dispatch(alertActions.failure('Failed to fetch Tasks',error.message));
    }
  }
}

 function fetchTasksSucceeded(tasks){
   return{
     type: taskConstants.FETCH_TASKS_SUCCEEDED,
     payload:tasks
   }
 }


 function createTask(newTask){
   return async (dispatch,getState)=>{
     dispatch(alertActions.clear());
     try{
       const {data}=await taskService.createTask(getState().currentProject._id,newTask);
       dispatch(projectActions.addTask(newTask));
       dispatch(alertActions.success('Task Created Succesfully'));
     }catch(error){
      dispatch(alertActions.failure('Failed to createTask',error));
     }
   }
 }


 function editTask(task){
   return async (dispatch,getState)=>{
     dispatch(alertActions.clear())
     try{
        const {data}=await taskService.editTask(getState().currentProject._id,task);
        dispatch(projectActions.editTask(data));
        if(data.status===taskStatusConstants.ONGOING){
          dispatch(progressTimerStart(data._id));
        }
        dispatch(alertActions.success('Task Updated'));
     }catch(error){
       dispatch(alertActions.failure('Failed to update Task',error.message));
     }
   }
 }

function progressTimerStart(taskId){
  return{
    type: taskConstants.TIMER_STARTED,
    payload: taskId
  }

}


 function deleteTask(taskId){
   return async (dispatch,getState)=>{
     dispatch(alertActions.clear());
     try{
       await taskService.deleteTask(getState().currentProject._id,taskId)
       dispatch(projectActions.deleteTask(taskId));
       dispatch(alertActions.success('Task Deleted'));
     }catch(error){
       dispatch(alertActions.failure('Failed to delete Task',error.message));
     }
   }
 }

 function deleteTaskSucceeded(id){
   return {
     type: taskConstants.DELETE_TASK_SUCCEEDED,
     payload:id
   };
 }

function filterTasks(searchTerm){
  return {
    type: taskConstants.FILTER_TASKS,
    payload: searchTerm,
  }

}
