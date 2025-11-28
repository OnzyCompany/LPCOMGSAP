"use client";

import React from "react";
import { motion } from "framer-motion";
import { Folder, HeartHandshakeIcon, SparklesIcon, Zap } from "lucide-react";
import { cn } from "../../utils";

interface DatabaseWithRestApiProps {
  className?: string;
  circleText?: string;
  badgeTexts?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
  title?: string;
  lightColor?: string;
}

const DatabaseWithRestApi = ({
  className,
  circleText,
  badgeTexts,
  title,
  lightColor,
}: DatabaseWithRestApiProps) => {
  return (
    <div
      className={cn(
        "relative flex h-[350px] w-full max-w-[500px] flex-col items-center",
        className
      )}
    >
      <style>{`
        @keyframes beam-flow {
          to {
            stroke-dashoffset: -100;
          }
        }
        .animate-beam {
          stroke-dasharray: 10 90;
          animation: beam-flow 2s linear infinite;
        }
      `}</style>

      {/* SVG Paths Layer */}
      <svg
        className="h-full sm:w-full absolute inset-0 pointer-events-none"
        width="100%"
        height="100%"
        viewBox="0 0 200 100"
        fill="none"
      >
        <defs>
            <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={lightColor || "#6366f1"} stopOpacity="0" />
                <stop offset="50%" stopColor={lightColor || "#6366f1"} stopOpacity="1" />
                <stop offset="100%" stopColor={lightColor || "#6366f1"} stopOpacity="0" />
            </linearGradient>
            <filter id="glow-beam" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>

        <g
          strokeWidth="0.5"
          fill="none"
        >
          {/* TRACK PATHS (Darker, static) */}
          <g stroke="rgba(255,255,255,0.1)">
             <path d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10" />
             <path d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10" />
             <path d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10" />
             <path d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10" />
          </g>

          {/* BEAM PATHS (Bright, animated) */}
          <g stroke="url(#beam-gradient)" strokeWidth="0.8" filter="url(#glow-beam)" className="animate-beam">
             <path d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10" pathLength="100" />
             <path d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10" pathLength="100" />
             <path d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10" pathLength="100" />
             <path d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10" pathLength="100" />
          </g>
        </g>

        {/* Blue Lights (Static Glows at junctions) */}
        <g mask="url(#db-mask-1)">
          <circle className="database db-light-1" cx="0" cy="0" r="12" fill="url(#db-blue-grad)" />
        </g>
        <defs>
           <radialGradient id="db-blue-grad" fx="1">
            <stop offset="0%" stopColor={lightColor || "#6366f1"} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
      
      {/* SVG for Buttons text */}
      <svg
        className="h-full sm:w-full text-slate-700 absolute inset-0 pointer-events-none"
        width="100%"
        height="100%"
        viewBox="0 0 200 100"
      >
        <g stroke="none" fill="none">
           {/* First Button */}
          <g>
            <rect fill="#0f172a" stroke="rgba(255,255,255,0.1)" strokeWidth="0.2" x="14" y="5" width="34" height="10" rx="5"></rect>
            <text x="31" y="12" fill="white" fontSize="4" fontWeight="600" textAnchor="middle">{badgeTexts?.first || "GET"}</text>
          </g>
          {/* Second Button */}
          <g>
            <rect fill="#0f172a" stroke="rgba(255,255,255,0.1)" strokeWidth="0.2" x="60" y="5" width="34" height="10" rx="5"></rect>
            <text x="77" y="12" fill="white" fontSize="4" fontWeight="600" textAnchor="middle">{badgeTexts?.second || "POST"}</text>
          </g>
          {/* Third Button */}
          <g>
            <rect fill="#0f172a" stroke="rgba(255,255,255,0.1)" strokeWidth="0.2" x="108" y="5" width="34" height="10" rx="5"></rect>
            <text x="125" y="12" fill="white" fontSize="4" fontWeight="600" textAnchor="middle">{badgeTexts?.third || "PUT"}</text>
          </g>
          {/* Fourth Button */}
          <g>
            <rect fill="#0f172a" stroke="rgba(255,255,255,0.1)" strokeWidth="0.2" x="150" y="5" width="40" height="10" rx="5"></rect>
            <text x="170" y="12" fill="white" fontSize="4" fontWeight="600" textAnchor="middle">{badgeTexts?.fourth || "DELETE"}</text>
          </g>
        </g>
      </svg>

      {/* Main Box */}
      <div className="absolute bottom-10 flex w-full flex-col items-center">
        {/* bottom shadow */}
        <div className="absolute -bottom-4 h-[100px] w-[62%] rounded-lg bg-indigo-500/10 blur-xl" />
        {/* box title */}
        <div className="absolute -top-3 z-20 flex items-center justify-center rounded-lg border border-slate-700 bg-[#0f172a] px-2 py-1 sm:-top-4 sm:py-1.5">
          <SparklesIcon className="size-3 text-indigo-400" />
          <span className="ml-2 text-[10px] text-slate-300">
            {title ? title : "Architecture"}
          </span>
        </div>
        {/* box outter circle */}
        <div className="absolute -bottom-8 z-30 grid h-[60px] w-[60px] place-items-center rounded-full border-t border-slate-700 bg-[#0f172a] font-semibold text-xs text-indigo-400">
          {circleText ? circleText : "CORE"}
        </div>
        {/* box content */}
        <div className="relative z-10 flex h-[150px] w-full items-center justify-center overflow-hidden rounded-lg border border-slate-800 bg-slate-900/50 shadow-md backdrop-blur-sm">
          {/* Badges */}
          <div className="absolute bottom-8 left-12 z-10 h-7 rounded-full bg-[#1e293b] px-3 text-xs border border-slate-700 flex items-center gap-2 text-white">
            <HeartHandshakeIcon className="size-4 text-pink-500" />
            <span>Design</span>
          </div>
          <div className="absolute right-16 z-10 hidden h-7 rounded-full bg-[#1e293b] px-3 text-xs sm:flex border border-slate-700 items-center gap-2 text-white">
            <Folder className="size-4 text-teal-500" />
            <span>Code</span>
          </div>
          <div className="absolute top-8 left-16 z-10 h-7 rounded-full bg-[#1e293b] px-3 text-xs border border-slate-700 flex items-center gap-2 text-white">
            <Zap className="size-4 text-yellow-500" />
            <span>Fast</span>
          </div>
          {/* Circles with Framer Motion */}
          <motion.div
            className="absolute -bottom-14 h-[100px] w-[100px] rounded-full border-t border-indigo-500/20 bg-indigo-500/5"
            animate={{
              scale: [0.98, 1.02, 0.98, 1, 1, 1, 1, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 h-[145px] w-[145px] rounded-full border-t border-indigo-500/20 bg-indigo-500/5"
            animate={{
              scale: [1, 1, 1, 0.98, 1.02, 0.98, 1, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-[100px] h-[190px] w-[190px] rounded-full border-t border-indigo-500/20 bg-indigo-500/5"
            animate={{
              scale: [1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
};

export default DatabaseWithRestApi;