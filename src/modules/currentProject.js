import {projectConstants} from './projects';
import {taskConstants} from './tasks';
export default function currentProjectReducer(currentProject={tasks:[],}, action){
  switch(action.type){

    case projectConstants.SET_CURRENT_PROJECT:{
      return action.payload
    }

    case projectConstants.ADD_TASK:{
      return Object.assign({},currentProject,{
        tasks: [...currentProject.tasks,action.payload]
      });
    }

    case projectConstants.EDIT_TASK: {
      const nextTasks=currentProject.tasks.map(task=>{
        if(task._id===action.payload._id){
            Object.assign({},task,action.payload);
        }
        return task;
      });

      return{
        ...currentProject,
        tasks:nextTasks,
      }
    }

    case projectConstants.DELETE_TASK:{
      const nextTasks=currentProject.tasks.filter(task=>
        task._id !== action.payload);
      return {
        ...currentProject,
        tasks:nextTasks
      };
    }
    case taskConstants.TIMER_INCREMENT:{
      const nextTasks=currentProject.tasks.map(task=>{
        if(task._id===action.payload){
          return {
            ...task,
            timer: task.timer+1};
        }
        return task;
      });
      return {
        ...currentProject,
        tasks: nextTasks
      };
    }

    default:{
      return currentProject;
    }
  }
}
