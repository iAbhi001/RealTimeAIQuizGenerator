"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, CheckCircle2 } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

export default function QuizCard({ questions }: { questions: Question[] }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleNext = () => {
    if (selectedOption === questions[currentStep].answer) {
      setScore(score + 1);
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-10 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl"
      >
        <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold">Quiz Complete!</h2>
        <p className="text-xl mt-2 text-gray-400">You scored {score} out of {questions.length}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-full font-semibold transition-all"
        >
          Try Another Topic
        </button>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="w-full h-2 bg-white/10 rounded-full mb-8 overflow-hidden">
        <motion.div 
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="bg-white/5 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 shadow-2xl"
        >
          <span className="text-blue-400 font-mono text-sm uppercase tracking-widest">
            Question {currentStep + 1} of {questions.length}
          </span>
          <h2 className="text-2xl font-semibold mt-4 mb-8 leading-tight">
            {questions[currentStep].question}
          </h2>

          <div className="space-y-4">
            {questions[currentStep].options.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedOption(option)}
                className={`w-full p-4 rounded-2xl text-left transition-all border ${
                  selectedOption === option 
                    ? "bg-blue-600 border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.3)]" 
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            disabled={!selectedOption}
            onClick={handleNext}
            className="mt-8 w-full py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-all"
          >
            {currentStep === questions.length - 1 ? "Finish" : "Next Question"}
            <ChevronRight size={20} />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}