document.addEventListener("DOMContentLoaded", function () {
  const bombs = document.querySelectorAll(".bomba");

  class Game {
    constructor() {
      this.bombs = bombs;
      this.difficulty = 3;

      if (this.bombs.length === 0) {
        console.error("No bombs found in the DOM");
        return;
      }

      this.setupDifficulty();
      this.resetLevel();
    }

    setupDifficulty() {
      const easyButton = document.getElementById("easyDifficulty");
      const mediumButton = document.getElementById("mediumDifficulty");
      const hardButton = document.getElementById("hardDifficulty");

      if (easyButton) {
        easyButton.addEventListener("click", () => this.selectDifficulty(3, easyButton));
      }
      if (mediumButton) {
        mediumButton.addEventListener("click", () => this.selectDifficulty(2, mediumButton));
      }
      if (hardButton) {
        hardButton.addEventListener("click", () => this.selectDifficulty(1, hardButton));
      }
    }

    selectDifficulty(difficulty, button) {
      this.difficulty = difficulty;
      console.log(`Selected difficulty: ${difficulty}`);
      this.resetLevel();

      document.querySelectorAll(".difficulty-button").forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");
    }

    resetLevel() {
      this.resetBombs();
      this.bombValues = this.generateBombValues();

      this.bombs.forEach((bomb, index) => {
        const bombInstance = new Bomb(
          bomb,
          this.bombValues[index],
          index,
          this
        );
        bombInstance.setupClick();
      });
    }

    resetBombs() {
      this.bombs.forEach((bomb) => {
        const img = bomb.querySelector("img");
        img.src = "./assets/bomba.png";
        img.style.opacity = "1";
        bomb.classList.remove("exploding");
        bomb.querySelector(".explosion").style.display = "none";
      });
    }

    generateBombValues() {
      let values = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      let count = 0;

      while (count < this.difficulty) {
        const randomIndex = Math.floor(Math.random() * 9);
        if (values[randomIndex] === 0) {
          values[randomIndex] = 1;
          count++;
        }
      }

      return values;
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
      this.element.addEventListener("click", () => this.handleBombClick());
    }

    handleBombClick() {
      this.game.bombs.forEach((bomb) => {
        bomb.style.pointerEvents = "none";
      });

      this.element.classList.add("exploding");
      const explosion = this.element.querySelector(".explosion");
      explosion.style.display = "block";
      explosion.style.animation = "explode 1s steps(6) forwards";

      setTimeout(() => {
        const img = this.element.querySelector("img");
        img.src =
          this.value === 1 ? "./assets/moeda.png" : "./assets/caveira.png";
      }, 500);

      setTimeout(() => {
        explosion.style.display = "none";
        this.showOtherBombs();
      }, 1000);
    }

    showOtherBombs() {
      this.game.bombs.forEach((bomb, i) => {
        if (i !== this.index) {
          const img = bomb.querySelector("img");
          img.src =
            this.game.bombValues[i] === 1
              ? "./assets/moeda.png"
              : "./assets/caveira.png";
        }
      });

      setTimeout(() => {
        this.game.resetLevel();

        this.game.bombs.forEach((bomb) => {
          bomb.style.pointerEvents = "auto";
        });
      }, 1000);
    }
  }

  new Game();
});
