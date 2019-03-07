//普通的炮台
var towers=[];

function Tower(x,y) {
  this.x = x,
  this.y = y
}

Tower.prototype.r = rectWidth; //半径
Tower.prototype.rateOfFire = FPS; //
Tower.prototype.range = rectWidth*5;
Tower.prototype.hurt = Enemy.prototype.maxLife/6;;
Tower.prototype.color = 'green';
Tower.prototype.cost = 50;

Tower.prototype.findTarget = function() {
  //没有敌人就不攻击
  if(enemies.length === 0) {
    this.target = null;
    return;
  }
  //如果敌人被打死 移除对象的引用
  if(this.target && this.target.life <= 0) {
    this.target = null;
  }
  //开始攻击范围内的敌人
  for (var i = 0, j = enemies.length; i < j; i ++) {
    var dist = (enemies[i].x-this.x)*(enemies[i].x-this.x+rectWidth)+(enemies[i].y-this.y)*(enemies[i].y-this.y+rectWidth);
    if (dist < (this.range*this.range)) {
      this.target = enemies[i];
      return;
    }
  }
};

Tower.prototype.findUnitVector = function() {
  if (!this.target) return false;
  var xDist = this.target.x-this.x;
  var yDist = this.target.y-this.y;
  var dist = Math.sqrt(xDist*xDist+yDist*yDist); 
  this.xFire = this.x+this.r*xDist/dist;
  this.yFire = this.y+this.r*yDist/dist;
};

Tower.prototype.draw= function() {
  //画圆
  context.beginPath();
  context.fillStyle = this.color;
  context.arc(this.x,this.y,this.r,0,2*Math.PI);
  context.fill();
  context.stroke();
  //draw turret
  context.beginPath();
  context.moveTo(this.x,this.y);
  context.lineTo(this.xFire,this.yFire);
  context.lineWidth = 3;
  context.stroke();
  context.lineWidth = 1;
};

Tower.prototype.fire = function() {
  this.rateOfFire--;
  if(this.target && this.rateOfFire <=0) {
    bullets.push(new Bullet(this.xFire,this.yFire,this.target,this.hurt));
    this.rateOfFire = this.constructor.prototype.rateOfFire;
  };
};

//攻击距离更远的炮台

var Tower2 = function(x,y) {
  Tower.call(this,x,y);
}
Tower2.prototype = Object.create(Tower.prototype);
Tower2.prototype.constructor = Tower2;

Tower2.prototype.range = Tower.prototype.range*1.4;
Tower2.prototype.color = 'brown';
Tower2.prototype.cost = Tower.prototype.cost * 1.5;
Tower2.prototype.rateOfFire = Tower.prototype.rateOfFire / 2;

//攻击距离更短 但伤害更高的炮台
var Tower3 = function(x,y) {
  Tower.call(this,x,y);
}
Tower3.prototype = Object.create(Tower.prototype);
Tower3.prototype.constructor = Tower3;

Tower3.prototype.range = Tower.prototype.range * 0.7;
Tower3.prototype.hurt = Tower.prototype.hurt*2;
Tower3.prototype.color = 'aqua';
Tower3.prototype.cost = Tower.prototype.cost * 1.5;


var towerClasses = [Tower,Tower2,Tower3];

