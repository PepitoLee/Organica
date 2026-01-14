import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../store';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const { toggleCart, items } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4 bg-coffee-950/80 backdrop-blur-md border-b border-white/5' : 'py-8 bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center">
           <img src="/logo.png" alt="Orgánica" className="h-20 md:h-24 lg:h-28 w-auto" />
        </div>

        <div className="hidden md:flex gap-12 font-sans text-sm tracking-widest uppercase text-coffee-200">
          <a href="#" className="hover:text-gold-500 transition-colors">Orígenes</a>
          <a href="#" className="hover:text-gold-500 transition-colors">Suscripciones</a>
          <a href="#" className="hover:text-gold-500 transition-colors">Historia</a>
          <a href="#" className="hover:text-gold-500 transition-colors">Wholesale</a>
        </div>

        <button 
          onClick={toggleCart} 
          className="relative group flex items-center gap-3"
        >
          <span className="hidden md:block font-sans text-xs uppercase tracking-widest group-hover:text-gold-500 transition-colors">
            Cesta
          </span>
          <div className="relative p-2 rounded-full border border-white/10 group-hover:border-gold-500/50 transition-colors">
            <ShoppingBag className="w-5 h-5 text-coffee-50 group-hover:text-gold-500 transition-colors" />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 text-coffee-950 text-[10px] font-bold flex items-center justify-center rounded-full"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;