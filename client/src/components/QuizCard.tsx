"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, Trophy, RotateCcw, Clock } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface QuizCardProps {
  questions: Question[];
  onScoreUpdate: (points: number) => void;
}

export default function QuizCard({ questions, onScoreUpdate }: QuizCardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [localScore, setLocalScore] = useState(0);
  
  // New State for Timer
  const [timeLeft, setTimeLeft] = useState(15);

  // Timer Logic: Auto-decrements every second
  useEffect(() => {
    if (isFinished) return;

    if (timeLeft <= 0) {
      handleAnswer(true); // Auto-skip if time runs out
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isFinished]);

  const handleAnswer = (isTimeout = false) => {
    // If not a timeout and no option selected, do nothing
    if (!selectedOption && !isTimeout) return;

    // SCORING LOGIC: Fastest Finger First
    // Max points: 100 | Base points: 50 | Bonus: Up to 50 based on speed
    if (!isTimeout && selectedOption === questions[currentStep].answer) {
      const basePoints = 50;
      const speedBonus = Math.round((timeLeft / 15) * 50);
      const totalEarned = basePoints + speedBonus;

      setLocalScore((prev) => prev + totalEarned);
      onScoreUpdate(totalEarned); 
    }

    // Progression Logic
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setSelectedOption(null);
      setTimeLeft(15); // Reset timer for next question
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-card p-10 flex flex-col items-center text-center max-w-lg w-full mx-auto"
      >
        <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mb-6">
          <Trophy className="text-yellow-500" size={40} />
        </div>
        <h2 className="text-3xl font-black mb-2 italic">CONTEST OVER</h2>
        <p className="text-gray-400 mb-8">Final Score: <span className="text-blue-400 font-bold text-2xl">{localScore}</span></p>
        <button 
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 bg-white text-black font-bold px-8 py-3 rounded-xl hover:bg-gray-200 transition-all"
        >
          <RotateCcw size={18} /> Try Another Topic
        </button>
      </motion.div>
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header with Timer */}
      <div className="flex justify-between items-center mb-6 px-2">
        <div>
           <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest font-bold block">Question {currentStep + 1}</span>
           <span className="text-xs text-gray-500">{Math.round(progress)}% Complete</span>
        </div>
        
        {/* Timer UI */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${timeLeft <= 5 ? 'border-red-500 text-red-500 animate-pulse' : 'border-white/10 text-white'}`}>
          <Clock size={16} />
          <span className="font-mono font-bold">{timeLeft}s</span>
        </div>
      </div>

      <div className="w-full h-1.5 bg-white/5 rounded-full mb-8 overflow-hidden">
        <motion.div 
          animate={{ width: `${progress}%` }}
          className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.6)]"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          className="glass-card p-8 md:p-12 relative overflow-hidden"
        >
          {/* Subtle background timer bar */}
          <div 
            className="absolute bottom-0 left-0 h-1 bg-blue-500/30 transition-all duration-1000 ease-linear"
            style={{ width: `${(timeLeft / 15) * 100}%` }}
          />

          <h3 className="text-xl md:text-2xl font-bold mb-8 leading-tight">
            {currentQuestion.question}
          </h3>

          <div className="grid gap-3 mb-10">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedOption(option)}
                className={`flex items-center justify-between p-5 rounded-2xl border transition-all text-left ${
                  selectedOption === option 
                    ? "bg-blue-600 border-blue-500 text-white" 
                    : "bg-white/[0.03] border-white/5 text-gray-400 hover:border-white/20 hover:bg-white/[0.06]"
                }`}
              >
                <span className="text-sm font-medium">{option}</span>
                {selectedOption === option && <CheckCircle2 size={18} className="text-white" />}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleAnswer(false)}
            disabled={!selectedOption}
            className="w-full bg-white text-black py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-50 disabled:opacity-30 transition-all"
          >
            {currentStep === questions.length - 1 ? "Finish Contest" : "Next Question"}
            <ChevronRight size={18} />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}