import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Coffee, Award, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '2020',
    title: 'Inicio',
    description: 'Primeros contactos con productores de café en las alturas de Cusco.',
  },
  {
    year: '2022',
    title: 'Alianzas',
    description: 'Establecimos relaciones directas con comunidades de Junín y Amazonas.',
  },
  {
    year: '2024',
    title: 'Inclusión',
    description: 'Lanzamiento de nuestro programa de inclusión social con personas con discapacidad.',
  },
  {
    year: '2025',
    title: 'Hoy',
    description: 'Más de 50 familias productoras y un equipo diverso que enriquece cada taza.',
  },
];

// Animation config
const ANIM = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.8,
  stagger: 0.15,
  ease: {
    out: 'power3.out',
    smooth: 'power2.inOut',
  },
};

const Story: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteTextRef = useRef<HTMLQuoteElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const eventsRef = useRef<(HTMLDivElement | null)[]>([]);
  const founderRef = useRef<HTMLDivElement>(null);
  const founderImageRef = useRef<HTMLDivElement>(null);
  const founderTextRef = useRef<HTMLDivElement>(null);
  const founderQuoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;
    const quote = quoteRef.current;
    const quoteText = quoteTextRef.current;
    const timeline = timelineRef.current;
    const lineProgress = lineProgressRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      // ==========================================
      // Parallax de imagen
      // ==========================================
      if (image) {
        gsap.to(image, {
          y: 60,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // ==========================================
      // Animación de texto con stagger mejorado
      // ==========================================
      if (text) {
        gsap.fromTo(text.children,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: ANIM.normal,
            stagger: 0.12,
            ease: ANIM.ease.out,
            scrollTrigger: {
              trigger: text,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // ==========================================
      // Quote con reveal de clipPath
      // ==========================================
      if (quote && quoteText) {
        // Quote container fade in
        gsap.fromTo(quote,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: ANIM.normal,
            scrollTrigger: {
              trigger: quote,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Quote text reveal with clip-path
        gsap.fromTo(quoteText,
          {
            clipPath: 'inset(0 100% 0 0)',
            opacity: 0,
          },
          {
            clipPath: 'inset(0 0% 0 0)',
            opacity: 1,
            duration: 1.2,
            ease: ANIM.ease.smooth,
            scrollTrigger: {
              trigger: quote,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // ==========================================
      // Sección del Fundador
      // ==========================================
      const founderImage = founderImageRef.current;
      const founderText = founderTextRef.current;
      const founderQuote = founderQuoteRef.current;

      if (founderImage) {
        gsap.fromTo(founderImage,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: ANIM.ease.out,
            scrollTrigger: {
              trigger: founderImage,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (founderText) {
        gsap.fromTo(founderText.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: ANIM.normal,
            stagger: 0.1,
            ease: ANIM.ease.out,
            scrollTrigger: {
              trigger: founderText,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (founderQuote) {
        gsap.fromTo(founderQuote,
          { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
          {
            clipPath: 'inset(0 0% 0 0)',
            opacity: 1,
            duration: 1,
            ease: ANIM.ease.smooth,
            scrollTrigger: {
              trigger: founderQuote,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // ==========================================
      // Timeline - Línea que se dibuja con scroll
      // ==========================================
      if (lineProgress && timeline) {
        gsap.fromTo(lineProgress,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timeline,
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: 0.5,
            },
          }
        );
      }

      // ==========================================
      // Timeline dots con animación secuencial
      // ==========================================
      const dots = dotsRef.current.filter(Boolean);
      const events = eventsRef.current.filter(Boolean);

      dots.forEach((dot, i) => {
        if (!dot) return;

        // Calculate when this dot should animate based on its position
        const progress = i / (dots.length - 1);

        gsap.fromTo(dot,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: timeline,
              start: `top ${75 - progress * 15}%`,
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Pulse animation for active dots
        gsap.to(dot.querySelector('.dot-pulse'), {
          scale: 1.5,
          opacity: 0,
          duration: 2,
          repeat: -1,
          ease: 'power1.out',
          delay: i * 0.3,
        });
      });

      // ==========================================
      // Timeline events con entrada alternada
      // ==========================================
      events.forEach((event, i) => {
        if (!event) return;

        const isEven = i % 2 === 0;

        gsap.fromTo(event,
          {
            y: 30,
            x: isEven ? -20 : 20,
            opacity: 0,
          },
          {
            y: 0,
            x: 0,
            opacity: 1,
            duration: ANIM.normal,
            ease: ANIM.ease.out,
            scrollTrigger: {
              trigger: event,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-coffee-950"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-15"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000&auto=format&fit=crop')",
            filter: 'sepia(30%) saturate(70%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-coffee-950 via-coffee-950/90 to-coffee-950" />
      </div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.08] pointer-events-none mix-blend-overlay" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Main Content - Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          {/* Image Side */}
          <motion.div
            ref={imageRef}
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative Number */}
            <div
              className="absolute -top-8 -left-4 font-serif text-[120px] md:text-[180px] font-bold leading-none pointer-events-none select-none"
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px rgba(212, 175, 55, 0.15)',
              }}
            >
              EST.
            </div>

            {/* Main Image */}
            <div
              className="relative aspect-[4/5] rounded-lg overflow-hidden"
              style={{
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop"
                alt="Nuestros orígenes"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                style={{
                  filter: 'sepia(15%) contrast(1.05)',
                }}
              />
              {/* Gold Overlay */}
              <div
                className="absolute inset-0 mix-blend-overlay opacity-20"
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.3), transparent)',
                }}
              />
              {/* Vignette */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(26,15,10,0.6)_100%)]" />
            </div>

            {/* Floating Year Badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 w-28 h-28 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.9), rgba(244, 228, 188, 0.9))',
                boxShadow: '0 10px 40px rgba(212, 175, 55, 0.3)',
              }}
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <div className="text-center">
                <span className="block text-coffee-950 text-[10px] uppercase tracking-[0.2em]">Desde</span>
                <span className="block text-coffee-950 font-serif text-2xl font-bold">2020</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <div ref={textRef}>
            <span
              className="inline-block text-xs uppercase tracking-[0.4em] font-light mb-4"
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #f4e4bc 50%, #d4af37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Nuestra Historia
            </span>

            <h2
              className="font-serif text-4xl md:text-5xl font-medium mb-8 leading-tight"
              style={{
                color: 'rgba(255, 248, 240, 0.95)',
                textShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
              }}
            >
              Del grano al alma,
              <br />
              un viaje sensorial
            </h2>

            <div
              className="w-16 h-[1px] mb-8"
              style={{
                background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.8), transparent)',
              }}
            />

            <p className="text-coffee-300 text-lg leading-relaxed mb-6">
              En los valles andinos del Perú, donde la niebla abraza los cafetales cada mañana,
              nace una historia de tradición y propósito. Orgánica no es solo una marca,
              es un compromiso con la tierra, con las comunidades productoras, y con
              quienes merecen una oportunidad.
            </p>

            <p className="text-coffee-400 leading-relaxed">
              Trabajamos directamente con familias productoras de Cusco, Junín y Amazonas,
              e integramos a personas con discapacidad y adultos mayores en nuestra cadena de valor.
              Cada taza cuenta una historia de inclusión y propósito.
            </p>
          </div>
        </div>

        {/* Quote Block */}
        <div
          ref={quoteRef}
          className="relative max-w-3xl mx-auto text-center mb-24 py-12"
        >
          {/* Decorative Quote Marks */}
          <motion.div
            className="absolute -top-4 left-1/2 -translate-x-1/2 font-serif text-8xl leading-none"
            style={{ color: 'rgba(212, 175, 55, 0.2)' }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            "
          </motion.div>

          <blockquote
            ref={quoteTextRef}
            className="font-serif text-2xl md:text-3xl italic leading-relaxed mb-6"
            style={{
              color: 'rgba(255, 248, 240, 0.9)',
            }}
          >
            El café es más que un producto. Es la historia de quienes lo cultivan
            y quienes lo preparan con amor.
          </blockquote>

          <motion.cite
            className="not-italic"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span
              className="text-sm uppercase tracking-[0.3em]"
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #f4e4bc 50%, #d4af37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              — Fundador
            </span>
          </motion.cite>
        </div>

        {/* ========================================== */}
        {/* SECCIÓN DEL FUNDADOR */}
        {/* ========================================== */}
        <div
          ref={founderRef}
          className="relative mb-32 py-16"
        >
          {/* Background sutil diferenciado */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.03) 0%, rgba(26, 15, 10, 0.5) 50%, rgba(212, 175, 55, 0.03) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.1)',
            }}
          />

          <div className="relative z-10 px-8 md:px-12">
            {/* Badge superior */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span
                className="inline-block px-6 py-2 text-xs uppercase tracking-[0.3em] rounded-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05))',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  color: '#d4af37',
                }}
              >
                Conoce al Fundador
              </span>
            </motion.div>

            {/* Grid: Imagen + Texto */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Imagen del Fundador */}
              <div
                ref={founderImageRef}
                className="relative"
              >
                <div
                  className="relative max-w-sm mx-auto rounded-xl overflow-hidden group"
                  style={{
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 0 40px rgba(212, 175, 55, 0.1)',
                    border: '2px solid rgba(212, 175, 55, 0.2)',
                  }}
                >
                  <img
                    src="/franco-garcia.png"
                    alt="Franco Garcia - Fundador y Coffee Master de Orgánica"
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay dorado sutil */}
                  <div
                    className="absolute inset-0 mix-blend-overlay opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.5), transparent)',
                    }}
                  />
                  {/* Vignette */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(26,15,10,0.4)_100%)]" />
                </div>

                {/* Badge flotante con Coffee icon */}
                <motion.div
                  className="absolute -bottom-4 -right-4 md:bottom-4 md:-right-6 px-4 py-3 rounded-full flex items-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.9), rgba(244, 228, 188, 0.9))',
                    boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)',
                  }}
                  initial={{ scale: 0, rotate: -10 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4, type: 'spring', stiffness: 200 }}
                >
                  <Coffee className="w-4 h-4 text-coffee-950" />
                  <span className="text-coffee-950 text-xs font-bold uppercase tracking-wider">
                    Coffee Master
                  </span>
                </motion.div>
              </div>

              {/* Texto del Fundador */}
              <div ref={founderTextRef}>
                <h3
                  className="font-serif text-3xl md:text-4xl font-medium mb-6 leading-tight"
                  style={{
                    color: 'rgba(255, 248, 240, 0.95)',
                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  El Alma Detrás de Orgánica
                </h3>

                <div
                  className="w-12 h-[2px] mb-6"
                  style={{
                    background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.8), transparent)',
                  }}
                />

                <div className="space-y-4 text-coffee-300 leading-relaxed">
                  <p className="text-lg">
                    <span className="text-gold-500 font-medium">Soy Franco Garcia</span>, fundador y Coffee Master de Orgánica.
                  </p>

                  <p>
                    Mi amor por el café no nació en una oficina, sino en las montañas. Después de años
                    perfeccionando mi arte como barista certificado —con formación en reconocidas cadenas
                    internacionales donde aprendí los estándares más exigentes de la industria— entendí
                    que el verdadero café peruano merecía un escenario propio.
                  </p>

                  <p>
                    En cada finca que visité, en cada tostador que calibré, descubrí que detrás de cada
                    grano hay familias, tradiciones y sueños. Orgánica nació de esa revelación: no solo
                    queríamos vender café, queríamos honrar a quienes lo cultivan e integrar a quienes
                    la sociedad muchas veces olvida.
                  </p>

                  <p>
                    Hoy, cada bolsa de Orgánica lleva mi compromiso personal: café de origen, tostado
                    con precisión, y producido con propósito. Cuando eliges Orgánica, no solo eliges
                    calidad excepcional —eliges ser parte de una historia de inclusión y transformación.
                  </p>

                  <p className="text-gold-500 font-serif text-lg italic">
                    Bienvenido a nuestra familia.
                  </p>
                </div>

                {/* Firma */}
                <div className="mt-8 flex items-center gap-4">
                  <div
                    className="w-12 h-[1px]"
                    style={{
                      background: 'rgba(212, 175, 55, 0.5)',
                    }}
                  />
                  <div>
                    <p
                      className="font-serif text-lg"
                      style={{
                        background: 'linear-gradient(135deg, #d4af37 0%, #f4e4bc 50%, #d4af37 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Franco Garcia
                    </p>
                    <p className="text-coffee-500 text-xs uppercase tracking-[0.2em]">
                      CEO & Coffee Master
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cita destacada */}
            <div
              ref={founderQuoteRef}
              className="mt-16 max-w-2xl mx-auto text-center"
            >
              <div
                className="relative py-8 px-6 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(212, 175, 55, 0.02))',
                  border: '1px solid rgba(212, 175, 55, 0.15)',
                }}
              >
                {/* Comillas decorativas */}
                <span
                  className="absolute -top-4 left-6 font-serif text-6xl"
                  style={{ color: 'rgba(212, 175, 55, 0.3)' }}
                >
                  "
                </span>

                <blockquote
                  className="font-serif text-xl md:text-2xl italic leading-relaxed"
                  style={{ color: 'rgba(255, 248, 240, 0.9)' }}
                >
                  Cada grano cuenta una historia. Mi misión es que esa historia llegue a tu taza.
                </blockquote>

                <span
                  className="absolute -bottom-4 right-6 font-serif text-6xl"
                  style={{ color: 'rgba(212, 175, 55, 0.3)' }}
                >
                  "
                </span>
              </div>

              {/* Iconos de credenciales */}
              <motion.div
                className="flex justify-center gap-8 mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center gap-2 text-coffee-400">
                  <Award className="w-5 h-5 text-gold-500" />
                  <span className="text-sm">Barista Certificado</span>
                </div>
                <div className="flex items-center gap-2 text-coffee-400">
                  <Coffee className="w-5 h-5 text-gold-500" />
                  <span className="text-sm">Coffee Master</span>
                </div>
                <div className="flex items-center gap-2 text-coffee-400">
                  <Heart className="w-5 h-5 text-gold-500" />
                  <span className="text-sm">Inclusión Social</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Timeline Line Background */}
          <div
            ref={lineRef}
            className="absolute top-6 left-0 right-0 h-[2px] hidden md:block"
            style={{
              background: 'rgba(212, 175, 55, 0.1)',
            }}
          />

          {/* Timeline Line Progress (fills with scroll) */}
          <div
            ref={lineProgressRef}
            className="absolute top-6 left-0 right-0 h-[2px] origin-left hidden md:block"
            style={{
              background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.8), rgba(244, 228, 188, 0.6), rgba(212, 175, 55, 0.8))',
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)',
            }}
          />

          {/* Timeline Events */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {TIMELINE_EVENTS.map((event, index) => (
              <div
                key={event.year}
                ref={(el) => { eventsRef.current[index] = el; }}
                className="relative text-center group"
              >
                {/* Dot */}
                <div
                  ref={(el) => { dotsRef.current[index] = el; }}
                  className="relative z-10 w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(212, 175, 55, 0.1))',
                    border: '2px solid rgba(212, 175, 55, 0.6)',
                    boxShadow: '0 0 30px rgba(212, 175, 55, 0.2)',
                  }}
                >
                  {/* Pulse effect */}
                  <div
                    className="dot-pulse absolute inset-0 rounded-full"
                    style={{
                      background: 'rgba(212, 175, 55, 0.3)',
                    }}
                  />

                  <span
                    className="relative z-10 text-sm font-bold"
                    style={{ color: '#d4af37' }}
                  >
                    {event.year.slice(-2)}
                  </span>
                </div>

                {/* Year */}
                <h4
                  className="font-serif text-xl mb-2 transition-colors duration-300 group-hover:text-gold-400"
                  style={{ color: '#d4af37' }}
                >
                  {event.year}
                </h4>

                {/* Title */}
                <h5 className="text-coffee-50 font-medium mb-2 uppercase tracking-wider text-sm group-hover:text-gold-500 transition-colors duration-300">
                  {event.title}
                </h5>

                {/* Description */}
                <p className="text-coffee-400 text-sm leading-relaxed group-hover:text-coffee-300 transition-colors duration-300">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
