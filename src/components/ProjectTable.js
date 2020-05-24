import React from 'react';
import {ProjectItem} from "./ProjectItem";
import {Table} from "react-bootstrap";
import PropTypes from 'prop-types';
export const ProjectTable=(props)=>{
    const projectItems=props.projects.map(project=> <ProjectItem key={project._id}
                                                     project={project}
                                         deleteProject={props.deleteProject}/>)
    return(
        <div> <Table bordered hover responsive>
            <thead>
            <tr>
                <th>Project-Title</th>
                <th>Status</th>
                <th>Owner</th>
                <th>Created On</th>
                <th>Deadline</th>
                <th>Proj-Color</th>
            </tr>
            </thead>
            <tbody>{projectItems}</tbody>
        </Table>
        </div>
    )
}

ProjectTable.propTypes={
    projects: PropTypes.array.isRequired,
    deleteProject:PropTypes.func.isRequired,
    update:PropTypes.func.isRequired,
}
