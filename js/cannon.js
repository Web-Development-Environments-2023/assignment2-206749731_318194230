

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const shootingKeyInput = document.getElementById('shooting-key');
Message = document.getElementById("message");
var intervalId;
var mainGameLoop;
var counter =1;
var TIME_INTERVAL = 1; // screen refresh interval in milliseconds
// Draw the images on the canvas

scoreElement = document.getElementById('scoreElement');
let timeRemainingElement = document.getElementById('timeRemainingElement');

let disqualificationCount = 3;

canvas.width = innerWidth - 3
canvas.height = innerHeight - 3

const ACCELERATION_INTERVAL = 5000; // 5 seconds
const MAX_ACCELERATION_COUNT = 4;

let accelerationCount = 0;
let lastAccelerationTime = 0;
var timeLeft = 180;
var timeElapsed = 0;
var timerCount=0;
timeRemainingElement.innerHTML = timeLeft+"sec"
const lowerSurfaceHeight = canvas.height * 0.4;
const lowerSurfaceTop = canvas.height - lowerSurfaceHeight;
const monsterImageSrcs = ['images/mon1.png',  'images/mon2.jpeg',  'images/mon3.jpeg',  'images/mon4.jpg',];

function updatetimeLeft(){
  timeLeft=180;
}
function updateTime(){
  ++timerCount; // increment the timer event counter

  // if one second has passed
  if (TIME_INTERVAL * timerCount >= 100)
  {
     --timeLeft; // decrement the timer
     ++timeElapsed; // increment the time elapsed
     timerCount = 0; // reset the count
     timeRemainingElement.innerHTML = timeLeft+"sec"

  } 

 // if the timer reached zero
 if (timeLeft <= 0)
 {
      let Message = document.getElementById("message");
      if (score >= 100){
        Message.innerHTML = "You are a Winner! Your Score is:"+score;}
      
      else{
        Message.innerHTML = "Time's Up! You can do better. Your Score is:"+score;
      }
      // Message.innerHTML = "You Lost and your score is:"+score;
      EndGame('gameover.webp');
 } 
}

function EndGame(Imagesrc){
  setGameOverBackground(Imagesrc)
  clearInterval(intervalId);
  displayScoresTable();
  newGame();
  flagEndGame = true;
  showScreen('gameover');
}
function updateScore(points) {
   score += points;
   scoreElement.innerHTML = score;
 }


 class Star {
   constructor(x, y, radius, color) {
     this.x = x;
     this.y = y;
     this.radius = radius;
     this.color = color;
     this.velocity = { x: 0, y: 1 };
   }
   
   draw() {
     c.beginPath();
     c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
     c.fillStyle = this.color;
     c.fill();
     c.closePath();
   }
   
   update() {
     this.draw();
     this.x += this.velocity.x;
     this.y += this.velocity.y;
     
     // If the star has gone off the bottom of the screen, reset its position
     if (this.y > canvas.height + this.radius) {
       this.x = Math.random() * canvas.width;
       this.y = -this.radius;
     }
   }
 }
 document.body.style.overflow = 'hidden';////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let score = 0;

 // Create an array to hold all the stars
 const stars = [];
 
 // Create 100 stars and add them to the array
 for (let i = 0; i < 100; i++) {
   const x = Math.random() * canvas.width;
   const y = Math.random() * canvas.height;
   const radius = Math.random() * 3;
   const color = 'white';
   const star = new Star(x, y, radius, color);
   stars.push(star);
 }
 

class Monster {
   constructor({position,score,imageSrc }) {
     this.position = {
       x: position.x,
       y: position.y
     };
     this.velocity = {
       x: 0,
       y: 0
     };
     this.moving = {
       left: false,
       up: false,
       right: false,
       down: false
     };
     this.image = new Image();
     this.image.src = imageSrc;
     this.width = 50;
     this.height = 50;
     this.prize =score;
   }
   draw() {
     c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
   }
   updateposition({velocity}) {
     this.position.x += velocity.x;
     this.position.y += velocity.y;
     this.draw();
   }

