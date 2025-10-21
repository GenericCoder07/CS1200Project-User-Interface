import React from 'react';
import { View, Text, Switch, Pressable, StyleSheet } from 'react-native';

export default function SettingsScreen({ navigation }: any) {
  const [notifications, setNotifications] = React.useState(false);
  const [dark, setDark] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Enable Notifications</Text>
          <Switch value={notifications} onValueChange={setNotifications} testID="toggle-notifications" />
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Dark Mode</Text>
          <Switch value={dark} onValueChange={setDark} testID="toggle-darkmode" />
        </View>

        <Pressable style={styles.row} onPress={() => navigation.navigate('Privacy')}>
          <Text style={styles.rowLabel}>Privacy Settings</Text>
          <Text style={styles.chevron}>›</Text>
        </Pressable>

        <Pressable style={styles.dangerBtn}>
          <Text style={styles.dangerText}>Log Out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f6f6', padding: 16 },
  title: { fontSize: 18, fontWeight: '600', marginVertical: 8 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#e5e5e5' },
  row: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 10, padding: 12, marginBottom: 8, backgroundColor: '#fff'
  },
  rowLabel: { fontSize: 16, color: '#222' },
  chevron: { color: '#666', fontSize: 18 },
  dangerBtn: { borderWidth: 1, borderColor: '#c0392b', padding: 10, borderRadius: 8, marginTop: 8, alignItems: 'center' },
  dangerText: { color: '#c0392b', fontWeight: '600' },
});
