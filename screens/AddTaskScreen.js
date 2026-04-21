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
    if (!isValidDateFormat(dueDate)) {
      Alert.alert('Error', 'Fecha inválida');
      return;
    }

    addTask(title, subject, dueDate, status);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva tarea</Text>

      <TextInput style={styles.input} placeholder="Título" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Materia" value={subject} onChangeText={setSubject} />
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={dueDate}
        onChangeText={(text) => setDueDate(formatDateInput(text))}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.btnText}>Guardar</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Ana Lucia Pérez Alvarado 202202625
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0f172a' },
  title: { fontSize: 28, color: '#fff', marginBottom: 20 },
  input: {
    backgroundColor: '#1e293b',
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#3b82f6',
    marginTop: 20,
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
  footer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#64748b',
  },
});