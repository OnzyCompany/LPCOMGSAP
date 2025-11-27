import React from 'react';
import { Film, Box, MousePointer2, Zap, Snowflake, Binary, Eye, PenTool, Aperture } from 'lucide-react';

const techs = [
  { icon: <Film />, title: "GSAP + ScrollTrigger", desc: "Motor de Cinemática", badge: "Industry Standard" },
  { icon: <Box />, title: "Three.js + WebGL", desc: "Renderização 3D Real-Time", badge: "GPU Accelerated" },
  { icon: <MousePointer2 />, title: "Locomotive Scroll", desc: "Scroll Fluido Premium", badge: "Buttery Smooth" },
  { icon: <Zap />, title: "Lottie Animations", desc: "Vetores Vivos", badge: "Vector Based" },
  { icon: <Snowflake />, title: "Particles.js", desc: "Ecossistemas Vivos", badge: "Interactive" },
  { icon: <Binary />, title: "Custom Shaders", desc: "Física da Luz", badge: "Custom Built" },
  { icon: <Eye />, title: "Intersection Observer", desc: "Detecção Inteligente", badge: "Performance" },
  { icon: <PenTool />, title: "Canvas API", desc: "Desenho Computacional", badge: "Dynamic" },
  { icon: <Aperture />, title: "PostProcessing", desc: "Filtros Cinematográficos", badge: "Pro Grade" },
];

const TechStack: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {techs.map((tech, idx) => (
        <div key={idx} className="group p-6 rounded-xl bg-slate-900/40 border border-slate-800/60 hover:border-indigo-500/50 hover:bg-slate-800/60 backdrop-blur-sm transition-all duration-300">
           <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:text-white group-hover:bg-indigo-600 transition-colors">
                  {React.cloneElement(tech.icon as React.ReactElement, { size: 24 })}
              </div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 group-hover:text-indigo-300 border border-slate-800 group-hover:border-indigo-500/30 px-2 py-1 rounded bg-slate-950/50">
                  {tech.badge}
              </span>
           </div>
           <h4 className="font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">{tech.title}</h4>
           <p className="text-sm text-slate-400">{tech.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default TechStack;