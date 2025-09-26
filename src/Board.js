export class Board {
  constructor(containerId, size = 4) {
    this.container = document.getElementById(containerId);
    this.size = size;
    this.cells = [];
    this.createBoard();
  }

  createBoard() {
    this.container.innerHTML = '';
    for (let i = 0; i < this.size * this.size; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      this.container.append(cell);
      this.cells.push(cell);
    }
  }

  getRandomCell() {
    const randomIndex = Math.floor(Math.random() * this.cells.length);
    return this.cells[randomIndex];
  }

  createGoblin(cell) {
    const goblin = document.createElement('img');
    goblin.className = 'goblin';
    goblin.src = 'images/goblin.png';
    goblin.alt = 'Goblin';
    cell.append(goblin);
    return goblin;
  }

  clear() {
    this.cells.forEach(cell => {
      const goblin = cell.querySelector('.goblin');
      if (goblin) {
        goblin.remove();
      }
    });
  }
}