import React from 'react';
import { TrendingUp, Clock, Gauge, Zap, BarChart3, Star } from 'lucide-react';

const metrics = [
  { icon: <TrendingUp className="text-green-400" />, value: "↑347%", label: "Conversão Média", sub: "Visitantes viram clientes" },
  { icon: <Clock className="text-blue-400" />, value: "4:32m", label: "Tempo na Página", sub: "Média setor: 51s" },
  { icon: <Gauge className="text-indigo-400" />, value: "98/100", label: "Score Lighthouse", sub: "Mobile & Desktop" },
  { icon: <Zap className="text-yellow-400" />, value: "1.2s", label: "Load Time", sub: "FCP < 800ms" },
  { icon: <BarChart3 className="text-purple-400" />, value: "8.5x", label: "ROI Médio", sub: "Retorno sobre Investimento" },
  { icon: <Star className="text-pink-400" />, value: "4.9★", label: "Satisfação", sub: "Base: 83 projetos" },
];

const Metrics: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
      {metrics.map((m, idx) => (
        <div key={idx} className="bg-slate-900/50 border border-slate-800 p-6 md:p-8 rounded-2xl flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 group">
          <div className="mb-4 p-3 bg-slate-950 rounded-full border border-slate-800 group-hover:border-indigo-500/50 transition-colors">
            {React.cloneElement(m.icon as React.ReactElement, { size: 24 })}
          </div>
          <div className="text-3xl md:text-5xl font-display font-bold text-white mb-2 tracking-tight group-hover:text-indigo-400 transition-colors">
            {m.value}
          </div>
          <div className="text-sm font-bold text-slate-300 uppercase tracking-wide mb-1">{m.label}</div>
          <div className="text-xs text-slate-500">{m.sub}</div>
        </div>
      ))}
    </div>
  );
};

export default Metrics;