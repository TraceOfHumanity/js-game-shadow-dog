export function drawStatusText(context, input) {
  context.font = "30px Arial";
  context.fillStyle = "black";
  context.fillText(`Last key pressed: ${input.lastKey}`, 10, 30);
}
