import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Twitter, Linkedin, ChevronDown, CheckCircle2 } from 'lucide-react';
import ThreeHero from './components/ThreeHero';
import Features from './components/Features';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import TechStack from './components/TechStack';
import Metrics from './components/Metrics';
import Guarantees from './components/Guarantees';
import Testimonials from './components/Testimonials';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  
  // Custom Cursor
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  // Fake loading sequence
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

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
    if (loading) return;

    const ctx = gsap.context(() => {
      
      // Master Timeline linked to the total scroll height
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".scroll-track", 
          start: "top top",
          end: "bottom bottom",
          scrub: 1, 
        }
      });

      const addSectionAnimation = (id: string, startTime: number, duration: number, zoomScale = 1.2) => {
          // Enter
          tl.fromTo(id, 
            { scale: 0.6, opacity: 0, z: -400, pointerEvents: "none" },
            { scale: 1, opacity: 1, z: 0, pointerEvents: "auto", duration: duration * 0.2, ease: "power2.out" }
          , startTime);
          
          // Hold/Drift
          tl.to(id, { z: 50, duration: duration * 0.6 }, startTime + (duration * 0.2));

          // Exit
          tl.to(id, {
            scale: zoomScale,
            opacity: 0,
            z: 200,
            duration: duration * 0.2,
            ease: "power2.in",
            pointerEvents: "none"
          }, startTime + (duration * 0.8));
      };

      // 0. HERO (0% - 5%)
      tl.to("#hero-content", {
        scale: 3, z: 500, opacity: 0, duration: 1, ease: "power2.in", pointerEvents: "none"
      }, 0);

      // 1. LOGOS (5% - 10%)
      addSectionAnimation("#logos-section", 1.0, 1.5);

      // 2. ABOUT/PORTAL (10% - 20%)
      addSectionAnimation("#about-section", 2.5, 2.5);

      // 3. FEATURES (20% - 30%)
      addSectionAnimation("#features-section", 5.0, 2.5);

      // 4. PROCESS (30% - 40%) - Reverted duration
      addSectionAnimation("#process-section", 7.5, 2.5); 

      // 5. TECH ARSENAL (40% - 50%) - Reverted duration
      addSectionAnimation("#tech-section", 10.0, 2.5);

      // 6. PORTFOLIO (50% - 62%)
      addSectionAnimation("#portfolio-section", 12.5, 3.0);

      // 7. METRICS (62% - 72%)
      addSectionAnimation("#metrics-section", 15.5, 2.5);

      // 8. TESTIMONIALS (72% - 82%)
      addSectionAnimation("#testimonials-section", 18.0, 2.5);

      // 9. GUARANTEES (82% - 90%)
      addSectionAnimation("#guarantees-section", 20.5, 2.0);

      // 10. CTA (90% - 100%)
      tl.fromTo("#cta-section", 
        { scale: 0.6, opacity: 0, z: -400, pointerEvents: "none" },
        { scale: 1, opacity: 1, z: 0, pointerEvents: "auto", duration: 1.5, ease: "power2.out" }
      , 22.5);

    }, containerRef);

    return () => ctx.revert();
  }, [loading]);

  if (loading) {
      return (
          <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-[9999]">
              <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-8" />
              <div className="font-mono text-indigo-400 text-sm animate-pulse">CARREGANDO O FUTURO...</div>
              <div className="mt-2 text-slate-500 text-xs">Renderizando geometrias</div>
          </div>
      );
  }

  return (
    <div ref={containerRef} className="bg-slate-950 text-slate-50 relative selection:bg-pink-500/30">
      
      {/* SCROLL TRACK */}
      <div className="scroll-track h-[2500vh] w-full absolute top-0 left-0 z-[-1]" />

      <ThreeHero />

      {/* Custom Cursor */}
      <div ref={cursorRef} className="cursor-dot hidden md:block mix-blend-difference fixed z-[100] pointer-events-none w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div ref={cursorOutlineRef} className="cursor-outline hidden md:block mix-blend-difference fixed z-[100] pointer-events-none w-10 h-10 border border-white/50 rounded-full transition-all duration-200 -translate-x-1/2 -translate-y-1/2" />

      <main className="fixed inset-0 w-full h-full overflow-hidden perspective-container flex items-center justify-center">
        
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 flex justify-between items-center bg-gradient-to-b from-slate-900/80 to-transparent backdrop-blur-[2px]">
          <div className="font-display font-bold text-3xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">ONZY.</div>
          <button className="hidden md:block px-6 py-2 rounded-full border border-slate-600 bg-slate-900/50 hover:bg-white hover:text-black hover:border-white transition-all duration-300 text-sm font-medium">
              Fale Conosco
          </button>
        </nav>

        {/* --- SECTION 1: HERO --- */}
        <section id="hero-content" className="absolute inset-0 flex flex-col items-center justify-center z-40 origin-center will-change-transform">
            <div className="text-center px-4 max-w-6xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-8 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"/>
                    Agência Digital do Futuro
                </div>
                <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[1]">
                    Não São Sites.<br/>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                        São Portais Para o Futuro.
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 drop-shadow-lg">
                    Desenvolvemos experiências web que fazem o impossível parecer inevitável.
                    3D, WebGL, animações cinematográficas - tecnologia que vende.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
                        Criar Meu Portal
                    </button>
                </div>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce">
                <span className="text-xs uppercase tracking-widest text-slate-400">Role para entrar</span>
                <ChevronDown className="w-6 h-6 text-slate-400" />
            </div>
        </section>

        {/* --- SECTION 1.5: LOGOS --- */}
        <section id="logos-section" className="absolute inset-0 flex items-center justify-center z-30 opacity-0 pointer-events-none origin-center will-change-transform">
            <div className="w-full max-w-6xl mx-auto px-6 text-center">
                <p className="text-sm uppercase tracking-widest text-slate-500 mb-8">Escolhido por marcas que não aceitam mediocridade</p>
                <div className="flex flex-wrap justify-center gap-12 grayscale opacity-60">
                    {['Vertex', 'Nebula', 'Quantum', 'Hyperion', 'Zenith'].map(logo => (
                        <span key={logo} className="text-2xl font-display font-bold text-white/50">{logo}</span>
                    ))}
                </div>
            </div>
        </section>

        {/* --- SECTION 2: ABOUT --- */}
        <section id="about-section" className="absolute inset-0 flex items-center justify-center z-30 opacity-0 pointer-events-none origin-center will-change-transform bg-black/40 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="font-display text-5xl md:text-7xl font-bold mb-6">Não é apenas<br/>um site.</h2>
                    <h3 className="font-display text-4xl md:text-6xl font-bold text-indigo-400 mb-8">É um Portal.</h3>
                    <div className="space-y-6 text-slate-200 text-xl leading-relaxed">
                        <p>Na Onzy, acreditamos que a web plana morreu. O futuro é espacial, interativo e inteligente.</p>
                    </div>
                </div>
                <div className="relative">
                    <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700 shadow-2xl glass-card">
                         <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center">
                                <CheckCircle2 className="text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-lg">Retenção Máxima</h4>
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

        {/* --- SECTION 3: FEATURES (Tecnologia Alienígena) - NOW WITH 3D PIN --- */}
        <section id="features-section" className="absolute inset-0 flex items-center justify-center z-20 opacity-0 pointer-events-none origin-center will-change-transform">
             <div className="max-w-7xl mx-auto w-full px-6">
                <div className="text-center mb-16">
                    <h2 className="font-display text-5xl md:text-6xl font-bold mb-4">Tecnologia Alienígena</h2>
                    <p className="text-slate-300 text-xl">Nosso stack tecnológico está anos-luz à frente.</p>
                </div>
                <Features />
            </div>
        </section>

        {/* --- SECTION 4: PROCESS (Timeline) --- */}
        <section id="process-section" className="absolute inset-0 flex items-center justify-center z-20 opacity-0 pointer-events-none origin-center will-change-transform bg-black/60 backdrop-blur-md">
            <div className="max-w-6xl mx-auto w-full px-6 flex flex-col justify-center">
                <div className="text-center mb-10 shrink-0">
                    <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">Da Ideia ao Lançamento<br/>em 4 Dimensões</h2>
                </div>
                <Process />
            </div>
        </section>

        {/* --- SECTION 5: TECH ARSENAL (Armados com o Futuro) - NOW WITH DATABASE VISUAL --- */}
        <section id="tech-section" className="absolute inset-0 flex items-center justify-center z-20 opacity-0 pointer-events-none origin-center will-change-transform">
            <div className="max-w-7xl mx-auto w-full px-6 flex flex-col justify-center">
                <TechStack />
            </div>
        </section>

        {/* --- SECTION 6: PORTFOLIO --- */}
        <section id="portfolio-section" className="absolute inset-0 flex items-center justify-center z-10 opacity-0 pointer-events-none origin-center will-change-transform">
             <div className="max-w-7xl mx-auto w-full px-6">
                <div className="text-center mb-10">
                    <span className="text-pink-500 font-bold tracking-widest text-sm uppercase">Hall da Fama</span>
                    <h2 className="font-display text-5xl md:text-7xl font-bold mb-4">Casos de Sucesso</h2>
                </div>
                <Portfolio />
             </div>
        </section>

        {/* --- SECTION 7: METRICS (Números que Falam) - NOW WITH HUD DASHBOARD --- */}
        <section id="metrics-section" className="absolute inset-0 flex items-center justify-center z-10 opacity-0 pointer-events-none origin-center will-change-transform bg-slate-900/80 backdrop-blur-xl">
             <div className="max-w-6xl mx-auto w-full px-6">
                <div className="text-center mb-12">
                    <h2 className="font-display text-5xl font-bold mb-4 text-glow">Números que Falam</h2>
                    <p className="text-slate-300 text-xl">Beleza vende, mas performance fecha negócios.</p>
                </div>
                <Metrics />
             </div>
        </section>

        {/* --- SECTION 8: TESTIMONIALS --- */}
        <section id="testimonials-section" className="absolute inset-0 flex items-center justify-center z-10 opacity-0 pointer-events-none origin-center will-change-transform">
             <div className="max-w-6xl mx-auto w-full px-6">
                <div className="text-center mb-12">
                    <h2 className="font-display text-4xl font-bold">O Que Dizem os Líderes</h2>
                </div>
                <Testimonials />
             </div>
        </section>

        {/* --- SECTION 9: GUARANTEES (Promessas Blindadas) - NOW WITH GLOWING GRID --- */}
        <section id="guarantees-section" className="absolute inset-0 flex items-center justify-center z-10 opacity-0 pointer-events-none origin-center will-change-transform">
             <div className="max-w-6xl mx-auto w-full px-6">
                <div className="text-center mb-10">
                    <h2 className="font-display text-4xl font-bold mb-2">Promessas Blindadas</h2>
                </div>
                <Guarantees />
             </div>
        </section>

        {/* --- SECTION 10: CTA --- */}
        <section id="cta-section" className="absolute inset-0 flex items-center justify-center z-0 opacity-0 pointer-events-none origin-center will-change-transform">
             <div className="text-center max-w-4xl px-6">
                <h2 className="font-display text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500">
                    Seu Concorrente Já Está<br/>Construindo o Futuro.
                </h2>
                <h3 className="text-2xl md:text-3xl text-indigo-400 font-bold mb-6">
                    Você Vai Assistir ou Liderar?
                </h3>
                <p className="text-slate-400 mb-10 text-lg">
                    Apenas 3 vagas abertas por mês para garantir qualidade absoluta.<br/>
                    <span className="text-pink-500 font-bold">🔴 2/3 vagas preenchidas este mês</span>
                </p>

                <div className="flex flex-col items-center gap-4">
                    <button className="px-12 py-6 bg-white text-black rounded-full font-bold text-xl hover:scale-110 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                        Reservar Minha Vaga
                    </button>
                    <span className="text-xs text-slate-500 uppercase tracking-widest">⚡ Resposta em até 2h úteis</span>
                </div>

                <footer className="mt-20 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm gap-4">
                    <div>© 2024 Onzy Studios. Todos os átomos reservados.</div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors"><Github className="w-5 h-5"/></a>
                        <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5"/></a>
                        <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5"/></a>
                    </div>
                </footer>
             </div>
        </section>

      </main>

    </div>
  );
};

export default App;