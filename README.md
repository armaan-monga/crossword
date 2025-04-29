<!DOCTYPE html>
<html>
<head>
  <title>Basic Snake HTML Game</title>
  <meta charset="UTF-8">
  <style>
  html, body {
    height: 100%
    margin: 0;
  }

  body {
    background: black;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  canvas {
    border: 1px solid white;
  }
  </style>
</head>
<body>
<canvas width="400" height="400" id="game"></canvas>
<script>
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var grid = 16;
var count = 0;

var snake = {
  x: 160,
  y: 160,

  dx: grid,
  dy: 0,
};
var apple = {
  x: 320,
  y: 320
};

  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
  requestAnimationFrame(loop);

  if (++count < 4) {
    return;
  }

  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  }
  else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  }
  else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  snake.cells.unshift({x: snake.x, y: snake.y});

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, grid-1, grid-1);

  context.fillStyle = 'green';
  snake.cells.forEach(function(cell, index) {

      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }
    for (var i = index + 1; i < snake.cells.length; i++) {
    
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;

        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
      }
    }
  });
}
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

</script>
</body>
</html>

<script> var canvas = document.getElementById('game'); var context = canvas.getContext('2d'); var grid = 16; var count = 0; var score=0; //reading last score value if(localStorage.score){ document.getElementById('score').innerHTML=localStorage.score; }
var max=0;

var speed = 8;

var snake = {
x: 160,
y: 160,

dx: grid,
dy: 0,
cells: [],

maxCells: 4
};
var apple = {
x: 320,
y: 32;
}
  
function getRandomInt(min, max) {
return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {

requestAnimationFrame(loop);
if (++count < speed) {
return;
}
count = 0;
context.clearRect(0,0,canvas.width,canvas.height);
snake.x += snake.dx;
snake.y += snake.dy;
if (snake.x < 0) {
snake.x = canvas.width - grid;
}
else if (snake.x >= canvas.width) {
snake.x = 0;
}
if (snake.y < 0) {
snake.y = canvas.height - grid;
}
else if (snake.y >= canvas.height) {
snake.y = 0;
}
snake.cells.unshift({x: snake.x, y: snake.y});
if (snake.cells.length > snake.maxCells) {
snake.cells.pop();
}
context.fillStyle = 'red';
context.fillRect(apple.x, apple.y, grid-1, grid-1);
context.fillStyle = 'green';
snake.cells.forEach(function(cell, index) {

context.fillRect(cell.x, cell.y, grid-1, grid-1);  
if (cell.x === apple.x && cell.y === apple.y) {
  snake.maxCells++;
  score+=1;
localStorage.setItem('score',score);
  max=score;
  document.getElementById('score').innerHTML=score;

  apple.x = getRandomInt(0, 25) * grid;
  apple.y = getRandomInt(0, 25) * grid;
}
for (var i = index + 1; i < snake.cells.length; i++)
{
  if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) 
 { 
 
    if(score>max)
    {
     max=score;
    }
    score = 0;
	snake.x = 160;
    snake.y = 160;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = grid;
    snake.dy = 0;
    apple.x = getRandomInt(0, 25) * grid;
    apple.y = getRandomInt(0, 25) * grid;
    document.getElementById('high').innerHTML=max;
    document.getElementById('score').innerHTML=score;
  }
}
}
);
}
document.addEventListener('keydown', function(e) {
if (e.which === 37 && snake.dx === 0) {
snake.dx = -grid;
snake.dy = 0;
}
else if (e.which === 38 && snake.dy === 0) {
snake.dy = -grid;
snake.dx = 0;
}
else if (e.which === 39 && snake.dx === 0) {
snake.dx = grid;
snake.dy = 0;
}
else if (e.which === 40 && snake.dy === 0) {
snake.dy = grid;
snake.dx = 0;
}
});
requestAnimationFrame(loop);
function myFunction() {
if (speed == Infinity) {
speed = 8;
}
else if (speed == 8) {
speed = Infinity;
}
}

</script>
const headX = 10;
const headY = 10;
const parts = [];

const appleX = 5;
const appleY = 5;
const tileCount = 20;
const tileSize = canvas.width / tileCount - 2;
let velocityX = 0;
let velocityY = 0;


const speed = 7;

const gulpSound = new Audio(${assetsOnline}assets/gulp.mp3);
const gameOverSound = new Audio(${assetsOnline}assets/game-over.mp3)

class SnakeParts{
    constructor(X,Y){
        this.X = X;
        this.Y = Y;
    }
}

class Snake{
    constructor(headX, headY, tileCount, tileSize, color, parts){
        this.headX = headX;
        this.headY = headY;
        this.tileCount = tileCount;
        this.tileSize = tileSize;
        this.color = color;
        this.parts = parts;
        this.tailLength = 0;
    }

    draw = function(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.headX * this.tileCount
            , this.headY * this.tileCount
            , this.tileSize
            , this.tileSize
        );
        this.drawTail();

        ctx.closePath();
    }

    addTail = function(){
        this.tailLength++;
    }

    drawTail = function(){
        for(let i=0;i < this.parts.length;i++){
            const snakePart = this.parts[i];
            ctx.fillStyle = "grey";
            ctx.fillRect(
                snakePart.X * this.tileCount
                , snakePart.Y * this.tileCount
                , this.tileSize
                , this.tileSize
            );
        }
        this.parts.push(new SnakeParts(this.headX, this.headY));

        while(this.parts.length > this.tailLength)
            this.parts.shift();
    }

    changePosition = function(velocityX, velocityY){
        this.headX = this.headX + velocityX;
        this.headY = this.headY + velocityY;
    }
}

