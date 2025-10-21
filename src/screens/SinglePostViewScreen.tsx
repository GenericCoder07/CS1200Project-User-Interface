import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';

export default function SinglePostViewScreen() {
  const post = {
    title: 'Should we ban plastic bags?',
    content: 'This is a detailed discussion about whether plastic bags should be banned...',
    author: 'user123',
    date: 'Oct 19, 2025',
    agreeCount: 42,
    disagreeCount: 18,
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>

      <View style={styles.card}>
        <Text style={styles.meta}>By {post.author} • {post.date}</Text>
        <Text style={styles.content}>{post.content}</Text>

        <View style={styles.voteSection}>
          <Text style={styles.voteLabel}>Agree: {post.agreeCount}</Text>
          <Text style={styles.voteLabel}>Disagree: {post.disagreeCount}</Text>
        </View>

        <View style={styles.actionButtons}>
          <Pressable style={[styles.actionButton, styles.agreeButton]} testID="agree-btn">
            <Text style={styles.actionButtonText}>Agree</Text>
          </Pressable>
          <Pressable style={[styles.actionButton, styles.disagreeButton]} testID="disagree-btn">
            <Text style={styles.actionButtonText}>Disagree</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f6f6', padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginVertical: 8 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#e5e5e5' },
  meta: { fontSize: 12, color: '#666', marginBottom: 12 },
  content: { fontSize: 16, color: '#222', marginBottom: 16, lineHeight: 22 },
  voteSection: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  voteLabel: { fontSize: 14, fontWeight: '600', color: '#333' },
  actionButtons: { flexDirection: 'row', justifyContent: 'space-around' },
  actionButton: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center', marginHorizontal: 4 },
  agreeButton: { backgroundColor: '#28a745' },
  disagreeButton: { backgroundColor: '#dc3545' },
  actionButtonText: { color: '#fff', fontWeight: '600' },
});
