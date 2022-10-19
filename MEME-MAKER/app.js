const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.fillRect(210, 200, 20, 100);
ctx.fillRect(350, 200, 20, 100);
ctx.fillRect(260, 200, 60, 200);

ctx.arc(290, 130, 50, 0, 2 * Math.PI);
ctx.fill();
ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(310, 110, 10, Math.PI, 2 * Math.PI);
ctx.arc(270, 110, 10, Math.PI, 2 * Math.PI);

ctx.fill();
