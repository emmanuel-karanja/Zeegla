import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import DeleteTaskDialog from './DeleteTaskDialog';

export const TaskItem=(props)=>{
    console.log(props.projectId);
    return(
            <tr>
                <td><Link to={`/editTask/${props.projectId}/tasks/${props.task._id}/`}>{props.task.taskName}</Link></td>
                <td>{props.task.status}</td>
                <td>{props.task.createdOn.toLocaleDateString()}</td>
                <td>{props.task.assignedTo}</td>
                <td>{props.task.taskDesc}</td>
                <td>Task Color</td>
                <td><DeleteTaskDialog deleteTask={props.deleteTask} taskId={props.task._id}/> </td>
            </tr>
    )
}

TaskItem.propTypes={
    task: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired,
    projectId:PropTypes.string.isRequired,

}
