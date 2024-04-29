//work code/////////////////////////////////////////////////////////////////////////////////

import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditTaskModal = ({isVisible, onEdit, onCancel, task}) => {
  const [editedTask, setEditedTask] = useState({
    ...task,
    duedate: task?.duedate || new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (key, value) => {
    setEditedTask(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    const currentDate = new Date();
    if (selectedDate && selectedDate >= currentDate) {
      setEditedTask(prevState => ({
        ...prevState,
        duedate: selectedDate,
      }));
    }
  };

  const handleEdit = () => {
    if (!editedTask.title) {
      alert('Please add task title');
      return;
    }
    if (!editedTask.description) {
      alert('Please add task description');
      return;
    }
    onEdit(editedTask);
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Edit Task</Text>
        <TextInput
          style={styles.input}
          value={editedTask.title}
          onChangeText={text => handleChange('title', text)}
          placeholder="Enter title"
        />
        <TextInput
          style={[styles.input, {height: 100}]}
          multiline
          value={editedTask.description}
          onChangeText={text => handleChange('description', text)}
          placeholder="Enter description"
        />
        <Text style={styles.label}>Due Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.datePickerText}>
            {editedTask.duedate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={editedTask.duedate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            onChange={handleDateChange}
            minimumDate={new Date()} // Set minimum date to today's date
          />
        )}
        <Text style={styles.label}>Priority</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              editedTask.priority === 'high' && styles.selectedButton,
            ]}
            onPress={() => handleChange('priority', 'high')}>
            <Text>High</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioButton,
              editedTask.priority === 'medium' && styles.selectedButton,
            ]}
            onPress={() => handleChange('priority', 'medium')}>
            <Text>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioButton,
              editedTask.priority === 'low' && styles.selectedButton,
            ]}
            onPress={() => handleChange('priority', 'low')}>
            <Text>Low</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Status</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              editedTask.status === 'incomplete' && styles.selectedButton,
            ]}
            onPress={() => handleChange('status', 'incomplete')}>
            <Text>Incomplete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioButton,
              editedTask.status === 'complete' && styles.selectedButton,
            ]}
            onPress={() => handleChange('status', 'complete')}>
            <Text>Complete</Text>
          </TouchableOpacity>
        </View>
        <Button title="Save" onPress={handleEdit} />
        <Button title="Cancel" onPress={onCancel} />
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  datePickerText: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  selectedButton: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
});

export default EditTaskModal;
