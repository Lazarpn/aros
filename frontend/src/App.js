import React, { useState, useEffect } from 'react';

import TaskInput from './components/tasks/TaskInput';
import Tasks from './components/tasks/Tasks';
import ErrorAlert from './components/UI/ErrorAlert';

function App() {
  const [loadedTasks, setLoadedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      setIsLoading(true);

      try {
        const response = await fetch('http://localhost:3000/tasks');

        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message || 'Fetching the tasks failed.');
        }

        setLoadedTasks(resData.tasks);
      } catch (err) {
        setError(
          err.message ||
            'Fetching tasks failed - the server responsed with an error.'
        );
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  async function addTaskHandler(taskText) {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify({
          text: taskText,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Adding the task failed.');
      }

      setLoadedTasks((prevTasks) => {
        const updatedTasks = [
          {
            id: resData.task.id,
            text: taskText,
          },
          ...prevTasks,
        ];
        return updatedTasks;
      });
    } catch (err) {
      setError(
        err.message ||
          'Adding a task failed - the server responsed with an error.'
      );
    }
    setIsLoading(false);
  }

  async function deleteTaskHandler(taskId) {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/tasks/' + taskId, {
        method: 'DELETE',
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Deleting the task failed.');
      }

      setLoadedTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
        return updatedTasks;
      });
    } catch (err) {
      setError(
        err.message ||
          'Deleting the task failed - the server responsed with an error.'
      );
    }
    setIsLoading(false);
  }

  return (
    <div>
      {error && <ErrorAlert errorText={error} />}
      <TaskInput onAddTask={addTaskHandler} />
      {!isLoading && (
        <Tasks tasks={loadedTasks} onDeleteTask={deleteTaskHandler} />
      )}
    </div>
  );
}

export default App;
