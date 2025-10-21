import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

export default function PostCreationScreen() {
  const [postTitle, setPostTitle] = React.useState('');
  const [postContent, setPostContent] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Post</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Post Title:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter post title..."
          value={postTitle}
          onChangeText={setPostTitle}
          testID="post-title-input"
        />

        <Text style={styles.label}>Post Content:</Text>
        <TextInput
          style={styles.textArea}
          multiline
          placeholder="Enter post content..."
          value={postContent}
          onChangeText={setPostContent}
          testID="post-content-input"
        />

        <Pressable style={styles.button} testID="submit-post-btn">
          <Text style={styles.buttonText}>Submit Post</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f6f6', padding: 16 },
  title: { fontSize: 18, fontWeight: '600', marginVertical: 8 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#e5e5e5' },
  label: { fontSize: 14, fontWeight: '500', marginTop: 12, marginBottom: 4 },
  input: {
    borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 8, padding: 10,
    backgroundColor: '#fafafa',
  },
  textArea: {
    borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 8, padding: 10,
    minHeight: 120, textAlignVertical: 'top', backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#5b4db7', padding: 12, borderRadius: 8,
    alignItems: 'center', marginTop: 16,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});
