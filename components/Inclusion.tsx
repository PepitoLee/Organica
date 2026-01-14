import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Heart, HandHeart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Animation config (consistent across pages)
const ANIM = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.8,
  stagger: 0.1,
  ease: {
    out: 'power3.out',
    smooth: 'power2.inOut',
    bounce: 'back.out(1.2)',
  },
};

interface Pillar {
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
}

const PILLARS: Pillar[] = [
  {
    icon: Users,
    title: 'Empleo Digno',
    description: 'Oportunidades reales de trabajo y desarrollo profesional para todos.',
  },
  {
    icon: GraduationCap,
    title: 'Capacitación',
    description: 'Formación continua en tostado, empaque y control de calidad.',
  },
  {
    icon: Heart,
    title: 'Comunidad',
    description: 'Un equipo diverso que enriquece cada taza con su dedicación.',
  },
];

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 15, suffix: '+', label: 'Personas con discapacidad' },
  { value: 10, suffix: '+', label: 'Adultos mayores activos' },
  { value: 100, suffix: '%', label: 'Participación en utilidades' },
];

const Inclusion: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Counter states for animated numbers
  const [counters, setCounters] = useState<number[]>([0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const content = contentRef.current;
    const pillars = pillarsRef.current.filter(Boolean);
    const stats = statsRef.current.filter(Boolean);
    const icons = iconRefs.current.filter(Boolean);

    if (!section) return;

    const ctx = gsap.context(() => {
      // ==========================================
      // Header animation
      // ==========================================
      if (header) {
        gsap.fromTo(header.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: ANIM.slow,
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

      // ==========================================
      // Main content animation with blur
      // ==========================================
      if (content) {
        gsap.fromTo(content,
          { y: 40, opacity: 0, filter: 'blur(8px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: content,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // ==========================================
      // Pillars stagger animation
      // ==========================================
      pillars.forEach((pillar, index) => {
        if (!pillar) return;

        gsap.fromTo(pillar,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: index * ANIM.stagger,
            ease: ANIM.ease.out,
            scrollTrigger: {
              trigger: pillar,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // ==========================================
      // Icon pulse animation (subtle, infinite)
      // ==========================================
      icons.forEach((icon) => {
        if (!icon) return;

        gsap.to(icon, {
          scale: 1.05,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      });

      // ==========================================
      // Stats entrance + counter animation
      // ==========================================
      stats.forEach((stat, index) => {
        if (!stat) return;

        gsap.fromTo(stat,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * ANIM.stagger,
            ease: ANIM.ease.out,
            scrollTrigger: {
              trigger: statsRef.current[0],
              start: 'top 85%',
              toggleActions: 'play none none none',
              onEnter: () => {
                if (!hasAnimated) {
                  setHasAnimated(true);
                  // Animate counters
                  STATS.forEach((s, i) => {
                    const obj = { val: 0 };
                    gsap.to(obj, {
                      val: s.value,
                      duration: 2,
                      delay: i * 0.2,
                      ease: 'power2.out',
                      onUpdate: () => {
                        setCounters(prev => {
                          const newCounters = [...prev];
                          newCounters[i] = Math.round(obj.val);
                          return newCounters;
                        });
                      },
                    });
                  });
                }
              },
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(26, 15, 10, 1) 0%, rgba(45, 30, 20, 1) 50%, rgba(26, 15, 10, 1) 100%)',
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.3) 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, rgba(212, 175, 55, 0.2) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.06] pointer-events-none mix-blend-overlay" />

      {/* Decorative Elements */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)',
        }}
      />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          {/* Icon */}
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.1))',
              border: '2px solid rgba(212, 175, 55, 0.4)',
              boxShadow: '0 0 40px rgba(212, 175, 55, 0.2)',
            }}
          >
            <HandHeart className="w-7 h-7 text-gold-500" />
          </div>

          <span
            className="inline-block text-xs uppercase tracking-[0.4em] font-light mb-4"
            style={{
              background: 'linear-gradient(135deg, #d4af37 0%, #f4e4bc 50%, #d4af37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Nuestro Compromiso
          </span>

          <h2
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6"
            style={{
              color: 'rgba(255, 248, 240, 0.95)',
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
            }}
          >
            Inclusión con Propósito
          </h2>

          <div
            className="w-24 h-[1px] mx-auto mb-6"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.8), transparent)',
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)',
            }}
          />

          <p className="text-coffee-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Más que una causa, es nuestra forma de ser
          </p>
        </div>

        {/* Main Content */}
        <div ref={contentRef} className="max-w-4xl mx-auto mb-20">
          <div
            className="relative p-8 md:p-12 rounded-sm"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(212, 175, 55, 0.02))',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Corner Decorations */}
            <div
              className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-sm"
              style={{ borderColor: 'rgba(212, 175, 55, 0.5)' }}
            />
            <div
              className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-sm"
              style={{ borderColor: 'rgba(212, 175, 55, 0.5)' }}
            />

            <p className="text-coffee-100 text-lg md:text-xl leading-relaxed text-center">
              Integramos a <span className="text-gold-500 font-medium">personas con discapacidad</span> y{' '}
              <span className="text-gold-500 font-medium">adultos mayores</span> en roles productivos reales.
              No como beneficencia, sino como parte esencial de nuestra cadena de valor.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {PILLARS.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              ref={(el) => { pillarsRef.current[index] = el; }}
              className="group text-center p-6 rounded-lg transition-colors duration-300 hover:bg-coffee-900/20"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                border: '1px solid transparent',
              }}
            >
              <div
                ref={(el) => { iconRefs.current[index] = el; }}
                className="relative inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 transition-shadow duration-500 group-hover:shadow-[0_0_50px_rgba(212,175,55,0.4)]"
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05))',
                  border: '2px solid rgba(212, 175, 55, 0.3)',
                  boxShadow: '0 0 30px rgba(212, 175, 55, 0.15)',
                }}
              >
                <pillar.icon className="w-8 h-8 text-gold-500" />
              </div>

              <h3
                className="font-serif text-xl mb-3 transition-colors duration-300 group-hover:text-gold-500"
                style={{ color: 'rgba(255, 248, 240, 0.95)' }}
              >
                {pillar.title}
              </h3>

              <p className="text-coffee-400 leading-relaxed max-w-xs mx-auto">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats with animated counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              ref={(el) => { statsRef.current[index] = el; }}
              className="text-center py-8 px-6 rounded-lg transition-all duration-300"
              whileHover={{
                y: -4,
                backgroundColor: 'rgba(45, 30, 20, 0.5)',
                borderColor: 'rgba(212, 175, 55, 0.3)',
              }}
              style={{
                border: '1px solid rgba(212, 175, 55, 0.1)',
              }}
            >
              <div
                className="text-4xl md:text-5xl font-serif font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #d4af37 0%, #f4e4bc 50%, #d4af37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 2px 10px rgba(212, 175, 55, 0.3))',
                }}
              >
                {counters[index]}{stat.suffix}
              </div>
              <p className="text-coffee-300 text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Inclusion;
