import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import DeleteProjectDialog from "./DeleteProjectDialog";

export const ProjectItem=(props)=>{
    return(
             <tr>
                <td><Link to={`/projectDetails/${props.project._id}`}>
                {props.project.projectName}</Link></td>
                <td>{props.project.status}</td>
                <td>{props.project.createdBy}</td>
                <td>{props.project.createdOn.toLocaleDateString()}</td>
                <td>Color</td>
                 <td><DeleteProjectDialog deleteProject={props.deleteProject} projectId={props.project._id}/></td>
            </tr>
    )
}

ProjectItem.propTypes={
    project: PropTypes.object.isRequired,
    deleteProject: PropTypes.func.isRequired,
};
