export class Game {
  constructor(board) {
    this.board = board;
    this.score = 0;
    this.misses = 0;
    this.activeGoblin = null;
    this.interval = null;
  }

  start() {
    this.updateStats();
    this.interval = setInterval(() => {
      this.moveGoblin();
    }, 1000);
  }

  moveGoblin() {
    if (this.activeGoblin) {
      this.misses++;
      this.updateStats();
      
      if (this.misses >= 5) {
        this.endGame();
        return;
      }
    }

    this.board.clear();
    const randomCell = this.board.getRandomCell();
    this.activeGoblin = this.board.createGoblin(randomCell);

    this.activeGoblin.addEventListener('click', () => {
      this.score++;
      this.updateStats();
      this.activeGoblin.remove();
      this.activeGoblin = null;
    });
  }

  updateStats() {
    document.getElementById('score').textContent = this.score;
    document.getElementById('misses').textContent = this.misses;
  }

  endGame() {
    clearInterval(this.interval);
    alert(`Game Over! Your score: ${this.score}`);
    this.reset();
  }

  reset() {
    this.score = 0;
    this.misses = 0;
    this.activeGoblin = null;
    this.board.clear();
    this.updateStats();
    this.start();
  }
}