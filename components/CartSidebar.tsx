import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, MessageCircle } from 'lucide-react';
import { useCart } from '../store';

// Número de WhatsApp para pedidos (Perú)
const WHATSAPP_NUMBER = '51947397984';

const CartSidebar: React.FC = () => {
  const { isCartOpen, toggleCart, items, removeFromCart, total } = useCart();

  // Generar mensaje de WhatsApp con el pedido
  const generateWhatsAppMessage = () => {
    if (items.length === 0) return '';

    let message = '¡Hola! Me gustaría hacer el siguiente pedido:\n\n';

    items.forEach((item) => {
      message += `☕ *${item.name}*\n`;
      message += `   Cantidad: ${item.quantity}\n`;
      message += `   Precio: S/ ${(item.price * item.quantity).toFixed(2)}\n\n`;
    });

    message += `━━━━━━━━━━━━━━━\n`;
    message += `*TOTAL: S/ ${total.toFixed(2)}*\n\n`;
    message += `¡Gracias! 🙏`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppOrder = () => {
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-coffee-950 border-l border-white/10 z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-8 flex justify-between items-center border-b border-white/10">
              <h2 className="font-serif text-2xl text-coffee-50">Tu Selección</h2>
              <button onClick={toggleCart} className="p-2 hover:bg-white/5 rounded-full text-coffee-300 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-coffee-400">
                  <span className="font-serif text-4xl mb-4 opacity-20">☕</span>
                  <p>Tu cesta está vacía. <br/>Es hora de añadir un poco de energía.</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className="flex gap-4 bg-white/5 p-4 rounded-sm border border-white/5"
                  >
                    <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-sm" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif text-coffee-50">{item.name}</h3>
                          <button onClick={() => removeFromCart(item.id)} className="text-coffee-500 hover:text-red-400">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-coffee-400 uppercase tracking-widest mt-1">{item.weight}</p>
                      </div>
                      <div className="flex justify-between items-end mt-2">
                        <span className="text-gold-500 font-medium">S/ {(item.price * item.quantity).toFixed(2)}</span>
                        <div className="text-coffee-300 text-sm">
                          x{item.quantity}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="p-8 border-t border-white/10 bg-coffee-900/50">
              <div className="flex justify-between items-center mb-6">
                <span className="font-sans text-sm tracking-widest uppercase text-coffee-300">Total</span>
                <span className="font-serif text-3xl text-coffee-50">S/ {total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleWhatsAppOrder}
                disabled={items.length === 0}
                className="w-full py-4 bg-green-600 hover:bg-green-500 disabled:bg-coffee-800 disabled:cursor-not-allowed text-white font-bold tracking-widest uppercase transition-colors duration-300 flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                Pedir por WhatsApp
              </button>
              <p className="text-coffee-500 text-xs text-center mt-3">
                Te contactaremos para confirmar tu pedido
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
