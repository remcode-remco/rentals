import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import './index.css'
import Home from './Home'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home section={1} />,
  },
  {
    path: "/area",
    element: <Home section={2} />,
  },
  {
    path: "/rentals",
    element: <Home section={3} />,    
    children: [
      {
        path: ":rentalId",
        element: <Home section={3} />,
      },
    ],
  },
  {
    path: "/contact",
    element: <Home section={4} />,
  },
  {
    path: "*",
    element: <Home section={1} />,
  },
], { basename: '/' })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
