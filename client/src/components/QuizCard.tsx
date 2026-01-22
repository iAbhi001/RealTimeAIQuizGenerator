"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, RotateCcw, Trophy, CheckCircle2, Timer } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

export default function QuizCard({ questions }: { questions: Question[] }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleSelection = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === questions[currentIdx].answer) {
      setScore((prev) => prev + 1);
    }

    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 rounded-[2.5rem] text-center max-w-lg w-full relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-blue-500/20 blur-[100px] pointer-events-none" />
        <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
        <h2 className="text-4xl font-black tracking-tighter mb-2 italic">COMPLETE</h2>
        <p className="text-gray-400 font-mono text-sm uppercase tracking-widest mb-8">Assessment Finalized</p>
        
        <div className="text-7xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
          {score}<span className="text-2xl text-gray-600">/{questions.length}</span>
        </div>

        <button 
          onClick={() => window.location.reload()}
          className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 group"
        >
          <RotateCcw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
          START NEW SESSION
        </button>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-2xl px-4">
      {/* Seamless Progress Tracker */}
      <div className="flex justify-between items-end mb-4 px-2">
        <div className="flex flex-col">
          <span className="status-badge mb-2 w-fit">Engine: Active</span>
          <h3 className="text-sm font-mono text-blue-400/80">STEP {currentIdx + 1} OF {questions.length}</h3>
        </div>
        <div className="flex items-center gap-2 text-gray-500 font-mono text-xs">
          <Timer size={14} /> 
          <span>REAL-TIME TRACKING</span>
        </div>
      </div>

      <div className="w-full h-1.5 bg-white/5 rounded-full mb-10 overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-600 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.4, ease: "circOut" }}
          className="glass-card p-10 rounded-[2.5rem] relative"
        >
          {/* Subtle Glow Background */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 blur-[60px] pointer-events-none" />
          
          <h2 className="text-3xl font-bold leading-tight mb-10 tracking-tight">
            {questions[currentIdx].question}
          </h2>

          <div className="grid gap-4">
            {questions[currentIdx].options.map((option, i) => (
              <motion.button
                key={option}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleSelection(option)}
                className={`group relative w-full p-5 rounded-2xl text-left transition-all duration-300 border ${
                  selectedOption === option 
                    ? "bg-blue-600/20 border-blue-500 shadow-[0_0_25px_rgba(37,99,235,0.2)]" 
                    : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`font-medium ${selectedOption === option ? "text-white" : "text-gray-300"}`}>
                    {option}
                  </span>
                  {selectedOption === option && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle2 size={20} className="text-blue-400" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          <button
            disabled={!selectedOption}
            onClick={handleNext}
            className="mt-12 w-full py-5 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-20 disabled:grayscale hover:bg-blue-50 transition-all active:scale-[0.98]"
          >
            {currentIdx === questions.length - 1 ? "Finalize Quiz" : "Proceed to Next"}
            <ChevronRight size={18} />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}