import React, { useRef, useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ShoppingBag, Coffee, Leaf, Check } from 'lucide-react';
import { PRODUCTS, getCafeProducts, getCacaoProducts, Product } from '../data/products';
import { useCart } from '../store';
import CallToAction from '../components/CallToAction';

gsap.registerPlugin(ScrollTrigger);

type Category = 'cafe' | 'cacao';
type CacaoSubcategory = 'tostado' | 'nibs' | 'polvo' | 'pasta';

const CACAO_SUBTABS: { id: CacaoSubcategory; label: string; description: string }[] = [
  { id: 'tostado', label: 'Tostado', description: 'Granos tostados y pelados' },
  { id: 'nibs', label: 'Nibs', description: 'Trozos crujientes' },
  { id: 'polvo', label: 'Polvo', description: 'Cacao molido puro' },
  { id: 'pasta', label: 'Pasta', description: 'Para taza y chocolate' },
];

// Animation config
const ANIM = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  stagger: 0.08,
  ease: {
    out: 'power3.out',
    bounce: 'back.out(1.4)',
  },
};

const ProductsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('cafe');
  const [activeCacaoSub, setActiveCacaoSub] = useState<CacaoSubcategory>('tostado');
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const { addToCart } = useCart();

  // Get products based on active category and subcategory
  const products = useMemo(() => {
    if (activeCategory === 'cafe') {
      return getCafeProducts();
    }

    // For cacao, filter by subcategory
    const cacaoProducts = getCacaoProducts();

    if (activeCacaoSub === 'tostado') {
      // Include both 'tostado' and 'pelado' subcategories
      return cacaoProducts.filter(p =>
        p.subcategory === 'tostado' || p.subcategory === 'pelado'
      );
    }

    return cacaoProducts.filter(p => p.subcategory === activeCacaoSub);
  }, [activeCategory, activeCacaoSub]);

  // Header entrance animation
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    gsap.fromTo(header.children,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: ANIM.ease.out,
      }
    );
  }, []);

  // Animate tab underline
  useEffect(() => {
    const tabs = tabsRef.current;
    const underline = underlineRef.current;
    if (!tabs || !underline) return;

    const activeButton = tabs.querySelector(`[data-category="${activeCategory}"]`) as HTMLElement;
    if (!activeButton) return;

    const buttonRect = activeButton.getBoundingClientRect();
    const tabsRect = tabs.getBoundingClientRect();

    gsap.to(underline, {
      x: buttonRect.left - tabsRect.left,
      width: buttonRect.width,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [activeCategory]);

  // Cards entrance animation
  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.product-card');

    gsap.fromTo(cards,
      {
        y: 40,
        opacity: 0,
        scale: 0.95,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: ANIM.normal,
        stagger: ANIM.stagger,
        ease: ANIM.ease.out,
      }
    );
  }, [activeCategory, activeCacaoSub]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    const rect = card.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateX = ((mouseY - centerY) / centerY) * -5;
    const rotateY = ((mouseX - centerX) / centerX) * 5;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.2,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = (card: HTMLDivElement) => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
      ease: ANIM.ease.out,
    });
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product as any);
    setAddedToCart(product.id);

    setTimeout(() => {
      setAddedToCart(null);
    }, 1500);
  };

  return (
    <>
    <section
      ref={sectionRef}
      className="relative min-h-screen pt-32 pb-24 overflow-hidden bg-coffee-950"
    >
      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.08] pointer-events-none mix-blend-overlay" />

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-coffee-950 via-coffee-900/30 to-coffee-950 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <span
            className="inline-block text-xs uppercase tracking-[0.4em] font-light mb-4"
            style={{
              background: 'linear-gradient(135deg, #d4af37 0%, #f4e4bc 50%, #d4af37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Catálogo
          </span>

          <h1
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6"
            style={{
              color: 'rgba(255, 248, 240, 0.95)',
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
            }}
          >
            Nuestros Productos
          </h1>

          <div
            className="w-24 h-[1px] mx-auto mb-8"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.8), transparent)',
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)',
            }}
          />

          <p className="text-coffee-300 text-lg max-w-2xl mx-auto mb-12">
            Café y cacao orgánico peruano de la más alta calidad.
            De las alturas de Cusco, Junín y Amazonas, directo a tu mesa.
          </p>

          {/* Main Category Tabs */}
          <div
            ref={tabsRef}
            className="relative inline-flex gap-2 p-1.5 rounded-full bg-coffee-900/50 backdrop-blur-sm border border-white/5"
          >
            {/* Animated Underline/Background */}
            <div
              ref={underlineRef}
              className="absolute top-1.5 left-0 h-[calc(100%-12px)] rounded-full bg-gold-500 transition-none"
              style={{ width: 0 }}
            />

            <button
              data-category="cafe"
              onClick={() => setActiveCategory('cafe')}
              className={`relative z-10 flex items-center gap-2.5 px-6 py-3 rounded-full transition-colors duration-300 ${
                activeCategory === 'cafe' ? 'text-coffee-950' : 'text-coffee-300 hover:text-coffee-100'
              }`}
            >
              <Coffee className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wide">Café</span>
            </button>

            <button
              data-category="cacao"
              onClick={() => setActiveCategory('cacao')}
              className={`relative z-10 flex items-center gap-2.5 px-6 py-3 rounded-full transition-colors duration-300 ${
                activeCategory === 'cacao' ? 'text-coffee-950' : 'text-coffee-300 hover:text-coffee-100'
              }`}
            >
              <Leaf className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wide">Cacao</span>
            </button>
          </div>
        </div>

        {/* Cacao Subtabs */}
        <AnimatePresence mode="wait">
          {activeCategory === 'cacao' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex justify-center mb-10"
            >
              <LayoutGroup>
                <div className="flex gap-2 p-1 rounded-lg bg-coffee-900/30 backdrop-blur-sm border border-white/5">
                  {CACAO_SUBTABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCacaoSub(tab.id)}
                      className="relative px-5 py-2.5 rounded-md transition-colors duration-200"
                    >
                      {activeCacaoSub === tab.id && (
                        <motion.div
                          layoutId="cacaoSubtab"
                          className="absolute inset-0 rounded-md"
                          style={{
                            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.1) 100%)',
                            border: '1px solid rgba(212, 175, 55, 0.4)',
                          }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span
                        className={`relative z-10 text-sm font-medium transition-colors duration-200 ${
                          activeCacaoSub === tab.id ? 'text-gold-500' : 'text-coffee-400 hover:text-coffee-200'
                        }`}
                      >
                        {tab.label}
                      </span>
                    </button>
                  ))}
                </div>
              </LayoutGroup>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subcategory Description */}
        <AnimatePresence mode="wait">
          {activeCategory === 'cacao' && (
            <motion.div
              key={activeCacaoSub}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-center mb-8"
            >
              <p className="text-coffee-400 text-sm">
                {CACAO_SUBTABS.find(t => t.id === activeCacaoSub)?.description} · Cacao criollo 100% peruano de San Martín
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="product-card group relative"
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget as HTMLDivElement)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget as HTMLDivElement)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Card Container */}
                <div
                  className="relative bg-coffee-900/40 backdrop-blur-sm border border-white/5 rounded-lg overflow-hidden transition-all duration-500 group-hover:border-gold-500/30"
                  style={{
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {/* Glow Effect on Hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg"
                    style={{
                      boxShadow: 'inset 0 0 60px rgba(212, 175, 55, 0.08)',
                    }}
                  />

                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/80 via-coffee-950/20 to-transparent" />

                    {/* Weight Badge */}
                    <div
                      className="absolute top-4 right-4 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] rounded-full backdrop-blur-sm"
                      style={{
                        background: 'rgba(212, 175, 55, 0.15)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        color: '#d4af37',
                      }}
                    >
                      {product.weight}
                    </div>

                    {/* Subcategory Badge (for cacao) */}
                    {product.subcategory && (
                      <div className="absolute top-4 left-4 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] rounded-full bg-coffee-950/80 backdrop-blur-sm text-coffee-300 border border-white/10">
                        {product.subcategory === 'pelado' ? 'Pelado' : product.subcategory}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-xl mb-2 text-coffee-50 group-hover:text-gold-500 transition-colors duration-300">
                      {product.name}
                    </h3>

                    <p className="text-coffee-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {product.origin && (
                      <p className="text-coffee-500 text-xs mb-4 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-gold-500/50" />
                        Origen: {product.origin}
                      </p>
                    )}

                    {/* Price & Add to Cart */}
                    <div className="flex items-center justify-between pt-4 border-t border-coffee-800/50">
                      <div>
                        <span
                          className="text-3xl font-light"
                          style={{
                            background: 'linear-gradient(135deg, #d4af37 0%, #f4e4bc 50%, #d4af37 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}
                        >
                          S/ {product.price}
                        </span>
                      </div>

                      <motion.button
                        onClick={() => handleAddToCart(product)}
                        className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 overflow-hidden ${
                          addedToCart === product.id
                            ? 'bg-green-500 text-white border-green-500'
                            : 'border border-gold-500/30 text-gold-500 hover:bg-gold-500 hover:text-coffee-950'
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <AnimatePresence mode="wait">
                          {addedToCart === product.id ? (
                            <motion.div
                              key="check"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0 }}
                              className="flex items-center gap-2"
                            >
                              <Check className="w-4 h-4" />
                              <span className="text-xs uppercase tracking-wider">Agregado</span>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="cart"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="flex items-center gap-2"
                            >
                              <ShoppingBag className="w-4 h-4" />
                              <span className="text-xs uppercase tracking-wider">Agregar</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-coffee-400 text-lg">
              No hay productos disponibles en esta categoría.
            </p>
          </motion.div>
        )}

        {/* Products Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-12 pt-8 border-t border-coffee-800/30"
        >
          <p className="text-coffee-500 text-sm">
            Mostrando {products.length} {products.length === 1 ? 'producto' : 'productos'}
            {activeCategory === 'cacao' && ` en ${CACAO_SUBTABS.find(t => t.id === activeCacaoSub)?.label}`}
          </p>
        </motion.div>
      </div>
    </section>

    {/* Call to Action */}
    <CallToAction variant="default" />
    </>
  );
};

export default ProductsPage;
