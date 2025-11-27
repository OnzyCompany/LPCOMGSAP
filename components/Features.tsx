import React from 'react';
import { Rocket, Box, Zap } from 'lucide-react';
import { PinContainer } from './ui/3d-pin';

const features = [
  {
    icon: <Rocket className="w-8 h-8 text-indigo-400" />,
    title: "Movimento que Vende",
    desc: "Animações não são enfeites - são gatilhos de conversão. GSAP + ScrollTrigger para experiências que prendem a atenção.",
    gradient: "from-indigo-500/20 to-blue-500/5",
    pinTitle: "GSAP Motion"
  },
  {
    icon: <Box className="w-8 h-8 text-pink-400" />,
    title: "Dimensão Competitiva",
    desc: "Enquanto seus concorrentes usam carrosséis, você terá universos 3D interativos. Three.js + WebGL.",
    gradient: "from-pink-500/20 to-rose-500/5",
    pinTitle: "Three.js 3D"
  },
  {
    icon: <Zap className="w-8 h-8 text-teal-400" />,
    title: "Velocidade = Receita",
    desc: "Cada 100ms de atraso = 7% menos conversões. Entregamos sites que carregam em menos de 1.5s.",
    gradient: "from-teal-500/20 to-emerald-500/5",
    pinTitle: "Performance"
  }
];

const Features: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-32 px-4 md:px-0 py-10">
      {features.map((feature, idx) => (
        <React.Fragment key={idx}>
          <PinContainer title={feature.pinTitle} href="#">
            <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem] bg-slate-900 border border-slate-800 rounded-2xl group">
              {/* Header */}
              <div className="flex items-center gap-2 mb-4">
                  <div className="size-3 rounded-full bg-indigo-500 animate-pulse" />
                  <div className="text-xs text-slate-400">Onzy Tech Core</div>
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-6 border border-slate-700 group-hover:scale-110 transition-transform">
                  {feature.icon}
              </div>

              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-bold text-slate-100">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              {/* Animated Waves */}
              <div className="relative h-12 overflow-hidden mt-4 opacity-30">
                  {[1, 2, 3].map((i) => (
                      <div 
                      key={i}
                      className="absolute w-full h-12"
                      style={{
                          background: `linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.2) 50%, transparent 100%)`,
                          animation: `wave ${2 + i * 0.5}s ease-in-out infinite`,
                          opacity: 0.3 / i,
                          transform: `translateY(${i * 5}px)`,
                      }}
                      />
                  ))}
              </div>
            </div>
          </PinContainer>
        </React.Fragment>
      ))}
      <style>{`
        @keyframes wave {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default Features;