import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { imagePaths } from './imagePaths'; // Import imagePaths

const HomeScreen = ({ navigation }) => {
  const addToCart = async (item) => {
    try {
      const jsonValue = JSON.stringify(item);
      await AsyncStorage.setItem(`@cart_${item.id}`, jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Image source={require('../assets/Menu.png')} />
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
      <ScrollView style={styles.productContainer}>
        <View>
          <View style={styles.dress}>
            <View>
              <View>
                <Image source={imagePaths.dress1} style={styles.fashion} />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addToCart({ id: 1, name: 'Office wear', price: '$120', description: 'reversible angora cardigan', imageKey: 'dress1' })}
                >
                  <Image source={require('../assets/add_circle.png')} style={styles.addIcon} />
                </TouchableOpacity>
              </View>
              <Text>Office Wear</Text>
              <Text style={styles.cardigan}>reversible angora cardigan</Text>
              <Text style={styles.price}>$120</Text>
            </View>
            <View>
              <View>
                <Image source={imagePaths.dress2} style={styles.fashion} />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addToCart({ id: 2, name: 'Black', price: '$120', description: 'reversible angora cardigan', imageKey: 'dress2' })}
                >
                  <Image source={require('../assets/add_circle.png')} style={styles.addIcon} />
                </TouchableOpacity>
              </View>
              <Text>Black</Text>
              <Text style={styles.cardigan}>reversible angora cardigan</Text>
              <Text style={styles.price}>$120</Text>
            </View>
          </View>
          <View style={styles.fits}>
            <View>
              <View>
                <Image source={imagePaths.dress3} style={styles.fashion} />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addToCart({ id: 3, name: 'Church Wear', price: '$120', description: 'reversible angora cardigan', imageKey: 'dress3' })}
                >
                  <Image source={require('../assets/add_circle.png')} style={styles.addIcon} />
                </TouchableOpacity>
              </View>
              <Text>Church wear</Text>
              <Text style={styles.cardigan}>reversible angora cardigan</Text>
              <Text style={styles.price}>$120</Text>
            </View>
            <View>
              <View>
                <Image source={imagePaths.dress4} style={styles.fashion} />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addToCart({ id: 4, name: 'Lamerei', price: '$120', description: 'reversible angora cardigan', imageKey: 'dress4' })}
                >
                  <Image source={require('../assets/add_circle.png')} style={styles.addIcon} />
                </TouchableOpacity>
              </View>
              <Text>Lamerei</Text>
              <Text style={styles.cardigan}>reversible angora cardigan</Text>
              <Text style={styles.price}>$120</Text>
            </View>
          </View>
          <View style={styles.fits}>
            <View>
              <View>
                <Image source={imagePaths.dress5} style={styles.fashion} />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addToCart({ id: 5, name: '21WN', price: '$120', description: 'reversible angora cardigan', imageKey: 'dress5' })}
                >
                  <Image source={require('../assets/add_circle.png')} style={styles.addIcon} />
                </TouchableOpacity>
              </View>
              <Text>21WN</Text>
              <Text style={styles.cardigan}>reversible angora cardigan</Text>
              <Text style={styles.price}>$120</Text>
            </View>
            <View>
              <View>
                <Image source={imagePaths.dress6} style={styles.fashion} />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addToCart({ id: 6, name: 'Lopo', price: '$120', description: 'reversible angora cardigan', imageKey: 'dress6' })}
                >
                  <Image source={require('../assets/add_circle.png')} style={styles.addIcon} />
                </TouchableOpacity>
              </View>
              <Text>Lopo</Text>
              <Text style={styles.cardigan}>reversible angora cardigan</Text>
              <Text style={styles.price}>$120</Text>
            </View>
          </View>
          <View style={styles.fits}>
            <View>
              <View>
                <Image source={imagePaths.dress7} style={styles.fashion} />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addToCart({ id: 7, name: '21WN', price: '$120', description: 'reversible angora cardigan', imageKey: 'dress7' })}
                >
                  <Image source={require('../assets/add_circle.png')} style={styles.addIcon} />
                </TouchableOpacity>
              </View>
              <Text>21WN</Text>
              <Text style={styles.cardigan}>reversible angora cardigan</Text>
              <Text style={styles.price}>$120</Text>
            </View>
            <View>
              <View>
                <Image source={imagePaths.dress3} style={styles.fashion} />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addToCart({ id: 8, name: 'Lame', price: '$120', description: 'reversible angora cardigan', imageKey: 'dress3' })}
                >
                  <Image source={require('../assets/add_circle.png')} style={styles.addIcon} />
                </TouchableOpacity>
              </View>
              <Text>Lame</Text>
              <Text style={styles.cardigan}>reversible angora cardigan</Text>
              <Text style={styles.price}>$120</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-between',
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
    padding: 10,
    marginBottom: 50,
  },
  dress: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 50,
  },
  fashion: {
    width: 150,
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 12,
    padding: 4,
  },
  addIcon: {
    width: 24,
    height: 24,
  },
  fits: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  cardigan: {
    fontSize: 10,
  },
  price: {
    color: 'red',
  },
  list: {
    backgroundColor: '#D3D3D3', 
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  wifi: {
    backgroundColor: '#D3D3D3', 
    borderRadius: 30,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});

export default HomeScreen;
