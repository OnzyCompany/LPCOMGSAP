import React from 'react';
import { BrainCircuit, Grid, Code2, Rocket } from 'lucide-react';

const steps = [
  {
    icon: <BrainCircuit className="w-8 h-8 text-white" />,
    title: "Decodificação Neural",
    copy: "Mergulhamos no DNA da sua marca. Não fazemos briefing - fazemos arqueologia de propósito.",
    metric: "48h de imersão",
    color: "from-indigo-600 to-blue-600"
  },
  {
    icon: <Grid className="w-8 h-8 text-white" />,
    title: "Design Quântico",
    copy: "Projetamos em múltiplas realidades simultaneamente. Cada pixel calculado para criar micro-momentos de encantamento.",
    metric: "127 iterações",
    color: "from-pink-600 to-rose-600"
  },
  {
    icon: <Code2 className="w-8 h-8 text-white" />,
    title: "Desenvolvimento Hiperdimensional",
    copy: "Escrevemos código que respira. GSAP, Three.js, WebGL - tecnologias que transformam navegadores em portais.",
    metric: "99+ Lighthouse",
    color: "from-teal-600 to-emerald-600"
  },
  {
    icon: <Rocket className="w-8 h-8 text-white" />,
    title: "Ignição e Escala",
    copy: "Não entregamos sites - lançamos experiências. Deploy otimizado e monitoramento em tempo real.",
    metric: "72h para launch",
    color: "from-purple-600 to-violet-600"
  }
];

// Connectivity Lines Component with Strong Beam
const ProcessConnectivity = () => (
    <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
        <style>{`
          @keyframes beam-flow-process {
            to { stroke-dashoffset: -200; }
          }
          .animate-beam-process {
            stroke-dasharray: 20 180;
            animation: beam-flow-process 2.5s linear infinite;
            filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.8));
          }
        `}</style>
        <svg className="w-full h-full" preserveAspectRatio="none">
             <defs>
                <linearGradient id="process-beam" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0" />
                    <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                </linearGradient>
            </defs>
            
            <g fill="none" strokeWidth="4" strokeLinecap="round">
                {/* Track */}
                <path d="M 25% 25% L 75% 25% L 25% 75% L 75% 75%" stroke="rgba(255,255,255,0.05)" />
                
                {/* Beam */}
                <path 
                    d="M 25% 25% L 75% 25% L 25% 75% L 75% 75%" 
                    stroke="url(#process-beam)" 
                    className="animate-beam-process" 
                    pathLength="100"
                />
            </g>
        </svg>
    </div>
);

const Process: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto py-10 relative">
      
      <ProcessConnectivity />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-20 md:gap-y-16 relative z-10">
        {steps.map((step, idx) => (
          <div key={idx} className="glass-card p-8 rounded-2xl relative group hover:-translate-y-2 transition-transform duration-300 border border-slate-700/50 bg-slate-900/60 backdrop-blur-xl">
            {/* Badge */}
            <div className={`absolute -top-3 right-4 bg-gradient-to-r ${step.color} px-4 py-1 rounded-full text-xs font-bold text-white shadow-lg`}>
              {step.metric}
            </div>

            <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${step.color} shadow-lg shrink-0`}>
                    {step.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-white mt-1">{step.title}</h3>
            </div>
            
            <p className="text-slate-400 leading-relaxed text-sm">{step.copy}</p>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Process;