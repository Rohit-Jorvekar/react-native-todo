//work code/////////////////////////////////////////////////////////////////////////////////

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeTab from '../tabs/HomeTab';
import TaskDetailsTab from '../tabs/TaskDetailsTab';
import CreateTaskTab from '../tabs/CreateTaskTab';
import ProfileTab from '../tabs/ProfileTab';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
  
    <Tab.Navigator
    
      screenOptions={({ route }) => ({
        
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'TaskDetails') {
            iconName = focused ? 'list-sharp' : 'list-outline';
          } else if (route.name === 'CreateTask') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ffff',
        tabBarInactiveTintColor: '#ffff',
        tabBarStyle: {
          backgroundColor: '#FF4E4E',
          borderTopColor: 'lightgray',
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeTab} options={{ headerShown: false }} />
      <Tab.Screen name="TaskDetails" component={TaskDetailsTab} options={{ headerShown: false }} />
      <Tab.Screen name="CreateTask" component={CreateTaskTab} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileTab} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default TabNavigation;

