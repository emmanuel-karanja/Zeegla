import React from 'react';
import{TASK_STATUSES} from '../modules/tasks'

const Task=props=>{
  return(
    <div className="task">
      <div className="task-header">
       <div> {props.task.title}</div>
       <select value={props.task.status} onChange={onStatusChange}>
        {TASK_STATUSES.map(status=>(
          <option key={status} value={status}>{status}</option>
        ))}
        </select>
        <button onClick={onDelete}> Delete </button>
      </div>
      <hr/>
      <div className="task-body">{props.task.description}</div>
      <div className="task_timer">{props.task.timer}s</div>
    </div>
  );

  function onStatusChange(e){
    const changedTask=props.task;
    changedTask.status=e.target.value;
    props.onStatusChange(changedTask);
  }

  function onDelete(){
    props.onDeleteTask(props.task._id);
  }
}

export default Task;
