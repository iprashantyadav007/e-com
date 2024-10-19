import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'

import RegistrationForm from './Layout/RegistrationForm '
import LoginForm from './Layout/LoginForm'
import Root from './Root.jsx'
import Home from './pages/Home';
import Products from './pages/product.jsx';
import { CartProvider } from './CartContext'; // Import the CartProvider
import Cart from './components/Cart.jsx';

const router = createBrowserRouter([

  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/login',
        element: <LoginForm />
      },
      {
        path: '/signup',
        element: <RegistrationForm />
      },
      {
        path: '/products/:id',
        element: <Products />
      },
      {
        path: '/cart',
        element: <Cart/>
      }





    ]
  }

]);


function App() {

  return (
    <>
      <CartProvider> {/* Wrap RouterProvider with CartProvider */}
        <RouterProvider router={router} />
      </CartProvider>
    </>
  )
}

export default App
