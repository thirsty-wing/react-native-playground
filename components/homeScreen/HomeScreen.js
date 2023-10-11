import React from 'react';
import { Button, Text, View } from 'react-native';

const styles = {
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
};

export function HomeScreen({ navigation }) {
  return (<View style={styles.container}>
    <Text>HomeScreen</Text>
    <Button title="Go to About" onPress={() => navigation.navigate("About")}/>
  </View>);
}

export default HomeScreen;
