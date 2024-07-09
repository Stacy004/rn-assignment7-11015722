import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductDetailScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginVertical: 8,
  },
  price: {
    fontSize: 20,
    color: '#000',
    marginVertical: 8,
  },
});

export default ProductDetailScreen;
