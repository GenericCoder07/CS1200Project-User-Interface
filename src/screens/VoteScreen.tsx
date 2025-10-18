import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Colors } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';

type Props = NativeStackScreenProps<RootStackParamList, 'Vote'>;

const keyFor = (question: string) => `votes:${encodeURIComponent(question)}`;

export default function VoteScreen({ route, navigation }: Props) {
  const { question, reply } = route.params;
  const storageKey = useMemo(() => keyFor(question), [question]);

  const [support, setSupport] = useState(0);
  const [oppose, setOppose] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(storageKey);
        if (raw) {
          const { s, o } = JSON.parse(raw);
          setSupport(s ?? 0);
          setOppose(o ?? 0);
        }
      } catch {}
    })();
  }, [storageKey]);

  const save = async (s: number, o: number) => {
    setSupport(s); setOppose(o);
    await AsyncStorage.setItem(storageKey, JSON.stringify({ s, o }));
  };

  const vote = async (which: 'agree' | 'disagree') => {
    const s = support + (which === 'agree' ? 1 : 0);
    const o = oppose + (which === 'disagree' ? 1 : 0);
    await save(s, o);
  };

  const total = support + oppose;
  const pct = total ? Math.round((support / total) * 100) : 0;

  const copyResults = async () => {
    const text = `Do You Agree?\nQ: ${question}\nAgree: ${support} • Disagree: ${oppose}`;
    try {
      await Clipboard.setStringAsync(text);
      Alert.alert('Copied', 'Results copied to clipboard');
    } catch {
      Alert.alert('Copy failed', 'Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.q}>{question}</Text>
        <Text style={styles.kicker}>AI reply (≤200 words)</Text>
        <Text style={styles.reply}>{reply}</Text>

        <View style={styles.row}>
          <Pressable onPress={() => vote('agree')} style={[styles.btn, styles.primary]}>
            <Text style={[styles.btnText, { color: '#fff' }]}>Agree 👍</Text>
          </Pressable>
          <Pressable onPress={() => vote('disagree')} style={styles.btn}>
            <Text style={styles.btnText}>Disagree 👎</Text>
          </Pressable>
        </View>

        <View style={{ marginTop: 12 }}>
          <View style={styles.stat}>
            <Text style={styles.label}>Agree</Text>
            <Text style={styles.value}>{support}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.label}>Disagree</Text>
            <Text style={styles.value}>{oppose}</Text>
          </View>

          <View accessibilityLabel="Vote distribution" style={styles.progress}>
            <View style={[styles.barAgree, { flex: pct }]} />
            <View style={[styles.barOppose, { flex: 100 - pct }]} />
          </View>
          <Text style={styles.total}>{total} vote{total === 1 ? '' : 's'}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Pressable onPress={() => navigation.replace('Ask')} style={[styles.btn, styles.ghost]}>
            <Text style={styles.btnText}>Ask another</Text>
          </Pressable>
          <Pressable onPress={copyResults} style={styles.btn}>
            <Text style={styles.btnText}>Copy results</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 18, backgroundColor: Colors.bg, flex: 1 },
  card: {
    backgroundColor: Colors.card, borderColor: Colors.border, borderWidth: 1,
    borderRadius: 16, padding: 14, marginBottom: 12,
  },
  q: { color: Colors.fg, fontSize: 18, fontWeight: '700', marginBottom: 6 },
  kicker: { color: Colors.muted, fontSize: 12, marginBottom: 6 },
  reply: { color: Colors.fg },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginTop: 12 },
  btn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, borderColor: Colors.border, borderWidth: 1, backgroundColor: 'rgba(255,255,255,0.06)' },
  primary: { backgroundColor: Colors.brand, borderColor: 'transparent' },
  ghost: { backgroundColor: 'rgba(255,255,255,0.06)' },
  btnText: { color: Colors.fg, fontWeight: '700' },
  label: { color: Colors.fg },
  value: { color: Colors.fg, fontWeight: '700' },
  progress: { height: 14, borderRadius: 999, overflow: 'hidden', borderColor: Colors.border, borderWidth: 1, flexDirection: 'row', marginTop: 8 },
  barAgree: { backgroundColor: Colors.brand2 },
  barOppose: { backgroundColor: 'rgba(255,255,255,0.25)' },
  total: { color: Colors.muted, textAlign: 'center', marginTop: 6, fontSize: 12 },
});
