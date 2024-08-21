import React from 'react';

import './Task.css';

function Task(props) {
  return <li className="task-item" onClick={props.onDelete.bind(null, props.id)}>{props.text}</li>;
}

export default Task;
