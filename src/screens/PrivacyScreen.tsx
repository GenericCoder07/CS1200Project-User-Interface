import React from 'react';
import { View, Text, Switch, Pressable, StyleSheet } from 'react-native';

export default function PrivacyScreen() {
  const [isPublic, setIsPublic] = React.useState(true);
  const [shareData, setShareData] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Privacy Settings</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Public Profile</Text>
          <Switch value={isPublic} onValueChange={setIsPublic} testID="toggle-public" />
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Share Data</Text>
          <Switch value={shareData} onValueChange={setShareData} testID="toggle-share" />
        </View>

        <Pressable style={styles.row}>
          <Text style={styles.rowLabel}>Reset Password</Text>
          <Text style={styles.chevron}>›</Text>
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
});