   Shooting(monstersProjectiles) {
      monstersProjectiles.push(
        new MonsterProjectile({
          position: {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height,
          },
          velocity: {
            x: 0,
            y: 6,
          },
        })
      );
      monstersProjectiles.push(
        new MonsterProjectile({
          position: {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height,
          },
          velocity: {
            x: 0,
            y: 6,
          },
        })
      );
      monstersProjectiles.push(
        new MonsterProjectile({
          position: {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height,
          },
          velocity: {
            x: 0,
            y: 6,
          },
        })
      );
      monstersProjectiles.push(
        new MonsterProjectile({
          position: {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height,
          },
          velocity: {
            x: 0,
            y: 6,
          },
        })
      );
    }
    }
  



const player = {
   position: {
      x: Math.random() * (canvas.width - 70),
      y: canvas.height - 180
      
   },
   velocity: {
      x: 0,
      y: 0
   },
   moving: {
      left: false,
      up: false,
      right: false,
      down: false
   },
   image: new Image(),
   width: 80,
   height: 80,
   
   draw: function() {
      c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
   },
   updateposition: function() {
    
      const newPositionX = this.position.x + this.velocity.x;
      const newPositionY = this.position.y + this.velocity.y;

      if (newPositionX >= 0 && newPositionX <= canvas.width - this.width) {
         this.position.x = newPositionX;
      }
      if (newPositionY >= canvas.height - 180) {
        this.position.y = canvas.height - 180;
     }
      else if (newPositionY >= lowerSurfaceTop - this.height && newPositionY <= canvas.height - this.height  ) {
         this.position.y = newPositionY;
      }
      

      this.draw();
   }
}


class Grid {
   constructor(monsterImageSrcs) {
      this.lastShotTime = performance.now();
      this.lastShotTime = -1;
      this.lastShotIndex = -1;
      this.lastProjectile = null
      this.speedMultiplier = 1;
      this.lastShooterIndex = -1;

      this.position = {
         x: 0,
         y: 0
      };
      this.velocity = {
         x:6, // Set an initial x velocity
         y: 0
      };
      this.monsters = [];

      this.width = 4*100
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 5; j++) {
          const somePosition = { x: j * 80, y: i * 80 };
          const monsterImageSrc = monsterImageSrcs[i]; // Get the image source for the current row
          var scores = [20,15,10,5];
          const newMonster = new Monster({ position: somePosition,score:scores[i], imageSrc: monsterImageSrc });
          this.monsters.push(newMonster);
        }
      }
    }
   monsterShoots(monstersProjectiles) {
      const currentTime = performance.now();
      const randomIndex = Math.floor(Math.random() * this.monsters.length);
      if (
        this.lastProjectile === null ||
        this.lastProjectile.position.y >= canvas.height * 0.75
      ) {
        this.monsters[randomIndex].Shooting(monstersProjectiles);
        this.lastProjectile = monstersProjectiles[monstersProjectiles.length - 1];
      }
    }
   update() {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      // Reverse the x velocity of the grid if any monster has reached the edge
      if (this.position.x + this.width >= canvas.width) {
         this.velocity.x = -this.velocity.x;
      }
      if (this.position.x + this.width < 400) {
         this.velocity.x = -this.velocity.x;
      }

      // Update the monster's velocities
      for (let i = 0; i < this.monsters.length; i++) {
         this.monsters[i].velocity = this.velocity;
      }
      this.monsterShoots(montersProjectiles);  // Call the new method here
      
   }

  }
  
  class MonsterProjectile {
    constructor({position, velocity}) {
      this.position = position;
      this.velocity = velocity;
      this.image = new Image();
      this.image.src = 'rock1.png';
      
      this.radius = 40;
    }
  
    draw() {
      c.drawImage(this.image, this.position.x - this.radius, this.position.y - this.radius, this.radius * 2, this.radius * 2);
    }
  
    updatePosition() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  }
  
 
 
function Projectile({position,velocity}) {
   this.position = position;
   this.velocity = velocity;
   this.image = new Image();
   this.image.src = 'elec.jpg';
   this.radius = 25;
 }
 
 Projectile.prototype.draw = function() {
  c.drawImage(this.image, this.position.x - this.radius, this.position.y - this.radius, this.radius * 2, this.radius * 2);

 };
 
 Projectile.prototype.updatePosition = function() {
   this.draw();
   this.position.x += this.velocity.x;
   this.position.y += this.velocity.y;
 };
 
