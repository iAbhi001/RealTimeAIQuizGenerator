"use client";

import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import QuizCard from "@/components/QuizCard";

const GENERATE = gql`
  mutation GenerateQuiz($topic: String!) {
    generateQuiz(topic: $topic) {
      questions { question options answer }
    }
  }
`;

export default function Home() {
  const [topic, setTopic] = useState("");
  const [generate, { data, loading }] = useMutation(GENERATE);

  if (data) return <main className="pt-24 flex justify-center"><QuizCard questions={data.generateQuiz.questions} /></main>;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-7xl font-black tracking-tighter mb-4 italic">AIR<span className="text-blue-600">QUIZ</span></h1>
      <p className="text-gray-500 mb-8">AI-Powered Real Time Quiz Generator</p>
      <div className="w-full max-w-md flex gap-2 p-2 bg-white/5 border border-white/10 rounded-2xl">
        <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Topic (e.g. AWS S3, React hooks)" className="flex-1 bg-transparent px-4 outline-none" />
        <button onClick={() => generate({ variables: { topic } })} disabled={loading} className="bg-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-500 transition-all">
          {loading ? "..." : "Generate"}
        </button>
      </div>
    </main>
  );
}