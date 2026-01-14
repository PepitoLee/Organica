import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartSidebar from './CartSidebar';
import ScrollToTop from './ScrollToTop';

const Layout: React.FC = () => {
  return (
    <div className="bg-coffee-950 min-h-screen text-coffee-50 selection:bg-gold-500 selection:text-coffee-950 font-sans">
      <ScrollToTop />
      <Navbar />
      <CartSidebar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
