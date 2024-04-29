import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Dimensions, Modal } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
  const isMobile = width <= 768;

  const handlePasswordReset = () => {
    // Implement your password reset logic here
    console.log(`Reset password email sent to ${resetEmail}`);
    setModalVisible(false); // Close the modal after sending the reset request
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#DC5464" barStyle="light-content" />
      <Text style={styles.heading}>Welcome Back!</Text>
      <TextInput
        style={[styles.input, isMobile && styles.inputMobile]}
        placeholder="Enter email"
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
      <TouchableOpacity style={[styles.button, isMobile && styles.buttonMobile]} onPress={() => login(email, password)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{margin:10}} onPress={() => setModalVisible(true)}>
        <Text style={styles.signupText}>Forgot password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>Create New Account</Text>
      </TouchableOpacity>

      {/* Modal for Password Reset */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Reset Password</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Your email"
              onChangeText={setResetEmail}
              value={resetEmail}
              keyboardType="email-address"
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={handlePasswordReset}
            >
              <Text style={styles.textStyle}>Send Reset Link</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: 'black'
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
    marginBottom: 20,
  },
  buttonMobile: {
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signupText: {
    color: '#007bff',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  modalInput: {
    width: '90%',
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  buttonClose: {
    width: '90%',
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default LoginScreen;
