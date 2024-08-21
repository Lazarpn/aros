import React, { useState } from 'react';

import './TaskInput.css';
import Card from '../UI/Card';

function TaskInput(props) {
  const [enteredTaskText, setEnteredTaskText] = useState('');

  function updateTaskTextHandler(event) {
    setEnteredTaskText(event.target.value);
  }

  function taskSubmitHandler(event) {
    event.preventDefault();

    if (enteredTaskText.trim().length === 0) {
      alert('Invalid text - please enter a longer one!');
      return;
    }

    props.onAddTask(enteredTaskText);

    setEnteredTaskText('');
  }

  return (
    <section id='task-input'>
      <Card>
        <form onSubmit={taskSubmitHandler}>
          <label htmlFor='text'>New Task</label>
          <input
            type='text'
            id='text'
            value={enteredTaskText}
            onChange={updateTaskTextHandler}
          />
          <button>Add Task</button>
        </form>
      </Card>
    </section>
  );
}

export default TaskInput;
