

//work code/////////////////////////////////////////////////////////////////////////////////
// TaskContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../constant/constant'
const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      // const response = await axios.get('http://192.168.43.168:5000/api/v1/task/mytask');
      const response = await axios.get(`${API_BASE_URL}/api/v1/task/mytask`);
      setTasks(response.data.tasks);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;

