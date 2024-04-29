

//work code/////////////////////////////////////////////////////////////////////////////////

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import {API_BASE_URL} from '../constant/constant'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // const res = await axios.post("http://192.168.43.168:5000/api/v1/user/login", { email, password });
      const res = await axios.post(`${API_BASE_URL}/api/v1/user/login`, { email, password });
      if (res.data && res.data.token) {
        const { token, user } = res.data;
        setUserToken(token);
        setUserInfo(user);
        AsyncStorage.setItem('userToken', token);
        AsyncStorage.setItem('userInfo', JSON.stringify(user));
        console.log('User logged in successfully.');
      } else {
        console.log("Invalid response format:", res.data);
      }
    } catch (error) {
      console.log(`Login error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  const logout = async () => {
    setIsLoading(true);
    setUserToken(null);
    setUserInfo(null);
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('userInfo');
    console.log('User logged out successfully.');
    setIsLoading(false);
  }

  const isLoggedIn = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userStr = await AsyncStorage.getItem('userInfo');
      if (token && userStr) {
        setUserToken(token);
        setUserInfo(JSON.parse(userStr));
      }
    } catch (error) {
      console.log(`Error checking login status: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoading, userToken, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
