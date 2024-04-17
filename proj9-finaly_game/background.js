class Layer {
  constructor(game, width, height, speedModifier, image) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.image = image;
    this.x = 0;
    this.y = 0;
  }
  update() {
    if (this.x < -this.width) this.x = 0;
    this.x -= this.game.speed * this.speedModifier;
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
  }
}

export class Background {
  constructor(game) {
    this.game = game;
    this.width = 1667;
    this.height = 500;
    this.layer1Simage = document.getElementById("layer1");
    this.layer2Simage = document.getElementById("layer2");
    this.layer3Simage = document.getElementById("layer3");
    this.layer4Simage = document.getElementById("layer4");
    this.layer5Simage = document.getElementById("layer5");
    this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layer1Simage);
    this.layer2 = new Layer(this.game, this.width, this.height, 0.2, this.layer2Simage);
    this.layer3 = new Layer(this.game, this.width, this.height, 0.4, this.layer3Simage);
    this.layer4 = new Layer(this.game, this.width, this.height, 0.8, this.layer4Simage);
    this.layer5 = new Layer(this.game, this.width, this.height, 1, this.layer5Simage);
    this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5];
  }
  update() {
    this.backgroundLayers.forEach((layer) => layer.update());
  }
  draw(context) {
    this.backgroundLayers.forEach((layer) => layer.draw(context));
  }
}
