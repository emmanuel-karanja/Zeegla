
import {combineReducers} from 'redux';
import tasksReducer from './tasks';
import alertsReducer from './alerts';
import usersReducer from './users';
import projectsReducer from './projects';
import searchReducer from './search'
import currentProjectReducer from './currentProject';

export * from './projects';
export * from './tasks';
export * from './users';
export * from './alerts';


const rootReducer=combineReducers({
  alerts: alertsReducer,
  users: usersReducer,
  projects: projectsReducer,
  searchTerm: searchReducer,
  currentProject: currentProjectReducer,
  //-------------add more reducers here---------//
})

export default rootReducer;
