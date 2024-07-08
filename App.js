import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
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


const CustomDrawerContent = ({ navigation }) => {
  return (
    <DrawerContentScrollView>
     
      <DrawerItem style={styles.closeButton}
        label="X"
        onPress={() => navigation.closeDrawer()}
        labelStyle={{ fontSize: 24, fontWeight: 'bold' }}
      />
      {/* Eric Atsu */}
      <View style={styles.ericAtsuContainer}>
        <Text style={styles.ericAtsuText}>Eric Atsu</Text>
      </View>
      
      <DrawerItem
        label="Store "
        onPress={() => navigation.navigate('Store')}
      />
      <DrawerItem
        label="Locations"
        onPress={() => navigation.navigate('Locations')}
      />
      <DrawerItem
        label="Blog"
        onPress={() => navigation.navigate('Blog')}
      />
      <DrawerItem
        label="Jewelry"
        onPress={() => navigation.navigate('Jewelry')}
      />
      <DrawerItem
        label="Electronic"
        onPress={() => navigation.navigate('Electronic')}
      />
      <DrawerItem
        label="Clothing"
        onPress={() => navigation.navigate('Clothing')}
      />
    </DrawerContentScrollView>
  );
};


const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Main" drawerContent={props => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Main" component={MainStackNavigator} options={{ headerShown: false }} />
    <Drawer.Screen name="Store" component={StoreScreen} />
    <Drawer.Screen name="Locations" component={LocationsScreen} />
    <Drawer.Screen name="Blog" component={BlogScreen} />
    <Drawer.Screen name="Jewelry" component={JewelryScreen} />
    <Drawer.Screen name="Electronic" component={ElectronicScreen} />
    <Drawer.Screen name="Clothing" component={ClothingScreen} />
  </Drawer.Navigator>
);


const StoreScreen = () => <View><Text>Store </Text></View>;
const LocationsScreen = () => <View><Text> Locations</Text></View>;
const BlogScreen = () => <View><Text>Blog</Text></View>;
const JewelryScreen = () => <View><Text>Jewelry</Text></View>;
const ElectronicScreen = () => <View><Text>Electronic</Text></View>;
const ClothingScreen = () => <View><Text>Clothing</Text></View>;


const styles = StyleSheet.create({
  ericAtsuContainer: {
    alignItems: 'flex-start', 
    marginTop: 15,
    marginLeft: 20, 
  },
  ericAtsuText: {
    fontSize: 25,
    fontWeight: '250',
    borderBottomWidth: 1,
    borderColor: 'red',
    borderBottomStartRadius: 20,
  },
});


const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default App;
