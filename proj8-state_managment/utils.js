export function drawStatusText(context, input, player) {
  context.font = "30px Arial";
  context.fillStyle = "black";
  context.fillText(`Last key pressed: ${input.lastKey}`, 10, 30);
  context.fillText(`Player state: ${player.currentState.state}`, 10, 60);

}
