
//work code/////////////////////////////////////////////////////////////////////////////////
// AppProvider.js
import React from 'react';
import { AuthContext } from '../context/AuthContext';
import { View, ActivityIndicator,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import TabNavigation from './TabNavgation';

const AppProvider = () => {
  const { isLoading, userToken } = React.useContext(AuthContext);

  if (isLoading) {
    return (
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      
      </View>
    );
  }

  return userToken ? <TabNavigation /> : <AuthStack />;
};

export default AppProvider;