player.image.onload = function() {
   player.draw()
}


player.image.src = 'images/astro.jpg'///////////////////////////////////////////////////////////////////////////
//player.image.src = 'img/games/astro.jpg'

var projectiles = [];
var grids = [new Grid(monsterImageSrcs)];
var montersProjectiles = [];

function checkCollision(projectile, monster) {
   const collisionX =
     projectile.position.x >= monster.position.x &&
     projectile.position.x <= monster.position.x + monster.width;
   const collisionY =
     projectile.position.y - projectile.radius <=
       monster.position.y + monster.height &&
     projectile.position.y + projectile.radius >= monster.position.y;
 
   return collisionX && collisionY;
 }
 function checkPlayerCollision(projectile, player) {
   const collisionX =
     projectile.position.x >= player.position.x &&
     projectile.position.x <= player.position.x + player.width;
   const collisionY =
     projectile.position.y + projectile.radius >= player.position.y &&
     projectile.position.y - projectile.radius <=
       player.position.y + player.height;
 
   return collisionX && collisionY;
 }
 
 function accelerate() {
   // Increase the velocity of the monsters
   for (let i = 0; i < grids.length; i++) {
     grids[i].velocity.x *= 1.2;
   }
 
   // Increase the velocity of the monster projectiles
   for (let i = 0; i < montersProjectiles.length; i++) {
     montersProjectiles[i].velocity.y *= 1.2;
   }
 
   // Increase the acceleration count
   accelerationCount++;
 
   // Reset the last acceleration time
   lastAccelerationTime = performance.now();
   console.log(grids[i].velocity.x)
 }
 function newGame(){
  disqualificationCount = 3;
  score = 0;
  accelerationCount = 0;
  lastAccelerationTime = 0;
  projectiles = [];
  montersProjectiles = [];
  grids = [new Grid(monsterImageSrcs)];
  timeLeft = 180;
  flagEndGame = true;
   // start the countdown at TIME_FOR_A_GAME seconds
  timeElapsed = 0; // set the time elapsed to zero
   // start the countdown at 2 minutes
  timerCount = 0; // the timer has fired 0 times so far
  // Update UI elements
  scoreElement.innerHTML = score;
  document.getElementById("img1").src= "img/games/fullHeart.png";
  document.getElementById("img2").src= "img/games/fullHeart.png";
  document.getElementById("img3").src= "img/games/fullHeart.png";
  // Reset player position
  player.position.x = Math.random() * (canvas.width - 70);
  player.position.y = canvas.height - 180;/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  playMusicGame();
 }
 function resetGameAndPlayAgain()
  {

  disqualificationCount = 3;
  score = 0;
  flagEndGame = true;
  accelerationCount = 0;
  lastAccelerationTime = 0;
  projectiles = [];
  montersProjectiles = [];
  grids = [new Grid(monsterImageSrcs)];
  timer = 3;
  // Update UI elements
  scoreElement.innerHTML = score;
  document.getElementById("img1").src= "img/games/fullHeart.png";
  document.getElementById("img2").src= "img/games/fullHeart.png";
  document.getElementById("img3").src= "img/games/fullHeart.png";
  // Reset player position
  player.position.x = Math.random() * (canvas.width - 70);
  player.position.y = canvas.height - 180;/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  window.clearInterval(intervalId);

  setGameOverBackground('gameover.webp')
  stopMusicGame();
  showScreen('configuration');
  
  }
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function displayScoresTable()
   {
 
    addScoreToRecord(score);
    const scores = personal_record_table[username1];
    // Sort the scores in descending order
    const sortedScores = scores.sort((a, b) => b - a);
  
    let tableHTML = `
      <table class="scores-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
    `;
  
    for (let i = 0; i < sortedScores.length; i++) {
      const rank = i + 1;
      const date = new Date().toLocaleDateString();
      const score = sortedScores[i];
  
      tableHTML += `
        <tr>
          <td>${rank}</td>
          <td>${score}</td>
          <td>${date}</td>
        </tr>
      `;

      
    }
  
    tableHTML += '</tbody></table>';
    
  
    // Assuming you have an HTML element with an ID "scoresTable" where you want to display the table
    const scoresTable = document.getElementById('scoresTable');
    const scoresTableWinner = document.getElementById('scoresTableWinner');
    scoresTableWinner.innerHTML=tableHTML;
    scoresTable.innerHTML = tableHTML;
  
    // Add some styling to the table
    scoresTable.style.width = '100%';
    scoresTable.style.borderCollapse = 'collapse';
    scoresTable.style.fontFamily = 'Arial, sans-serif';
    scoresTable.style.fontSize = '14px';
    scoresTable.style.textAlign = 'center';
    scoresTable.style.marginTop = '20px';

    // Add some styling to the table
    scoresTableWinner.style.width = '100%';
    scoresTableWinner.style.borderCollapse = 'collapse';
    scoresTableWinner.style.fontFamily = 'Arial, sans-serif';
    scoresTableWinner.style.fontSize = '14px';
    scoresTableWinner.style.textAlign = 'center';
    scoresTableWinner.style.marginTop = '20px';


  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  function resetScoresTable() {
    // Clear all data from personal_record_table
    personal_record_table = {};
  
    // Create an empty table with no scores
    const tableHTML = `
      <table class="scores-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="3">No scores yet</td>
          </tr>
        </tbody>
      </table>
    `;
  
    // Update the scores table HTML
    const scoresTable = document.getElementById('scoresTable');
    const scoresTableWinner = document.getElementById('scoresTableWinner');
    scoresTableWinner.innerHTML = tableHTML;
    scoresTable.innerHTML = tableHTML;
  
    // Add some styling to the table
    scoresTable.style.width = '100%';
    scoresTable.style.borderCollapse = 'collapse';
    scoresTable.style.fontFamily = 'Arial, sans-serif';
    scoresTable.style.fontSize = '14px';
    scoresTable.style.textAlign = 'center';
    scoresTable.style.marginTop = '20px';
  
    // Add some styling to the table
    scoresTableWinner.style.width = '100%';
    scoresTableWinner.style.borderCollapse = 'collapse';
    scoresTableWinner.style.fontFamily = 'Arial, sans-serif';
    scoresTableWinner.style.fontSize = '14px';
    scoresTableWinner.style.textAlign = 'center';
    scoresTableWinner.style.marginTop = '20px';
  }
  
  
  
  let flagEndGame = true;
 function animate() 
 {
  // intervalId = setInterval(updateTime, 1000);
  updateTime();
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);

  player.updateposition();
 montersProjectiles.forEach((monsterProjectile, index) => { // Add index parameter
   monsterProjectile.updatePosition();
   if (checkPlayerCollision(monsterProjectile, player)) 
   {
    montersProjectiles.splice(index, 1);
    disqualificationCount--;
    document.getElementById("hittheplayer").play();
    if(disqualificationCount ===0){
      document.getElementById("img1").src = "img/games/emptyHeart.png"
      Message.innerHTML = "You Lost and your score is:"+score;
      document.getElementById("lostMusic").pause();
      EndGame('gameover.webp');
    }
    else if(disqualificationCount ===1){
      document.getElementById("img2").src = "img/games/emptyHeart.png"
    }
    else if(disqualificationCount ===2){
      document.getElementById("img3").src = "img/games/emptyHeart.png"
    }
     // Remove the monsterProjectile from the array
     
     // Reset the player's position to the starting position
     player.position.x = Math.random() * (canvas.width - 70);
     player.position.y = canvas.height - 180;
   }
 });

  projectiles.forEach((projectile) => {
  projectile.updatePosition();
  });
  grids.forEach((grid) => {
  grid.update();

  const collidedProjectiles = new Set();

  grid.monsters = grid.monsters.filter((monster, index) => {
      monster.updateposition({ velocity: grid.velocity });

      for (let pindex = 0; pindex < projectiles.length; pindex++) {
        const projectile = projectiles[pindex];

      if (checkCollision(projectile, monster)) {
      document.getElementById("hitthemonster").play();
      collidedProjectiles.add(pindex);
      const row = Math.floor(index / 5);
      const points = [20, 15, 10, 5];
      updateScore(monster.prize);
      return false;

      }
      }

      return true;
      });

  
  if (grid.monsters.length === 0 && flagEndGame) {
    const Mess = document.getElementById("message");
    Mess.innerHTML = "Champion! Your score is:" + score;
    clearInterval(intervalId);
    EndGame('img/games/WINNER.png')
    flagEndGame = false;
    return;
  }

  
  const collidedIndices = Array.from(collidedProjectiles);
  projectiles = [...projectiles].filter((_, pindex) => !collidedIndices.includes(pindex));

  // Call the monsterShoots method for each grid
  grid.monsterShoots(montersProjectiles);
  stars.forEach(star => star.update());
  // Check for collisions between monster projectiles and the player
  montersProjectiles.forEach((monsterProjectile) => {
    if (checkPlayerCollision(monsterProjectile, player)) {
      
      
      // Reset the player's position to the starting position
      player.position.x = Math.random() * (canvas.width - 70);
      player.position.y = canvas.height - 70;

    }
  });
  });

  // Check if it's time to accelerate the monsters
  const currentTime = performance.now();
  const timeSinceLastAcceleration = currentTime - lastAccelerationTime;
  if (timeSinceLastAcceleration >= ACCELERATION_INTERVAL && accelerationCount < MAX_ACCELERATION_COUNT) {
  accelerate();

  }
 }

 function StartGame(){
  // var interval = setInterval(animate,1);
  // intervalId = setInterval(updateTime,1000);
  animate();
 }
