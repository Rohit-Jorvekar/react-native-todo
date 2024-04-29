


// ui check again////////////////////////////////////////////////////////////////



import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import DocumentPicker from 'react-native-document-picker';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';

const ProfileScreen = () => {
  const { logout, userInfo } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState(null);

  const selectImageFromLibrary = async () => {
    console.log('select image from library');
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      if (!response) {
        // User canceled picker action, do nothing
        console.log('User canceled image selection');
        return;
      }

      setProfilePic(response[0].uri);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // User canceled picker action, do nothing
        console.log('User canceled image selection');
      } else {
        console.log('Error selecting image:', error);
      }
    }
  };

  return (
    <LinearGradient colors={['#F4EDED', '#FDF9F9']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Welcome, {userInfo && userInfo.name}</Text>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={selectImageFromLibrary}>
            <Image
              source={{
                uri: profilePic || 'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png',
              }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoLabel}>Email:</Text>
          <Text style={styles.userInfoText}>{userInfo && userInfo.email}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: RFValue(20),
    width: '100%',
    marginTop: RFValue(50),
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: RFValue(20),
    color: '#333',
    textAlign: 'center',
    fontSize: RFValue(24),
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: RFValue(20),
  },
  profileImage: {
    width: RFValue(150),
    height: RFValue(150),
    borderRadius: RFValue(75),
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(20),
  },
  userInfoLabel: {
    fontWeight: 'bold',
    marginRight: RFValue(10),
    color: '#333',
  },
  userInfoText: {
    color: '#333',
  },
  button: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: RFValue(20),
    paddingVertical: RFValue(10),
    borderRadius: RFValue(8),
    marginTop: RFValue(20),
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: RFValue(16),
  },
});

export default ProfileScreen;


