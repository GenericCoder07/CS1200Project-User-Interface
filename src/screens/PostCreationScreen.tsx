// src/screens/PostCreationScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App'; // keep this import if you have RootStackParamList
type NavProp = NativeStackNavigationProp<RootStackParamList, 'PostCreation'>;

export default function PostCreationScreen({ navigation }: { navigation: NavProp }) {
  const [postTitle, setPostTitle] = React.useState('');
  const [postContent, setPostContent] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const CREATE_POST_URL = 'https://umpyr.tech/api/create-post';
  const AI_URL = 'https://umpyr.tech/api/ai';

  const fetchAiReplies = async (userText: string) => {
    try {
      console.log('Calling AI with:', JSON.stringify({ msg: userText }), '->', AI_URL);
      const resp = await fetch(AI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ msg: userText }),
      });
      console.log('AI fetch status', resp.status);
      if (!resp.ok) {
        const txt = await resp.text().catch(() => '');
        console.warn('AI server error', resp.status, txt);
        return null;
      }
      const data = await resp.json();
      let aiReply =
        data['response-text'] ||
        data.response ||
        data.reply ||
        data.aiReply ||
        data.ai_reply;
      if (!aiReply) {
        const parts = ['ai-text-1','ai-text-2','ai-text-3','ai-text-4']
          .map(k => (data[k] || '').trim())
          .filter(Boolean);
        aiReply = parts.join('\n\n');
      }
      return aiReply || null;
    } catch (err) {
      console.error('fetchAiReplies error', err);
      return null;
    }
  };

  const handleSubmit = async () => {
    const title = postTitle.trim();
    const content = postContent.trim();

    if (!title || !content) {
      Alert.alert('Missing fields', 'Please enter both title and content.');
      return;
    }

    setLoading(true);
    try {
      console.log('Submitting post:', { title, content });
      const resp = await fetch(CREATE_POST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      console.log('create-post status', resp.status);

      if (!resp.ok) {
        const text = await resp.text().catch(() => '');
        console.warn('Server error', resp.status, text);
        Alert.alert('Server error', `Status ${resp.status}. Using demo fallback.`);
        useMockAndNavigate(title, content);
        return;
      }

      const data = await resp.json();
      console.log('create-post response keys:', Object.keys(data || {}));

      // If server already returned an AI reply, use it. Otherwise call AI endpoint.
      let aiReply =
        data.aiReply ||
        data.ai_reply ||
        data['response-text'] ||
        data.response ||
        data.reply;

      if (!aiReply) {
        // fetch AI separately using the post content (server-side AI endpoint)
        aiReply = await fetchAiReplies(content);
      }

      if (aiReply) {
        navigation.navigate('Vote', { question: title, reply: aiReply });
        setPostTitle('');
        setPostContent('');
      } else {
        Alert.alert('Post created', 'Saved but no AI reply available — using demo fallback.');
        useMockAndNavigate(title, content);
      }
    } catch (err: any) {
      console.error('create-post error', err);
      Alert.alert('Network error', 'Could not reach server. Using demo fallback.');
      useMockAndNavigate(title, content);
    } finally {
      setLoading(false);
    }
  };

  const useMockAndNavigate = (title: string, content: string) => {
    const mockAi = `Mock AI response for "${title}":\n• Quick take: This is an interesting prompt.\n• Short summary: Pros and cons exist.\n• Counterpoint: Consider logistics.\n• Final thought: Keep it concise.`;
    console.log('Using mock AI reply:', mockAi);
    navigation.navigate('Vote', { question: title, reply: mockAi });
  };

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
          editable={!loading}
        />

        <Text style={styles.label}>Post Content:</Text>
        <TextInput
          style={styles.textArea}
          multiline
          placeholder="Enter post content..."
          value={postContent}
          onChangeText={setPostContent}
          testID="post-content-input"
          editable={!loading}
        />

        <Pressable
          style={[styles.button, loading ? { opacity: 0.7 } : null]}
          testID="submit-post-btn"
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Submit Post</Text>}
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
