"use client";

import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import QuizCard from "@/components/QuizCard";
import { BrainCircuit, Sparkles } from "lucide-react";

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
  const [generateQuiz, { data, loading, error }] = useMutation(GENERATE_QUIZ);

  if (data) return (
    <div className="flex items-center justify-center min-h-screen">
      <QuizCard questions={data.generateQuiz.questions} />
    </div>
  );

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="mb-6 p-3 bg-blue-500/20 rounded-2xl border border-blue-500/30">
        <BrainCircuit size={48} className="text-blue-400" />
      </div>
      <h1 className="text-6xl font-black tracking-tighter mb-4 italic">
        AIR<span className="text-blue-500">QUIZ</span>
      </h1>
      <p className="text-gray-400 text-lg mb-8 max-w-md">
        Instant AI-generated quizzes for the ultimate learning experience.
      </p>

      <div className="w-full max-w-lg flex gap-2 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
        <input 
          type="text" 
          placeholder="Enter topic (e.g. Distributed Systems...)"
          className="flex-1 bg-transparent p-4 outline-none text-white"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button 
          onClick={() => generateQuiz({ variables: { topic } })}
          disabled={loading || !topic}
          className="bg-blue-600 px-8 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-500 disabled:opacity-50 transition-all"
        >
          {loading ? "Thinking..." : "Generate"}
          <Sparkles size={18} />
        </button>
      </div>
      {error && <p className="text-red-400 mt-4 font-mono text-sm">{error.message}</p>}
    </main>
  );
}