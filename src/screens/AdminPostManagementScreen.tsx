import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';

export default function AdminPostManagementScreen() {
  const posts = [
    { id: 1, title: 'Should we ban plastic bags?', status: 'Active' },
    { id: 2, title: 'Is remote work better?', status: 'Flagged' },
    { id: 3, title: 'Should college be free?', status: 'Active' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Admin Post Management</Text>

      {posts.map((post) => (
        <View key={post.id} style={styles.card}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postStatus}>Status: {post.status}</Text>
          <View style={styles.actions}>
            <Pressable style={styles.actionBtn}>
              <Text style={styles.actionText}>View</Text>
            </Pressable>
            <Pressable style={styles.actionBtn}>
              <Text style={styles.actionText}>Edit</Text>
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
  postTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  postStatus: { fontSize: 14, color: '#666', marginBottom: 12 },
  actions: { flexDirection: 'row', justifyContent: 'space-around' },
  actionBtn: { padding: 8, borderRadius: 6, backgroundColor: '#5b4db7', flex: 1, marginHorizontal: 4, alignItems: 'center' },
  actionText: { color: '#fff', fontWeight: '600' },
  deleteBtn: { backgroundColor: '#dc3545' },
  deleteText: { color: '#fff' },
});
