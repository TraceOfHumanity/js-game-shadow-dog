const states = {
  SITING: 0,
  RUNNING: 1,
  JUMPING: 2,
};

class State {
  constructor(state) {
    this.state = state;
  }
}

export class Sitting extends State {
  constructor(player) {
    super("SITTING");
    this.player = player;
  }
  enter() {
    // this.player.frameY = 1;
    // this.player.speed = 0;
    // this.player.maxFrame = 6;
  }
  handleInput(input) {
    // if (input === "PRESS right") {
    //   this.player.setState(states.RUNNING);
    // } else if (input === "PRESS left") {
    //   this.player.setState(states.RUNNING);
    // } else if (input === "PRESS up") {
    //   this.player.setState(states.JUMPING);
    // }
  }
}
