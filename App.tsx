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
      <Stack.Navigator initialRouteName="Ask">
        <Stack.Screen name="Ask" component={AskScreen} />
        <Stack.Screen name="Vote" component={VoteScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="AdminPostManagement" component={AdminPostManagementScreen} />
        <Stack.Screen name="AdminUserManagement" component={AdminUserManagementScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Privacy" component={PrivacyScreen} />
        <Stack.Screen name="PostCreation" component={PostCreationScreen} />
        <Stack.Screen name="SinglePostView" component={SinglePostViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
