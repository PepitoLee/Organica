import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, Check } from 'lucide-react';
import Hero from '../components/Hero';
import CallToAction from '../components/CallToAction';
import { getFeaturedProducts, Product } from '../data/products';
import { useCart } from '../store';

gsap.registerPlugin(ScrollTrigger);

// Animation config (consistent across pages)
const ANIM = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  stagger: 0.1,
  ease: {
    out: 'power3.out',
    bounce: 'back.out(1.4)',
  },
};

const HomePage: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);

  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { addToCart } = useCart();
  const featuredProducts = getFeaturedProducts();

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section) return;

    // Header animation with scroll trigger
    if (header) {
      gsap.fromTo(header.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: ANIM.ease.out,
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Staggered cards animation
    cards.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(card,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          delay: index * ANIM.stagger,
          ease: ANIM.ease.out,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // 3D tilt effect for cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement | null) => {
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateX = ((mouseY - centerY) / centerY) * -6;
    const rotateY = ((mouseX - centerX) / centerX) * 6;

    // Parallax for inner image
    const parallaxX = ((mouseX - centerX) / centerX) * 8;
    const parallaxY = ((mouseY - centerY) / centerY) * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
    });

    // Move inner image for parallax effect
    const image = card.querySelector('.card-image');
    if (image) {
      gsap.to(image, {
        x: parallaxX,
        y: parallaxY,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = (card: HTMLDivElement | null) => {
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: ANIM.ease.out,
    });

    const image = card.querySelector('.card-image');
    if (image) {
      gsap.to(image, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: ANIM.ease.out,
      });
    }
  };

  // Magnetic effect for CTA button
  const handleCtaMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = ctaContainerRef.current;
    const button = ctaRef.current;
    if (!container || !button) return;

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Magnetic pull (max 15px)
    const pullX = distanceX * 0.2;
    const pullY = distanceY * 0.2;

    gsap.to(button, {
      x: pullX,
      y: pullY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleCtaMouseLeave = () => {
    const button = ctaRef.current;
    if (!button) return;

    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
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
      <Hero />

      {/* Featured Products Section */}
      <section
        ref={sectionRef}
        className="relative py-24 overflow-hidden bg-coffee-950"
      >
        {/* Noise Overlay */}
        <div className="absolute inset-0 bg-noise opacity-[0.08] pointer-events-none mix-blend-overlay" />

        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-coffee-950 via-coffee-900/50 to-coffee-950 pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-16">
            <span
              className="inline-block text-xs uppercase tracking-[0.4em] font-light mb-4"
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #f4e4bc 50%, #d4af37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Destacados
            </span>

            <h2
              className="font-serif text-4xl md:text-5xl font-medium mb-6"
              style={{
                color: 'rgba(255, 248, 240, 0.95)',
                textShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
              }}
            >
              Nuestros Favoritos
            </h2>

            <div
              className="w-24 h-[1px] mx-auto"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.8), transparent)',
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)',
              }}
            />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-16">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group relative"
                onMouseMove={(e) => handleMouseMove(e, cardsRef.current[index])}
                onMouseLeave={() => handleMouseLeave(cardsRef.current[index])}
                style={{ transformStyle: 'preserve-3d' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                  <div className="relative aspect-square overflow-hidden">
                    <div
                      className="card-image absolute inset-4 rounded-full overflow-hidden transition-transform duration-500"
                      style={{
                        boxShadow: '0 0 40px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/60 via-transparent to-transparent" />
                    </div>

                    {/* Category Badge */}
                    <div
                      className="absolute top-4 right-4 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] rounded-full backdrop-blur-sm"
                      style={{
                        background: 'rgba(212, 175, 55, 0.15)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        color: '#d4af37',
                      }}
                    >
                      {product.category === 'cafe' ? 'Café' : 'Cacao'}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 pt-2">
                    <h3 className="font-serif text-xl mb-1 text-coffee-50 group-hover:text-gold-500 transition-colors duration-300">
                      {product.name}
                    </h3>

                    <span className="text-coffee-400 text-sm mb-3 block">
                      {product.weight}
                    </span>

                    <p className="text-coffee-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Price & Add to Cart */}
                    <div className="flex items-center justify-between pt-4 border-t border-coffee-800/50">
                      <div>
                        <span
                          className="text-2xl font-light"
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
                        className={`relative p-3 rounded-full transition-all duration-300 ${
                          addedToCart === product.id
                            ? 'bg-green-500 text-white border-green-500'
                            : 'border border-gold-500/30 text-gold-500 hover:bg-gold-500 hover:text-coffee-950'
                        }`}
                        whileTap={{ scale: 0.9 }}
                      >
                        <AnimatePresence mode="wait">
                          {addedToCart === product.id ? (
                            <motion.div
                              key="check"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0 }}
                            >
                              <Check className="w-4 h-4" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="cart"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <ShoppingBag className="w-4 h-4" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button with Magnetic Effect */}
          <motion.div
            ref={ctaContainerRef}
            className="text-center py-8"
            onMouseMove={handleCtaMouseMove}
            onMouseLeave={handleCtaMouseLeave}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              ref={ctaRef}
              to="/productos"
              className="group relative inline-flex items-center gap-3 px-10 py-5 overflow-hidden rounded-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
              }}
            >
              {/* Animated gradient background on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.9) 0%, rgba(244, 228, 188, 0.9) 50%, rgba(212, 175, 55, 0.9) 100%)',
                }}
              />

              {/* Shimmer effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  animation: 'shimmer 2s infinite',
                }}
              />

              <span className="relative z-10 text-sm uppercase tracking-[0.2em] font-medium text-gold-500 group-hover:text-coffee-950 transition-colors duration-300">
                Ver Catálogo Completo
              </span>

              <ArrowRight className="relative z-10 w-5 h-5 text-gold-500 group-hover:text-coffee-950 group-hover:translate-x-1 transition-all duration-300" />

              {/* Glow effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                style={{
                  background: 'rgba(212, 175, 55, 0.4)',
                }}
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction variant="default" />

      {/* Add shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </>
  );
};

export default HomePage;
