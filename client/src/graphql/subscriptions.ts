import { gql } from "@apollo/client/core/index.js";

export const SCORE_UPDATED_SUBSCRIPTION = gql`
  subscription OnScoreUpdated($quizId: ID!) {
    scoreUpdated(quizId: $quizId) {
      id
      username
      score
    }
  }
`;

export const PLAYER_JOINED_SUBSCRIPTION = gql`
  subscription OnPlayerJoined($quizId: ID!) {
    playerJoined(quizId: $quizId) {
      id
      username
    }
  }
`;