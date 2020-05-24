import React from 'react';
import {Form, Button,FormText,FormGroup} from "react-bootstrap";
import PropTypes from 'prop-types';
import DateInput from "./DateInput";

import {Link} from 'react-router-dom';
import axios from 'axios';

export default class TaskEdit extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            task: {
                status:'',
                taskName:'' ,
                taskDesc: '' ,
                assignedTo: '',
                deadline: '',
            },invalidFields:{},showingValidation: false,
        };


        this.onChange=this.onChange.bind(this);
        this.onValidityChange=this.onValidityChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.showValidation=this.showValidation.bind(this);
    }

    onValidityChange(event, valid){
        const invalidFields=Object.assign({},this.state.invalidFields);
        if(!valid){
            invalidFields[event.target.name]=true;
        }else{
            delete invalidFields[event.target.name];
        }

        this.setState({invalidFields});
    }

    componentDidMount(){
        this.loadTask(this.props.match.params.projectId,this.props.match.params.taskId);
    }

    loadTask(projectId,taskId){
        axios.get(`http://localhost:8000/api/projects/${projectId}/tasks/${taskId}`)
            .then((response)=>{
                const aTask=response.data;
                aTask.createdOn=new Date(aTask.createdOn);
                aTask.modifiedOn=new Date(aTask.modifiedOn);
                aTask.deadline=aTask.deadline !=null? new Date(aTask.deadline): null;

                console.log('inside the TaskEdit loadTask:'+ aTask.deadline);
                this.setState({task:aTask});
            }).catch((error)=>{
               alert('Failed to load Task from server: '+error.data.response.message);
            });

    }
    onChange(event, convertedValue){
        //make a copy of state to modify it.
        const task=Object.assign({},this.state.task);
        //check that there is actual data in the input component
        const value=(convertedValue !== undefined)? convertedValue: event.target.value;
        //modify the value of its corresponding field in the state
        task[event.target.name]=value;
        this.setState({task});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { match: {params}}=this.props;
        const newId=params.taskId;
        const oldId=prevProps.match.params.taskId;
        if(oldId !== newId){
            this.loadTask(this.props.match.params.projectId,newId);
        }
    }
    showValidation(){
        this.setState({showingValidation:true});
    }

    saveTask(projectId,taskId,task){
        axios.put(`http://localhost:8000/api/projects/${projectId}/tasks/${taskId}`,task).then((response)=>{
            const updatedTask=response.data;
            updatedTask.createdOn=new Date(updatedTask.createdOn);
            updatedTask.modifiedOn=new Date(updatedTask.modifiedOn);
            if(updatedTask.deadline)
                updatedTask.deadline=new Date(updatedTask.deadline);

            this.setState({task: updatedTask});
            this.loadTask(this.props.match.params.projectId,updatedTask._id);
        },(error)=>{
           alert('Failed to save Task to the server: '+ error.response.data.message);
        });
    }
    onSubmit(e){
        e.preventDefault();
        this.showValidation();
        if(Object.keys(this.state.invalidFields).length !==0){ //no invalidFields
            return;
        }
        this.saveTask(this.props.match.params.projectId, this.props.match.params.taskId, this.state.task);
    }
    render(){
        const task=this.state.task;
        const validationMessage=Object.keys(this.state.invalidFields).length ===0 ? null :
            (<div className="error" > Please correct the invalid fields before submitting.</div>);
        return(
            <div style={{
                background: '#EEE',
                padding: '1%',
            }}>
                <h1>Task Editor.</h1>
                <Form onSubmit={this.onSubmit}>
                    {validationMessage}
                         <label>Id:</label><label>{task._id}</label>
                    <br/>
                            <label>Task:</label> <input name="taskName"
                            onChange={this.onChange} value={task.taskName}/>
                            <br/>
                    <label>Created On:</label> <label>{task.createdOn?
                      task.createdOn.toDateString():''}</label>
                    <br/>
                    <label>AssignedTo:</label><label> {task.assignedTo}</label>
                    <br/>
                    <label>Status:</label> <select name="status"
                                            value={task.status}
                                            onChange={this.onChange}>
                    <option value="New">New</option>
                    <option value="Started">Started</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                    </select>
                    <br/>
                    <label>Deadline:</label> <DateInput name="deadline"
                                         value={task.deadline}
                                         onChange={this.onChange}
                                         onValidityChange={this.onValidityChange}/>
                                         <br/>
                    <label>Project Description:</label><textarea name="taskDesc"
                                                size={40}
                                                value={task.taskDesc}
                                                onChange={this.onChange}/>
                                                <br/>
                    Last Modified: {task.modifiedOn? task.modifiedOn.toDateString():''}
                <br/>
                    <Button type="submit">Update</Button>
                </Form>
                <Link to={`/projectDetails/${this.props.match.params.projectId}`}>Back To Project</Link>
            </div>
        )
    }
}
