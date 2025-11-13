import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Ask'>;

const CANNED = [
  'Homework should be optional in high school.',
  'Pineapple belongs on pizza.',
  'We should meet at 7pm instead of 6pm.',
  'Enable dark mode by default.',
];

const MAX = 200;

function trimToWords(s: string, maxWords = 200) {
  const words = s.trim().split(/\s+/);
  return words.slice(0, maxWords).join(' ') + (words.length > maxWords ? '…' : '');
}

export default function AskScreen({ navigation }: Props) {
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);

  const count = useMemo(() => q.length, [q]);

  const buildReply = (question: string) => {
    const base =
      `Here's a quick, balanced take on: "${question}". ` +
      `Pros may include convenience, engagement, or alignment with user preferences; ` +
      `cons might involve trade-offs in cost, complexity, or unintended side-effects. ` +
      `Consider a small, time-boxed trial, gather feedback, and iterate. ` +
      `Clear goals and metrics make the decision reversible while learning fast.`;
    return trimToWords(base, 200);
  };

  const onGo = async () => {
    const text = q.trim();
    if (!text) return;

    setLoading(true);
    try {
      const resp = await fetch('https://umpyr.tech/api/ai/can', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // If your teammate requires auth, add it here:
          // 'Authorization': 'Bearer <token>',
        },
        body: JSON.stringify({ quantity: 4 }), // adjust if they want { question: text, quantity: 4 }
      });

      if (!resp.ok) {
        const errorText = await resp.text().catch(() => '');
        throw new Error(`HTTP ${resp.status}: ${errorText}`);
      }

      const data = await resp.json();

      if (data.successful !== true) {
        throw new Error(data['response-text'] || 'Backend returned unsuccessful');
      }

      const items = [
        data['ai-text-1'],
        data['ai-text-2'],
        data['ai-text-3'],
        data['ai-text-4'],
      ].filter(Boolean);

      const combined = items.length
        ? items.join('\n• ')
        : 'No AI text returned.';

      navigation.navigate('Vote', {
        question: text,
        reply: `AI suggestions:\n• ${combined}`,
      });
    } catch (err: any) {
      Alert.alert('Failed to get AI reply', err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  const useCanned = (text: string) => setQ(text);
  const clear = () => setQ('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.tag}>Compose a question</Text>
        <Text style={styles.title}>Hot takes, simple votes, smart summaries.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Your question</Text>
        <TextInput
          placeholder="e.g., Should we do pizza Friday?"
          placeholderTextColor="#cbd5e1"
          value={q}
          onChangeText={setQ}
          maxLength={MAX}
          multiline
          style={styles.input}
        />
        <Text style={styles.kicker}>{count} / {MAX}</Text>

        <Text style={[styles.label, { marginTop: 12 }]}>Or pick a canned question</Text>
        <View style={styles.chips}>
          {CANNED.map((t) => (
            <Pressable key={t} onPress={() => useCanned(t)} style={styles.chip}>
              <Text style={styles.chipText}>{t}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.row}>
          <Pressable onPress={clear} style={[styles.btn, styles.ghost]}>
            <Text style={styles.btnText}>Clear</Text>
          </Pressable>
          <Pressable
            onPress={onGo}
            style={[styles.btn, styles.primary, (!q.trim() || loading) ? { opacity: 0.5 } : null]}
            disabled={!q.trim() || loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={[styles.btnText, { color: '#fff' }]}>Get AI Reply</Text>
            )}
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 18, backgroundColor: Colors.bg, flexGrow: 1 },
  hero: {
    borderRadius: 22,
    padding: 18,
    backgroundColor: '#334155',
    borderWidth: 1, borderColor: Colors.border, marginBottom: 12,
  },
  tag: { fontSize: 12, color: '#d1fae5' },
  title: { color: Colors.fg, fontSize: 18, fontWeight: '800', marginTop: 6 },
  card: {
    backgroundColor: Colors.card, borderColor: Colors.border, borderWidth: 1,
    borderRadius: 16, padding: 14,
  },
  label: { color: Colors.fg, fontSize: 14, marginBottom: 6 },
  input: {
    color: Colors.fg, borderColor: Colors.border, borderWidth: 1, borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.25)', padding: 12, minHeight: 64,
  },
  kicker: { color: Colors.muted, fontSize: 12, marginTop: 6 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.06)', borderColor: Colors.border, borderWidth: 1,
    borderRadius: 999, paddingVertical: 8, paddingHorizontal: 12, marginRight: 6, marginBottom: 6,
  },
  chipText: { color: Colors.fg, fontSize: 13 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  btn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1, borderColor: Colors.border },
  ghost: { backgroundColor: 'rgba(255,255,255,0.06)' },
  primary: { backgroundColor: Colors.brand, borderColor: 'transparent' },
  btnText: { color: Colors.fg, fontWeight: '700' },
});
