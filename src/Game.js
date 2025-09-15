export class Game {
  constructor(board) {
    this.board = board;
    this.score = 0;
    this.misses = 0;
    this.activeGoblin = null;
    this.interval = null;
    this.previousCellIndex = null;
  }

  start() {
    this.updateStats();
    this.interval = setInterval(() => {
      this.moveGoblin();
    }, 1000);

    // Обработчик кликов по ячейкам
    this.board.container.addEventListener('click', (event) => {
      const cell = event.target.closest('.cell');
      if (!cell) return;
      
      // Если в ячейке есть гоблин
      if (cell.querySelector('.goblin')) {
        this.score++;
        this.updateStats();
        cell.querySelector('.goblin').remove();
        this.activeGoblin = null;
      } else {
        // Если кликнули по пустой ячейке - промах
        this.misses++;
        this.updateStats();
        if (this.misses >= 5) {
          this.endGame();
        }
      }
    });
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
    
    // Выбираем случайную ячейку, отличную от предыдущей
    let randomCell;
    let attempts = 0;
    const maxAttempts = 100; // Защита от бесконечного цикла
    
    do {
      randomCell = this.board.getRandomCell();
      attempts++;
    } while (
      randomCell.dataset.index === this.previousCellIndex && 
      this.board.cells.length > 1 && 
      attempts < maxAttempts
    );
    
    this.previousCellIndex = randomCell.dataset.index;
    this.activeGoblin = this.board.createGoblin(randomCell);
  }

  updateStats() {
    document.getElementById('score').textContent = this.score;
    document.getElementById('misses').textContent = this.misses;
  }

  endGame() {
    clearInterval(this.interval);
    this.showModal(`Game Over! Your score: ${this.score}`);
  }

  showModal(message) {
    const modal = document.getElementById('gameModal');
    const modalMessage = document.getElementById('modalMessage');
    const restartButton = document.getElementById('restartButton');
    
    modalMessage.textContent = message;
    modal.style.display = 'block';
    
    restartButton.onclick = () => {
      modal.style.display = 'none';
      this.reset();
    };
  }

  reset() {
    this.score = 0;
    this.misses = 0;
    this.activeGoblin = null;
    this.previousCellIndex = null;
    this.board.clear();
    this.updateStats();
    this.start();
  }
}