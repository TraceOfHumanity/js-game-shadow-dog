const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 700);
let canvasPosition = canvas.getBoundingClientRect();

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
    this.sound.src = "./sounds/Fire impact 1.wav";
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
  let positionX = e.x - canvasPosition.left;
  let positionY = e.y - canvasPosition.top;
  explosions.push(new Explosion(positionX, positionY));
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
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

animate();
