export class Game {
  constructor(board) {
    this.board = board;
    this.score = 0;
    this.misses = 0;
    this.activeGoblin = null;
    this.interval = null;
    this.previousCellIndex = null;
    this.isGameRunning = false;
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  start() {
    if (this.isGameRunning) return;
    
    this.isGameRunning = true;
    this.resetStats();
    this.updateStats();
    
    this.board.container.addEventListener('click', this.handleCellClick);
    
    this.interval = setInterval(() => {
      this.moveGoblin();
    }, 1000);
  }

handleCellClick(event) {
    const cell = event.target.closest('.cell');
    if (!cell || !this.isGameRunning) return;
    
    const goblin = cell.querySelector('.goblin');
    
    if (goblin) {
      // Попадание по гоблину
      this.score++;
      goblin.remove();
      this.activeGoblin = null;
    } else {
      // Промах по пустой ячейке
      this.misses++;
      
      if (this.misses >= 5) {
        this.endGame();
        return;
      }
    }
    
    this.updateStats();
  }

  moveGoblin() {
    if (!this.isGameRunning) return;
    
    // Если гоблин уже есть на поле - это промах
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
    const maxAttempts = 100;
    
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

  resetStats() {
    this.score = 0;
    this.misses = 0;
    this.activeGoblin = null;
    this.previousCellIndex = null;
    this.board.clear();
  }

  endGame() {
    if (!this.isGameRunning) return;
    
    this.isGameRunning = false;
    clearInterval(this.interval);
    this.interval = null;
    
    this.showModal(`Game Over! Your score: ${this.score}`);
  }

  showModal(message) {
    const modal = document.getElementById('gameModal');
    const modalMessage = document.getElementById('modalMessage');
    const restartButton = document.getElementById('restartButton');
    
    modalMessage.textContent = message;
    modal.style.display = 'block';
    
    // Удаляем старый обработчик и добавляем новый
    restartButton.onclick = () => {
      modal.style.display = 'none';
      this.reset();
    };
    
    // Закрытие модального окна при клике вне его
    modal.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }

  reset() {
    // Полностью останавливаем игру перед рестартом
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    
    // Удаляем обработчик кликов
    this.board.container.removeEventListener('click', this.handleCellClick);
    
    // Перезапускаем игру
    this.start();
  }
}