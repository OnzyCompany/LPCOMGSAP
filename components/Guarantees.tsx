import React from 'react';
import { ShieldCheck, MonitorSmartphone, Headphones, FileCode } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';
import { cn } from '../utils';

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  badge: string;
}

const GridItem = ({ area, icon, title, description, badge }: GridItemProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none", area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-slate-700/50 p-2 md:rounded-[1.5rem] md:p-3 bg-slate-900/40 backdrop-blur-sm">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-slate-700 bg-slate-900/80 p-6 shadow-sm md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-slate-700 bg-slate-800 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                  <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-display tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-white">
                    {title}
                  </h3>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/20 uppercase font-bold">
                    {badge}
                  </span>
              </div>
              <h2 className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-slate-400">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

const Guarantees: React.FC = () => {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-2 md:grid-rows-2 lg:gap-4">
      <GridItem
        area=""
        icon={<ShieldCheck className="h-6 w-6 text-green-400" />}
        title="Performance Garantida"
        description="90+ no Lighthouse ou Reembolso Total. Sem letras miúdas."
        badge="CONTRATUAL"
      />
      <GridItem
        area=""
        icon={<MonitorSmartphone className="h-6 w-6 text-blue-400" />}
        title="Responsividade Absoluta"
        description="Testamos em 47 dispositivos reais. Pixel-perfect garantido."
        badge="DEVICE TESTED"
      />
      <GridItem
        area=""
        icon={<Headphones className="h-6 w-6 text-purple-400" />}
        title="Suporte VIP 90 Dias"
        description="Ajustes e dúvidas respondidas em até 4h úteis."
        badge="4H RESPONSE"
      />
      <GridItem
        area=""
        icon={<FileCode className="h-6 w-6 text-yellow-400" />}
        title="Código Proprietário"
        description="100% Seu. Sem amarras. Código limpo e documentado."
        badge="OWNERSHIP"
      />
    </ul>
  );
};

export default Guarantees;