import { StatusBar } from 'expo-status-bar';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const linking = {
  config: {
    screens: {
      Home: "",
      About: "About",
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="About" component={AboutScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const HomeScreen = ({ navigation }) => <View style={styles.container}>
  <Text>HomeScreen</Text>
  <Button title="Go to About" onPress={() => navigation.navigate("About")}/>
</View>;

const AboutScreen = () => <View style={styles.container}>
  <Text>AboutScreen</Text>
</View>;
