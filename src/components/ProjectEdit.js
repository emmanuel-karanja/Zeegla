import React from 'react';
import {Form, Button,FormText} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import DateInput from "./DateInput";
import axios from 'axios';


export default class ProjectEdit extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            project: {
           status:'',
           projectName:'' ,
           projectDesc: '' ,
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
        this.loadProject();
    }

    loadProject(){
        axios.get(`http://localhost:8000/api/projects/${this.props.match.params.id}`)
            .then((response)=>{
                const aProject=response.data.record;
                aProject.createdOn=new Date(aProject.createdOn);
                aProject.modifiedOn=new Date(aProject.modifiedOn);
                aProject.deadline=aProject.deadline!=null? new Date(aProject.deadline): null;
                this.setState({project:aProject, tasks: aProject.tasks});
            },(error)=>{
                alert('Failed to fetch project from server: '+ error.message);

            });

    }
    onChange(event, convertedValue){
        //make a copy of state to modify it.
        const project=Object.assign({},this.state.project);
        //check that there is actual data in the input component
        const value=(convertedValue !== undefined)? convertedValue: event.target.value;
        //modify the value of its corresponding field in the state
        project[event.target.name]=value;
        this.setState({project});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { match: {params}}=this.props;
        const newId=params.id;
        const oldId=prevProps.match.params.id;
        if(oldId !== newId){
            this.loadProject();
        }
    }
    showValidation(){
        this.setState({showingValidation:true});
    }

    saveProject(projectId, project){
        axios.put(`/api/projects/${projectId}`,project)
            .then((response)=>{
                const updatedProject=response.data;
                updatedProject.createdOn=new Date(updatedProject.createdOn);
                updatedProject.modifiedOn=new Date(updatedProject.modifiedOn);
                if(updatedProject.deadline)
                    updatedProject.deadline=new Date(updatedProject.deadline);
                this.setState({project: updatedProject});
                alert('Updated the Project Successfully');
                this.loadProject();
            },(error)=>{
               alert('Failed to save project on the server: '+error.message);
            });

    }
     onSubmit(e){
        e.preventDefault();
        this.showValidation();
       if(Object.keys(this.state.invalidFields).length !==0){ //no invalidFields
           return;
       }
       this.saveProject(this.props.match.params.id, this.state.project);
     }
    render(){
        const project=this.state.project;
        const validationMessage=Object.keys(this.state.invalidFields).length ===0 ? null :
            (<div className="error" > Please correct the invalid fields before submitting.</div>);
        return(
            <div>
                <Form onSubmit={this.onSubmit}>
                    {validationMessage}
                    Id: {project._id};
                    <br/>
                    ProjectName: <input name="projectName" onChange={this.onChange} value={project.projectName}/>
                    <br/>
                    Created On: {project.createdOn? project.createdOn.toDateString():''}
                    <br/>
                    Owner: {project.createdBy}
                    <br/>
                    Status: <select name="status" value={project.status} onChange={this.onChange}>
                    <option value="New">New</option>
                    <option value="Started">Started</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                </select>
                <br/>
                  Deadline: <DateInput name="deadline"
                                       value={project.deadline}
                                       onChange={this.onChange}
                                       onValidityChange={this.onValidityChange}/>
                    <br/>
                    Project Description: <textarea name="projectDesc"
                                                   size={50}
                                                   value={project.projectDesc}
                                                   onChange={this.onChange}/>
                    <br/>
                   Last Modified: {project.modifiedOn? project.modifiedOn.toDateString():''}
                   <br/>
                   <Button type="submit">Update</Button>
                </Form>
                <Link to={`/projectDetails/${this.props.match.params.id}`}>Back To Project Details</Link>
            </div>
        )
    }
}