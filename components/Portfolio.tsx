import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Nova Bank",
    category: "Fintech 3D",
    description: "Reimaginamos o banking digital com visualização de dados holográfica. O usuário navega por suas finanças como se estivesse em um jogo de estratégia.",
    color: "from-blue-600 to-cyan-500",
    pattern: "opacity-30 mix-blend-overlay"
  },
  {
    id: 2,
    title: "Orbital Tourism",
    category: "VR & WebGL",
    description: "Portal de reservas para turismo espacial. Inclui um configurador de cabine em tempo real rodando a 60fps no navegador.",
    color: "from-purple-600 to-indigo-900",
    pattern: "opacity-20 mix-blend-color-dodge"
  },
  {
    id: 3,
    title: "Green Pulse",
    category: "Dashboard IoT",
    description: "Plataforma de monitoramento de florestas usando dados de satélite processados por IA e renderizados em um globo interativo.",
    color: "from-emerald-600 to-teal-500",
    pattern: "opacity-25 mix-blend-overlay"
  },
  {
    id: 4,
    title: "Cyber Fashion",
    category: "E-Commerce",
    description: "Loja conceito onde as roupas flutuam em gravidade zero e os usuários podem testar caimento usando AR direto na web.",
    color: "from-pink-600 to-rose-500",
    pattern: "opacity-30 mix-blend-screen"
  }
];

const Portfolio: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setActiveSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto perspective-[2000px]">
      <div className="overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-700/50 backdrop-blur-xl shadow-2xl aspect-[16/10] md:aspect-[21/9] relative group transform transition-transform hover:scale-[1.02] duration-500">
        
        {/* Slides */}
        {projects.map((project, index) => (
          <div 
            key={project.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col md:flex-row
              ${index === activeSlide ? 'opacity-100 translate-x-0 z-10 rotate-y-0 scale-100' : 
                index < activeSlide ? 'opacity-0 -translate-x-full z-0 rotate-y-12 scale-90' : 
                'opacity-0 translate-x-full z-0 -rotate-y-12 scale-90'
              }
            `}
          >
            {/* Visual Side */}
            <div className={`w-full md:w-2/3 h-1/2 md:h-full bg-gradient-to-br ${project.color} relative overflow-hidden flex items-center justify-center`}>
               {/* Abstract Pattern Overlay */}
               <div className={`absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] ${project.pattern}`}></div>
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent md:bg-gradient-to-r md:from-transparent md:to-slate-900/90 z-0"></div>
               
               <h3 className="relative z-10 text-5xl md:text-8xl font-display font-bold text-white/10 uppercase tracking-widest transform -rotate-12 select-none whitespace-nowrap">
                 {project.title}
               </h3>
               
               <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-mono border border-white/20 text-white shadow-lg">
                 CASE STUDY #0{project.id}
               </div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/3 h-1/2 md:h-full bg-slate-900/90 p-8 md:p-12 flex flex-col justify-center border-l border-slate-700/50 relative z-20">
              <div className="mb-auto">
                  <span className="inline-block px-3 py-1 rounded bg-indigo-500/20 text-indigo-300 font-mono text-xs mb-4 uppercase tracking-wider border border-indigo-500/30">
                    {project.category}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 mb-8 text-sm md:text-base leading-relaxed border-l-2 border-slate-700 pl-4">
                    {project.description}
                  </p>
              </div>
              
              <button className="flex items-center gap-2 text-white font-bold bg-white/5 hover:bg-white/10 p-4 rounded-xl transition-all group/btn w-full justify-between border border-white/5 hover:border-white/20">
                <span>Ver Detalhes do Projeto</span>
                <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform text-indigo-400" />
              </button>
            </div>
          </div>
        ))}

        {/* Navigation Controls */}
        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-30 flex gap-4">
           <button onClick={prevSlide} className="p-4 rounded-full bg-black/50 hover:bg-indigo-600 backdrop-blur-md border border-white/10 text-white transition-all hover:scale-110 group">
             <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
           </button>
           <button onClick={nextSlide} className="p-4 rounded-full bg-black/50 hover:bg-indigo-600 backdrop-blur-md border border-white/10 text-white transition-all hover:scale-110 group">
             <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-8 right-8 z-30 flex gap-2">
            {projects.map((_, idx) => (
                <button 
                    key={idx} 
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-500 ${idx === activeSlide ? 'w-12 bg-indigo-500' : 'w-2 bg-slate-700 hover:bg-slate-500'}`}
                />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;