import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Coffee, Check, Sparkles, Gift, Truck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BENEFITS = [
  { icon: Sparkles, text: 'Acceso anticipado a ediciones limitadas' },
  { icon: Gift, text: 'Descuentos exclusivos para miembros' },
  { icon: Truck, text: 'Envío gratuito en tu primer pedido' },
  { icon: Coffee, text: 'Guías de preparación personalizadas' },
];

const Newsletter: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<(HTMLDivElement | null)[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const icon = iconRef.current;
    const benefits = benefitsRef.current.filter(Boolean);

    if (!section || !card) return;

    // ==========================================
    // Card entrance with glow pulse
    // ==========================================
    gsap.fromTo(card,
      {
        y: 60,
        opacity: 0,
        scale: 0.95,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // ==========================================
    // Icon steam animation (infinite loop)
    // ==========================================
    if (icon) {
      // Create steam particles
      const steam1 = icon.querySelector('.steam-1');
      const steam2 = icon.querySelector('.steam-2');
      const steam3 = icon.querySelector('.steam-3');

      [steam1, steam2, steam3].forEach((steam, i) => {
        if (!steam) return;

        gsap.to(steam, {
          y: -20,
          opacity: 0,
          duration: 1.5,
          delay: i * 0.3,
          repeat: -1,
          ease: 'power1.out',
        });
      });
    }

    // ==========================================
    // Benefits stagger animation
    // ==========================================
    benefits.forEach((benefit, i) => {
      if (!benefit) return;

      gsap.fromTo(benefit,
        {
          x: -30,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.3 + i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Here you would typically handle the subscription
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background with Gradient Mesh Effect */}
      <div className="absolute inset-0 bg-coffee-950">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 50% 80%, rgba(212, 175, 55, 0.03) 0%, transparent 40%)
            `,
          }}
        />
      </div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.08] pointer-events-none mix-blend-overlay" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Card with Golden Border Glow */}
        <div
          ref={cardRef}
          className="relative max-w-2xl mx-auto"
        >
          {/* Outer Glow */}
          <div
            className="absolute -inset-[1px] rounded-sm opacity-60"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(244, 228, 188, 0.2), rgba(212, 175, 55, 0.3))',
              filter: 'blur(20px)',
            }}
          />

          {/* Card */}
          <div
            className="relative bg-coffee-900/60 backdrop-blur-md border border-gold-500/20 rounded-sm p-8 md:p-12"
            style={{
              boxShadow: `
                0 0 40px rgba(212, 175, 55, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.05)
              `,
            }}
          >
            {/* Animated Coffee Icon */}
            <div ref={iconRef} className="relative w-20 h-20 mx-auto mb-8">
              {/* Steam particles */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-2">
                <div className="steam-1 w-1 h-4 rounded-full bg-gold-500/40" />
                <div className="steam-2 w-1 h-3 rounded-full bg-gold-500/30" />
                <div className="steam-3 w-1 h-5 rounded-full bg-gold-500/35" />
              </div>

              {/* Coffee cup icon */}
              <div
                className="w-full h-full rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05))',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  boxShadow: '0 0 30px rgba(212, 175, 55, 0.15)',
                }}
              >
                <Coffee className="w-8 h-8 text-gold-500" />
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <span
                className="inline-block text-xs uppercase tracking-[0.4em] font-light mb-3"
                style={{
                  background: 'linear-gradient(135deg, #d4af37 0%, #f4e4bc 50%, #d4af37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Club Exclusivo
              </span>

              <h2
                className="font-serif text-3xl md:text-4xl font-medium mb-4"
                style={{
                  color: 'rgba(255, 248, 240, 0.95)',
                }}
              >
                Únete a Orgánica
              </h2>

              <p className="text-coffee-300 max-w-md mx-auto">
                Suscríbete para recibir granos exclusivos, guías de preparación
                y acceso anticipado a nuestras ediciones limitadas.
              </p>
            </div>

            {/* Benefits List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {BENEFITS.map((benefit, index) => (
                <div
                  key={index}
                  ref={(el) => { benefitsRef.current[index] = el; }}
                  className="flex items-center gap-3 text-coffee-300"
                >
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(212, 175, 55, 0.1)',
                      border: '1px solid rgba(212, 175, 55, 0.2)',
                    }}
                  >
                    <benefit.icon className="w-4 h-4 text-gold-500" />
                  </div>
                  <span className="text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="relative">
                <div
                  className="relative flex items-center border-b-2 transition-colors duration-300"
                  style={{
                    borderColor: isFocused ? 'rgba(212, 175, 55, 0.6)' : 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <input
                    ref={inputRef}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Tu correo electrónico"
                    className="flex-1 bg-transparent py-4 text-coffee-50 placeholder-coffee-500 outline-none text-lg"
                    required
                  />

                  {/* Submit Button with Shimmer */}
                  <button
                    type="submit"
                    className="group relative px-6 py-2 uppercase text-sm tracking-widest font-medium overflow-hidden transition-all duration-300"
                    style={{
                      color: '#d4af37',
                    }}
                  >
                    {/* Shimmer Effect */}
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent)',
                        animation: 'shimmer 1.5s infinite',
                      }}
                    />

                    <span className="relative z-10 group-hover:text-gold-400 transition-colors">
                      Unirme
                    </span>
                  </button>
                </div>

                {/* Focus Line Animation */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] transition-all duration-500 ease-out"
                  style={{
                    width: isFocused ? '100%' : '0%',
                    background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.8), transparent)',
                    boxShadow: '0 0 10px rgba(212, 175, 55, 0.4)',
                  }}
                />
              </form>
            ) : (
              <div className="text-center py-4">
                <div
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
                  style={{
                    background: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                  }}
                >
                  <Check className="w-5 h-5 text-gold-500" />
                  <span className="text-gold-500">
                    ¡Bienvenido al club! Revisa tu correo.
                  </span>
                </div>
              </div>
            )}

            {/* Privacy Note */}
            <p className="text-coffee-500 text-xs text-center mt-6">
              Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
            </p>
          </div>
        </div>
      </div>

      {/* Shimmer Animation Keyframes */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default Newsletter;
