document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const CANVAS_WIDTH = (canvas.width = 500);
  const CANVAS_HEIGHT = (canvas.height = 800);

  class Game {
    constructor(ctx, width, height) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.enemies = [];
      this.enemyInterval = 1000;
      this.enemyTimer = 0;
      console.log(this.enemies);
    }
    update(deltaTime) {
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
      if (this.enemyTimer > this.enemyInterval) {
        this.#addNewEnemy();
        this.enemyTimer = 0;
        console.log(this.enemies);
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach((enemy) => {
        enemy.update();
      });
    }
    draw() {
      this.enemies.forEach((enemy) => {
        enemy.draw(this.ctx);
      });
    }
    #addNewEnemy() {
      this.enemies.push(new Worm(this));
    }
  }

  class Enemy {
    constructor(game) {
      this.game = game;
      this.markedForDeletion = false;
    }
    update() {
      this.x--;
      if (this.x + this.width < 0) {
        this.markedForDeletion = true;
      }
    }
    draw(ctx) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  class Worm extends Enemy {
    constructor(game) {
      super(game);
      this.x = this.game.width;
      this.y = Math.random() * this.game.height;
      this.width = 200;
      this.height = 100;
      this.image = worm;
    }
  }

  const game = new Game(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
  let lastTime = 1;
  function animate(timeStamp) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    game.update(deltaTime);
    game.draw();
    requestAnimationFrame(animate);
  }

  animate(0);
});
