import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, Dimensions, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_BASE_URL } from '../constant/constant';
import PushNotification from 'react-native-push-notification';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

const CreateTaskScreen = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState('');
  const [project, setProject] = useState('');
  const [status, setStatus] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    // Create notification channel
    PushNotification.createChannel(
      {
        channelId: 'task-created-channel', // Unique channel ID
        channelName: 'Task Created', // Channel name
      },
      () => console.log('Channel created successfully') // Success callback
    );
  }, []);

  const handleSubmit = async () => {
    try {
      if (!title) {
        alert('Please add task title');
        return;
      }
      if (!description) {
        alert('Please add task description');
        return;
      }

      // Make API call to create task
      const response = await axios.post(`${API_BASE_URL}/api/v1/task/post`, {
        title,
        description,
        duedate: dueDate,
        priority,
        project,
        status,
      });

      alert(response.data.message || 'Task created successfully');

      // Schedule notification for task creation
      PushNotification.localNotification({
        channelId: 'task-created-channel', // Channel ID
        title: 'Task Created', // Notification title
        message: 'Your task has been created successfully.', // Notification message
      });

      // Clear input fields
      setTitle('');
      setDescription('');
      setDueDate(new Date());
      setPriority('');
      setProject('');
      setStatus('');

      // Call the callback function if provided
      if (onTaskCreated) {
        onTaskCreated();
      }
    } catch (error) {
      alert(error.response.data.message || error.message);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    const currentDate = new Date();
    if (selectedDate && selectedDate >= currentDate) {
      setDueDate(selectedDate);
    }
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month starts from 0
    const year = date.getFullYear();

    // Add leading zeros if necessary
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  return (
    <LinearGradient
      colors={['#7E5AD5', '#FF6B8A']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView keyboardShouldPersistTaps={"always"} contentContainerStyle={styles.scrollView}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
          placeholderTextColor="#bbb"
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: isTablet ? 200 : 100 }]}
          multiline
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          placeholderTextColor="#bbb"
        />
        <Text style={styles.label}>Due Date</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateText}>{formatDate(dueDate)}</Text>
          <Icon name="calendar" size={20} color="#333" />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            onChange={handleDateChange}
            minimumDate={new Date()} // Set minimum date to today's date
          />
        )}
        <Text style={styles.label}>Priority</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[styles.radioButton, priority === 'high' && styles.selectedButtonHigh]}
            onPress={() => setPriority('high')}
          >
            <Text style={styles.radioText}>High</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, priority === 'medium' && styles.selectedButtonMedium]}
            onPress={() => setPriority('medium')}
          >
            <Text style={styles.radioText}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, priority === 'low' && styles.selectedButtonLow]}
            onPress={() => setPriority('low')}
          >
            <Text style={styles.radioText}>Low</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Project</Text>
        <TextInput
          style={styles.input}
          value={project}
          onChangeText={setProject}
          placeholder="Enter project"
          placeholderTextColor="#bbb"
        />
        <Text style={styles.label}>Status</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[styles.radioButton, status === 'incomplete' && styles.selectedButtonIncomplete]}
            onPress={() => setStatus('incomplete')}
          >
            <Text style={styles.radioText}>Incomplete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, status === 'complete' && styles.selectedButtonComplete]}
            onPress={() => setStatus('complete')}
          >
            <Text style={styles.radioText}>Complete</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: isTablet ? 50 : 20,
    alignItems: 'center',
  },
  label: {
    fontSize: isTablet ? 24 : 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff', // White
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb', // Light Grey
    borderRadius: 15,
    padding: 12,
    marginBottom: isTablet ? 20 : 10,
    backgroundColor: '#fff', // White
    color: '#333', // Dark Grey
    width: '100%',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: isTablet ? 20 : 10,
    width: '100%',
  },
  radioButton: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bbb', // Light Grey
    borderRadius: 15,
    padding: 12,
    backgroundColor: '#fff', // White
    marginRight: 10,
  },
  selectedButtonHigh: {
    backgroundColor: '#32CD32', // Lime Green
    borderColor: '#32CD32', // Lime Green
  },
  selectedButtonMedium: {
    backgroundColor: '#FFA500', // Orange
    borderColor: '#FFA500', // Orange
  },
  selectedButtonLow: {
    backgroundColor: '#FF5E78', // Pink
    borderColor: '#FF5E78', // Pink
  },
  selectedButtonIncomplete: {
    backgroundColor: '#4169E1', // Royal Blue
    borderColor: '#4169E1', // Royal Blue
  },
  selectedButtonComplete: {
    backgroundColor: '#FFD700', // Gold
    borderColor: '#FFD700', // Gold
  },
  radioText: {
    color: '#333', // Dark Grey
    fontSize: isTablet ? 18 : 16,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#bbb', // Light Grey
    borderRadius: 15,
    padding: 12,
    marginBottom: isTablet ? 20 : 10,
    backgroundColor: '#fff', // White
    width: '100%',
  },
  dateText: {
    color: '#333', // Dark Grey
    fontSize: isTablet ? 18 : 16,
  },
  submitButton: {
    backgroundColor: '#0040ff', // Indigo
    paddingHorizontal: isTablet ? 60 : 30,
    paddingVertical: isTablet ? 20 : 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '50%',
  },
  submitButtonText: {
    fontSize: isTablet ? 24 : 20,
    color: '#fff', // White
    fontWeight: 'bold',
  },
});

export default CreateTaskScreen;
