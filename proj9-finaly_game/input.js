export default class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];
    window.addEventListener("keydown", (event) => {
      if (
        (event.key === "ArrowDown" ||
          event.key === "ArrowUp" ||
          event.key === "ArrowLeft" ||
          event.key === "ArrowRight" ||
          event.key === "Enter") &&
        this.keys.indexOf(event.key) === -1
      ) {
        this.keys.push(event.key);
      } else if (event.key === "d") this.game.debug = !this.game.debug;
      console.log(this.keys);
    });
    window.addEventListener("keyup", (event) => {
      if (
        event.key === "ArrowDown" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight" ||
        event.key === "Enter"
      ) {
        this.keys.splice(this.keys.indexOf(event.key), 1);
      }
      console.log(this.keys);
    });
  }
}
