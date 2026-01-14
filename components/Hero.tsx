import React, { useRef, useState, useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Video optimizado con all-intra encoding (keyframe cada frame) para scroll fluido
const VIDEO_URL = "/video_scrub.mp4";

// ==========================================
// DETECCIÓN DE DISPOSITIVO MÓVIL
// ==========================================
const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

// ==========================================
// CONSTANTES DE OPTIMIZACIÓN VIDEO SCRUBBING
// ==========================================
const MIN_SEEK_INTERVAL = 33;    // ~30fps throttle (evita sobrecargar decoder)
const SETTLE_THRESHOLD = 0.016;  // Umbral para dejar de actualizar (~1 frame)
const BASE_SMOOTH = 0.18;        // Factor de suavizado base
const FAST_SMOOTH = 0.25;        // Factor rápido para diferencias grandes
const SETTLING_SMOOTH = 0.08;    // Factor suave cuando está cerca del objetivo

const Hero: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);

  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  // 0. Detectar dispositivo móvil al montar
  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  // 1. Cargar video - BLOB para desktop, URL directa para móvil
  useEffect(() => {
    let objectUrl: string | null = null;

    const loadVideo = async () => {
      // ==========================================
      // MÓVIL: Usar URL directa (blob no funciona bien en iOS)
      // ==========================================
      if (isMobileDevice()) {
        setVideoSrc(VIDEO_URL);
        setVideoReady(true);
        return;
      }

      // ==========================================
      // DESKTOP: Cargar como BLOB para scroll scrubbing óptimo
      // ==========================================
      try {
        const response = await fetch(VIDEO_URL);
        const blob = await response.blob();
        objectUrl = URL.createObjectURL(blob);
        setVideoSrc(objectUrl);
      } catch (error) {
        console.error("Error loading blob", error);
        setVideoSrc(VIDEO_URL);
      } finally {
        setVideoReady(true);
      }
    };

    loadVideo();
    return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, []);

  // 2. Lógica de "Smart Scrubbing" OPTIMIZADA - Solo para DESKTOP
  useEffect(() => {
    if (!videoSrc || !videoReady) return;

    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    const mobile = isMobileDevice();

    // ==========================================
    // MÓVIL: Solo reproducir video en loop, sin scroll scrubbing
    // ==========================================
    if (mobile && video) {
      video.play().catch(() => {
        // Autoplay puede fallar, pero el atributo autoPlay lo intentará
        console.log("Autoplay prevented, waiting for user interaction");
      });
    }

    // ==========================================
    // DESKTOP: Scroll scrubbing completo
    // ==========================================
    if (mobile) {
      // En móvil solo configuramos las animaciones del header, no el scroll scrubbing del video
      // (El video se reproduce en loop automáticamente)

      // Animación de ENTRADA del Header
      const entranceTl = gsap.timeline({ delay: 0.3 });
      gsap.set([taglineRef.current, lineRef.current, subtitleRef.current], {
        opacity: 0,
        y: 60,
      });
      gsap.set(lineRef.current, { scaleX: 0 });

      entranceTl
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" })
        .to(lineRef.current, { opacity: 1, y: 0, scaleX: 1, duration: 0.8, ease: "power2.inOut" }, "-=0.6")
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.4");

      return () => {
        entranceTl.kill();
      };
    }

    // --- DESKTOP SCROLL SCRUBBING ---

    // Estado del scrubbing
    let targetTime = 0;
    let currentTime = 0;
    let lastSeekTime = 0;
    let rafId: number | null = null;

    if (video) {
      video.currentTime = 0;
      video.pause();
    }

    // ==========================================
    // FUNCIÓN: Smooth Factor Adaptativo
    // ==========================================
    const getSmoothFactor = (diff: number): number => {
      const absDiff = Math.abs(diff);
      // Diferencia grande: respuesta rápida
      if (absDiff > 0.3) return FAST_SMOOTH;
      // Cerca del objetivo: settling suave
      if (absDiff < 0.05) return SETTLING_SMOOTH;
      // Normal
      return BASE_SMOOTH;
    };

    // ==========================================
    // FUNCIÓN: Throttle de Seeks (30fps máx)
    // ==========================================
    const canSeek = (): boolean => {
      const now = performance.now();
      if (now - lastSeekTime >= MIN_SEEK_INTERVAL) {
        lastSeekTime = now;
        return true;
      }
      return false;
    };

    // ==========================================
    // FUNCIÓN: Actualización Principal del Video
    // ==========================================
    const updateVideo = (): void => {
      if (!video || !video.duration) return;

      const diff = targetTime - currentTime;

      // Detección de settling - evita micro-seeks innecesarios
      if (Math.abs(diff) <= SETTLE_THRESHOLD) {
        return; // Ya está en posición, no actualizar
      }

      // Interpolación con factor adaptativo
      const smoothFactor = getSmoothFactor(diff);
      currentTime += diff * smoothFactor;

      // Aplicar seek solo si podemos (throttled) y el video no está buscando
      if (canSeek() && !video.seeking) {
        video.currentTime = currentTime;
      }
    };

    // ==========================================
    // FUNCIÓN: Loop de actualización con RAF
    // (Usamos RAF porque el video está PAUSADO - controlamos currentTime manualmente)
    // ==========================================
    const startVideoLoop = (): void => {
      const rafCallback = (): void => {
        updateVideo();
        rafId = requestAnimationFrame(rafCallback);
      };
      rafId = requestAnimationFrame(rafCallback);
    };

    // ==========================================
    // ScrollTrigger con smoothing mejorado
    // ==========================================
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true, // GSAP proporciona smoothing base inteligente
      onUpdate: (self) => {
        if (video && video.duration) {
          targetTime = self.progress * video.duration;
        }
      }
    });

    // Iniciar el loop de video
    startVideoLoop();

    // ==========================================
    // Animación de ENTRADA del Header (cinematográfica)
    // ==========================================
    const entranceTl = gsap.timeline({ delay: 0.3 });

    // Estado inicial
    gsap.set([taglineRef.current, lineRef.current, subtitleRef.current], {
      opacity: 0,
      y: 60,
    });
    gsap.set(lineRef.current, { scaleX: 0 });

    // Animación secuencial de entrada
    entranceTl
      .to(taglineRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      })
      .to(lineRef.current, {
        opacity: 1,
        y: 0,
        scaleX: 1,
        duration: 0.8,
        ease: "power2.inOut",
      }, "-=0.6")
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.4");

    // ==========================================
    // Animación de SCROLL del Header (parallax cinematográfico)
    // ==========================================
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=40%",
        scrub: 1.5,
      }
    });

    // Efecto parallax con blur y escala - similar al video
    scrollTl
      .to(taglineRef.current, {
        y: -120,
        opacity: 0,
        scale: 0.9,
        filter: "blur(8px)",
        ease: "power2.in",
      }, 0)
      .to(lineRef.current, {
        y: -80,
        opacity: 0,
        scaleX: 0,
        ease: "power2.in",
      }, 0.05)
      .to(subtitleRef.current, {
        y: -60,
        opacity: 0,
        scale: 0.95,
        filter: "blur(4px)",
        ease: "power2.in",
      }, 0.1);

    // ==========================================
    // Cleanup
    // ==========================================
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      st.kill();
      entranceTl.kill();
      scrollTl.kill();
    };
  }, [videoSrc, videoReady]);

  return (
    // Reducido a 400vh para un recorrido más fluido y responsivo
    <div ref={containerRef} className="relative w-full h-[400vh] bg-coffee-950">

      {/* Viewport Pegajoso (Sticky) */}
      <div ref={stickyRef} className="sticky top-0 left-0 w-full h-screen overflow-hidden">

        {/* Video Layer */}
        <div className="absolute inset-0 w-full h-full">
          {videoSrc && (
            <video
              ref={videoRef}
              src={videoSrc}
              muted
              playsInline
              preload="auto"
              autoPlay={isMobile}  // Solo en móvil: autoplay
              loop={isMobile}       // Solo en móvil: loop infinito
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                objectFit: 'cover',
                willChange: 'transform'
              }}
            />
          )}

          {/* Cinematic Overlays */}
          <div className="absolute inset-0 bg-noise opacity-[0.12] pointer-events-none mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-coffee-950/60 via-transparent to-coffee-950/90 pointer-events-none" />

          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-coffee-950/80 pointer-events-none"></div>
        </div>

        {/* Header Content - Tagline superior con efectos cinematográficos */}
        <div
          ref={headerRef}
          className="absolute top-0 left-0 right-0 z-10 pt-28 md:pt-32 flex flex-col items-center text-center pointer-events-none"
        >
            {/* Tagline principal - Efectos de color y brillo */}
            <h2
              ref={taglineRef}
              className="text-sm md:text-lg lg:text-xl uppercase tracking-[0.4em] md:tracking-[0.5em] font-light mb-4"
              style={{
                color: 'rgba(255, 248, 240, 0.95)',
                textShadow: `
                  0 0 40px rgba(212, 175, 55, 0.4),
                  0 0 80px rgba(212, 175, 55, 0.2),
                  0 4px 20px rgba(0, 0, 0, 0.6)
                `,
              }}
            >
              Desde el corazón de la tierra
            </h2>

            {/* Línea decorativa con brillo dorado */}
            <div
              ref={lineRef}
              className="w-16 md:w-24 lg:w-32 h-[1px] mb-4 relative"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.8), transparent)',
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.5), 0 0 40px rgba(212, 175, 55, 0.3)',
              }}
            ></div>

            {/* Subtítulo con efecto dorado brillante */}
            <span
              ref={subtitleRef}
              className="text-xs md:text-sm lg:text-base uppercase tracking-[0.3em] font-light"
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #f4e4bc 50%, #d4af37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 2px 10px rgba(212, 175, 55, 0.4))',
              }}
            >
              Cacao & Café de Origen
            </span>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 mix-blend-difference">
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/70 animate-pulse">
            Explorar
          </span>
          <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-gold-500 to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;