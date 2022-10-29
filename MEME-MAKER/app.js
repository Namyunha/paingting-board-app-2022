const fontBtn = document.getElementById("font-btn");
const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const lineWidth = document.querySelector("#line-width");
const textWidth = document.querySelector("#text-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

const color = document.querySelector("#color");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;
let isFonting = false;

const fontTxt = fontBtn.innerText;

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

function onChangeTextWidth(event) {
  ctx.font = event.target.value;
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
function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "✏️Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "🩸Draw";
  }
}
function onSwitchClick() {
  if (isFonting) {
    isFonting = false;
    fontBtn.innerText = "🖊️StrokeText";
  } else {
    isFonting = true;
    fontBtn.innerText = "✒️FillText";
  }
}
function textSwitch(event) {
  const text = textInput.value;
  if (isFonting) {
    ctx.fillText(text, event.offsetX, event.offsetY);
  } else {
    ctx.strokeText(text, event.offsetX, event.offsetY);
  }
}
function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDestroyClick() {
  destroy();
}

function destroy() {
  const select = prompt("정말로 그림판 전체를 삭제하시겠습니까?");
  if (select === "yes") {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  } else if (select === "네") {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
  {
  }
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

function onFileChange() {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

function onDoubleClick(event) {
  console.log(textWidth.value);

  if (text !== "") {
    ctx.save();
    ctx.lineWidth = `${lineWidth.value}`;
    ctx.font = `${textWidth.value}px serif`;
    textSwitch(event);
    ctx.restore();
  }
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", canclePainting);
canvas.addEventListener("mouseleave", canclePainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onChangeWidth);
textWidth.addEventListener("change", onChangeTextWidth);
color.addEventListener("change", onChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
fontBtn.addEventListener("click", onSwitchClick);
