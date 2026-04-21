import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';

function formatDateInput(value) {
  const numbers = value.replace(/\D/g, '').slice(0, 8);

  if (numbers.length <= 4) return numbers;
  if (numbers.length <= 6) return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
  return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(6, 8)}`;
}

function isValidDateFormat(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

export default function AddTaskScreen({ navigation, addTask }) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pendiente');

  const handleSave = () => {
    if (title.trim() === '' || subject.trim() === '' || dueDate.trim() === '') {
      Alert.alert('Error', 'Completa el título, la materia y la fecha');
      return;
    }

    if (!isValidDateFormat(dueDate.trim())) {
      Alert.alert('Error', 'La fecha debe tener formato YYYY-MM-DD');
      return;
    }

    addTask(title.trim(), subject.trim(), dueDate.trim(), status);

    setTitle('');
    setSubject('');
    setDueDate('');
    setStatus('Pendiente');

    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva tarea</Text>
      <Text style={styles.subtitle}>Completa la información de tu tarea</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Título de la tarea</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Escribe la tarea"
          placeholderTextColor="#94a3b8"
        />

        <Text style={styles.label}>Materia</Text>
        <TextInput
          style={styles.input}
          value={subject}
          onChangeText={setSubject}
          placeholder="Ej: Matemática"
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

        <Text style={styles.label}>Estado inicial</Text>

        <View style={styles.statusButtonsRow}>
          <TouchableOpacity
            style={[
              styles.statusButton,
              status === 'Pendiente'
                ? styles.statusButtonActivePending
                : styles.statusButtonInactive,
            ]}
            onPress={() => setStatus('Pendiente')}
            activeOpacity={0.8}
          >
            <Text style={styles.statusButtonText}>Pendiente</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.statusButton,
              status === 'Completada'
                ? styles.statusButtonActiveCompleted
                : styles.statusButtonInactive,
            ]}
            onPress={() => setStatus('Completada')}
            activeOpacity={0.8}
          >
            <Text style={styles.statusButtonText}>Completada</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.85}
        >
          <Text style={styles.saveButtonText}>Guardar tarea</Text>
        </TouchableOpacity>
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
  statusButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusButtonActivePending: {
    backgroundColor: '#f59e0b',
  },
  statusButtonActiveCompleted: {
    backgroundColor: '#22c55e',
  },
  statusButtonInactive: {
    backgroundColor: '#6b7280',
  },
  statusButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});