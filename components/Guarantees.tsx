import React from 'react';
import { ShieldCheck, MonitorSmartphone, Headphones, FileCode, Rocket } from 'lucide-react';

const Guarantees: React.FC = () => {
  return (
    <div className="grid gap-4">
      {/* Horizontal Cards */}
      {[
          { 
              icon: <ShieldCheck className="text-green-400" />, 
              title: "Performance Garantida", 
              desc: "90+ no Lighthouse ou Reembolso Total. Sem letras miúdas.",
              badge: "CONTRATUAL"
          },
          { 
              icon: <MonitorSmartphone className="text-blue-400" />, 
              title: "Responsividade Absoluta", 
              desc: "Testamos em 47 dispositivos reais. Pixel-perfect garantido.",
              badge: "DEVICE TESTED"
          },
          { 
              icon: <Headphones className="text-purple-400" />, 
              title: "Suporte VIP 90 Dias", 
              desc: "Ajustes e dúvidas respondidas em até 4h úteis.",
              badge: "4H RESPONSE"
          },
          { 
              icon: <FileCode className="text-yellow-400" />, 
              title: "Código Proprietário", 
              desc: "100% Seu. Sem amarras. Código limpo e documentado.",
              badge: "OWNERSHIP"
          }
      ].map((g, idx) => (
        <div key={idx} className="flex items-center gap-4 p-5 rounded-xl bg-slate-900/80 border border-slate-700/50 hover:border-indigo-500 transition-colors group">
           <div className="p-3 bg-slate-950 rounded-lg group-hover:scale-110 transition-transform">
               {React.cloneElement(g.icon as React.ReactElement, { size: 24 })}
           </div>
           <div className="flex-1">
               <h4 className="font-bold text-white text-lg flex items-center gap-3">
                   {g.title}
                   <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/20">{g.badge}</span>
               </h4>
               <p className="text-slate-400 text-sm">{g.desc}</p>
           </div>
        </div>
      ))}
    </div>
  );
};

export default Guarantees;