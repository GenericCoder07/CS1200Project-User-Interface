import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AskScreen from './src/screens/AskScreen';
import VoteScreen from './src/screens/VoteScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import AdminPostManagementScreen from './src/screens/AdminPostManagementScreen';
import AdminUserManagementScreen from './src/screens/AdminUserManagementScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import PrivacyScreen from './src/screens/PrivacyScreen';
import PostCreationScreen from './src/screens/PostCreationScreen';
import SinglePostViewScreen from './src/screens/SinglePostViewScreen';

export type RootStackParamList = {
  Ask: undefined;
  Vote: { question: string; reply: string };
  Dashboard: undefined;
  AdminPostManagement: undefined;
  AdminUserManagement: undefined;
  Settings: undefined;
  Privacy: undefined;
  PostCreation: undefined;
  SinglePostView: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#0f172a' },
          headerTintColor: '#ffffff',
          contentStyle: { backgroundColor: '#0b1220' },
        }}
      >
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }} />
        <Stack.Screen name="Ask" component={AskScreen} options={{ title: 'Ask' }} />
        <Stack.Screen name="Vote" component={VoteScreen} options={{ title: 'Vote' }} />
        <Stack.Screen name="AdminPostManagement" component={AdminPostManagementScreen} options={{ title: 'Admin • Posts' }} />
        <Stack.Screen name="AdminUserManagement" component={AdminUserManagementScreen} options={{ title: 'Admin • Users' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
        <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ title: 'Privacy Settings' }} />
        <Stack.Screen name="PostCreation" component={PostCreationScreen} options={{ title: 'Create Post' }} />
        <Stack.Screen name="SinglePostView" component={SinglePostViewScreen} options={{ title: 'Post' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
