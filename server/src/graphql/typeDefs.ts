export const typeDefs = `#graphql
  type Question {
    question: String!
    options: [String!]!
    answer: String!
  }

  type Quiz {
    id: ID!
    topic: String!
    questions: [Question!]!
  }

  type Participant {
    id: ID!
    username: String!
    score: Int!
  }

  type Query {
    getQuiz(id: ID!): Quiz
    getLeaderboard(quizId: ID!): [Participant!]!
  }

  type Mutation {
    generateQuiz(topic: String!): Quiz!
    updateScore(quizId: ID!, userId: ID!, username: String!, points: Int!): [Participant!]!
  }
`;