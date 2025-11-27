import React from 'react';
import { Rocket, Box, Zap } from 'lucide-react';

const features = [
  {
    icon: <Rocket className="w-8 h-8 text-indigo-400" />,
    title: "Animações Cinematográficas",
    desc: "Desenvolvido com GSAP & ScrollTrigger para design de movimento premiado.",
    gradient: "from-indigo-500/20 to-blue-500/5"
  },
  {
    icon: <Box className="w-8 h-8 text-pink-400" />,
    title: "Experiências 3D Imersivas",
    desc: "Integração WebGL & Three.js para profundidade e interatividade total.",
    gradient: "from-pink-500/20 to-rose-500/5"
  },
  {
    icon: <Zap className="w-8 h-8 text-teal-400" />,
    title: "Performance Otimizada",
    desc: "Carregamento ultra-rápido com pontuação 99+ no Lighthouse.",
    gradient: "from-teal-500/20 to-emerald-500/5"
  }
];

const Features: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
      {features.map((feature, idx) => (
        <div 
          key={idx}
          className="group relative p-8 rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden hover:-translate-y-2 transition-transform duration-500"
        >
          {/* Gradient Bg on Hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-slate-700">
              {feature.icon}
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">
              {feature.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;