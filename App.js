import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainStackNavigator = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Main">
    <Drawer.Screen name="Main" component={MainStackNavigator} options={{ headerShown: false }} />
  </Drawer.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default App;
