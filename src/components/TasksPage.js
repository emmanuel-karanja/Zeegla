import React from 'react';
import TaskList from './TaskList';
import {Form, Button} from 'react-bootstrap';
import 'bootstrap';
import {TASK_STATUSES,taskStatusConstants} from '../modules'




class TasksPage extends React.Component{
 constructor(props){
   super(props);
   this.state={
     showNewCardForm:false,
     title: '',
    description:'',

  }; //this is local state for input.

  this.onTitleChange=this.onTitleChange.bind(this);
  this.onDescriptionChange=this.onDescriptionChange.bind(this);
  this.onCreateTask=this.onCreateTask.bind(this);
  this.toggleForm=this.toggleForm.bind(this);
  this.onSearch=this.onSearch.bind(this);
 }

 onTitleChange=(e)=>{
    this.setState({title: e.target.value});
 }

onDescriptionChange=(e)=>{
   this.setState({description: e.target.value});
}

 resetForm(){
    this.setState({
       showNewCardFor: false,
       title:'',
       description: '',
    });
 }

  onCreateTask=(e)=>{
      e.preventDefault();

      const status=taskStatusConstants.NOT_STARTED;
      const newTask={
                 title:this.state.title,
                 description: this.state.description,
                 status: status
               };
      this.props.onCreateTask(newTask);
      this.resetForm();
  }

  onSearch(e){
   this.props.onSearch(e.target.value);
  }

   toggleForm=()=>{
      this.setState({showNewCardForm: !this.state.showNewCardForm});
   }
  renderTaskLists(){
    const{tasks}=this.props;
    return Object.keys(tasks).map(status=>{
      const tasksByStatus=tasks[status];
      return(
        <TaskList key={status}
                  status={status}
                  tasks={tasksByStatus}
                  onStatusChange={this.props.onStatusChange}
                  onDeleteTask={this.props.onDeleteTask}/>
      );
    });

  }

  render(){
    return(
    <div className="tasks">
      <div className="tasks-header">
      <input type="text"
        onChange={this.onSearch}
        placeholder="Search..."/>
       <button
          className="roundedButton"
          onClick={this.toggleForm}  >
        + New Task
        </button>
      </div>
       {this.state.showNewCardForm && (
         <form onSubmit={this.onCreateTask}>
          <input
            className="full-width-input"
            onChange={this.onTitleChange}
            value={this.state.title}
            type="text"
            placeholder="Title"/>

          <input
             className="full-width-input"
             onChange={this.onDescriptionChange}
             value={this.state.description}
             type="text"
             placeholder="Description" />

             <button className="button" type="submit">Save</button>
           </form>
       )}
       <div className="task-lists">
            {this.renderTaskLists()}
             </div>
    </div>
  );
}

}


export default TasksPage;
