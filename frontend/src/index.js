import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import {configureStore} from "@reduxjs/toolkit"
import {Provider} from "react-redux"

import productReducer, { productFetch } from './features/productSlice';
import { productAPI } from './features/productAPI';
import CartReducer, { GetTotal } from './features/CartSlice';

const store = configureStore({
  reducer:{
    products:productReducer,
    cart:CartReducer,
    [productAPI.reducerPath]:productAPI.reducer,
  },
  middleware:(getDefaultMiddleware)=>{
    return getDefaultMiddleware().concat(productAPI.middleware);

  },
});

store.dispatch(productFetch());
store.dispatch(GetTotal());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>    <App /></BrowserRouter>


    </Provider>
  
  </React.StrictMode>
);


