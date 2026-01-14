import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../store';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative flex flex-col"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-coffee-900 mb-6">
        <motion.img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
        
        {/* Floating Tag */}
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-coffee-950 text-xs font-bold tracking-widest uppercase">
            {product.origin}
          </span>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => addToCart(product)}
          className="absolute bottom-0 right-0 w-12 h-12 bg-gold-500 flex items-center justify-center text-coffee-950 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out hover:bg-white"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-baseline border-b border-white/10 pb-3 mb-3">
          <h3 className="font-serif text-2xl text-coffee-50">{product.name}</h3>
          <span className="font-sans text-lg text-gold-500 font-medium">${product.price}</span>
        </div>
        
        <p className="text-coffee-300 text-sm line-clamp-2 font-sans leading-relaxed mb-3">
          {product.description}
        </p>

        <div className="flex gap-2 flex-wrap">
          {product.notes.map((note, i) => (
            <span key={i} className="text-[10px] border border-coffee-700 text-coffee-300 px-2 py-1 rounded-full uppercase tracking-wider">
              {note}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;