//code by Jacynta
//code inspired by "React & Node ECommerce Tutorials for Beginners 2022 [MERN Stack ECommerce Website]" tutorial by Coding with Basir on YouTube

import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: {
    userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,


    //sets shipping address
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {}, //makes empty if does not exist
    //sets payment method
    paymentMethod: localStorage.getItem('paymentMethod')
      ? JSON.parse(localStorage.getItem('paymentMethod'))
      : [], //makes empty if does not exist
    //sets cart items
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [], //makes empty if does not exist
  },
};
function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem //if item already exists in cart uses map function to update cart with new item
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    //remove item from cart
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
      
    //clears cart after checkout complete
    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    //save shipping address
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
    //save payment method
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
//Signin / Sign out
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };
    case 'USER_SIGNOUT':
      return {
        ...state,
        userInfo: null,
      }
      default:
      return state;

  }
}




  

//have to add cartItems: [], shippingAddress: {}, paymentMethod: "", to USER_SIGNOUT when it's created

export function StoreProvider(prop) {
  const [state, dispatch] = useReducer(reducer, initialState); //reducer is what needs to be implenented, initial state is what the group was like
  const value = { state, dispatch };
  return <Store.Provider value={value}>{prop.children} </Store.Provider>;
}
