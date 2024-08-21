import React from 'react';

import './Tasks.css';
import Card from '../UI/Card';
import Task from './Task';

function Tasks(props) {
  const hasNoTasks = !props.tasks || props.tasks.length === 0;

  return (
    <section id='tasks'>
      <Card>
        <h2>Your Tasks</h2>
        {hasNoTasks && <h2>No tasks found. Start adding some!</h2>}
        <ul>
          {props.tasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              text={task.text}
              onDelete={props.onDeleteTask}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}

export default Tasks;
