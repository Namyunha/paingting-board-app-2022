const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = 2;

const colors = [
  "#f6e58d",
  "#ffbe76",
  "#ff7979",
  "#badc58",
  "#dff9fb",
  "#f9ca24",
  "#f0932b",
  "#eb4d4b",
  "#6ab04c",
  "#c7ecee",
];

const mouseClick = (event) => {
  moveToX = event.offsetX;
  moveToY = event.offsetY;
};

const mouseMove = (event) => {
  ctx.beginPath();
  ctx.moveTo(moveToX, moveToY);
  const color = colors[Math.round(Math.random() * colors.length)];
  ctx.strokeStyle = color;
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
};

canvas.addEventListener("mousemove", mouseMove);
canvas.addEventListener("click", mouseClick);
