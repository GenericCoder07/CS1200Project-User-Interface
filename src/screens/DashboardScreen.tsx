// src/screens/DashboardScreen.tsx
import React from 'react';
import { ScrollView, View, Button, StyleSheet, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

export default function DashboardScreen({ navigation }: { navigation: Nav }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Do You Agree • Demo Menu</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Core Flow</Text>
        <View style={styles.gap}>
          <Button title="Ask" onPress={() => navigation.navigate('Ask')} />
        </View>
        <View style={styles.gap}>
          <Button
            title="Vote (with sample params)"
            onPress={() => navigation.navigate('Vote', { question: 'Is homework optional?', reply: 'Yes' })}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Admin</Text>
        <View style={styles.gap}>
          <Button title="Admin • Posts" onPress={() => navigation.navigate('AdminPostManagement')} />
        </View>
        <View style={styles.gap}>
          <Button title="Admin • Users" onPress={() => navigation.navigate('AdminUserManagement')} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Posts</Text>
        <View style={styles.gap}>
          <Button title="Create Post" onPress={() => navigation.navigate('PostCreation')} />
        </View>
        <View style={styles.gap}>
          <Button title="Single Post" onPress={() => navigation.navigate('SinglePostView')} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.gap}>
          <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
        </View>
        <View style={styles.gap}>
          <Button title="Privacy Settings" onPress={() => navigation.navigate('Privacy')} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  title: {
    color: '#e2e8f0',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  section: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  sectionTitle: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  gap: {
    marginBottom: 8,
  },
});
