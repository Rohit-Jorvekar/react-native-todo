


///ui test//////////////////////////////////////////////////////////////////////////////




import { View, Text, Image, StyleSheet, StatusBar, Dimensions } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const { width } = Dimensions.get('window');
const isMobile = width <= 768;

const HomeTab = () => {
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
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
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
}

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

export default HomeTab;



