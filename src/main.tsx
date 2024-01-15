import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import './index.css'
import Home from './Home'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home section={1} />,
    },
    {
      path: '/area',
      element: <Home section={2} />,
    },
    {
      path: '/rentals',
      element: <Home section={3} />,
    },
    {
      path: '/rentaldetail',
      element: <Home section={3} />,
    },
    {
      path: '/contact',
      element: <Home section={4} />,
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ], { basename: '/gite' });

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
