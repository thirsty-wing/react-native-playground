import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../homeScreen';
import AboutScreen from '../aboutScreen';

const Stack = createNativeStackNavigator();

const linking = {
  config: {
    screens: {
      Home: "",
      About: "About",
    },
  },
};

export function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="About" component={AboutScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
