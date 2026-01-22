"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import QuizCard from "@/components/QuizCard";
import Leaderboard from "@/components/Leaderboard";
import { Sparkles, BrainCircuit, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GENERATE_QUIZ = gql`
  mutation GenerateQuiz($topic: String!) {
    generateQuiz(topic: $topic) {
      questions {
        question
        options
        answer
      }
    }
  }
`;

export default function Home() {
  const [topic, setTopic] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [generateQuiz, { data, loading, error }] = useMutation(GENERATE_QUIZ);

  const handleGenerate = async () => {
    if (!topic) return;
    await generateQuiz({ variables: { topic } });
    setIsStarted(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!isStarted ? (
          /* LANDING STATE */
          <motion.main
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center min-h-screen px-4"
          >
            <div className="mb-8 p-4 bg-blue-500/10 rounded-3xl border border-blue-500/20">
              <BrainCircuit className="w-12 h-12 text-blue-500" />
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-center italic">
              AIR<span className="text-blue-600">QUIZ</span>
            </h1>
            
            <p className="text-gray-400 max-w-lg text-center text-lg mb-10 leading-relaxed">
              Experience the future of learning. Generate high-fidelity, 
              AI-powered quizzes on any topic instantly.
            </p>

            <div className="w-full max-w-xl glass-card p-2 rounded-2xl flex flex-col md:flex-row gap-2">
              <input
                type="text"
                placeholder="What do you want to learn today?"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                className="flex-1 bg-transparent px-6 py-4 outline-none text-white placeholder:text-gray-600"
              />
              <button
                onClick={handleGenerate}
                disabled={loading || !topic}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                Generate
              </button>
            </div>
            
            {error && (
              <p className="mt-4 text-red-400 font-mono text-xs bg-red-400/10 px-4 py-2 rounded-lg border border-red-400/20">
                Error: {error.message}
              </p>
            )}
          </motion.main>
        ) : (
          /* ACTIVE QUIZ & TRACKER STATE */
          <motion.main
            key="active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-32 pb-20 px-6 max-w-7xl mx-auto"
          >
            <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
              {/* Main Quiz Area */}
              <div className="flex-1 w-full flex justify-center">
                {loading ? (
                  <div className="flex flex-col items-center gap-4 mt-20">
                    <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                    <p className="text-blue-400 font-mono text-sm animate-pulse">SYNTHESIZING QUESTIONS...</p>
                  </div>
                ) : (
                  <QuizCard questions={data?.generateQuiz?.questions || []} />
                )}
              </div>

              {/* Sidebar Tracker */}
              <aside className="w-full lg:w-auto">
                <Leaderboard />
              </aside>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full -z-10" />
    </div>
  );
}