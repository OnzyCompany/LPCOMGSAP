import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2, ArrowRight, Github, Twitter, Linkedin, CheckCircle2 } from 'lucide-react';
import ThreeHero from './components/ThreeHero';
import Features from './components/Features';
import GeminiChat from './components/GeminiChat';
import ImageGen from './components/ImageGen';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  // Custom Cursor Logic
  useEffect(() => {
    const cursor = cursorRef.current;
    const outline = cursorOutlineRef.current;
    
    const moveCursor = (e: MouseEvent) => {
      if (cursor && outline) {
        // Simple direct movement
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        // Lag effect for outline
        outline.animate({
          left: `${e.clientX}px`,
          top: `${e.clientY}px`
        }, { duration: 500, fill: "forwards" });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Text Stagger
      gsap.from(".hero-text-char", {
        y: 100,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power4.out",
        delay: 0.5
      });

      // Fade Ups
      gsap.utils.toArray('.fade-up').forEach((element: any) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
      });

      // Process Line Animation
      gsap.from(".process-line", {
        scrollTrigger: {
          trigger: ".process-section",
          start: "top center",
          end: "bottom center",
          scrub: 1
        },
        scaleX: 0,
        transformOrigin: "left center",
        ease: "none"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-slate-950 text-slate-50 min-h-screen selection:bg-pink-500/30">
      
      {/* Custom Cursor Elements */}
      <div ref={cursorRef} className="cursor-dot hidden md:block mix-blend-difference" />
      <div ref={cursorOutlineRef} className="cursor-outline hidden md:block mix-blend-difference" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-6 md:px-12 flex justify-between items-center backdrop-blur-sm">
        <div className="font-display font-bold text-2xl tracking-tighter">LUMINA.</div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#playground" className="hover:text-white transition-colors">AI Playground</a>
            <a href="#process" className="hover:text-white transition-colors">Process</a>
        </div>
        <button className="hidden md:block px-6 py-2 rounded-full border border-slate-700 hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium">
            Contact
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <ThreeHero />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-6 fade-up">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"/>
                Available for new projects
            </div>
            <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tight mb-6 leading-[1.1]">
                <div className="overflow-hidden">
                    {"Landing Pages".split("").map((char, i) => (
                        <span key={i} className="hero-text-char inline-block">{char === " " ? "\u00A0" : char}</span>
                    ))}
                </div>
                <div className="overflow-hidden bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                    {"That Convert".split("").map((char, i) => (
                        <span key={i} className="hero-text-char inline-block">{char === " " ? "\u00A0" : char}</span>
                    ))}
                </div>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 fade-up delay-300">
                We craft ultra-modern digital experiences using 3D motion, AI intelligence, and premium design aesthetics.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 fade-up delay-500">
                <button className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                        Start Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                </button>
                <button className="px-8 py-4 rounded-full border border-slate-700 hover:bg-slate-800 transition-colors text-lg font-medium">
                    View Portfolio
                </button>
            </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
            <MousePointer2 className="w-6 h-6 text-slate-400" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 fade-up">
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Digital Excellence</h2>
                <p className="text-slate-400">Pushing the boundaries of what's possible on the web.</p>
            </div>
            <div className="fade-up">
                <Features />
            </div>
        </div>
      </section>

      {/* AI Playground Section (Gemini Integration) */}
      <section id="playground" className="py-32 px-6 md:px-12 bg-slate-900/50 relative overflow-hidden">
         {/* Background Glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
         
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16 fade-up">
                <span className="text-indigo-400 font-bold tracking-widest text-sm uppercase">Powered by Gemini</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">Creative AI Studio</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Experience our embedded AI tools. Generate production-ready assets and get instant answers with our integrated Gemini agents.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start fade-up">
                {/* Image Gen Column */}
                <div>
                   <div className="mb-6 flex items-center justify-between">
                       <h3 className="text-xl font-bold flex items-center gap-2">
                           <span className="w-2 h-8 bg-pink-500 rounded-full"/>
                           Visual Engine
                       </h3>
                   </div>
                   <ImageGen />
                </div>

                {/* Info / Capabilities Column */}
                <div className="space-y-6 lg:pt-10">
                    <div className="p-8 rounded-3xl bg-slate-800/30 border border-slate-700/50">
                        <h3 className="text-xl font-bold mb-4 text-white">Why AI-Integrated Web?</h3>
                        <ul className="space-y-4">
                            {[
                                "Real-time content generation",
                                "Dynamic asset creation (Images/3D)",
                                "Intelligent user assistance bots",
                                "Personalized user experiences"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-300">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900/20 to-pink-900/20 border border-indigo-500/20">
                         <h4 className="font-bold text-indigo-300 mb-2">Pro Tip</h4>
                         <p className="text-sm text-slate-400">
                             Try using the Chatbot (bottom right) to ask about our pricing packages while you generate images. The AI context is persistent across the session.
                         </p>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-32 px-6 md:px-12 process-section">
          <div className="max-w-7xl mx-auto">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-20 text-center fade-up">Our Process</h2>
              
              <div className="relative">
                  {/* The animated line */}
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 hidden md:block">
                      <div className="process-line w-full h-full bg-gradient-to-r from-indigo-500 to-pink-500 origin-left scale-x-0" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                      {[
                          { step: "01", title: "Briefing", desc: "Understanding your vision & goals." },
                          { step: "02", title: "Design", desc: "Crafting visual directions & 3D assets." },
                          { step: "03", title: "Code", desc: "React & WebGL implementation." },
                          { step: "04", title: "Launch", desc: "Deployment & Performance tuning." }
                      ].map((p, i) => (
                          <div key={i} className="group fade-up" style={{ transitionDelay: `${i * 100}ms` }}>
                              <div className="w-16 h-16 bg-slate-900 border-2 border-slate-700 group-hover:border-indigo-500 rounded-full flex items-center justify-center font-display font-bold text-xl mb-6 mx-auto md:mx-0 transition-colors z-20 relative">
                                  {p.step}
                              </div>
                              <h3 className="text-xl font-bold mb-2 text-center md:text-left">{p.title}</h3>
                              <p className="text-slate-400 text-center md:text-left text-sm">{p.desc}</p>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-purple-900/20" />
          <div className="max-w-4xl mx-auto text-center relative z-10 fade-up">
              <h2 className="font-display text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                  Ready to stand out?
              </h2>
              <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                  Let's build a website that your competitors will envy and your customers will love.
              </p>
              <button className="px-10 py-5 bg-white text-black rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-2xl shadow-white/10">
                  Start Your Project
              </button>
          </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-900 bg-slate-950 text-center md:text-left px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                  <h4 className="font-display font-bold text-2xl tracking-tighter mb-2">LUMINA.</h4>
                  <p className="text-slate-500 text-sm">© 2024 Lumina Creative Studio. All rights reserved.</p>
              </div>
              <div className="flex gap-6">
                  <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github className="w-5 h-5"/></a>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter className="w-5 h-5"/></a>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5"/></a>
              </div>
          </div>
      </footer>

      {/* Persistent Components */}
      <GeminiChat />

    </div>
  );
};

export default App;
