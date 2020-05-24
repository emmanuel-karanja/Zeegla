import React from 'react';
import {TaskItem} from "./TaskItem";
import {Table} from "react-bootstrap";
import PropTypes from 'prop-types';

export const TaskTable=(props)=>{
    console.log('Inside the TaskTable. ProjectId:' + props.projectId);
    const taskItems=props.tasks.map(task=> <TaskItem key={task._id}
                                           task={task}
                                           deleteTask={props.deleteTask}
                                           projectId={props.projectId}/>)
    return(
        <Table bordered hover responsive>
            <thead>
            <tr>
                <th>Task-Name</th>
                <th>Status</th>
                <th>Created On</th>
                <th>Assigned To</th>
                <th>Task Desc</th>
                <th>Task-Color</th>
            </tr>
            </thead>
            <tbody>{taskItems}</tbody>
        </Table>
    );
}

TaskTable.propTypes= {
    tasks: PropTypes.array.isRequired,
    deleteTask: PropTypes.func.isRequired,
    projectId: PropTypes.string.isRequired,
}
