import * as dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';
import { ScoreService } from '../services/ScoreService.js';

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

export const resolvers = {
  Query: {
    getQuiz: (_: any, { id }: { id: string }) => ScoreService.getQuiz(id),
    getLeaderboard: (_: any, { quizId }: { quizId: string }) => ScoreService.getLeaderboard(quizId),
  },
  Mutation: {
    generateQuiz: async (_: any, { topic }: { topic: string }) => {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { 
              role: "system", 
              content: "You are a quiz generator. Return ONLY a JSON object with a 'questions' array. Each item must have 'question', 'options' (4 strings), and 'answer' (exact string from options)." 
            },
            { role: "user", content: `Topic: ${topic}` }
          ],
          response_format: { type: "json_object" }
        });

        const data = JSON.parse(response.choices[0].message.content || '{}');
        const roomId = Math.floor(1000 + Math.random() * 9000).toString(); 
        
        const quiz = { id: roomId, topic, questions: data.questions };
        ScoreService.saveQuiz(quiz);
        
        return quiz;
      } catch (error) {
        console.error("AI Error:", error);
        throw new Error("AI Generation failed.");
      }
    },
    updateScore: (_: any, args: any) => {
      return ScoreService.updateScore(args.quizId, args.userId, args.username, args.points);
    }
  }
};