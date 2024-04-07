export const state = {
  STANDING_LEFT: 0,
  STANDING_RIGHT: 1,
};

class State {
  constructor(state) {
    this.state = state;
  }
}

export class StandingLeft extends State {
  constructor(player) {
    super("STANDING_LEFT");
    this.player = player;
  }
  enter() {
    this.player.frameY = 1;
  }
  handleInput(input) {
    if (input === "PRESS right") {
      this.player.setState(state.STANDING_RIGHT);
    }
  }
}

export class StandingRight extends State {
  constructor(player) {
    super("STANDING_RIGHT");
    this.player = player;
  }
  enter() {
    this.player.frameY = 0;
  }
  handleInput(input) {
    if (input === "PRESS left") {
      this.player.setState(state.STANDING_LEFT);
    }
  }
}
