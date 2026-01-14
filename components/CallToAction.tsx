import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowRight, Coffee, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CallToActionProps {
  variant?: 'default' | 'historia' | 'inclusion';
}

const CTA_CONTENT = {
  default: {
    badge: 'Envío gratis en pedidos +S/100',
    title: 'Descubre el Sabor Auténtico',
    subtitle: 'del Perú',
    description: 'Café y cacao de origen, tostado artesanalmente en Lima. Cada compra apoya a comunidades productoras.',
    buttonText: 'Explorar Productos',
    buttonLink: '/productos',
  },
  historia: {
    badge: 'Desde los Andes hasta tu taza',
    title: 'Prueba Nuestra',
    subtitle: 'Historia',
    description: 'Cada grano cuenta una historia de dedicación y tradición. Descubre los sabores que han pasado de generación en generación.',
    buttonText: 'Ver Colección',
    buttonLink: '/productos',
  },
  inclusion: {
    badge: 'Compra con propósito',
    title: 'Tu Compra',
    subtitle: 'Transforma Vidas',
    description: 'Cada producto que adquieres genera empleo digno para personas con discapacidad y adultos mayores.',
    buttonText: 'Comprar Ahora',
    buttonLink: '/productos',
  },
};

const CallToAction: React.FC<CallToActionProps> = ({ variant = 'default' }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const content = CTA_CONTENT[variant];

  useEffect(() => {
    const section = sectionRef.current;
    const contentEl = contentRef.current;

    if (!section || !contentEl) return;

    const ctx = gsap.context(() => {
      // Content entrance animation
      gsap.fromTo(contentEl.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating particles animation
      gsap.to('.cta-particle', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.3,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(26, 15, 10, 1) 0%, rgba(35, 22, 15, 1) 50%, rgba(26, 15, 10, 1) 100%)',
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial gradient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
          }}
        />

        {/* Floating particles */}
        <div className="cta-particle absolute top-20 left-[15%] w-2 h-2 rounded-full bg-gold-500/20" />
        <div className="cta-particle absolute top-32 right-[20%] w-3 h-3 rounded-full bg-gold-500/15" />
        <div className="cta-particle absolute bottom-24 left-[25%] w-2 h-2 rounded-full bg-gold-500/25" />
        <div className="cta-particle absolute bottom-32 right-[30%] w-2.5 h-2.5 rounded-full bg-gold-500/20" />

        {/* Decorative lines */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)',
          }}
        />
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.06] pointer-events-none mix-blend-overlay" />

      <div className="relative z-10 container mx-auto px-6">
        <div
          ref={contentRef}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05))',
              border: '1px solid rgba(212, 175, 55, 0.3)',
            }}
          >
            <Sparkles className="w-4 h-4 text-gold-500" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold-500 font-medium">
              {content.badge}
            </span>
          </motion.div>

          {/* Title */}
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-4">
            <span
              style={{
                color: 'rgba(255, 248, 240, 0.95)',
              }}
            >
              {content.title}
            </span>
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #f4e4bc 50%, #d4af37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {content.subtitle}
            </span>
          </h2>

          {/* Description */}
          <p className="text-coffee-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            {content.description}
          </p>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to={content.buttonLink}
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-lg overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #c4a032 100%)',
                boxShadow: '0 10px 40px rgba(212, 175, 55, 0.3)',
              }}
            >
              {/* Shine effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  animation: 'shimmer 2s infinite',
                }}
              />

              <Coffee className="w-5 h-5 text-coffee-950" />
              <span className="relative z-10 text-sm uppercase tracking-[0.15em] font-semibold text-coffee-950">
                {content.buttonText}
              </span>
              <ArrowRight className="w-5 h-5 text-coffee-950 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-coffee-500 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
              <span>100% Peruano</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Envío 24-48h</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Compra Segura</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shimmer animation keyframes */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default CallToAction;
