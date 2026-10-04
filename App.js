import React, { useState } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BROWN } from './Data/menuData';

import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import MenuScreen from './Screens/MenuScreen';
import CustomizeScreen from './Screens/CustomizeScreen';
import CartScreen from './Screens/CartScreen';
import FavoritesScreen from './Screens/FavoritesScreen';
import ReservationScreen from './Screens/ReservationScreen';
import ConfirmationScreen from './Screens/ConfirmationScreen';
import OrdersScreen from './Screens/OrdersScreen';
import ProfileScreen from './Screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);

  const toggleFavorite = (id) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));

  const addToCart = (item) => setCart((prev) => [...prev, item]);

  const updateCartQty = (cartId, delta) =>
    setCart((prev) =>
      prev.map((i) => (i.cartId === cartId ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
    );

  const removeFromCart = (cartId) => setCart((prev) => prev.filter((i) => i.cartId !== cartId));

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const placeReservation = () => {
    const order = {
      orderId: Date.now().toString(),
      pickupCode: `BB-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      items: cart,
      total: subtotal,
      status: 'Reserved',
    };
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    return order;
  };

  const cancelReservation = (id) =>
    setOrders((prev) => prev.map((o) => (o.orderId === id ? { ...o, status: 'Cancelled' } : o)));

  const render = (Component, params) => (props) => (
    <Component {...props} route={{ ...props.route, params: { ...props.route.params, ...params } }} />
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: BROWN }, headerTintColor: '#fff' }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" options={{ title: 'Login' }}>
              {render(LoginScreen, { setUser })}
            </Stack.Screen>
            <Stack.Screen name="Signup" options={{ title: 'Sign Up' }}>
              {render(SignupScreen, { setUser })}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Menu" options={{ title: 'Menu' }}>
              {render(MenuScreen, { user, favorites, toggleFavorite, cartCount: cart.length })}
            </Stack.Screen>
            <Stack.Screen name="Customize" options={{ title: 'Customize Drink' }}>
              {render(CustomizeScreen, { addToCart })}
            </Stack.Screen>
            <Stack.Screen name="Cart" options={{ title: 'My Cart' }}>
              {render(CartScreen, { cart, updateCartQty, removeFromCart, subtotal })}
            </Stack.Screen>
            <Stack.Screen name="Favorites" options={{ title: 'Favorites' }}>
              {render(FavoritesScreen, { favorites, toggleFavorite })}
            </Stack.Screen>
            <Stack.Screen name="Reservation" options={{ title: 'Pre-Order Schedule' }}>
              {render(ReservationScreen, { user, subtotal, placeReservation })}
            </Stack.Screen>
            <Stack.Screen name="Confirmation" component={ConfirmationScreen} options={{ title: 'Order Confirmed' }} />
            <Stack.Screen name="Orders" options={{ title: 'My Pre-Orders' }}>
              {render(OrdersScreen, { orders, cancelReservation })}
            </Stack.Screen>
            <Stack.Screen name="Profile" options={{ title: 'My Profile' }}>
              {render(ProfileScreen, { user, setUser, cartCount: cart.length, favCount: favorites.length, ordersCount: orders.length })}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}