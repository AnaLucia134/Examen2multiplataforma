import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './screens/HomeScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import TaskDetailScreen from './screens/TaskDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks !== null) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.log('Error al cargar tareas:', error);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.log('Error al guardar tareas:', error);
    }
  };

  const addTask = (title, subject, dueDate, status) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      subject,
      dueDate,
      status,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const updateTask = (id, updatedFields) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      )
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0f172a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Home" options={{ title: 'Lista de tareas' }}>
          {(props) => (
            <HomeScreen
              {...props}
              tasks={tasks}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="AddTask" options={{ title: 'Agregar tarea' }}>
          {(props) => (
            <AddTaskScreen
              {...props}
              addTask={addTask}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="TaskDetail" options={{ title: 'Detalle de tarea' }}>
          {(props) => (
            <TaskDetailScreen
              {...props}
              tasks={tasks}
              updateTask={updateTask}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}