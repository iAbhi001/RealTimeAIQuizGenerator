"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, Trophy, RotateCcw } from "lucide-react";

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

  const handleAnswer = () => {
    if (!selectedOption) return;

    // Check if the answer is correct
    if (selectedOption === questions[currentStep].answer) {
      setLocalScore((prev) => prev + 10);
      onScoreUpdate(10); // Notify the parent/leaderboard instantly
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-card p-10 flex flex-col items-center text-center max-w-lg w-full"
      >
        <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mb-6">
          <Trophy className="text-yellow-500" size={40} />
        </div>
        <h2 className="text-3xl font-black mb-2 italic">CONTEST OVER</h2>
        <p className="text-gray-400 mb-8">You finished with <span className="text-white font-bold">{localScore} points</span></p>
        <button 
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl transition-all"
        >
          <RotateCcw size={18} /> Try Another Topic
        </button>
      </motion.div>
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="w-full max-w-2xl">
      {/* Progress Tracker */}
      <div className="flex justify-between items-end mb-4 px-2">
        <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest font-bold">Question {currentStep + 1}/{questions.length}</span>
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{Math.round(progress)}% Complete</span>
      </div>
      <div className="w-full h-1 bg-white/5 rounded-full mb-8 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          className="glass-card p-8 md:p-12"
        >
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
                    ? "bg-blue-600/10 border-blue-600 text-white" 
                    : "bg-white/[0.02] border-white/5 text-gray-400 hover:border-white/10 hover:bg-white/[0.04]"
                }`}
              >
                <span className="text-sm font-medium">{option}</span>
                {selectedOption === option && <CheckCircle2 size={18} className="text-blue-500" />}
              </button>
            ))}
          </div>

          <button
            onClick={handleAnswer}
            disabled={!selectedOption}
            className="w-full bg-white text-black py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {currentStep === questions.length - 1 ? "Finish Contest" : "Next Question"}
            <ChevronRight size={18} />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}