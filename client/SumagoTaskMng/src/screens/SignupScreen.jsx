




//ui test////////////////////////////////////////////////////////////////////

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'react-native-axios';
import {API_BASE_URL} from '../constant/constant'

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        // 'http://192.168.43.168:5000/api/v1/user/register',
        `${API_BASE_URL}/api/v1/user/register`,
        { name, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  const handleAlreadyHaveAccount = () => {
    navigation.navigate('Login');
  };

  const { width } = Dimensions.get('window');
  const isMobile = width <= 768;

  return (
    <View style={styles.container}>
    <StatusBar backgroundColor="#DC5464" barStyle="light-content" />
      <StatusBar backgroundColor="#DC5464" barStyle="light-content" />
      <Text style={[styles.heading, isMobile && styles.headingMobile]}>Register</Text>
      <TextInput
        style={[styles.input, isMobile && styles.inputMobile]}
        placeholder="Enter Your Name"
        value={name}
        placeholderTextColor="black"
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, isMobile && styles.inputMobile]}
        placeholder="Enter Your Email"
        placeholderTextColor="black"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, isMobile && styles.inputMobile]}
        placeholder="Password"
        placeholderTextColor="black"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={[styles.button, isMobile && styles.buttonMobile]} onPress={handleRegister}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAlreadyHaveAccount}>
        <Text style={[styles.loginText, isMobile && styles.loginTextMobile]}>Already have an account? Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:'green',marginTop:10,borderRadius:10}} >
        <Text style={[styles.addloginText, isMobile && styles.loginTextMobile]}>Addmin Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  headingMobile: {
    fontSize: 24,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    
    color:'black'
  },
  inputMobile: {
    width: '90%',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#FF4E4E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonMobile: {
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loginText: {
    color: '#007bff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  loginTextMobile: {
    fontSize: 14,
  },
  addloginText:{
    color:'white',
    padding:10,
    textAlign:'center'
    
  }
});

export default SignupScreen;

