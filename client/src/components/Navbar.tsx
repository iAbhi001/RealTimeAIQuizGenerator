"use client";

import React from "react";
import { Zap } from "lucide-react";

// Use "export default" to match your layout.tsx import
export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full p-6 flex justify-between items-center backdrop-blur-md z-50 border-b border-white/10">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Zap size={20} className="text-blue-400" fill="currentColor" />
        </div>
        <h2 className="font-black text-xl tracking-tighter italic">
          AIR <span className="text-blue-500">QUIZ</span>
        </h2>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest text-gray-400">
          STATUS: <span className="text-green-400 animate-pulse">SYSTEM_LIVE</span>
        </div>
      </div>
    </nav>
  );
}