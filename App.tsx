import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AskScreen from './src/screens/AskScreen';
import VoteScreen from './src/screens/VoteScreen';
import { StatusBar } from 'expo-status-bar';
import { Colors } from './src/theme';

export type RootStackParamList = {
  Ask: undefined;
  Vote: { question: string; reply: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.bg },
          headerTintColor: Colors.fg,
          contentStyle: { backgroundColor: Colors.bg },
        }}
      >
        <Stack.Screen name="Ask" component={AskScreen} options={{ title: 'Do You Agree?' }} />
        <Stack.Screen name="Vote" component={VoteScreen} options={{ title: 'Vote' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
