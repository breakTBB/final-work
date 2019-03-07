var enemies = [];
var addedLife = 0;

function Enemy(x,y) {
  this.x = x,
  this.y = y,
  this.life = this.maxLife + addedLife;
}

//敌人的共同属性
Enemy.prototype.maxLife = 40;
Enemy.prototype.speed = baseSpeed;
Enemy.prototype.color = 'red';

Enemy.prototype.draw = function() {
  context.beginPath();
  context.fillStyle = this.color;
  context.fillRect(this.x,this.y,rectWidth,rectWidth);
  //生命
  context.fillStyle='orange';
  context.fillRect(this.x,this.y+rectWidth/3,rectWidth*this.life/(this.maxLife+addedLife),rectWidth/3);
};

Enemy.prototype.move = function() {
  var move = this.speed;
  if(this.x < rightBorder && this.y < firstBorder) this.x += move;
  else if (this.x >= rightBorder && this.y < firstBorder) this.y += move;
  else if (this.x >= leftBorder && this.y <= secondBorder) this.x -= move; 
  else if (this.x <= leftBorder && this.y <= secondBorder) this.y += move;
  else if (this.x <= rightBorder && this.y < thirdBorder) this.x += move;
  else if (this.x >= rightBorder  && this.y <= thirdBorder) this.y += move;
  else  {
    this.x -= move;
    if(this.x < 0) return true; 
  }
  return false;
};
 
function checkForDead() {
  for (var i = 0, j = enemies.length; i < j; i++ ) {
    if (enemies[i].life <=0) {
      addedLife = Math.floor(stopped/10) * (1 + Math.floor(stopped/100)); //打赢的敌人越多，敌军就越强
      document.getElementById('stopped').innerHTML = ++stopped;
      money += moneyIncrement;
      document.getElementById('money').innerHTML = money;
      enemies.splice(i,1);
      i--;
      j--; 
    }
  }
}

var addEnemy = function() {
   var enemy;
   if(stopped > 20) { 
     var pick = Math.floor(Math.random()*enemyTypes.length); 
     //随机选择敌人类型
     enemy = new enemyTypes[pick](0,rectWidth);
   } else {
     enemy = new Enemy(0,rectWidth);
   }
  enemies.push(enemy);
}

//更快的敌人
var FastEnemy = function(x,y) {
  Enemy.call(this,x,y);
};
FastEnemy.prototype = Object.create(Enemy.prototype);
FastEnemy.prototype.constructor = FastEnemy;

FastEnemy.prototype.speed = Enemy.prototype.speed*1.4;
FastEnemy.prototype.color = 'DarkRed';

//更强的敌人
var StrongEnemy = function(x,y) {
  Enemy.call(this,x,y);
};
StrongEnemy.prototype = Object.create(Enemy.prototype);
StrongEnemy.prototype.constructor = StrongEnemy;

StrongEnemy.prototype.color = 'FireBrick';
StrongEnemy.prototype.maxLife = Enemy.prototype.maxLife*2;


//敌方单位列表
var enemyTypes = [Enemy,FastEnemy,StrongEnemy];
