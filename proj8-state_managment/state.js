export const state = {
  STANDING_LEFT: 0,
  STANDING_RIGHT: 1,
  SITTING_LEFT: 2,
  SITTING_RIGHT: 3,
  RUNNING_LEFT: 4,
  RUNNING_RIGHT: 5,
  JUMPING_LEFT: 6,
  JUMPING_RIGHT: 7,
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
    this.player.speed = 0;
  }
  handleInput(input) {
    if (input === "PRESS right") {
      this.player.setState(state.RUNNING_RIGHT);
    } else if (input === "PRESS left") {
      this.player.setState(state.RUNNING_LEFT);
    } else if (input === "PRESS down") {
      this.player.setState(state.SITTING_LEFT);
    } else if (input === "PRESS up") {
      this.player.setState(state.JUMPING_LEFT);
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
    this.player.speed = 0;
  }
  handleInput(input) {
    if (input === "PRESS left") {
      this.player.setState(state.RUNNING_LEFT);
    } else if (input === "PRESS right") {
      this.player.setState(state.RUNNING_RIGHT);
    } else if (input === "PRESS down") {
      this.player.setState(state.SITTING_RIGHT);
    } else if (input === "PRESS up") {
      this.player.setState(state.JUMPING_RIGHT);
    }
  }
}

export class SittingLeft extends State {
  constructor(player) {
    super("SITTING_RIGHT");
    this.player = player;
  }
  enter() {
    this.player.frameY = 9;
    this.player.speed = 0;
  }
  handleInput(input) {
    if (input === "PRESS right") {
      this.player.setState(state.SITTING_RIGHT);
    } else if (input === "RELEASE down") {
      this.player.setState(state.STANDING_LEFT);
    }
  }
}

export class SittingRight extends State {
  constructor(player) {
    super("SITTING_RIGHT");
    this.player = player;
  }
  enter() {
    this.player.frameY = 8;
    this.player.speed = 0;
  }
  handleInput(input) {
    if (input === "PRESS left") {
      this.player.setState(state.SITTING_LEFT);
    } else if (input === "RELEASE down") {
      this.player.setState(state.STANDING_RIGHT);
    }
  }
}

export class RunningLeft extends State {
  constructor(player) {
    super("RUNNING_LEFT");
    this.player = player;
  }
  enter() {
    this.player.frameY = 7;
    this.player.speed = -this.player.maxSpeed;
  }
  handleInput(input) {
    if (input === "PRESS right") {
      this.player.setState(state.RUNNING_RIGHT);
    } else if (input === "RELEASE left") {
      this.player.setState(state.STANDING_LEFT);
    } else if (input === "PRESS down") {
      this.player.setState(state.SITTING_LEFT);
    }
  }
}

export class RunningRight extends State {
  constructor(player) {
    super("RUNNING_RIGHT");
    this.player = player;
  }
  enter() {
    this.player.frameY = 6;
    this.player.speed = this.player.maxSpeed;
  }
  handleInput(input) {
    if (input === "PRESS left") {
      this.player.setState(state.RUNNING_LEFT);
    } else if (input === "RELEASE right") {
      this.player.setState(state.STANDING_RIGHT);
    } else if (input === "PRESS down") {
      this.player.setState(state.SITTING_RIGHT);
    }
  }
}

export class JumpingLeft extends State {
  constructor(player) {
    super("JUMPING_LEFT");
    this.player = player;
  }
  enter() {
    this.player.frameY = 3;
    if (this.player.onGround()) {
      this.player.vy = -40;
    }
    this.player.speed = -this.player.maxSpeed / 2;
  }
  handleInput(input) {
    if (input === "PRESS right") {
      this.player.setState(state.JUMPING_RIGHT);
    } else if (this.player.onGround()) {
      this.player.setState(state.STANDING_LEFT);
    }
  }
}

export class JumpingRight extends State {
  constructor(player) {
    super("JUMPING_RIGHT");
    this.player = player;
  }
  enter() {
    this.player.frameY = 2;
    if (this.player.onGround()) {
      this.player.vy = -40;
    }
    this.player.speed = this.player.maxSpeed / 2;
  }
  handleInput(input) {
    if (input === "PRESS left") {
      this.player.setState(state.JUMPING_LEFT);
    } else if (this.player.onGround()) {
      this.player.setState(state.STANDING_RIGHT);
    }
  }
}
