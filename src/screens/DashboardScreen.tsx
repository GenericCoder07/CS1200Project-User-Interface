import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';

export default function DashboardScreen({ navigation }: any) {
  const [question, setQuestion] = React.useState('');
  const [aiReply, setAiReply] = React.useState('AI response will appear here...');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Your Question:</Text>
        <TextInput
          style={styles.textArea}
          multiline
          placeholder="Type your question here..."
          value={question}
          onChangeText={setQuestion}
          testID="question-input"
        />

        <Text style={styles.label}>Canned Select:</Text>
        <View style={styles.selectPlaceholder}>
          <Text style={styles.selectText}>Select a canned question...</Text>
        </View>

        <Pressable style={styles.button} testID="generate-btn">
          <Text style={styles.buttonText}>Generate AI Response</Text>
        </Pressable>

        <Text style={styles.label}>AI Output:</Text>
        <View style={styles.aiOutputBox}>
          <Text style={styles.aiOutputText} testID="ai-output">{aiReply}</Text>
        </View>

        <View style={styles.actionButtons}>
          <Pressable style={[styles.actionButton, styles.supportButton]} testID="support-btn">
            <Text style={styles.actionButtonText}>Support</Text>
          </Pressable>
          <Pressable style={[styles.actionButton, styles.dontSupportButton]} testID="dont-support-btn">
            <Text style={styles.actionButtonText}>Don't Support</Text>
          </Pressable>
        </View>
      </View>

      <Pressable style={styles.navButton} onPress={() => navigation.navigate('PostCreation')}>
        <Text style={styles.navButtonText}>Create New Post</Text>
      </Pressable>

      <Pressable style={styles.navButton} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.navButtonText}>Go to Settings</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f6f6', padding: 16 },
  title: { fontSize: 18, fontWeight: '600', marginVertical: 8 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#e5e5e5', marginBottom: 12 },
  label: { fontSize: 14, fontWeight: '500', marginTop: 12, marginBottom: 4 },
  textArea: {
    borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 8, padding: 10,
    minHeight: 80, textAlignVertical: 'top', backgroundColor: '#fafafa',
  },
  selectPlaceholder: {
    borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 8, padding: 10,
    backgroundColor: '#fafafa', justifyContent: 'center', height: 40,
  },
  selectText: { color: '#888' },
  button: {
    backgroundColor: '#5b4db7', padding: 12, borderRadius: 8,
    alignItems: 'center', marginTop: 16,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  aiOutputBox: {
    borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 8, padding: 10,
    minHeight: 100, backgroundColor: '#fafafa', marginTop: 8,
  },
  aiOutputText: { color: '#333' },
  actionButtons: {
    flexDirection: 'row', justifyContent: 'space-around', marginTop: 16,
  },
  actionButton: {
    flex: 1, padding: 12, borderRadius: 8, alignItems: 'center', marginHorizontal: 4,
  },
  supportButton: { backgroundColor: '#28a745' },
  dontSupportButton: { backgroundColor: '#dc3545' },
  actionButtonText: { color: '#fff', fontWeight: '600' },
  navButton: {
    backgroundColor: '#5b4db7', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 12,
  },
  navButtonText: { color: '#fff', fontWeight: '600' },
});
