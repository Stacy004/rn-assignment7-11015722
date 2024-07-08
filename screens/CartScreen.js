import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { imagePaths } from './imagePaths'; // Import imagePaths

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const items = await AsyncStorage.multiGet(keys);
        const cartItems = items
          .filter(item => item[0].startsWith('@cart_'))
          .map(item => JSON.parse(item[1]));
        setCartItems(cartItems);

        const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);
        setTotalPrice(total);
      } catch (e) {
        console.error(e);
      }
    };

    fetchCartItems();
  }, []);

  const removeFromCart = async (id) => {
    try {
      await AsyncStorage.removeItem(`@cart_${id}`);
      setCartItems(cartItems.filter(item => item.id !== id));
      const updatedItems = cartItems.filter(item => item.id !== id);
      const total = updatedItems.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);
      setTotalPrice(total);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.iconSearch}>
          <Image source={require('../assets/Logo.png')} style={styles.addIcon} />
          <Image source={require('../assets/Search.png')} style={styles.searchIcon} />
        </View>
        <View>
          <Image source={require('../assets/checkout.png')} style={styles.checkout} />
        </View>
        {cartItems.map(item => (
          <View key={item.id} style={styles.item}>
            <Image source={imagePaths[item.imageKey]} style={styles.image} />
            <View style={styles.itemDetails}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
              <Image source={require('../assets/remove.png')} style={styles.addIcon} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.totalText}>EST. TOTAL</Text>
        <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton}>
          <Image source={require('../assets/shoppingBag.png')} style={styles.checkoutIcon} />
          <Text style={styles.checkoutText}>CHECKOUT</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: 20,
    
    paddingBottom: 8,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  image: {
    width: 100,
    height: 150,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    color: '#000',
  },
  removeButton: {
    marginLeft: 16,
    marginTop: 100,
  },
  iconSearch: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 100,
    marginTop: 40,
  },
  searchIcon: {
    marginLeft: 70,
  },
  checkout: {
    height: 70,
    width: 170, 
    marginLeft: 100,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  totalText: {
    color: '#A9A9A9',
    fontSize: 16,
  },
  totalPrice: {
    color: 'red',
    fontSize: 24,
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#0a0a0a',
    paddingTop: 10,
  },
  checkoutIcon: {
    width: 24,
    height: 24,
    marginRight: 20,
    tintColor: '#fff',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CartScreen;
