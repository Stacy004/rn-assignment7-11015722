# rn-assignment7-11015722

  # Shopping Cart Application
 This is shopping cart application built with react that uses javaScript . It allows users to view available items,
 select items to cart , remove tems from cart and view details about the items.

  # Features
 Home Screen: View a list of products.
 Product Details: View product details in a modal.
 Add to Cart: Add products to the cart.
 Cart Screen: View and manage cart items, see the total price.
 Drawer Navigation: Navigate between different sections of the app.

# How It Works

 # State Management
useState: Manages local state (cart items, products, loading status).
useEffect: Fetches data and performs side effects.
  
# Data Storage
AsyncStorage: Saves cart items across sessions.


 # Navigation
React Navigation: Implements stack and drawer navigation.

# Components
Home Screen (HomeScreen.js)
Fetches products from https://fakestoreapi.com/products using axios.
Displays products in a grid with FlatList.
Shows product details in a modal.
Adds products to the cart.
Cart Screen (CartScreen.js)
Retrieves cart items from AsyncStorage.
Displays cart items and total price.
Allows removing items from the cart.
Product Item Component (ProductItem.js)
Displays product image, title, description, and price.
Adds products to the cart.
App Component (App.js)
Sets up navigation using DrawerNavigator and StackNavigator.


# Images
![alt text](assets/first.jpg)
![alt text](assets/2nd.jpg)
![alt text](assets/3rd.jpg)
![alt text](assets/4th.jpg)