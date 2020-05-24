import React from 'react'
import {TaskTable} from "./TaskTable";
import {Link} from 'react-router-dom';
import {Project} from "./Project";
import axios from 'axios';
import CreateTaskDialog from "./CreateTaskDialog";

//the projectDetails uses the id property passed in to fetch the complete project from the
//server and displays it.


export default class ProjectDetails extends React.Component{
    constructor(props) {
        super(props);
        this.state = {project: {tasks:[]}, updated:false};

        this.createTask=this.createTask.bind(this);
        this.deleteTask=this.deleteTask.bind(this);
        this.update=this.update.bind(this);
        this.createTask=this.createTask.bind(this);
    }

    componentDidMount(){
        this.loadProject();
    }

    update(){
       this.setState({updated:true});
    }
    createTask(newTask){
        axios.post(`http://localhost:8000/api/projects/${this.state.project._id}/tasks`,newTask)
            .then((response)=>{
                const createdTask=response.data;
                createdTask.createdOn=new Date(createdTask.createdOn);
                if(createdTask.deadline)
                    createdTask.deadline=new Date(createdTask.deadline);
                const newTasks=this.state.project.tasks.concat(createdTask);
                this.setState({tasks: newTasks,updated: true});
            }).catch((error)=>{
                alert('Failed to create task: '+error.response.data.message);
            });

    }

    deleteTask(id){
        axios.delete(`http://localhost:8000/api/projects/${this.state.project._id}/tasks/${id}`)
            .then((response)=>{
               this.setState({updated:true});
                //show some toast or alert
            }).catch((error)=>{
               alert('Failed to delete task'+ error.response.data.message);
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevState.updated !== this.state.updated) {
         this.loadProject();
      }
    }

    loadProject(){
        axios.get(`http://localhost:8000/api/projects/${this.props.match.params.id}`)
            .then((response)=>{
                const aProject=response.data.record;
                aProject.createdOn=new Date(aProject.createdOn);
                aProject.modifiedOn=new Date(aProject.modifiedOn);
                aProject.deadline=new Date(aProject.deadline);
                aProject.tasks.forEach(task=>{
                        task.createdOn=new Date(task.createdOn);
                        task.modifiedOn=new Date(task.modifiedOn);
                        if(task.deadline)
                            task.deadline=new Date(task.deadline);
                });

                this.setState({project: aProject,updated:true});
            }).catch((error)=>{
                alert('Failed to fetch project'+ error.response.data.message);
            });


    }

    render(){
        return(
            <div style={{
                background: '#EEE',
                padding: '1%',
            }}>
                <h1>Project Details.</h1>
              <Project project={this.state.project}/>
              <Link to="/Projects">Back to Projects</Link>
              <br/>
              <TaskTable tasks={this.state.project.tasks}
                         projectId={this.state.project._id}
                         deleteTask={this.deleteTask}
                         />
              <CreateTaskDialog projectId={this.state.project._id} createTask={this.createTask}/>
            </div>
        );
    }
}
