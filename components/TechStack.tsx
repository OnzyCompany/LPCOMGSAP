import React from 'react';
import DatabaseWithRestApi from './ui/database-with-rest-api';

const TechStack: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-[60vh]">
        {/* Removed the glassmorphism container (bg-slate-900/40, border, etc) */}
        <div className="w-full max-w-6xl relative group flex flex-col items-center">
            
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-12">
                <div className="flex-1 space-y-8 max-w-md">
                    <h3 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
                        Arsenal de <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Elite</span>
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed">
                        Nossa infraestrutura é desenhada para escala infinita. Utilizamos o que há de mais moderno em renderização server-side e aceleração via GPU.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-4 text-slate-300">
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                            </span>
                            <span className="font-mono text-sm tracking-wide">GSAP Cinematic Engine</span>
                        </li>
                        <li className="flex items-center gap-4 text-slate-300">
                             <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                            </span>
                            <span className="font-mono text-sm tracking-wide">Three.js WebGL Core</span>
                        </li>
                        <li className="flex items-center gap-4 text-slate-300">
                             <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                            </span>
                            <span className="font-mono text-sm tracking-wide">React Server Components</span>
                        </li>
                    </ul>
                </div>
                
                <div className="flex-1 w-full flex justify-center md:justify-end">
                    <DatabaseWithRestApi 
                        title="Onzy Core Architecture"
                        circleText="WEBGL"
                        badgeTexts={{
                            first: "GSAP",
                            second: "REACT",
                            third: "THREE",
                            fourth: "NEXT"
                        }}
                        lightColor="#6366f1"
                    />
                </div>
            </div>
        </div>
    </div>
  );
};

export default TechStack;