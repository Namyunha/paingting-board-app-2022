const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const lineWidth = document.querySelector("#line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const color = document.querySelector("#color");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
let isPainting = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting() {
  isPainting = true;
}
function canclePainting() {
  isPainting = false;
}

function onChangeWidth(event) {
  ctx.lineWidth = event.target.value;
}

function onChange(event) {
  ctx.fillStyle = event.target.value;
  ctx.strokeStyle = event.target.value;
}
function onColorClick(event) {
  const colorValues = event.target.dataset.color;
  ctx.strokeStyle = colorValues;
  ctx.fillStyle = colorValues;
  color.value = colorValues;
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", canclePainting);
canvas.addEventListener("mouseleave", canclePainting);

lineWidth.addEventListener("change", onChangeWidth);
color.addEventListener("change", onChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
console.log(colorOptions);
