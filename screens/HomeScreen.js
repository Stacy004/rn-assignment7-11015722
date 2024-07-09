import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ProductItem from './ProductItem'; // Importing ProductItem component

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (item) => {
    try {
      
      const storedCart = await AsyncStorage.getItem('@cart');
      let cart = storedCart ? JSON.parse(storedCart) : [];
  
      
      cart.push(item);
  
      
      await AsyncStorage.setItem('@cart', JSON.stringify(cart));
  
      
      await AsyncStorage.setItem(`@cart_${item.id}`, JSON.stringify(item));
  
      
    } catch (e) {
      console.error(e);
    }
  };
  

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    toggleModal();
  };

 
  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    }
    return description;
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require('../assets/Menu.png')} />
        </TouchableOpacity>
        <Image source={require('../assets/Logo.png')} />
        <View style={styles.inner}>
          <Image source={require('../assets/Search.png')} />
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image source={require('../assets/shoppingBag.png')} style={styles.shopcart} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.story}>
        <Text style={styles.header}>OUR STORY</Text>
        <View style={styles.filter}>
          <View style={styles.list}>
            <Image source={require('../assets/Listview.png')} />
          </View>
          <View style={styles.wifi}>
            <Image source={require('../assets/Filter.png')} style={styles.filt} />
          </View>
        </View>
      </View>
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductItem
            item={item}
            handleImageClick={handleImageClick}
            addToCart={addToCart}
            truncateDescription={truncateDescription}
          />
        )}
        contentContainerStyle={styles.productContainer}
      />

     
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          {selectedProduct && (
            <View style={styles.modalContent}>
              <Image source={{ uri: selectedProduct.image }} style={styles.modalImage} />
              <View style={styles.modalTextContainer}>
                <Text style={styles.modalTitle}>{selectedProduct.title}</Text>
                <Text style={styles.modalDescription}>{selectedProduct.description}</Text>
                <Text style={styles.modalPrice}>${selectedProduct.price}</Text>
                <View style={styles.modalFacts}>
                  <Text style={styles.factsTitle}>MATERIALS</Text>
                  <Text style={styles.factsText}>
                    Do not use bleach {'\n'}
                    Do not tumble dry {'\n'}
                    Dry clean with tetrachloroethylene {'\n'}
                    Iron at a maximum of 110oC/230oF
                  </Text>
                </View>
                <View style={styles.modalShipping}>
                  <Text style={styles.shippingTitle}>Free Flat Rate Shipping</Text>
                  <Text style={styles.shippingEstimate}>Estimated to be delivered on {selectedProduct.estimatedDelivery}</Text>
                </View>
                <TouchableOpacity onPress={() => addToCart(selectedProduct)} style={styles.modalAddToCartButton}>
                  <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={toggleModal} style={styles.modalCloseButton}>
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
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
  },
  inner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  shopcart: {
    marginLeft: 20,
  },
  story: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  filter: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 30,
  },
  filt: {
    marginLeft: 2,
  },
  productContainer: {
    paddingVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 0,
    padding: 20,
    width: '100%',
    height: '100%',
  },
  modalImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 10,
  },
  modalTextContainer: {
    marginBottom: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 18,
    color: '#000',
    marginBottom: 10,
  },
  modalFacts: {
    marginBottom: 10,
  },
  factsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  factsText: {
    fontSize: 14,
    color: '#666',
  },
  modalShipping: {
    marginTop: 10,
  },
  shippingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  shippingEstimate: {
    fontSize: 14,
    color: '#666',
  },
  modalAddToCartButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalCloseButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  modalCloseText: {
    fontSize: 16,
    color: '#666',
  },
});

export default HomeScreen;
