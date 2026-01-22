export class ScoreService {
  private static quizzes = new Map<string, any>();
  private static rooms = new Map<string, any[]>();

  static saveQuiz(quiz: any) {
    this.quizzes.set(quiz.id, quiz);
  }

  static getQuiz(id: string) {
    return this.quizzes.get(id);
  }

  static updateScore(quizId: string, userId: string, username: string, points: number) {
    const players = this.rooms.get(quizId) || [];
    const playerIndex = players.findIndex(p => p.id === userId);

    if (playerIndex > -1) {
      players[playerIndex].score += points;
    } else {
      players.push({ id: userId, username, score: points });
    }

    this.rooms.set(quizId, players);
    return players;
  }

  static getLeaderboard(quizId: string) {
    return this.rooms.get(quizId) || [];
  }
}