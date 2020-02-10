let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let scoreDetails1 = document.querySelector("#player1");
let scoreDetails2 = document.querySelector("#player2");
let winner = document.querySelector("#winner");
let player1Score = 0,
  player2Score = 0;
let isPress = false;
function updateScore() {
  scoreDetails1.innerText = `P1 ${player1Score}`;
  scoreDetails2.innerText = `P2 ${player2Score}`;
}

const paddle1 = {
  x: 10,
  y: canvas.height / 2 - 40,
  w: 10,
  h: 80,
  speed: 8,
  dy: 0
};

const paddle2 = {
  x: canvas.width - 20,
  y: canvas.height / 2 - 40,
  w: 10,
  h: 80,
  speed: 8
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4
};

// Move paddle on cavas
function movePaddle() {
  paddle1.y += paddle1.dy;
  paddle2.y += paddle1.dy;
  // Wall detection
  if (paddle1.y + paddle1.h > canvas.height) {
    paddle1.y = canvas.height - paddle1.h;
    paddle2.y = canvas.height - paddle1.h;
  }

  if (paddle1.y < 0) {
    paddle1.y = 0;
    paddle2.y = 0;
  }
}

function drawPaddle(obj) {
  ctx.beginPath();
  ctx.rect(obj.x, obj.y, obj.w, obj.h);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.closePath();
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
  if (ball.x + ball.size > canvas.width) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    player1Score++;
  }

  if (ball.x - ball.size < 0) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    player2Score++;
  }
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }
  if (ball.y - ball.size < paddle1.y + paddle1.h && ball.y + ball.size > paddle1.y && ball.x - ball.size < paddle1.x + paddle1.w) {
    ball.dx *= -1;
  }

  if (ball.y - ball.size < paddle2.y + paddle2.h && ball.y + ball.size > paddle2.y && ball.x + ball.size > paddle2.x) {
    ball.dx *= -1;
  }
}

function checkWinner() {
  if (player1Score == 2) {
    winner.innerText = " Player 1 wins!";
    isPress = false;
    player1Score = 0;
    player2Score = 0;

    paddle1.x = 10;
    paddle1.y = canvas.height / 2 - 40;
    paddle2.x = canvas.width - 20;
    paddle2.y = canvas.height / 2 - 40;
    cancelAnimationFrame();
    draw();
  } else if (player2Score == 2) {
    winner.innerText = " Player 2 wins!";
    isPress = false;
    player1Score = 0;
    player2Score = 0;

    paddle1.x = 10;
    paddle1.y = canvas.height / 2 - 40;
    paddle2.x = canvas.width - 20;
    paddle2.y = canvas.height / 2 - 40;
    cancelAnimationFrame();
    draw();
  }
}

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawPaddle(paddle1);
  drawPaddle(paddle2);
  drawBall();
}

// Update canvas
function update() {
  movePaddle();
  moveBall();
  draw();
  updateScore();
  checkWinner();
  requestAnimationFrame(update);
}

function keyPress(e) {
  if (e.key === "Enter" && isPress === false) {
    update();
    isPress = true;
    winner.innerText = "";
  }
}

function keyDown(e) {
  if (e.key === "w") {
    paddle1.dy = -paddle1.speed;
  } else if (e.key === "s") {
    paddle1.dy = paddle1.speed;
  }
}

function keyUp(e) {
  if (e.key === "w" || e.key === "s") {
    paddle1.dy = 0;
  }
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
document.addEventListener("keypress", keyPress);

draw();
