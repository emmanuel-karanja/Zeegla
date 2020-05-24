import React from 'react';
import TasksPage from '../components/TasksPage';
import Header from '../components/Header';
import {connect} from 'react-redux';
import {taskActions,projectActions} from '../modules';
import {getGroupedAndFilteredTasks} from '../selectors';


class App extends React.Component{
  constructor(props){
    super(props);
    this.onStatusChange=this.onStatusChange.bind(this);
    this.onCreateTask=this.onCreateTask.bind(this);
    this.onDeleteTask=this.onDeleteTask.bind(this);
    this.onSearch=this.onSearch.bind(this);
    this.onCurrentProjectChange=this.onCurrentProjectChange.bind(this);
  }

  componentDidMount(){
    this.props.dispatch(projectActions.fetchProjects());

  }

  onCurrentProjectChange=(newProjectId)=>{
    this.props.dispatch(projectActions.fetchProject(newProjectId));
  }
  onCreateTask=(newTask)=>{
    this.props.dispatch(taskActions.createTask(newTask));
  }

  onDeleteTask=(task)=>{
    this.props.dispatch(taskActions.deleteTask(task));
  }

  onStatusChange=(task)=>{
    this.props.dispatch(taskActions.editTask(task));
  }

  onSearch=(searchTerm)=>{
     this.props.dispatch(taskActions.filterTasks(searchTerm));
  }

  render(){
    return(

      <div className="main-content">
        <Header projects={this.props.projects}
                onCurrentProjectChange={this.onCurrentProjectChange}
                />
        <TasksPage
             tasks={this.props.tasks}
             onCreateTask={this.onCreateTask}
             onStatusChange={this.onStatusChange}
             onDeleteTask={this.onDeleteTask}
             onSearch={this.onSearch}
             />
      </div>
    );
  }

}

function mapStateToProps(state){
  const{alerts,projects,currentProject,searchTerm}=state;
  return{
    tasks: getGroupedAndFilteredTasks(state),
    alerts,
    projects,
  };
}



export default connect(mapStateToProps)(App);
