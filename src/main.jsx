import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from './routes/router';

import { Helmet, HelmetProvider } from 'react-helmet-async'; // ✅ correct
import AuthProvider from './providers/AuthProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>

      <Helmet>
        <title>laivin Jewellers</title>
      </Helmet>

      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>

    </HelmetProvider>
  </StrictMode>,
);