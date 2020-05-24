import {createSelector} from 'reselect';
import {TASK_STATUSES} from '../modules';


export const getTasks=state=>{
  return state.currentProject.tasks;
}

const getSearchTerm=state=>state.searchTerm;

export const getFilteredTasks=createSelector(
  [getTasks,getSearchTerm],
  (tasks,searchTerm)=>{
    return tasks.filter(task=>{
      const match =task.title.match(new RegExp(searchTerm,'i')) ||
                   task.description.match(new RegExp(searchTerm,'i'));
      return match;
    });
  }
)

export const getGroupedAndFilteredTasks=createSelector(
  [getFilteredTasks],
  tasks=>{
    const grouped={};
    TASK_STATUSES.forEach(status=>{
      grouped[status]=tasks.filter(task=> task.status===status);
    });
    return grouped;
  }
)
