"use client";

import { motion } from "framer-motion";
import { TrendingUp, Award, Activity } from "lucide-react";

interface Participant {
  id: string;
  username: string;
  score: number;
}

export default function Leaderboard({ participants = [] }: { participants?: Participant[] }) {
  const sorted = [...participants].sort((a, b) => b.score - a.score);

  return (
    <div className="w-full sticky top-24">
      <div className="flex items-center gap-3 mb-6 px-2">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <TrendingUp size={20} className="text-blue-400" />
        </div>
        <h2 className="text-lg font-bold tracking-tight uppercase">Leaderboard</h2>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/5 bg-white/[0.02] flex justify-between text-[10px] font-mono text-gray-500 uppercase tracking-widest">
          <span>Participant</span>
          <span>Score</span>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {sorted.map((player, index) => (
            <motion.div
              layout
              key={player.id}
              className="flex justify-between items-center p-5 border-b border-white/5 last:border-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold font-mono">
                  {index === 0 ? <Award size={16} className="text-yellow-400" /> : index + 1}
                </div>
                <span className="font-medium text-sm text-gray-200">{player.username}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{player.score}</span>
                <Activity size={12} className="text-blue-500/30" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}