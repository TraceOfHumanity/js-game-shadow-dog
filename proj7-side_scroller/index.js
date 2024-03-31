window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const CANVAS_WIDTH = (canvas.width = 800);
  const CANVAS_HEIGHT = (canvas.height = 720);

  class InputHandler {}
  class Player {}
  class Background {}
  class Enemy {}

  function handleEnemies() {}

  function displayStatusText() {}

  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    requestAnimationFrame(animate);
  }

  animate();
});
