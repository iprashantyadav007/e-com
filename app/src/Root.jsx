// Root.jsx
import Header from './components/Header';
import Footer from './components/Footer';
import Offers from './components/Offers';
import { Outlet } from 'react-router-dom';
import { CartProvider } from './CartContext'; // Import the CartProvider without '.jsx'
function Root() {
    return (
        <>
            <Offers />
           <CartProvider>
             <Header />
            </CartProvider>
            <Outlet />
            <Footer />
        </>
    );
}

export default Root;
