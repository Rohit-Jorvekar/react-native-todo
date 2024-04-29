import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Card } from 'react-native-elements';
import { API_BASE_URL } from '../constant/constant';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState(null); // null: show all, 'complete', 'incomplete'
  const [sortAsc, setSortAsc] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/v1/task/mytask`, {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      setTasks(response.data.tasks.reverse());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [])
  );

  const refreshTasks = () => {
    fetchTasks();
    setFilterStatus(null); // Reset filter when refreshing
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  const filteredTasks = filterStatus === null ? tasks : tasks.filter(task => task.status === filterStatus);

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortAsc) {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  return (
    <LinearGradient colors={['#11998e', '#38ef7d']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello! Here Are Your Today's Tasks</Text>
      </View>

      <TouchableOpacity onPress={refreshTasks} style={styles.refreshButton}>
        <Text style={styles.refreshText}>Refresh Tasks</Text>
      </TouchableOpacity>

      <View style={styles.rowView}>
        <TouchableOpacity onPress={() => setSortAsc(!sortAsc)}>
          <MaterialCommunityIcons name={sortAsc ? "sort-ascending" : "sort-descending"} size={30} color={'white'} />
        </TouchableOpacity>
      </View>

      <View style={styles.rowView}>
        <TouchableOpacity onPress={() => setFilterStatus('complete')}>
          <Text style={[styles.filterText, filterStatus === 'complete' && styles.activeFilter]}>Complete</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setFilterStatus('incomplete')}>
          <Text style={[styles.filterText, filterStatus === 'incomplete' && styles.activeFilter]}>Incomplete</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          sortedTasks.map(task => (
            <Card key={task._id} containerStyle={styles.taskContainer}>
              <Text style={styles.title}>{task.title}</Text>
              <Text style={styles.status}>Status: {task.status}</Text>
              <Text style={styles.dueDate}>Due Date: {formatDate(new Date(task.duedate))}</Text>
              <Text style={styles.priority}>Priority: {task.priority}</Text>
              <Text style={styles.project}>Project: {task.project}</Text>
              <Text style={styles.createdAt}>Created At: {new Date(task.createdAt).toLocaleString()}</Text>
            </Card>
          ))
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  refreshButton: {
    alignItems: 'center',
    marginBottom: 10,
  },
  refreshText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  taskContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    fontSize: 16,
    marginTop: 5,
    color: '#6ab04c', // Green color
    fontWeight: 'bold', // Add bold font weight
  },
  dueDate: {
    fontSize: 16,
    marginTop: 5,
    color: '#4ca3b9', // Blue color
    fontWeight: 'bold', // Add bold font weight
  },
  project: {
    fontSize: 16,
    marginTop: 5,
    color: 'black'
  },
  priority: {
    fontSize: 16,
    marginTop: 5,
    color: '#d9534f', // Red color
    fontWeight: 'bold', // Add bold font weight
  },
  createdAt: {
    fontSize: 16,
    marginTop: 5,
    color: 'black'
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterText: {
    fontSize: 16,
    color: 'white',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeFilter: {
    backgroundColor: '#3c6382', // Darker background color for active filter
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
