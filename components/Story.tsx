import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '2018',
    title: 'Fundación',
    description: 'Nacimos en las montañas de Ecuador con una visión: café de origen con alma.',
  },
  {
    year: '2020',
    title: 'Expansión',
    description: 'Establecimos relaciones directas con productores en Colombia, Etiopía y Sumatra.',
  },
  {
    year: '2022',
    title: 'Reconocimiento',
    description: 'Premio al Mejor Café de Especialidad en el concurso internacional de Milán.',
  },
  {
    year: '2024',
    title: 'Hoy',
    description: 'Llevamos el mejor café del mundo a más de 15 países, manteniendo nuestra esencia.',
  },
];

const Story: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const eventsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;
    const quote = quoteRef.current;
    const timeline = timelineRef.current;
    const line = lineRef.current;

    if (!section) return;

    // ==========================================
    // Parallax de imagen (inverso al texto)
    // ==========================================
    if (image) {
      gsap.to(image, {
        y: 80,
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
    // Animación de texto
    // ==========================================
    if (text) {
      gsap.fromTo(text.children,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // ==========================================
    // Quote con blur que se aclara
    // ==========================================
    if (quote) {
      gsap.fromTo(quote,
        {
          opacity: 0,
          filter: 'blur(10px)',
          y: 30,
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: quote,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // ==========================================
    // Timeline - Línea que se dibuja progresivamente
    // ==========================================
    if (line) {
      gsap.fromTo(line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // ==========================================
    // Timeline dots y eventos
    // ==========================================
    const dots = dotsRef.current.filter(Boolean);
    const events = eventsRef.current.filter(Boolean);

    dots.forEach((dot, i) => {
      if (!dot) return;

      gsap.fromTo(dot,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: 0.3 + i * 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    events.forEach((event, i) => {
      if (!event) return;

      gsap.fromTo(event,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.5 + i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
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
          <div ref={imageRef} className="relative">
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
              className="relative aspect-[4/5] rounded-sm overflow-hidden"
              style={{
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop"
                alt="Nuestros orígenes"
                className="w-full h-full object-cover"
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
            <div
              className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 w-28 h-28 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.9), rgba(244, 228, 188, 0.9))',
                boxShadow: '0 10px 40px rgba(212, 175, 55, 0.3)',
              }}
            >
              <div className="text-center">
                <span className="block text-coffee-950 text-[10px] uppercase tracking-[0.2em]">Desde</span>
                <span className="block text-coffee-950 font-serif text-2xl font-bold">2018</span>
              </div>
            </div>
          </div>

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
              En las montañas de Ecuador, donde la niebla abraza los cafetales al amanecer,
              nació nuestra pasión por el café de especialidad. Cada taza que servimos
              cuenta una historia de tradición, dedicación y respeto por la tierra.
            </p>

            <p className="text-coffee-400 leading-relaxed">
              Trabajamos directamente con agricultores locales, asegurando prácticas
              sostenibles y pagos justos. Creemos que el mejor café no solo se degusta,
              se siente.
            </p>
          </div>
        </div>

        {/* Quote Block */}
        <div
          ref={quoteRef}
          className="relative max-w-3xl mx-auto text-center mb-24 py-12"
        >
          {/* Decorative Quote Marks */}
          <div
            className="absolute -top-4 left-1/2 -translate-x-1/2 font-serif text-8xl leading-none opacity-20"
            style={{ color: '#d4af37' }}
          >
            "
          </div>

          <blockquote
            className="font-serif text-2xl md:text-3xl italic leading-relaxed mb-6"
            style={{
              color: 'rgba(255, 248, 240, 0.9)',
            }}
          >
            El café es poesía en cada taza, un ritual que nos conecta con lo esencial.
          </blockquote>

          <cite className="not-italic">
            <span
              className="text-sm uppercase tracking-[0.3em]"
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #f4e4bc 50%, #d4af37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              — María Elena Vásquez, Fundadora
            </span>
          </cite>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div
            ref={lineRef}
            className="absolute top-6 left-0 right-0 h-[1px] origin-left hidden md:block"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent)',
            }}
          />

          {/* Timeline Events */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {TIMELINE_EVENTS.map((event, index) => (
              <div
                key={event.year}
                ref={(el) => { eventsRef.current[index] = el; }}
                className="relative text-center"
              >
                {/* Dot */}
                <div
                  ref={(el) => { dotsRef.current[index] = el; }}
                  className="relative z-10 w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.1))',
                    border: '2px solid rgba(212, 175, 55, 0.5)',
                    boxShadow: '0 0 30px rgba(212, 175, 55, 0.2)',
                  }}
                >
                  <span
                    className="text-sm font-bold"
                    style={{ color: '#d4af37' }}
                  >
                    {event.year.slice(-2)}
                  </span>
                </div>

                {/* Year */}
                <h4
                  className="font-serif text-xl mb-2"
                  style={{ color: '#d4af37' }}
                >
                  {event.year}
                </h4>

                {/* Title */}
                <h5 className="text-coffee-50 font-medium mb-2 uppercase tracking-wider text-sm">
                  {event.title}
                </h5>

                {/* Description */}
                <p className="text-coffee-400 text-sm leading-relaxed">
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
