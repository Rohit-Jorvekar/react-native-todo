import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Button, Platform, Alert, Dimensions } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import PushNotification from 'react-native-push-notification';
import { API_BASE_URL } from '../constant/constant';

const TaskDetailsScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    title: '',
    description: '',
    dueDate: new Date(),
    priority: '',
    project: '',
    status: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'task-notification-channel',
        channelName: 'Task Notifications',
      },
      (created) => console.log(`Channel creation ${created ? 'success' : 'failed'}`)
    );
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [])
  );

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/v1/task/mytask`);
      setTasks(response.data.tasks.reverse());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const handleTaskAction = (task, action) => {
    setSelectedTask(task);
    if (action === 'delete') {
      handleDeletePrompt(task._id);
    } else if (action === 'update') {
      setUpdatedTask({
        title: task.title,
        description: task.description,
        dueDate: new Date(task.duedate),
        priority: task.priority,
        project: task.project,
        status: task.status,
      });
      setModalVisible(true);
    }
  };

  const handleDeletePrompt = (taskId) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteTask(taskId),
        },
      ],
      { cancelable: true }
    );
  };

  const deleteTask = async (taskId) => {
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/api/v1/task/delete/${taskId}`);
      setLoading(false);
      fetchTasks();
      alert('Task deleted successfully');
      
      PushNotification.localNotification({
        channelId: 'task-notification-channel',
        title: 'Task Deleted',
        message: 'A task has been deleted.',
      });
    } catch (error) {
      setLoading(false);
      console.error('Error deleting task:', error);
      alert('Error deleting task');
    }
  };

  const handleUpdateTask = async () => {
    try {
      setLoading(true);
      await axios.put(`${API_BASE_URL}/api/v1/task/update/${selectedTask._id}`, updatedTask);
      setLoading(false);
      fetchTasks();
      alert('Task updated successfully');
      setModalVisible(false);
      
      PushNotification.localNotification({
        channelId: 'task-notification-channel',
        title: 'Task Updated',
        message: 'A task has been updated.',
      });
    } catch (error) {
      setLoading(false);
      console.error('Error updating task:', error);
      alert('Error updating task');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setUpdatedTask((prevState) => ({
        ...prevState,
        dueDate: selectedDate,
      }));
    }
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FBC2EB', '#A6C1EE']} style={styles.gradient}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {tasks.map((task) => (
            <TouchableOpacity key={task._id} style={styles.taskContainer} onPress={() => handleTaskAction(task, 'update')}>
              <Text style={styles.title}>{task.title}</Text>
              <Text style={styles.description}>{task.description}</Text>
              <Text style={styles.priority}>Priority: {task.priority}</Text>
              <Text style={styles.dueDate}>Due Date: {formatDate(new Date(task.duedate))}</Text>
              <Text style={styles.project}>Project: {task.project}</Text>
              <Text style={styles.status}>Status: {task.status}</Text>
              <Text style={styles.createdAt}>Created At: {new Date(task.createdAt).toLocaleString()}</Text>
              <TouchableOpacity onPress={() => handleTaskAction(task, 'delete')}>
                <Text style={styles.deleteButton}>Delete Task</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <ScrollView contentContainerStyle={styles.modalContainer}>
              <Text style={styles.modalHeading}>Update Task</Text>
              <Text>Title:</Text>
              <TextInput style={styles.input} value={updatedTask.title} onChangeText={(text) => setUpdatedTask((prevState) => ({ ...prevState, title: text }))} placeholder="Title" />
              <Text>Description:</Text>
              <TextInput
                style={[styles.input, { height: 100 }]}
                multiline
                value={updatedTask.description}
                onChangeText={(text) => setUpdatedTask((prevState) => ({ ...prevState, description: text }))}
                placeholder="Description"
              />
              <Text>Due Date:</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={styles.input}>{formatDate(updatedTask.dueDate)}</Text>
              </TouchableOpacity>
              {showDatePicker && <DateTimePicker value={updatedTask.dueDate} mode="date" display="default" onChange={handleDateChange} minimumDate={new Date()} />}
              <Text>Priority:</Text>
              <TextInput style={styles.input} value={updatedTask.priority} onChangeText={(text) => setUpdatedTask((prevState) => ({ ...prevState, priority: text }))} placeholder="Priority" />
              <Text>Project:</Text>
              <TextInput style={styles.input} value={updatedTask.project} onChangeText={(text) => setUpdatedTask((prevState) => ({ ...prevState, project: text }))} placeholder="Project" />
              <Text>Status:</Text>
              <TextInput style={styles.input} value={updatedTask.status} onChangeText={(text) => setUpdatedTask((prevState) => ({ ...prevState, status: text }))} placeholder="Status" />
              <View style={styles.buttonContainer}>
                <Button title="Update Task" onPress={handleUpdateTask} color="#841584" />
                <Button title="Cancel" onPress={() => setModalVisible(false)} color="#DD2C00" />
              </View>
            </ScrollView>
          </View>
        </Modal>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: Dimensions.get('window').width > 400 ? 36 : 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF4500', // Deep orange color
    textAlign: 'center',
  },
  taskContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: Dimensions.get('window').width > 400 ? 24 : 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FF1493', // Hot pink color
  },
  description: {
    fontSize: Dimensions.get('window').width > 400 ? 20 : 18,
    color: '#4B0082', // Indigo color
    marginBottom: 5,
  },
  priority: {
    fontSize: Dimensions.get('window').width > 400 ? 20 : 18,
    marginBottom: 5,
    color: '#4682B4', // Steel blue color
  },
  dueDate: {
    fontSize: Dimensions.get('window').width > 400 ? 20 : 18,
    marginBottom: 5,
    color: '#008080', // Teal color
  },
  project: {
    fontSize: Dimensions.get('window').width > 400 ? 20 : 18,
    marginBottom: 5,
    color: '#FF6347', // Tomato color
  },
  status: {
    fontSize: Dimensions.get('window').width > 400 ? 20 : 18,
    marginBottom: 5,
    color: '#32CD32', // Lime green color
  },
  createdAt: {
    fontSize: Dimensions.get('window').width > 400 ? 18 : 16,
    color: '#696969', // Dim gray color
  },
  deleteButton: {
    fontSize: Dimensions.get('window').width > 400 ? 20 : 18,
    color: '#FF4500', // Orange red color
    marginTop: 10,
    textAlign: 'right',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    top: 50
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    paddingHorizontal: 30,
    width: '90%',
    maxWidth: 500,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeading: {
    fontSize: Dimensions.get('window').width > 400 ? 32 : 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6200EE',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default TaskDetailsScreen;
