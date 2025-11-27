import React from 'react';
import { BrainCircuit, Grid, Code2, Rocket } from 'lucide-react';

const steps = [
  {
    icon: <BrainCircuit className="w-6 h-6 text-indigo-400" />,
    title: "Decodificação Neural",
    copy: "Mergulhamos no DNA da sua marca. Não fazemos briefing - fazemos arqueologia de propósito.",
    metric: "48h de imersão"
  },
  {
    icon: <Grid className="w-6 h-6 text-pink-400" />,
    title: "Design Quântico",
    copy: "Projetamos em múltiplas realidades simultaneamente. Cada pixel calculado para criar micro-momentos de encantamento.",
    metric: "127 iterações"
  },
  {
    icon: <Code2 className="w-6 h-6 text-teal-400" />,
    title: "Desenvolvimento Hiperdimensional",
    copy: "Escrevemos código que respira. GSAP, Three.js, WebGL - tecnologias que transformam navegadores em portais.",
    metric: "99+ Lighthouse"
  },
  {
    icon: <Rocket className="w-6 h-6 text-purple-400" />,
    title: "Ignição e Escala",
    copy: "Não entregamos sites - lançamos experiências. Deploy otimizado e monitoramento em tempo real.",
    metric: "72h para launch"
  }
];

const Process: React.FC = () => {
  return (
    <div className="relative">
      {/* Connector Line (Abstract representation) */}
      <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500/0 via-indigo-500/50 to-pink-500/0" />

      <div className="space-y-12 md:space-y-24">
        {steps.map((step, idx) => (
          <div key={idx} className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            
            {/* Content Card */}
            <div className="flex-1 w-full pl-16 md:pl-0">
               <div className={`bg-slate-900/60 backdrop-blur-md border border-slate-700/50 p-6 md:p-8 rounded-2xl hover:border-indigo-500/50 transition-colors group relative ${idx % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'} max-w-lg`}>
                  <div className="absolute -top-3 -right-3 bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-xs font-mono text-indigo-400 group-hover:scale-110 transition-transform">
                      {step.metric}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.copy}</p>
               </div>
            </div>

            {/* Center Icon */}
            <div className="relative z-10 shrink-0">
                <div className="w-14 h-14 rounded-full bg-slate-900 border-2 border-indigo-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                    {step.icon}
                </div>
            </div>

            {/* Empty Spacer for alternating layout */}
            <div className="flex-1 hidden md:block" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Process;