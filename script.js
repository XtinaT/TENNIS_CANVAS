 "use strict";
var RAF=
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback)
    { window.setTimeout(callback, 1000 / 60); }
      ;

var body = document.getElementsByTagName("body");
const courtWidth = 400;
const courtHeight = 250;
const ballSize = 20;
const playerWidth = 5;
const playerHeight = 50;
var ballSpeedX = 0;
var ballSpeedY = 0;
var ballPosX = courtWidth / 2 - ballSize / 2;
var ballPosY = courtHeight / 2 - ballSize / 2;
var player1PosX = 0;
var player1PosY = courtHeight / 2 - playerHeight / 2;
var player2PosX = courtWidth - playerWidth;
var player2PosY = (courtHeight - playerHeight) / 2;
var player1Score = 0;
var player2Score = 0;
var player1Speed = 0;
var player2Speed = 0;

var cvs = document.createElement("canvas");
cvs.style.border = "solid black 1px";
cvs.setAttribute("id", "CVS");
cvs.setAttribute("width", courtWidth);
cvs.setAttribute("height", courtHeight);
body[0].appendChild(cvs);
var coords = cvs.getBoundingClientRect();
var courtPosX = coords.left;
var courtPosY = coords.top;

function buildCVS() {
  var context = cvs.getContext("2d");
  context.fillStyle = "khaki";
  context.strokeStyle = "black";
  context.fillRect(0, 0, cvs.width, cvs.height);

  context.fillStyle = "red";
  context.beginPath();
  context.arc(ballPosX, ballPosY, ballSize / 2, 0, Math.PI * 2, false);
  context.fill();

  context.fillStyle = "green";
  context.fillRect(player1PosX, player1PosY, playerWidth, playerHeight);

  context.fillStyle = "blue";
  context.fillRect(player2PosX, player2PosY, playerWidth, playerHeight);
}
buildCVS();

function updateScore(span, score) {
  var sp = document.getElementById(span);
  sp.innerHTML = score;
}

addEventListener("keydown", movePlayer, false);
addEventListener("keyup", stopPlayer, false);

  function movePlayer(e) {
    e = e || window.event;
    e.preventDefault();
    if (e.keyCode == 16) player1Speed = -10;
    if (e.keyCode == 17) player1Speed = 10;
    if (e.keyCode == 38) player2Speed = -10;
    if (e.keyCode == 40) player2Speed = 10;
  }

  function stopPlayer(e) {
    e = e || window.event;
    e.preventDefault();
    if (e.keyCode == 16 || e.keyCode == 17) player1Speed = 0;
    if (e.keyCode == 38 || e.keyCode == 40) player2Speed = 0;
  }

function tick() {
  player1PosY += player1Speed;
  player2PosY += player2Speed;
  if (player1PosY <= 0) player1PosY = 0;
  if (player2PosY <= 0) player2PosY = 0;
  if (player1PosY + playerHeight >= courtHeight)
    player1PosY = courtHeight - playerHeight;
  if (player2PosY + playerHeight >= courtHeight)
    player2PosY = courtHeight - playerHeight;

  ballPosX += ballSpeedX;

  if (
    ballPosX - ballSize / 2 <= player1PosX + playerWidth &&
    ballPosY + ballSize / 2 >= player1PosY &&
    ballPosY - ballSize / 2 <= player1PosY + playerHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballPosX - ballSize / 2 < 0) {
    ballSpeedX = 0;
    ballSpeedY = 0;
    ballPosX = 0 + ballSize / 2;
    player1Score++;
    updateScore("score1", player1Score);
  }

  if (
    ballPosX + ballSize / 2 >= player2PosX &&
    ballPosY + ballSize / 2 >= player2PosY &&
    ballPosY - ballSize / 2 <= player2PosY + playerHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballPosX + ballSize / 2 > courtWidth) {
    ballSpeedX = 0;
    ballSpeedY = 0;
    ballPosX = courtWidth - ballSize / 2;
    player2Score++;
    updateScore("score2", player2Score);
  }
  
  ballPosY += ballSpeedY;

  if (ballPosY + ballSize / 2 > courtHeight) {
    ballSpeedY = -ballSpeedY;
    ballPosY = courtHeight - ballSize / 2;
  }
  if (ballPosY - ballSize / 2 < 0) {
    ballSpeedY = -ballSpeedY;
    ballPosY = 0 + ballSize / 2;
  }
  buildCVS();
  RAF(tick);
}

function start() {
  ballPosX = courtWidth / 2 - ballSize / 2;
  ballPosY = courtHeight / 2 - ballSize / 2;
  ballSpeedX = 3;
  ballSpeedY = 2;
}
tick();