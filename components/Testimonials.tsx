import React from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Não foi um site. Foi uma declaração de guerra à mediocridade do nosso setor. Conversão subiu 340% no primeiro mês.",
    author: "Marina Costa",
    role: "CEO TechFlow",
    project: "Plataforma SaaS"
  },
  {
    quote: "Finalmente um desenvolvedor que entende que código é arte. A experiência 3D do nosso site virou case na indústria.",
    author: "Rafael Mendes",
    role: "CMO NeuroLab",
    project: "Institucional 3D"
  },
  {
    quote: "ROI de 8.5x em 6 meses. O investimento se pagou sozinho e ainda gerou lucro. Melhor decisão que tomamos.",
    author: "Julia Andrade",
    role: "Founder BioSphere",
    project: "E-Commerce Premium"
  }
];

const Testimonials: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((t, idx) => (
        <div key={idx} className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl group hover:-translate-y-2 transition-transform duration-500">
          <Quote className="absolute top-6 right-6 text-slate-700 w-10 h-10 group-hover:text-indigo-500/50 transition-colors" />
          
          <div className="flex gap-1 mb-6">
            {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-yellow-500 text-yellow-500" />)}
          </div>

          <p className="text-slate-300 text-lg leading-relaxed mb-6 italic relative z-10">
            "{t.quote}"
          </p>

          <div className="mt-auto border-t border-slate-700/50 pt-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                {t.author.charAt(0)}
            </div>
            <div>
                <div className="font-bold text-white text-sm">{t.author}</div>
                <div className="text-xs text-indigo-400">{t.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;