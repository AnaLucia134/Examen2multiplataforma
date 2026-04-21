import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton';

function parseDate(dateString) {
  if (!dateString) return null;

  const parts = dateString.split('-');
  if (parts.length !== 3) return null;

  const [year, month, day] = parts.map(Number);
  if (!year || !month || !day) return null;

  return new Date(year, month - 1, day);
}

function isOverdue(dateString, status) {
  if (!dateString || status === 'Completada') return false;

  const dueDate = parseDate(dateString);
  if (!dueDate) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  return dueDate < today;
}

export default function TaskCard({ task, onPress, onDelete, onToggleStatus }) {
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: overdue
            ? '#7f1d1d'
            : task.status === 'Completada'
            ? '#14532d'
            : '#1e293b',
        },
      ]}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
        <View style={styles.info}>
          <Text
            style={[
              styles.title,
              task.status === 'Completada' && styles.completedText,
            ]}
          >
            {task.title}
          </Text>

          <Text
            style={[
              styles.subject,
              task.status === 'Completada' && styles.completedText,
            ]}
          >
            Materia: {task.subject}
          </Text>

          <Text
            style={[
              styles.date,
              overdue && styles.overdueDate,
              task.status === 'Completada' && styles.completedText,
            ]}
          >
            Vence: {task.dueDate}
          </Text>

          <Text
            style={[
              styles.status,
              { color: task.status === 'Completada' ? '#22c55e' : '#facc15' },
            ]}
          >
            Estado: {task.status}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.smallButton,
            {
              backgroundColor:
                task.status === 'Pendiente' ? '#22c55e' : '#f59e0b',
            },
          ]}
          onPress={onToggleStatus}
        >
          <Text style={styles.smallButtonText}>
            {task.status === 'Pendiente' ? 'Completar' : 'Reabrir'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.smallButton, { backgroundColor: '#ef4444' }]}
          onPress={onDelete}
        >
          <Text style={styles.smallButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
  },
  info: {
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  smallButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  smallButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subject: {
    fontSize: 15,
    marginTop: 5,
    color: '#cbd5e1',
  },
  date: {
    fontSize: 14,
    marginTop: 5,
    color: '#e2e8f0',
  },
  overdueDate: {
    color: '#fecaca',
    fontWeight: 'bold',
  },
  status: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#94a3b8',
  },
});