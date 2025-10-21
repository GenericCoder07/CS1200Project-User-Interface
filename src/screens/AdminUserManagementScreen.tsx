import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';

export default function AdminUserManagementScreen() {
  const users = [
    { id: 1, username: 'user123', email: 'user123@example.com', status: 'Active' },
    { id: 2, username: 'john_doe', email: 'john@example.com', status: 'Suspended' },
    { id: 3, username: 'jane_smith', email: 'jane@example.com', status: 'Active' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Admin User Management</Text>

      {users.map((user) => (
        <View key={user.id} style={styles.card}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.status}>Status: {user.status}</Text>
          <View style={styles.actions}>
            <Pressable style={styles.actionBtn}>
              <Text style={styles.actionText}>View</Text>
            </Pressable>
            <Pressable style={styles.actionBtn}>
              <Text style={styles.actionText}>Suspend</Text>
            </Pressable>
            <Pressable style={[styles.actionBtn, styles.deleteBtn]}>
              <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f6f6', padding: 16 },
  title: { fontSize: 18, fontWeight: '600', marginVertical: 8 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#e5e5e5', marginBottom: 12 },
  username: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  email: { fontSize: 14, color: '#666', marginBottom: 4 },
  status: { fontSize: 14, color: '#666', marginBottom: 12 },
  actions: { flexDirection: 'row', justifyContent: 'space-around' },
  actionBtn: { padding: 8, borderRadius: 6, backgroundColor: '#5b4db7', flex: 1, marginHorizontal: 4, alignItems: 'center' },
  actionText: { color: '#fff', fontWeight: '600' },
  deleteBtn: { backgroundColor: '#dc3545' },
  deleteText: { color: '#fff' },
});
