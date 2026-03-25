import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { RouterProvider } from "react-router-dom";
import router from './routes/router';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import AuthProvider from './providers/AuthProvider';
import CartProvider from './providers/CartProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>

      <Helmet>
        <title>Laivin Jewellers</title>
      </Helmet>

      <AuthProvider>
        <CartProvider> 
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>

    </HelmetProvider>
  </StrictMode>
);