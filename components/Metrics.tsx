import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: 347, suffix: "%", label: "Conversão Média", color: "text-green-400" },
  { value: 4.32, suffix: "min", label: "Tempo na Página", color: "text-blue-400", isDecimal: true },
  { value: 98, suffix: "/100", label: "Score Lighthouse", color: "text-indigo-400" },
  { value: 1.2, suffix: "s", label: "Load Time", color: "text-yellow-400", isDecimal: true },
  { value: 8.5, suffix: "x", label: "ROI Médio", color: "text-purple-400", isDecimal: true },
  { value: 4.9, suffix: "★", label: "Satisfação", color: "text-pink-400", isDecimal: true },
];

const Metrics: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the container entry
      gsap.from(".hud-container", {
        scaleY: 0,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%"
        }
      });

      // Animate numbers
      metrics.forEach((m, i) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: m.value,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%"
          },
          onUpdate: () => {
             const el = document.getElementById(`metric-${i}`);
             if (el) {
                 el.innerText = m.isDecimal ? obj.val.toFixed(1) : Math.round(obj.val).toString();
             }
          }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto">
        <div className="hud-container relative bg-slate-900/60 border-y border-indigo-500/30 backdrop-blur-md p-8 md:p-12 overflow-hidden">
            {/* Decorative HUD Lines */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-500" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-indigo-500" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-indigo-500" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-500" />
            
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8 text-center">
                {metrics.map((m, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center">
                        <div className={`text-4xl md:text-6xl font-black font-mono mb-2 ${m.color} flex items-baseline`}>
                            <span id={`metric-${idx}`}>0</span>
                            <span className="text-2xl md:text-3xl ml-1 opacity-70">{m.suffix}</span>
                        </div>
                        <div className="text-xs md:text-sm uppercase tracking-widest text-slate-400 font-bold">
                            {m.label}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-10 pt-6 border-t border-indigo-500/20 flex justify-between items-center text-[10px] text-indigo-400/60 font-mono uppercase">
                <span>System Status: Online</span>
                <span>Data Source: Onzy Analytics</span>
                <span>Latency: 12ms</span>
            </div>
        </div>
    </div>
  );
};

export default Metrics;