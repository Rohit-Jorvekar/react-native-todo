

///ui test//////////////////////////////////////////////////////////////////////////////


import React from 'react';
import { View, Text, Image, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen';

const Stack = createNativeStackNavigator();

const { width } = Dimensions.get('window');
const isMobile = width <= 768;

const TaskDetailsTab = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#DC5464" barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerTitle: () => (
            <Image
              source={require('../assets/images/common/launch_screen.png')}
              style={[
                styles.headerLogo,
                isMobile && styles.headerLogoMobile,
              ]}
            />
          ),
          headerStyle: {
            backgroundColor: '#DC5464',
          },
          headerTintColor: '#ffff',
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="TaskDetailsScreen"
          component={TaskDetailsScreen}
          options={{
            headerTitle: () => (
              <Image
                source={require('../assets/images/common/launch_screen.png')}
                style={[
                  styles.headerLogo,
                  isMobile && styles.headerLogoMobile,
                ]}
              />
            ),
          }}
        />
      </Stack.Navigator>
    </View>
  );
};

const logoWidth = isMobile ? width * 0.8 : 300; // Adjust as needed for tablet
const styles = StyleSheet.create({
  headerLogo: {
    width: logoWidth,
    height: 40, // Adjust height as needed
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  headerLogoMobile: {
    width: width * 0.8, // Adjust as needed for mobile
  },
});

export default TaskDetailsTab;
