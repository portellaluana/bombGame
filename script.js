document.addEventListener('DOMContentLoaded', function() {
  const bombs = document.querySelectorAll('.bomb');
  let level = 1;

  class Game {
    constructor() {
      this.level = 1;
      this.bombs = bombs;
      this.startLevel();
    }

    startLevel() {
      this.resetBombs(); 
      this.bombValues = this.generateBombValues(); 

      this.bombs.forEach((bomb, index) => {
        const bombInstance = new Bomb(bomb, this.bombValues[index], index, this);
        bombInstance.setupClick();
      });
    }

    resetBombs() {
      this.bombs.forEach((bomb) => {
        const img = bomb.querySelector('img');
        img.src = './assets/bomba.png';
        img.style.opacity = '1'; 
        bomb.classList.remove('exploding');
        bomb.querySelector('.explosion').style.display = 'none';
      });
    }

    generateBombValues() {
      let values = [0, 0, 0];
      const randomIndex = Math.floor(Math.random() * 3);
      values[randomIndex] = 1;
      return values;
    }

    nextLevel() {
      this.level++;
      if (this.level <= 4) {
        setTimeout(() => this.startLevel(), 1000); 
      } else {
        alert('Fim do jogo!');
      }
    }
  }

  class Bomb {
    constructor(element, value, index, game) {
      this.element = element;
      this.value = value;
      this.index = index;
      this.game = game;
    }

    setupClick() {
      this.element.addEventListener('click', () => this.handleBombClick());
    }

    handleBombClick() {
      console.log('Bomb clicked');
      this.element.classList.add('exploding');
      const explosion = this.element.querySelector('.explosion');
      explosion.style.display = 'block';
      explosion.style.animation = 'explode 1s steps(6) forwards';

      setTimeout(() => {
        const img = this.element.querySelector('img');
        img.src = this.value === 1 ? './assets/moeda.png' : './assets/caveira.png';
      }, 500);

      setTimeout(() => {
        explosion.style.display = 'none';
        this.showOtherBombs();
      }, 1000);
    }

    showOtherBombs() {
      this.game.bombs.forEach((bomb, idx) => {
        if (idx !== this.index) {
          const img = bomb.querySelector('img');
          img.src = this.game.bombValues[idx] === 1 ? './assets/moeda.png' : './assets/caveira.png';
        }
      });

      setTimeout(() => this.game.nextLevel(), 1000);
    }
  }

  new Game();
});
