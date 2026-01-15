import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../store';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/productos', label: 'Productos' },
  { to: '/historia', label: 'Historia' },
  { to: '/inclusion', label: 'Inclusión' },
];

const Navbar: React.FC = () => {
  const { toggleCart, items } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-1 bg-coffee-950/90 backdrop-blur-md border-b border-white/5' : 'py-4 bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className="flex items-center">
            <img src="/logo.png" alt="Orgánica" className="h-[120px] md:h-32 lg:h-36 w-auto" />
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-10 font-sans text-sm tracking-widest uppercase text-coffee-200">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `hover:text-gold-500 transition-colors ${
                    isActive ? 'text-gold-500' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side - Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative group flex items-center gap-3"
            >
              <span className="hidden md:block font-sans text-xs uppercase tracking-widest text-coffee-200 group-hover:text-gold-500 transition-colors">
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full border border-white/10 hover:border-gold-500/50 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-coffee-50" />
              ) : (
                <Menu className="w-5 h-5 text-coffee-50" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 pt-28 bg-coffee-950/95 backdrop-blur-md md:hidden"
          >
            <div className="container mx-auto px-6 py-8">
              <div className="flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `font-serif text-2xl transition-colors ${
                        isActive ? 'text-gold-500' : 'text-coffee-100 hover:text-gold-500'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
