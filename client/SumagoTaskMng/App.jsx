
//work code/////////////////////////////////////////////////////////////////////////////////

import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import AppProvider from './src/navigation/AppProvider';
import { NavigationContainer } from '@react-navigation/native';
import { TaskProvider } from './src/context/TaskContext';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <TaskProvider>
          <AppProvider />
        </TaskProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
