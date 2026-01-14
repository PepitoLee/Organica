import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../store';
import { Product } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface OriginsProps {
  products: Product[];
}

const Origins: React.FC<OriginsProps> = ({ products }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const line = lineRef.current;

    if (!section || !header || cards.length === 0) return;

    // ==========================================
    // Animación de entrada del header
    // ==========================================
    gsap.fromTo(header.children,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // ==========================================
    // Animación de la línea conectora
    // ==========================================
    if (line) {
      gsap.fromTo(line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: line,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // ==========================================
    // Animación de cards con parallax
    // ==========================================
    cards.forEach((card, index) => {
      if (!card) return;

      // Entrada con scale y opacity
      gsap.fromTo(card,
        {
          y: 80,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Parallax sutil en scroll
      gsap.to(card, {
        y: (index % 2 === 0) ? -30 : -15,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [products]);

  // ==========================================
  // Efecto Tilt 3D en hover
  // ==========================================
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement | null) => {
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateX = ((mouseY - centerY) / centerY) * -8;
    const rotateY = ((mouseX - centerX) / centerX) * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = (card: HTMLDivElement | null) => {
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-coffee-950"
    >
      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.08] pointer-events-none mix-blend-overlay" />

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-coffee-950 via-coffee-900/50 to-coffee-950 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <span
            className="inline-block text-xs uppercase tracking-[0.4em] font-light mb-4"
            style={{
              background: 'linear-gradient(135deg, #d4af37 0%, #f4e4bc 50%, #d4af37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Selección Exclusiva
          </span>

          <h2
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6"
            style={{
              color: 'rgba(255, 248, 240, 0.95)',
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
            }}
          >
            Nuestros Orígenes
          </h2>

          <div
            className="w-24 h-[1px] mx-auto mb-6"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.8), transparent)',
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)',
            }}
          />

          <p className="text-coffee-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Cada grano cuenta una historia de origen, clima y manos trabajadoras.
            Seleccionamos solo el 1% superior de la cosecha mundial.
          </p>
        </div>

        {/* Línea conectora decorativa */}
        <div
          ref={lineRef}
          className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-[45%] w-[70%] h-[1px] origin-left"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.3) 20%, rgba(212, 175, 55, 0.3) 80%, transparent 100%)',
          }}
        />

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative"
              onMouseMove={(e) => handleMouseMove(e, cardsRef.current[index])}
              onMouseLeave={() => handleMouseLeave(cardsRef.current[index])}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Card Container */}
              <div
                className="relative bg-coffee-900/40 backdrop-blur-sm border border-white/5 rounded-sm overflow-hidden transition-all duration-500 group-hover:border-gold-500/30"
                style={{
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
                }}
              >
                {/* Glow Effect on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 0 60px rgba(212, 175, 55, 0.1)',
                  }}
                />

                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden">
                  <div
                    className="absolute inset-4 rounded-full overflow-hidden transition-transform duration-700 group-hover:scale-105"
                    style={{
                      boxShadow: '0 0 40px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/60 via-transparent to-transparent" />
                  </div>

                  {/* Origin Badge */}
                  <div
                    className="absolute top-4 right-4 px-3 py-1 text-[10px] uppercase tracking-[0.2em] rounded-full"
                    style={{
                      background: 'rgba(212, 175, 55, 0.15)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      color: '#d4af37',
                    }}
                  >
                    {product.origin}
                  </div>

                  {/* Roast Level Indicator */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1">
                    {['Light', 'Medium', 'Dark'].map((level) => (
                      <div
                        key={level}
                        className="w-2 h-2 rounded-full transition-all duration-300"
                        style={{
                          background: product.roast === level
                            ? '#d4af37'
                            : 'rgba(255, 255, 255, 0.2)',
                          boxShadow: product.roast === level
                            ? '0 0 10px rgba(212, 175, 55, 0.6)'
                            : 'none',
                        }}
                      />
                    ))}
                    <span className="ml-2 text-[10px] uppercase tracking-wider text-coffee-400">
                      {product.roast}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-2">
                  <h3 className="font-serif text-xl mb-2 text-coffee-50 group-hover:text-gold-500 transition-colors duration-300">
                    {product.name}
                  </h3>

                  {/* Flavor Notes */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.notes.map((note, i) => (
                      <span
                        key={i}
                        className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-coffee-800/50 text-coffee-300 border border-coffee-700/30"
                        style={{
                          animationDelay: `${i * 100}ms`,
                        }}
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  <p className="text-coffee-400 text-sm mb-4 line-clamp-2">
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
                        S/ {product.price.toFixed(2)}
                      </span>
                      <span className="text-coffee-500 text-xs ml-2">
                        / {product.weight}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="relative p-3 rounded-full border border-gold-500/30 text-gold-500 hover:bg-gold-500 hover:text-coffee-950 transition-all duration-300 group/btn"
                      style={{
                        boxShadow: '0 0 20px rgba(212, 175, 55, 0)',
                      }}
                      onMouseEnter={(e) => {
                        gsap.to(e.currentTarget, {
                          boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)',
                          duration: 0.3,
                        });
                      }}
                      onMouseLeave={(e) => {
                        gsap.to(e.currentTarget, {
                          boxShadow: '0 0 20px rgba(212, 175, 55, 0)',
                          duration: 0.3,
                        });
                      }}
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Origins;
