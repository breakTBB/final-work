var canvas = document.getElementById('canvas'),
context = canvas.getContext('2d'),
rectWidth = 20,
maxWidth = canvas.width,
FPS = 30,
baseSpeed = 4*rectWidth/FPS,
mouse,
currentTower = 0,

leftBorder = maxWidth/6,
rightBorder = maxWidth*5/6,
firstBorder = maxWidth/4,
secondBorder = maxWidth/2,
thirdBorder = maxWidth*3/4,
//统计战况
attackerPoints = 0,
stopped = 0,
//记录何时增加敌人
addEnemyTimer = 60,
money = 250,
moneyIncrement = 5;

// 画图
mainLoopRender = function() {
  context.beginPath();
  context.clearRect(0,0,canvas.width,canvas.height);
  for(var i =0, j = enemies.length; i < j; i ++ ) {
    enemies[i].draw();
  }
  for(var i = 0, j = towers.length; i < j; i++ ) {
    towers[i].draw();
  }
  for(var i = 0, j = bullets.length; i < j; i++) {
    bullets[i].draw();
  }
  drawMouse();
  requestAnimationFrame(mainLoopRender);
};


mainLoopLogic = function() {
  checkForDead();
  addEnemyTimer--;
  if(addEnemyTimer<1) {
    addEnemy()
    addEnemyTimer = (stopped > 40) ? 20 : 30;  //生成敌人的速度
  }
  for(var i =0, j = enemies.length; i < j; i ++ ) {
    if(enemies[i].move()){
      attackerPoints++;
      document.getElementById('attackersScore').innerHTML = attackerPoints; 
      enemies.splice(i,1);
      i--;
      j--;
    }
  }
  for(var i = 0, j = towers.length; i < j; i++ ) {
    towers[i].findTarget();
    towers[i].findUnitVector();
    towers[i].fire();
  }
  //子弹击中就将子弹移除
  for(var i = 0, j = bullets.length; i < j; i++) {
    bullets[i].move();
    if(bullets[i].checkCollision()) {
     bullets.splice(i,1);
     j--;
     i--;
    }
  }
  setTimeout(mainLoopLogic, 1000/FPS);
};
 
window.onload = function() {
  setTimeout(mainLoopLogic, 1000/FPS);
  requestAnimationFrame(mainLoopRender);
};

