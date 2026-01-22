"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react/hooks/index.js";
import { gql } from "@apollo/client/core/index.js";
import QuizCard from "@/components/QuizCard";
import Leaderboard from "@/components/Leaderboard";
import Navbar from "@/components/Navbar";
import { Sparkles, Users, Loader2, Hash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GENERATE_QUIZ = gql`
  mutation GenerateQuiz($topic: String!) {
    generateQuiz(topic: $topic) {
      id
      questions {
        question
        options
        answer
      }
    }
  }
`;

export default function Home() {
  const [mode, setMode] = useState<"create" | "join">("create");
  const [topic, setTopic] = useState("");
  const [roomIdInput, setRoomIdInput] = useState("");
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  
  // NEW: Lifted state to track if the game is over at the page level
  const [isFinished, setIsFinished] = useState(false);

  const [participants, setParticipants] = useState([
    { id: "1", username: "You (Host)", score: 0 },
    { id: "2", username: "Guest_492", score: 0 }
  ]);

  const [generateQuiz, { data, loading }] = useMutation(GENERATE_QUIZ);

  const handleCreate = async () => {
    if (!topic) return;
    const res = await generateQuiz({ variables: { topic } });
    if (res.data) {
      setActiveRoomId(res.data.generateQuiz.id);
      setIsStarted(true);
    }
  };

  const handleJoin = () => {
    if (!roomIdInput) return;
    setActiveRoomId(roomIdInput);
    setIsStarted(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />
      
      <AnimatePresence mode="wait">
        {!isStarted ? (
          <motion.main key="landing" className="flex flex-col items-center justify-center min-h-screen px-4">
            <h1 className="text-6xl font-black mb-8 italic tracking-tighter">
              AIR<span className="text-blue-600">QUIZ</span>
            </h1>
            
            <div className="flex gap-4 mb-8 bg-white/5 p-1 rounded-2xl border border-white/10">
              <button 
                onClick={() => setMode("create")}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${mode === "create" ? "bg-blue-600 shadow-lg shadow-blue-600/20" : "text-gray-500 hover:text-gray-300"}`}
              >
                Create Room
              </button>
              <button 
                onClick={() => setMode("join")}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${mode === "join" ? "bg-blue-600 shadow-lg shadow-blue-600/20" : "text-gray-500 hover:text-gray-300"}`}
              >
                Join Contest
              </button>
            </div>

            <div className="w-full max-w-xl glass-card p-2 rounded-2xl flex gap-2 border border-white/5">
              {mode === "create" ? (
                <>
                  <input 
                    className="flex-1 bg-transparent px-6 py-4 outline-none text-white placeholder:text-gray-600" 
                    placeholder="Enter topic for the contest..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                  <button onClick={handleCreate} className="bg-blue-600 px-8 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-500 transition-colors">
                    {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />} HOST
                  </button>
                </>
              ) : (
                <>
                  <input 
                    className="flex-1 bg-transparent px-6 py-4 outline-none text-white placeholder:text-gray-600" 
                    placeholder="Enter 4-digit Room Code..."
                    value={roomIdInput}
                    onChange={(e) => setRoomIdInput(e.target.value)}
                  />
                  <button onClick={handleJoin} className="bg-green-600 px-8 rounded-xl font-bold flex items-center gap-2 hover:bg-green-500 transition-colors">
                    <Users size={18} /> JOIN
                  </button>
                </>
              )}
            </div>
          </motion.main>
        ) : (
          <motion.main 
            key="active" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-32 px-6 max-w-7xl mx-auto flex flex-col items-center"
          >
            {/* Conditional Layout Container */}
            <div className={`w-full flex transition-all duration-500 ease-in-out ${isFinished ? 'flex-col items-center gap-10' : 'flex-col lg:flex-row gap-12'}`}>
              
              <div className={`flex flex-col items-center transition-all ${isFinished ? 'w-full max-w-lg' : 'flex-1'}`}>
                {!isFinished && (
                  <div className="mb-6 flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20 animate-pulse">
                    <Hash size={14} className="text-blue-400" />
                    <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-widest">
                      ROOM ID: {activeRoomId || "4921"}
                    </span>
                  </div>
                )}
                
                <QuizCard 
                  questions={data?.generateQuiz?.questions || []} 
                  onScoreUpdate={(pts) => setParticipants(prev => prev.map(p => p.id === "1" ? {...p, score: p.score + pts} : p))} 
                />
              </div>

              {/* Leaderboard expands to be more prominent when finished */}
              <div className={`transition-all duration-500 ${isFinished ? 'w-full max-w-3xl' : 'w-full lg:w-1/3'}`}>
                <Leaderboard participants={participants} />
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}