//改变炮台类型
function changeTower(n) {
  currentTower = n;
}

//增加炮台
canvas.addEventListener('mousedown', function() {
  if(towerAllowed(mouse.x,mouse.y)) {
    towers.push(new towerClasses[currentTower](mouse.x,mouse.y));
    money -= towerClasses[currentTower].prototype.cost;
    document.getElementById('money').innerHTML = money; //修改钱的数量
  }

}, false);

function getMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  mouse = {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
} 
 
window.addEventListener('mousemove', getMousePos, false); 

//把炮台的范围画出来
function drawMouse() {
  //不加的话 当首次加载时 鼠标不在画布上就会报错
  if(!mouse) return;
  var range = towerClasses[currentTower].prototype.range;
  context.beginPath();
  //透明度
  context.globalAlpha = 0.2;
  context.arc(mouse.x,mouse.y,range, 0, 2*Math.PI);
  if(towerAllowed(mouse.x,mouse.y)) context.fillStyle='yellow';
  else context.fillStyle = 'red';
  context.fill();
  context.globalAlpha = 1;
}

//是否能修建炮台
function towerAllowed(x,y) {
  if (money < towerClasses[currentTower].prototype.cost) return false; //钱够不够
  if( y < rectWidth*3) return false;
  else if (y < firstBorder+rectWidth*2 && x > rightBorder- rectWidth  ) return false;
  else if (y > firstBorder - rectWidth && y < firstBorder + rectWidth *2 && x > leftBorder - rectWidth) return false;
  else if (y > firstBorder + rectWidth*3 && y < secondBorder + rectWidth && x > leftBorder - rectWidth && x < leftBorder + rectWidth*2) return false;
  else if (y > secondBorder - rectWidth && y < secondBorder + rectWidth * 2 && x > leftBorder + rectWidth *2) return false;
  else if (y > secondBorder && y < thirdBorder + rectWidth*2 && x > rightBorder - rectWidth) return false;
  else if (y > thirdBorder - rectWidth && y < thirdBorder + rectWidth*2) return false;
  else {
    for (var i = 0, j = towers.length; i < j; i++) {
      //两个炮台是否挨太近
      if(Math.abs(x-towers[i].x) < 2*rectWidth && Math.abs(towers[i].y-y) < 2*rectWidth) { return false };   
    }
  }
  return true;
}
