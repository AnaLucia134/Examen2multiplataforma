import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';

function formatDateInput(value) {
  const numbers = value.replace(/\D/g, '').slice(0, 8);

  if (numbers.length <= 4) return numbers;
  if (numbers.length <= 6) return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
  return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(6, 8)}`;
}

function isValidDateFormat(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

export default function TaskDetailScreen({
  route,
  navigation,
  tasks,
  updateTask,
}) {
  const { taskId } = route.params;
  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Tarea no encontrada</Text>
      </View>
    );
  }

  const [title, setTitle] = useState(task.title);
  const [subject, setSubject] = useState(task.subject || '');
  const [dueDate, setDueDate] = useState(task.dueDate || '');
  const [status, setStatus] = useState(task.status);

  const handleSave = () => {
    if (title.trim() === '' || subject.trim() === '' || dueDate.trim() === '') {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    if (!isValidDateFormat(dueDate.trim())) {
      Alert.alert('Error', 'La fecha debe tener formato YYYY-MM-DD');
      return;
    }

    updateTask(task.id, {
      title: title.trim(),
      subject: subject.trim(),
      dueDate: dueDate.trim(),
      status,
    });

    navigation.navigate('Home');
  };

  const handleToggleStatus = () => {
    const newStatus = status === 'Pendiente' ? 'Completada' : 'Pendiente';
    setStatus(newStatus);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle de tarea</Text>
      <Text style={styles.subtitle}>Edita la información de tu tarea</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Título de la tarea</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Editar título"
          placeholderTextColor="#94a3b8"
        />

        <Text style={styles.label}>Materia</Text>
        <TextInput
          style={styles.input}
          value={subject}
          onChangeText={setSubject}
          placeholder="Editar materia"
          placeholderTextColor="#94a3b8"
        />

        <Text style={styles.label}>Fecha de vencimiento</Text>
        <TextInput
          style={styles.input}
          value={dueDate}
          onChangeText={(text) => setDueDate(formatDateInput(text))}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#94a3b8"
          keyboardType="numeric"
          maxLength={10}
        />

        <Text style={styles.label}>Estado actual</Text>

        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusBadge,
              status === 'Pendiente'
                ? styles.statusPending
                : styles.statusCompleted,
            ]}
          >
            <Text style={styles.statusBadgeText}>{status}</Text>
          </View>

          <TouchableOpacity
            style={styles.changeButton}
            onPress={handleToggleStatus}
            activeOpacity={0.8}
          >
            <Text style={styles.changeButtonText}>Cambiar estado</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.85}
          >
            <Text style={styles.bottomButtonText}>Guardar cambios</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <Text style={styles.bottomButtonText}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0f172a',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#111c36',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#ffffff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    backgroundColor: '#1e293b',
    color: '#ffffff',
    fontSize: 16,
  },
  statusRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
    alignItems: 'center',
  },
  statusBadge: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusPending: {
    backgroundColor: '#f59e0b',
  },
  statusCompleted: {
    backgroundColor: '#22c55e',
  },
  statusBadgeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  changeButton: {
    flex: 1,
    backgroundColor: '#06b6d4',
    paddingVertical: 10,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    flex: 1,
    backgroundColor: '#6b7280',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  notFound: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#ffffff',
  },
});