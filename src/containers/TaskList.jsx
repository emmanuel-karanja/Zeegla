import React from 'react';
import Task from '.Task';
import PropTypes from 'prop-types';

export const TastList=(props)=>{
  return(
    <div className="task-list">
       <div className="task-list-title">
         <strong>{props.status}</strong>
       </div>
       {props.tasks.map(task=>(
         <Task key={task._id} task={task} /> ))}
    </div>
  );
}

TaskList.propTypes={
  status: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
}
