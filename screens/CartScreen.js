import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const cartKeys = keys.filter(key => key.startsWith('@cart_'));
        const cartData = await AsyncStorage.multiGet(cartKeys);
        const cart = cartData.map(item => JSON.parse(item[1]));
        setCartItems(cart);

        const total = cart.reduce((sum, item) => sum + (typeof item.price === 'number' ? item.price : 0), 0);
        setTotalPrice(total);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartItems();
  }, []);

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    }
    return description;
  };

  const removeFromCart = async (itemId) => {
    try {
      
      await AsyncStorage.removeItem(`@cart_${itemId}`);

      
      const updatedCart = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedCart);

    
      const total = updatedCart.reduce((sum, item) => sum + (typeof item.price === 'number' ? item.price : 0), 0);
      setTotalPrice(total);

     
      
    } catch (error) {
      console.error('Failed to remove item from cart', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Image source={require('../assets/Logo.png')} />
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Image source={require('../assets/Search.png')} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.itemDetails}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.description}>{truncateDescription(item.description, 50)}</Text>
              <Text style={styles.price}>
                ${typeof item.price === 'number' ? item.price.toFixed(2) : 'N/A'}
              </Text>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
              <Image source={require('../assets/remove.png')} style={styles.removeIcon} />
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</Text>
        <TouchableOpacity onPress={() => {/* handle checkout */}} style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  head: {
    flexDirection: 'row',
    marginTop: 70,
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 8,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 100,
    height: 100,
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
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  removeIcon: {
    width: 24,
    height: 24,
  },
});

export default CartScreen;
