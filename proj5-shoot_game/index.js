const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = window.innerWidth);
const CANVAS_HEIGHT = (canvas.height = window.innerHeight);
const collisionCanvas = document.getElementById("collisionCanvas");
const collisionCtx = collisionCanvas.getContext("2d");
const COLLISION_CANVAS_WIDTH = (collisionCanvas.width = window.innerWidth);
const COLLISION_CANVAS_HEIGHT = (collisionCanvas.height = window.innerHeight);

let score = 0;

let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;

let ravens = [];

class Raven {
  constructor() {
    this.spriteWidth = 271;
    this.spriteHeight = 194;
    this.sizeModifier = Math.random() * 0.6 + 0.4;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = CANVAS_WIDTH;
    this.y = Math.random() * (CANVAS_HEIGHT - this.height);
    this.directionX = Math.random() * 5 + 3;
    this.directionY = Math.random() * 5 - 2.5;
    this.markedForDeletion = false;
    this.image = new Image();
    this.image.src = "raven.png";
    this.frame = 0;
    this.maxFrame = 4;
    this.timeSinceFlap = 0;
    this.flapInterval = Math.random() * 50 + 50;
  }
  update(deltaTime) {
    if (this.y < 0 || this.y > CANVAS_HEIGHT - this.height) {
      this.directionY = this.directionY * -1;
    }
    this.x -= this.directionX;
    this.y += this.directionY;
    if (this.x < 0 - this.width) {
      this.markedForDeletion = true;
    }
    this.timeSinceFlap += deltaTime;
    if (this.timeSinceFlap > this.flapInterval) {
      if (this.frame >= this.maxFrame) {
        this.frame = 0;
      } else {
        this.frame++;
      }
      this.timeSinceFlap = 0;
    }
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

const explosions = [];

class Explosion {
  constructor(x, y) {
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth * 0.7;
    this.height = this.spriteHeight * 0.7;
    this.x = x - this.width / 2;
    this.y = y - this.height / 2;
    this.image = new Image();
    this.image.src = "./boom.png";
    this.frame = 0;
    this.timer = 0;
    this.sound = new Audio();
    this.sound.src = "./Fire impact 1.wav";
  }
  update() {
    if (this.frame === 0) {
      this.sound.play();
    }
    this.timer++;
    if (this.timer % 10 === 0) {
      this.frame++;
    }
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

window.addEventListener("click", function (e) {
  createAnimation(e);
});

function createAnimation(e) {
  let positionX = e.x;
  let positionY = e.y;
  explosions.push(new Explosion(positionX, positionY));
}

function drawScore() {
  ctx.font = "24px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, 13, 53);
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 10, 50);
}

canvas.addEventListener("click", (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  ravens.forEach((object, index) => {
    if (
      mouseX > object.x &&
      mouseX < object.x + object.width &&
      mouseY > object.y &&
      mouseY < object.y + object.height
    ) {
      ravens.splice(index, 1);
      score++;
    }
  });
});

function animate(timestamp) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  timeToNextRaven += deltaTime;

  if (timeToNextRaven > ravenInterval) {
    ravens.push(new Raven());
    timeToNextRaven = 0;
    console.log(ravens);
  }

  drawScore();

  [...ravens].forEach((object) => object.update(deltaTime));
  [...ravens].forEach((object) => object.draw());
  ravens = ravens.filter((object) => !object.markedForDeletion);

  collisionCtx.clearRect(0, 0, COLLISION_CANVAS_WIDTH, COLLISION_CANVAS_HEIGHT);
  for (let i = 0; i < explosions.length; i++) {
    explosions[i].update();
    explosions[i].draw();
    if (explosions[i].frame > 5) {
      explosions.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animate);
}

animate(0);
