import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Github, Twitter, Linkedin, CheckCircle2, ChevronDown } from 'lucide-react';
import ThreeHero from './components/ThreeHero';
import Features from './components/Features';
import GeminiChat from './components/GeminiChat';
import ImageGen from './components/ImageGen';
import Portfolio from './components/Portfolio';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Custom Cursor
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const outline = cursorOutlineRef.current;
    const moveCursor = (e: MouseEvent) => {
      if (cursor && outline) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        outline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 500, fill: "forwards" });
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // --- THE FLY THROUGH LOGIC ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Master Timeline linked to the total scroll height
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".scroll-track", // The tall invisible div
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth scrubbing
        }
      });

      // --- STAGE 1: HERO (0% - 20%) ---
      // Goal: Text flies AT camera and disappears
      tl.to("#hero-content", {
        scale: 3,        // Massive zoom
        z: 500,          // Move towards camera
        opacity: 0,      // Fade out
        duration: 2,     // 20% of timeline
        ease: "power2.in",
        pointerEvents: "none" // Disable clicks once flown away
      });

      // --- STAGE 2: ABOUT / INTRO (20% - 40%) ---
      // Goal: Starts invisible/distant, flies IN, stays briefly, flies OUT
      tl.fromTo("#about-section", 
        { scale: 0.5, opacity: 0, z: -500, pointerEvents: "none" }, // Start far away
        { scale: 1, opacity: 1, z: 0, pointerEvents: "auto", duration: 2, ease: "power2.out" } // Come to center
      , "-=0.5"); // Overlap slightly with Hero exit

      // Hold phase (optional, creates a pause for reading)
      tl.to("#about-section", { z: 50, duration: 1 }); // Subtle float forward

      // Exit phase
      tl.to("#about-section", {
        scale: 1.5,
        opacity: 0,
        z: 200, // Fly past camera
        duration: 2,
        ease: "power2.in",
        pointerEvents: "none"
      });


      // --- STAGE 3: FEATURES (40% - 60%) ---
      tl.fromTo("#features-section", 
        { scale: 0.5, opacity: 0, z: -500, pointerEvents: "none" },
        { scale: 1, opacity: 1, z: 0, pointerEvents: "auto", duration: 2, ease: "power2.out" }
      , "-=0.5");

      tl.to("#features-section", { z: 50, duration: 1 });

      tl.to("#features-section", {
        scale: 1.5,
        opacity: 0,
        z: 200,
        duration: 2,
        ease: "power2.in",
        pointerEvents: "none"
      });


      // --- STAGE 4: PORTFOLIO (60% - 80%) ---
      tl.fromTo("#portfolio-section", 
        { scale: 0.5, opacity: 0, z: -500, pointerEvents: "none" },
        { scale: 1, opacity: 1, z: 0, pointerEvents: "auto", duration: 2, ease: "power2.out" }
      , "-=0.5");

      tl.to("#portfolio-section", { z: 50, duration: 1 });

      tl.to("#portfolio-section", {
        scale: 1.5,
        opacity: 0,
        z: 200,
        duration: 2,
        ease: "power2.in",
        pointerEvents: "none"
      });

      // --- STAGE 5: FINAL CTA (80% - 100%) ---
      // Stays on screen at the end
      tl.fromTo("#cta-section", 
        { scale: 0.5, opacity: 0, z: -500, pointerEvents: "none" },
        { scale: 1, opacity: 1, z: 0, pointerEvents: "auto", duration: 2, ease: "power2.out" }
      , "-=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-slate-950 text-slate-50 relative selection:bg-pink-500/30">
      
      {/* 
        THE SCROLL TRACK
        This invisible div defines how "long" the experience is. 
        600vh means the user has to scroll 6 screens worth of pixels to complete the animation.
      */}
      <div className="scroll-track h-[600vh] w-full absolute top-0 left-0 z-[-1]" />

      {/* 3D Background - Always Fixed */}
      <ThreeHero />

      {/* Custom Cursor */}
      <div ref={cursorRef} className="cursor-dot hidden md:block mix-blend-difference fixed z-[100] pointer-events-none w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div ref={cursorOutlineRef} className="cursor-outline hidden md:block mix-blend-difference fixed z-[100] pointer-events-none w-10 h-10 border border-white/50 rounded-full transition-all duration-200 -translate-x-1/2 -translate-y-1/2" />

      {/* 
        MAIN STAGE (FIXED CONTAINER)
        Everything happens inside this 100vh box.
        We use CSS perspective to allow the "Z" transforms to work visually.
      */}
      <main className="fixed inset-0 w-full h-full overflow-hidden perspective-container flex items-center justify-center">
        
        {/* Navigation - Fixed on top of everything */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 flex justify-between items-center bg-gradient-to-b from-slate-900/80 to-transparent backdrop-blur-[2px]">
          <div className="font-display font-bold text-3xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">ONZY.</div>
          <button className="hidden md:block px-6 py-2 rounded-full border border-slate-600 bg-slate-900/50 hover:bg-white hover:text-black hover:border-white transition-all duration-300 text-sm font-medium">
              Fale Conosco
          </button>
        </nav>

        {/* --- SECTION 1: HERO --- */}
        <section id="hero-content" className="absolute inset-0 flex flex-col items-center justify-center z-40 origin-center will-change-transform">
            <div className="text-center px-4 max-w-5xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-8 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"/>
                    Agência Digital do Futuro
                </div>
                <h1 className="font-display text-6xl md:text-9xl font-bold tracking-tight mb-8 leading-[1]">
                    Mergulhe no<br/>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                        Extraordinário
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 drop-shadow-lg">
                    A Onzy transforma marcas estáticas em universos digitais vivos.
                </p>
            </div>
            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce">
                <span className="text-xs uppercase tracking-widest text-slate-400">Role para entrar</span>
                <ChevronDown className="w-6 h-6 text-slate-400" />
            </div>
        </section>

        {/* --- SECTION 2: ABOUT --- */}
        <section id="about-section" className="absolute inset-0 flex items-center justify-center z-30 opacity-0 pointer-events-none origin-center will-change-transform bg-black/20 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="font-display text-5xl md:text-7xl font-bold mb-6">Não é apenas<br/>um site.</h2>
                    <h3 className="font-display text-4xl md:text-6xl font-bold text-indigo-400 mb-8">É um Portal.</h3>
                    <div className="space-y-6 text-slate-200 text-xl leading-relaxed">
                        <p>
                            Na Onzy, acreditamos que a web plana morreu. O futuro é espacial, interativo e inteligente.
                        </p>
                        <p>
                            Combinamos performance bruta com a magia do WebGL para criar narrativas visuais que prendem a atenção.
                        </p>
                    </div>
                </div>
                <div className="relative">
                     {/* Floating Element Mockup */}
                    <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700 shadow-2xl">
                         <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center">
                                <CheckCircle2 className="text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-lg">Retenção Máxima</h4>
                                <p className="text-slate-400 text-sm">Design Imersivo</p>
                            </div>
                         </div>
                         <div className="h-2 w-full bg-slate-700 rounded-full mb-2 overflow-hidden">
                             <div className="h-full bg-indigo-500 w-[90%]"/>
                         </div>
                         <p className="text-right text-xs text-indigo-300">90% Engajamento</p>
                    </div>
                </div>
            </div>
        </section>

        {/* --- SECTION 3: FEATURES --- */}
        <section id="features-section" className="absolute inset-0 flex items-center justify-center z-20 opacity-0 pointer-events-none origin-center will-change-transform">
             <div className="max-w-7xl mx-auto w-full px-6">
                <div className="text-center mb-16">
                    <h2 className="font-display text-5xl md:text-6xl font-bold mb-4">Tecnologia Alienígena</h2>
                    <p className="text-slate-300 text-xl">Nosso stack tecnológico está anos-luz à frente.</p>
                </div>
                <Features />
            </div>
        </section>

        {/* --- SECTION 4: PORTFOLIO --- */}
        <section id="portfolio-section" className="absolute inset-0 flex items-center justify-center z-10 opacity-0 pointer-events-none origin-center will-change-transform">
             <div className="max-w-7xl mx-auto w-full px-6">
                <div className="text-center mb-10">
                    <span className="text-pink-500 font-bold tracking-widest text-sm uppercase">Hall da Fama</span>
                    <h2 className="font-display text-5xl md:text-7xl font-bold mb-4">Casos de Sucesso</h2>
                </div>
                <Portfolio />
             </div>
        </section>

        {/* --- SECTION 5: CTA --- */}
        <section id="cta-section" className="absolute inset-0 flex items-center justify-center z-0 opacity-0 pointer-events-none origin-center will-change-transform">
             <div className="text-center max-w-4xl px-6">
                <h2 className="font-display text-6xl md:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500">
                    Vamos Construir<br/>O Impossível?
                </h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12">
                    <button className="px-12 py-6 bg-white text-black rounded-full font-bold text-xl hover:scale-110 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                        Iniciar Projeto
                    </button>
                    <div className="flex gap-6">
                        <a href="#" className="p-4 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-indigo-600 transition-all"><Github className="w-6 h-6"/></a>
                        <a href="#" className="p-4 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-blue-500 transition-all"><Twitter className="w-6 h-6"/></a>
                        <a href="#" className="p-4 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-blue-700 transition-all"><Linkedin className="w-6 h-6"/></a>
                    </div>
                </div>
             </div>
        </section>

      </main>

      {/* Persistent Chat */}
      <GeminiChat />

    </div>
  );
};

export default App;