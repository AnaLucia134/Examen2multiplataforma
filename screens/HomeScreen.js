import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TaskCard from '../components/TaskCard';

export default function HomeScreen({
  navigation,
  tasks,
  deleteTask,
  updateTask,
}) {
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.status === 'Pendiente' && b.status === 'Completada') return -1;
    if (a.status === 'Completada' && b.status === 'Pendiente') return 1;
    return 0;
  });

  const pendingCount = tasks.filter(
    (task) => task.status === 'Pendiente'
  ).length;

  return (
    <LinearGradient
      colors={['#0f172a', '#020617']}
      style={styles.container}
    >
      <Text style={styles.title}>Mi TODO LIST</Text>

      <Text style={styles.counter}>
        Tareas pendientes: {pendingCount}
      </Text>

      <FlatList
        data={sortedTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() =>
              navigation.navigate('TaskDetail', { taskId: item.id })
            }
            onDelete={() => deleteTask(item.id)}
            onToggleStatus={() =>
              updateTask(item.id, {
                status:
                  item.status === 'Pendiente'
                    ? 'Completada'
                    : 'Pendiente',
              })
            }
          />
        )}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={styles.floatingText}>+ Nuevo</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
  },
  counter: {
    fontSize: 16,
    marginBottom: 15,
    color: '#facc15',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 30,
  },
  floatingText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});