
import React from 'react';
import {ProjectTable} from "../components/ProjectTable";
import axios from 'axios';
import {UserCaption} from "./UserCaption";
import {ProjectFilter} from "./ProjectFilter";
import ProjectAdd from "./ProjectAdd";
import CreateProjectDialog from "../components/CreateProjectDialog";


export default class ProjectList extends React.Component{
    constructor(props) {
        super(props);
        this.state={projects: [],updated:false};

        this.createProject=this.createProject.bind(this);
        this.deleteProject=this.deleteProject.bind(this);
        this.createProject=this.createProject.bind(this);
    }

    componentDidMount(){
        this.loadProjects();
    }



    componentDidUpdate(prevProps, prevState, snapshot) {
    }


    createProject(newProject){
    }

    deleteProject(id){
    }

    loadProjects(){

    }
    render(){
        return(
            <div style={{
                background: '#EEE',
                padding: '2%',
            }}>
                <ProjectTable projects={this.props.projects} deleteProject={this.deleteProject}/>
                <CreateProjectDialog createProject={this.createProject}/>
            </div>
        )
    }
}
