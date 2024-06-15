import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ErrorPage from './Pages/Error';
import Home from './Pages/Home';
import Checkout from './Pages/Checkout';
import Order from './Pages/Order/Order';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrdersContext';
import { UserProvider } from './context/UserContext';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import { AllowOnlyWithCartNotEmpty } from './utils/AllowOnlyWithCartNotEmpty';
import './global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster position='top-right' toastOptions={{ duration: 2000 }} />
    <UserProvider>
    <OrderProvider>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<ErrorPage />} />
          <Route path='/' index element={<Home />} />
          <Route path='/home' index element={<Home />} />
          <Route path='/checkout' element={<AllowOnlyWithCartNotEmpty />}>
            <Route path='/checkout' index element={<Checkout />} />
          </Route>
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path='/orders' index element={<Order />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
    </OrderProvider>
    </UserProvider>
  </React.StrictMode>,
)