// Add a keydown event listener
document.addEventListener('keydown', (event) => {
  const shootingKeyValue = shootingKeyInput.value.toLowerCase();
  
  // Check if the pressed key matches the shooting key from the input or if it's the spacebar
  if (event.key.toLowerCase() === shootingKeyValue || (shootingKeyValue === 'space' && event.keyCode === 32)) {
    const position = { x: player.position.x + 30, y: player.position.y };
    const velocity = { x: 0, y: -8 };
    const projectile = new Projectile({ position, velocity });
    projectiles.push(projectile);
  }
});




document.addEventListener('keydown', ({ key }) => {
   switch (key) {
      case 'ArrowLeft':
         if (!player.moving.left && player.position.x >= 5) {
            player.moving.left = true
            player.velocity.x = -5
         }
         break;
      case 'ArrowUp':
         if (!player.moving.up && player.position.y >= 5) {
            player.moving.up = true
            player.velocity.y = -5
         }
         break;
      case 'ArrowRight':
         if (!player.moving.right && player.position.x < canvas.width - player.width) {
            player.moving.right = true
            player.velocity.x = 5
         }
         break;
      case 'ArrowDown':
         if (!player.moving.down && player.position.y < canvas.height - player.height) {
            player.moving.down = true
            player.velocity.y = 5
         }
         break;
   }
})
document.addEventListener('keyup', ({key})=> {
   switch(key) {
      case 'ArrowLeft': // left arrow
         player.moving.left = false
         player.velocity.x = 0
         break;
      case 'ArrowUp': // up arrow
         player.moving.up = false
         player.velocity.y = 0
         break;
      case 'ArrowRight': // right arrow
         player.moving.right = false
         player.velocity.x = 0
         break;
      case 'ArrowDown': // down arrow
         player.moving.down = false
         player.velocity.y = 0
         break;
   }
})


// animate();

// Redraw the canvas whenever the viewport size changes
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // Call any functions that draw on the canvas here to redraw them
  // based on the new canvas dimensions
});

document.getElementById("startButton").addEventListener("click", function() {
  newGame();
  });

  document.getElementById("startGameButton").addEventListener("click", function(){
    document.getElementById("startButton").style.display = "block";
    document.getElementById("startGameButton").style.display = "none";
    animate();
  });
  
  document.getElementById("logoutButton").addEventListener("click", function() {
    clearInterval(intervalId);
    newGame();
    resetScoresTable();
    stopMusicGame();
    showScreen('welcome')
    });