class Apple{
    constructor(appleX, appleY, tileCount, tileSize){
        this.appleX = appleX;
        this.appleY = appleY;
        this.tileCount = tileCount;
        this.tileSize = tileSize;

    }

    draw = function(){
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(this.appleX * this.tileCount, this.appleY * this.tileCount, this.tileSize, this.tileSize);
        ctx.closePath();
    }

    randomAppear = function(isCollision){
        if(isCollision){
            this.appleX = Math.floor(Math.random() * this.tileCount);
            this.appleY = Math.floor(Math.random() * this.tileCount);
        }
        this.draw();
    }
}

class Score{
    constructor(totalScore){
        this.totalScore = totalScore;
    }

    draw = function(){
        ctx.fillStyle = "white";
        ctx.font = "10px Verdana";
        ctx.fillText("Score " + this.totalScore, 0, 10);
    }

    drawHighestScore = function(){
        ctx.fillStyle = "white";
        ctx.font = "10px Verdana";
        const highestScore = localStorage.getItem("highestScore") !== null ? localStorage.getItem("highestScore") : 0;

        ctx.fillText("Highest Score " + highestScore, canvas.width-100, 10);
    }

    incScore = function(){
        this.totalScore++;
    }

    setHighestScore = function(){
        const highestScore = localStorage.getItem("highestScore") !== null ? localStorage.getItem("highestScore") : 0;
        if(this.totalScore > highestScore) localStorage.setItem("highestScore", this.totalScore);
    }
}
let snake = new Snake(
    headX,
    headY,
    tileCount,
    tileSize,
    "white",
    parts,
);

let apple = new Apple(
    Math.floor(Math.random() * tileCount),
    Math.floor(Math.random() * tileCount),
    tileCount,
    tileSize
);

let score = new Score(0);

function checkGameOver(snake){
    let isOver = false;

    // check collidate with wall;
    if(snake.headX < 0 
        || snake.headX === tileCount 
        || snake.headY < 0 
        || snake.headY === tileCount
        ) isOver = true;

    // check collidate with tail;
    for(let i = 0; i < snake.parts.length; i++)
        if(snake.headX === snake.parts[i].X 
            && snake.headY === snake.parts[i].Y
            ) isOver = true;

    if(isOver){
        // create label on screen
      
        ctx.beginPath();
      
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        
        ctx.fillText("Game Over", canvas.width / 6.5, canvas.height / 2);
      
        ctx.font = "25px Verdana";
        ctx.fillText("Enter to play again", canvas.width / 6.5, canvas.height / 1.8);
      
        ctx.closePath();
      
    }

    return isOver;
}

checkOnCollision = function(snake, apple){
    if(snake.headX === apple.appleX 
        && snake.headY === apple.appleY
        ) {
            gulpSound.play();
            return true;
        }
    
    return false;
}


function clearScreen(){
      // Start a new Path
      ctx.beginPath();
      ctx.fillStyle = 'black';
      ctx.fillRect(0,0, canvas.width, canvas.height);
      ctx.closePath();
  
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    if(event.keyCode === 38){ // up
        if(velocityY === 1) return;
        velocityX = 0;
        velocityY = -1;
    }
    if(event.keyCode === 40){ // down
        if(velocityY === -1) return;
        velocityX = 0;
        velocityY = 1;
    }

    if(event.keyCode === 37){ // left
        if(velocityX === 1) return;
        velocityX = -1;
        velocityY = 0;
    }
    if(event.keyCode === 39){ // right
        if(velocityX === -1) return;
        velocityX = 1;
        velocityY = 0;
    }
  
    if(event.keyCode === 13){
      velocityX = 0;
      velocityY = 0;
      snake = new Snake(
          headX,
          headY,
          tileCount,
          tileSize,
          "white",
          parts,
      );

      apple = new Apple(
          Math.floor(Math.random() * tileCount),
          Math.floor(Math.random() * tileCount),
          tileCount,
          tileSize
      );

      score = new Score(0);
      
      drawGame();
      
    } 
}

function drawGame(){
    snake.changePosition(velocityX, velocityY);

    // check game over
    let isOver = checkGameOver(snake);
    if(isOver) {
        gameOverSound.play();

        score.setHighestScore();
        score.drawHighestScore();
        return;
    }
    clearScreen();
    
    snake.draw();
    score.draw();
    score.drawHighestScore();

    let isCollision = checkOnCollision(snake, apple);
  
    apple.randomAppear(isCollision);
    if(isCollision){
      snake.addTail();
      score.incScore();
    }

    setTimeout(drawGame, 1000/speed);
}

drawGame();
@fal3n-4ngel
fal3n-4ngel commented on Dec 9, 2023
So I kinda migrated it to a nextjs typescript project and added a touch screen support , also added a score function.. just basic level modifications

// app/components/SnakeGame.tsx
import React, { useEffect, useRef, useState } from 'react';

interface SnakeGameProps {
    onValueChange: (newValue: number) => void;
}

const SnakeGame: React.FC<SnakeGameProps> = ({ onValueChange }) => {
    let gameOver = false;
    const [go, setGo] = useState(false);
    const scoreRef = useRef(0);
    const grid = 20;
    let count = 0;

    function getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    useEffect(() => {
