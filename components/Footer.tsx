import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FOOTER_LINKS = {
  explorar: [
    { label: 'Orígenes', href: '#' },
    { label: 'Historia', href: '#' },
    { label: 'Tienda', href: '#' },
    { label: 'Wholesale', href: '#' },
  ],
  contacto: [
    { label: 'Instagram', href: '#' },
    { label: 'Twitter', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'Email', href: 'mailto:hola@organica.coffee' },
  ],
};

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);
  const [heartHovered, setHeartHovered] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    const line = lineRef.current;
    const columns = columnsRef.current.filter(Boolean);
    const logo = logoRef.current;

    if (!footer) return;

    // ==========================================
    // Línea divisoria animada
    // ==========================================
    if (line) {
      gsap.fromTo(line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // ==========================================
    // Columns stagger animation
    // ==========================================
    columns.forEach((col, i) => {
      if (!col) return;

      gsap.fromTo(col,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // ==========================================
    // Logo glow pulse
    // ==========================================
    if (logo) {
      gsap.fromTo(logo,
        {
          scale: 0.9,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Subtle glow pulse
      gsap.to(logo, {
        boxShadow: '0 0 60px rgba(212, 175, 55, 0.15)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Link hover animation
  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>, isEnter: boolean) => {
    const underline = e.currentTarget.querySelector('.link-underline');
    if (!underline) return;

    gsap.to(underline, {
      scaleX: isEnter ? 1 : 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-black pt-16 pb-8 overflow-hidden"
    >
      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.06] pointer-events-none mix-blend-overlay" />

      {/* Top Divider Line */}
      <div
        ref={lineRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] origin-center"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent)',
        }}
      />

      <div className="relative z-10 container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div
            ref={(el) => { columnsRef.current[0] = el; }}
            className="md:col-span-2"
          >
            <div className="flex items-start gap-4 mb-6">
              <img
                src="/logo.png"
                alt="Orgánica"
                className="h-16 w-auto"
              />
            </div>

            <p className="text-coffee-400 text-sm leading-relaxed max-w-xs mb-6">
              Cacao & Café de Origen. Seleccionamos los mejores granos del mundo,
              respetando la tierra y las comunidades que los cultivan.
            </p>

            <div className="flex items-center gap-1 text-coffee-500 text-sm">
              <span>Hecho con</span>
              <button
                onMouseEnter={() => setHeartHovered(true)}
                onMouseLeave={() => setHeartHovered(false)}
                className="px-1 transition-all duration-300"
                style={{
                  color: heartHovered ? '#d4af37' : undefined,
                }}
              >
                {heartHovered ? '☕' : '♥'}
              </button>
              <span>en Ecuador</span>
            </div>
          </div>

          {/* Explorar Column */}
          <div ref={(el) => { columnsRef.current[1] = el; }}>
            <h4
              className="text-xs uppercase tracking-[0.3em] font-medium mb-6"
              style={{ color: '#d4af37' }}
            >
              Explorar
            </h4>

            <ul className="space-y-3">
              {FOOTER_LINKS.explorar.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="relative inline-block text-coffee-400 hover:text-coffee-50 transition-colors duration-300 text-sm"
                    onMouseEnter={(e) => handleLinkHover(e, true)}
                    onMouseLeave={(e) => handleLinkHover(e, false)}
                  >
                    {link.label}
                    <span
                      className="link-underline absolute bottom-0 left-0 w-full h-[1px] origin-left scale-x-0"
                      style={{
                        background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.8), transparent)',
                      }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto Column */}
          <div ref={(el) => { columnsRef.current[2] = el; }}>
            <h4
              className="text-xs uppercase tracking-[0.3em] font-medium mb-6"
              style={{ color: '#d4af37' }}
            >
              Síguenos
            </h4>

            <ul className="space-y-3">
              {FOOTER_LINKS.contacto.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="relative inline-block text-coffee-400 hover:text-coffee-50 transition-colors duration-300 text-sm"
                    onMouseEnter={(e) => handleLinkHover(e, true)}
                    onMouseLeave={(e) => handleLinkHover(e, false)}
                  >
                    {link.label}
                    <span
                      className="link-underline absolute bottom-0 left-0 w-full h-[1px] origin-left scale-x-0"
                      style={{
                        background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.8), transparent)',
                      }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Center Logo */}
        <div
          ref={logoRef}
          className="flex flex-col items-center justify-center py-12 mb-8"
        >
          <div
            className="relative p-8 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
            }}
          >
            <img
              src="/logo.png"
              alt="Orgánica"
              className="h-24 md:h-32 w-auto opacity-80"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.2))',
              }}
            />
          </div>

          <div
            className="mt-6 text-center"
          >
            <span
              className="text-2xl font-serif tracking-wide"
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #f4e4bc 50%, #d4af37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              ORGÁNICA
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-coffee-600 text-xs">
            © 2024 Orgánica Cacao & Café. Todos los derechos reservados.
          </p>

          <div className="flex gap-6 text-coffee-600 text-xs">
            <a href="#" className="hover:text-coffee-400 transition-colors">
              Términos
            </a>
            <a href="#" className="hover:text-coffee-400 transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-coffee-400 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
