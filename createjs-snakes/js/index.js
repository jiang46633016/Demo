var snakes = [],path = [], foodArr = [], obstacleArr = [],graphicalArr = [],questionArr = [];
var isMove = false, mainContainer,blank,blankContainer,graphicalContainer;
var score = 0;
var gArr = [0,1,2,3,4,5,6,7,8];
var colorArr = [0,1,2,3,4,5];
//记录数组长度
var num = 0,answer,counts;

var direction = {
  left: false,
  right: false,
  down: false,
  up: false
}

var random = {
  foodX:function(){
    return Math.random()* ((canvas.width - 50) - 50) + 50;
  },
  foodY : function(){
    return Math.random()* ((canvas.height - 50) - 150) + 150;
  }
}
//控制主体的XY速度
var mainx = 5, mainy = 5;
var bodyLen = 3;
var head,which,level;

function game_snakes() {
  homeBtn.visible = false;
  sndBtn.visible = false;
  replayBtn.visible = false;
  game_current.removeAllChildren();
  createjs.Ticker.removeEventListener("tick",main_ticker);
  createjs.Ticker.addEventListener("tick",ticker);
  stage.removeChild(loadAnimation);
  stage.removeChild(progress)
  direction = {
    left: false,
    right: false,
    down: false,
    up: false
  }
  //loading 并加载游戏相应内容,初始化数据
  mainx = 10; mainy = 10;
  path = [];num = 0;
  snakes = [];foodArr = [];obstacleArr = [];graphicalArr = [],questionArr = [];
  answer = 0;score = 0;which = null;
  bodyLen = 3;isMove = false;
  head = null;level = 1;counts = 0;

  //加载背景以及显示计时、分数或内容的背景
  show.gameBg("snake-bg");
  show.gameContent("graphBlank",400,35);
  show.gameScore("scoreBlank",700,35,"0");

    //播放loading动画
  handleLoadSprite("load-door", snakes_init);
}

function snakes_init() {

  mainContainer = new createjs.Container();
  game_current.addChild(mainContainer);
  graphicalContainer = new createjs.Container();
  game_current.addChild(graphicalContainer);
  which = Math.floor(Math.random()*6);
  head = new createjs.Bitmap(images["snake-head"+which]);
  head.regX = head.image.width / 2;
  head.regY = head.image.height / 2;
  head.x = 300;
  head.y = 300;
  head.move = false;
  mainContainer.addChild(head);
  mainContainer.setChildIndex(head,snakes.length);

  for(var i = 0; i < bodyLen;i++){
    var body = snakeBody(which);
    snakes.push(body);
    body.x = head.x ;
    body.y = head.y - (body.image.height * (i+1)  / 2 );
    mainContainer.addChild(body);
    mainContainer.setChildIndex(body,0);
    mainContainer.setChildIndex(head,mainContainer.children.length - 1);
  }

  //食物
  randomFood(10);
  //障碍物
  obstacleObj(5);
  //图形
  createGraphicals();
  for(var j = 0; j < questionArr.length; j++){
    var graphical =  questionArr[j].clone();
    graphical.x = random.foodX();
    graphical.y = random.foodY();
    graphical.scaleX = graphical.scaleY = 1;
    graphical.name = "graphical";
    graphical.unorder = true;
    graphical.cache(0,0,graphical.image.width,graphical.image.height);
    graphicalArr.push(graphical);
    game_current.addChild(graphical);
  }
  game_current.setChildIndex(mainContainer,game_current.children.length - 1);
  setTimeout(function(){
    handleCountDown();
    playEffectSound("countDown");

  },3100)
  //摇杆
  blankContainer = new createjs.Container();
  blank = new createjs.Bitmap(images["snake-blank"]);
  blank.regX = blank.image.width / 2;
  blank.regY = blank.image.height / 2;
  blank.x = 130;blank.y = 550;
  blank.cache(0,0,blank.image.width,blank.image.height);
  var target = new createjs.Bitmap(images["snake-target"]);
  target.regX = target.image.width / 2;
  target.regY = target.image.height / 2;
  target.x = 130;target.y = 550;
  target.startX = target.x;
  target.startY = target.y;
  target.cache(0,0,target.image.width,target.image.height);
  blankContainer.addChild(blank);
  blankContainer.addChild(target);
  control(target);
  game_current.addChild(blankContainer);
  setTimeData();
}


//蛇身子
function snakeBody(which){
  var body = new createjs.Bitmap(images["snake-body"+which]);
  body.regX = body.image.width / 2;
  body.regY = body.image.height / 2;
  //body.cache(0,0,body.image.width,body.image.height);
  return body;
}
//地图中随机数量的图形
function createGraphicals(){
  graphicalContainer.removeAllChildren();
  var items = Math.floor(Math.random()*3);//控制模式
  var which = Math.floor(Math.random()*2);//控制 颜色-图形 / 图形-颜色
  if(level == 1){
    if(items == 0){//ABAB
      if(which == 0){//从图形中选颜色
        //console.log("1-0-0")
        var color = getArrayItems(colorArr,4);
        var num = getArrayItems(gArr,2);
        for(var i = 0; i < 2;i++){
          var graphical = new createjs.Bitmap(images["graphical-"+num[i]+color[i]]);
          graphical.regX = graphical.image.width / 2;
          graphical.regY = graphical.image.height / 2;
          graphical.x = 230 + (i * (graphical.image.width + 5)) ;
          graphical.y = 35;
          graphical.cache(0,0,graphical.image.width,graphical.image.height);
          if(i == 0){
            graphical.scaleX = graphical.scaleY = 1;
            var fx = glow(graphical);
            graphicalContainer.addChild(fx,graphical);
          }else{
            graphical.scaleX = graphical.scaleY = 0.6;
            graphicalContainer.addChild(graphical);
          }
          questionArr.push(graphical);
        }
        var a = new createjs.Bitmap(images["graphical-"+num[0]+color[2]]);
        a.regX = a.image.width / 2;
        a.regY = a.image.height / 2;
        a.scaleX = a.scaleY = 0.6;
        a.x = 230 + (2 * (a.image.width + 5)) ;
        a.y = 35;
        var b = new createjs.Bitmap(images["graphical-"+num[1]+color[3]]);
        b.regX = b.image.width / 2;
        b.regY = b.image.height / 2;
        b.scaleX = b.scaleY = 0.6;
        b.x = 230 + (3 * (b.image.width + 5)) ;
        b.y = 35;
        questionArr.push(a);
        questionArr.push(b);
        graphicalContainer.addChild(a);
        graphicalContainer.addChild(b);
      }
      else if(which == 1){//1212

        //console.log("1-0-1")
        var num = getArrayItems(gArr,4);
        var color = getArrayItems(colorArr,2);
        for(var i = 0; i < 2;i++){
          var graphical = new createjs.Bitmap(images["graphical-"+num[i]+color[i]]);
          graphical.regX = graphical.image.width / 2;
          graphical.regY = graphical.image.height / 2;
          graphical.x = 230 + (i * (graphical.image.width + 5)) ;
          graphical.y = 35;
          graphical.cache(0,0,graphical.image.width,graphical.image.height);
          if(i == 0){
            graphical.scaleX = graphical.scaleY = 1;
            var fx = glow(graphical);
            graphicalContainer.addChild(fx,graphical);
          }else{
            graphical.scaleX = graphical.scaleY = 0.6;
            graphicalContainer.addChild(graphical);
          }
          questionArr.push(graphical);
        }
        var a = new createjs.Bitmap(images["graphical-"+num[2]+color[0]]);
        a.regX = a.image.width / 2;
        a.regY = a.image.height / 2;
        a.scaleX = a.scaleY = 0.6;
        a.x = 230 + (2 * (a.image.width + 5)) ;
        a.y = 35;
        var b = new createjs.Bitmap(images["graphical-"+num[3]+color[1]]);
        b.regX = b.image.width / 2;
        b.regY = b.image.height / 2;
        b.scaleX = b.scaleY = 0.6;
        b.x = 230 + (3 * (b.image.width + 5)) ;
        b.y = 35;
        questionArr.push(a);
        questionArr.push(b);
        graphicalContainer.addChild(a);
        graphicalContainer.addChild(b);
      }
    }
    else if(items == 1){//AABB
      if(which == 0){//从图形中选颜色
        //console.log("1-1-0")
        var color = getArrayItems(colorArr,4);
        var num = getArrayItems(gArr,2);
        for(var i = 0; i < 4; i+=2){
          var graphical = new createjs.Bitmap(images["graphical-"+num[i/2]+color[i/2]]);
          graphical.regX = graphical.image.width / 2;
          graphical.regY = graphical.image.height / 2;
          graphical.x = 230 + (i * (graphical.image.width + 5)) ;
          graphical.y = 35;
          graphical.cache(0,0,graphical.image.width,graphical.image.height);
          if(i == 0){
            graphical.scaleX = graphical.scaleY = 1;
            var fx = glow(graphical);
            graphicalContainer.addChild(fx,graphical);
            var index = color[2];
          }else{
            graphical.scaleX = graphical.scaleY = 0.6;
            graphicalContainer.addChild(graphical);
            var index = color[3];
          }
          questionArr[i] = graphical;
          var a = new createjs.Bitmap(images["graphical-"+num[i/2]+index]);
          a.regX = a.image.width / 2;
          a.regY = a.image.height / 2;
          a.scaleX = a.scaleY = 0.6;
          a.x = 230 + ((i+1) * (a.image.width + 5)) ;
          a.y = 35;
          questionArr[i+1] = a;
          graphicalContainer.addChild(a);
        }
      }
      else if(which == 1){
        //console.log("1-0-1")
        var num = getArrayItems(gArr,4);
        var color = getArrayItems(colorArr,2);
        for(var i = 0; i < 4;i+=2){
          var graphical = new createjs.Bitmap(images["graphical-"+num[i/2]+color[i/2]]);
          graphical.regX = graphical.image.width / 2;
          graphical.regY = graphical.image.height / 2;
          graphical.x = 230 + (i * (graphical.image.width + 5)) ;
          graphical.y = 35;
          graphical.cache(0,0,graphical.image.width,graphical.image.height);
          if(i == 0){
            graphical.scaleX = graphical.scaleY = 1;
            var fx = glow(graphical);
            graphicalContainer.addChild(fx,graphical);
            var index = num[2];
          }else{
            graphical.scaleX = graphical.scaleY = 0.6;
            graphicalContainer.addChild(graphical);
            var index = num[3];
          }
          questionArr[i] = graphical;

          var a =  new createjs.Bitmap(images["graphical-"+index+color[i/2]]);
          a.regX = a.image.width / 2;
          a.regY = a.image.height / 2;
          a.scaleX = a.scaleY = 0.6;
          a.x = 230 + ((i+1) * (a.image.width + 5)) ;
          a.y = 35;
          questionArr[i+1] = a;
          graphicalContainer.addChild(a);
        }
      }
    }
    else if(items == 2){//AAAA
      if(which == 0){//从图形中选颜色
        //console.log("1-2-0")
        var color = getArrayItems(colorArr,4);
        var num = getArrayItems(gArr,1);
        var graphical = new createjs.Bitmap(images["graphical-"+num[0]+color[0]]);
        graphical.regX = graphical.image.width / 2;
        graphical.regY = graphical.image.height / 2;
        graphical.x = 230 ;
        graphical.y = 35;
        graphical.cache(0,0,graphical.image.width,graphical.image.height);
        var fx = glow(graphical);
        graphical.scaleX = graphical.scaleY = 1;
        questionArr.push(graphical);
        graphicalContainer.addChild(fx,graphical);
        for(var i = 0; i < 3;i++){
          var a = new createjs.Bitmap(images["graphical-"+num[0]+color[i+1]]);
          a.regX = a.image.width / 2;
          a.regY = a.image.height / 2;
          a.scaleX = a.scaleY = 0.6;
          a.x = 230 + ((i+1) * (a.image.width + 5)) ;
          a.y = 35;
          questionArr.push(a);
          graphicalContainer.addChild(a);
        }
      }
      else if(which == 1){
        //console.log("1-2-1")
        var num = getArrayItems(gArr,4);
        var color = getArrayItems(colorArr,1);
        var graphical = new createjs.Bitmap(images["graphical-"+num[0]+color[0]]);
        graphical.regX = graphical.image.width / 2;
        graphical.regY = graphical.image.height / 2;
        graphical.x = 230 ;
        graphical.y = 35;
        graphical.cache(0,0,graphical.image.width,graphical.image.height);
        var fx = glow(graphical);
        graphical.scaleX = graphical.scaleY = 1;
        questionArr.push(graphical);
        graphicalContainer.addChild(fx,graphical);
        for(var i = 0; i < 3;i++){
          var a = new createjs.Bitmap(images["graphical-"+num[i+1]+color[0]]);
          a.regX = a.image.width / 2;
          a.regY = a.image.height / 2;
          a.scaleX = a.scaleY = 0.6;
          a.x = 230 + ((i+1) * (a.image.width + 5)) ;
          a.y = 35;
          questionArr.push(a);
          graphicalContainer.addChild(a);
        }
      }
    }
  }
  else if(level ==  2){
    if(items == 0){//ABCABC
      if(which == 0){//从图形中选颜色
        //console.log("2-0-0")
        var color = getArrayItems(colorArr,6);
        var num = getArrayItems(gArr,3);
        for(var i = 0; i < 3;i++){
          var graphical = new createjs.Bitmap(images["graphical-"+num[i]+color[i]]);
          graphical.regX = graphical.image.width / 2;
          graphical.regY = graphical.image.height / 2;
          graphical.x = 230 + (i * (graphical.image.width + 5)) ;
          graphical.y = 35;
          graphical.cache(0,0,graphical.image.width,graphical.image.height);
          if(i == 0){
            graphical.scaleX = graphical.scaleY = 1;
            var fx = glow(graphical);
            graphicalContainer.addChild(fx,graphical);
          }else{
            graphical.scaleX = graphical.scaleY = 0.6;
            graphicalContainer.addChild(graphical);
          }
          questionArr.push(graphical);

        }
        var a = new createjs.Bitmap(images["graphical-"+num[0]+color[3]]);
        a.regX = a.image.width / 2;
        a.regY = a.image.height / 2;
        a.scaleX = a.scaleY = 0.6;
        a.x = 230 + (3 * (graphical.image.width + 5)) ;
        a.y = 35;
        var b = new createjs.Bitmap(images["graphical-"+num[1]+color[4]]);
        b.regX = b.image.width / 2;
        b.regY = b.image.height / 2;
        b.scaleX = b.scaleY = 0.6;
        b.x = 230 + (4 * (graphical.image.width + 5)) ;
        b.y = 35;
        var c = new createjs.Bitmap(images["graphical-"+num[2]+color[5]]);
        c.regX = c.image.width / 2;
        c.regY = c.image.height / 2;
        c.scaleX = c.scaleY = 0.6;
        c.x = 230 + (5 * (graphical.image.width + 5)) ;
        c.y = 35;
        questionArr.push(a);
        questionArr.push(b);
        questionArr.push(c);
        graphicalContainer.addChild(a);
        graphicalContainer.addChild(b);
        graphicalContainer.addChild(c);
      }
      else if(which == 1){
        //console.log("2-0-1")
        var num = getArrayItems(gArr,6);
        var color = getArrayItems(colorArr,3);
        for(var i = 0; i < 3;i++){
          var graphical = new createjs.Bitmap(images["graphical-"+num[i]+color[i]]);
          graphical.regX = graphical.image.width / 2;
          graphical.regY = graphical.image.height / 2;
          graphical.x = 230 + (i * (graphical.image.width + 5)) ;
          graphical.y = 35;
          graphical.cache(0,0,graphical.image.width,graphical.image.height);
          if(i == 0){
            graphical.scaleX = graphical.scaleY = 1;
            var fx = glow(graphical);
            graphicalContainer.addChild(fx,graphical);
          }else{
            graphical.scaleX = graphical.scaleY = 0.6;
            graphicalContainer.addChild(graphical);
          }
          questionArr.push(graphical);

        }
        var a = new createjs.Bitmap(images["graphical-"+num[3]+color[0]]);
        a.regX = a.image.width / 2;
        a.regY = a.image.height / 2;
        a.scaleX = a.scaleY = 0.6;
        a.x = 230 + (3 * (a.image.width + 5)) ;
        a.y = 35;
        var b = new createjs.Bitmap(images["graphical-"+num[4]+color[1]]);
        b.regX = b.image.width / 2;
        b.regY = b.image.height / 2;
        b.scaleX = b.scaleY = 0.6;
        b.x = 230 + (4 * (b.image.width + 5)) ;
        b.y = 35;
        var c = new createjs.Bitmap(images["graphical-"+num[5]+color[2]]);
        c.regX = c.image.width / 2;
        c.regY = c.image.height / 2;
        c.scaleX = c.scaleY = 0.6;
        c.x = 230 + (5 * (c.image.width + 5)) ;
        c.y = 35;
        questionArr.push(a);
        questionArr.push(b);
        questionArr.push(c);
        graphicalContainer.addChild(a);
        graphicalContainer.addChild(b);
        graphicalContainer.addChild(c);
      }
    }
    if(items == 1){//AABBCC
      if(which == 0){//从图形中选颜色
        //console.log("2-1-0")
        var color = getArrayItems(colorArr,6);
        var num = getArrayItems(gArr,3);
        for(var i = 0; i < 6; i+=2){
          var graphical = new createjs.Bitmap(images["graphical-"+num[i/2]+color[i/2]]);
          graphical.regX = graphical.image.width / 2;
          graphical.regY = graphical.image.height / 2;
          graphical.x = 230 + (i * (graphical.image.width + 5)) ;
          graphical.y = 35;
          graphical.cache(0,0,graphical.image.width,graphical.image.height);
          if(i == 0){
            graphical.scaleX = graphical.scaleY = 1;
            var fx = glow(graphical);
            graphicalContainer.addChild(fx, graphical);
          }else{
            graphical.scaleX = graphical.scaleY = 0.6;
            graphicalContainer.addChild(graphical);
          }
          if(i==0){var index = color[3]}
          else if(i==2){var index = color[4]}
          else if(i==4){var index = color[5]}
          questionArr[i] = graphical;
          var a = new createjs.Bitmap(images["graphical-"+num[i/2]+index]);
          a.regX = a.image.width / 2;
          a.regY = a.image.height / 2;
          a.scaleX = a.scaleY = 0.6;
          a.x = 230 + ((i+1) * (a.image.width + 5)) ;
          a.y = 35;
          questionArr[i+1] = a;
          graphicalContainer.addChild(a);
        }
      }
      else if(which == 1){
        //console.log("2-1-1")

        var num = getArrayItems(gArr,6);
        var color = getArrayItems(colorArr,3);
        for(var i = 0; i < 6;i+=2){
          var graphical = new createjs.Bitmap(images["graphical-"+num[i/2]+color[i/2]]);
          graphical.regX = graphical.image.width / 2;
          graphical.regY = graphical.image.height / 2;
          graphical.x = 230 + (i * (graphical.image.width + 5)) ;
          graphical.y = 35;
          graphical.cache(0,0,graphical.image.width,graphical.image.height);
          if(i == 0){
            graphical.scaleX = graphical.scaleY = 1;
            var fx = glow(graphical);
            graphicalContainer.addChild(fx, graphical);
          }else{
            graphical.scaleX = graphical.scaleY = 0.6;
            graphicalContainer.addChild(graphical);
          }
          if(i==0){var index = num[3]}
          else if(i==2){var index = num[4]}
          else if(i==4){var index = num[5]}
          questionArr[i] = graphical;
          graphicalContainer.addChild(graphical);
          var a = new createjs.Bitmap(images["graphical-"+index+color[i/2]]);
          a.regX = a.image.width / 2;
          a.regY = a.image.height / 2;
          a.scaleX = a.scaleY = 0.6;
          a.x = 230 + ((i+1) * (a.image.width + 5)) ;
          a.y = 35;
          questionArr[i+1] = a;
          graphicalContainer.addChild(a);
        }
      }
    }
    if(items == 2){//AAABBB
      if(which == 0){//从图形中选颜色
        //console.log("2-2-0");
        var color = getArrayItems(colorArr,3);
        var num = getArrayItems(gArr,2);
        for(var i = 0; i < 6;i+=3){
          var graphical = new createjs.Bitmap(images["graphical-"+num[i/3]+color[0]]);
          graphical.regX = graphical.image.width / 2;
          graphical.regY = graphical.image.height / 2;
          graphical.x = 230 + (i * (graphical.image.width + 5)) ;
          graphical.y = 35;
          graphical.cache(0,0,graphical.image.width,graphical.image.height);
          if(i==0){
            graphical.scaleX = graphical.scaleY = 1;
            var fx = glow(graphical);
            graphicalContainer.addChild(fx, graphical);
          }else{
            graphical.scaleX = graphical.scaleY = 0.6;
            graphicalContainer.addChild(graphical);
          }
          questionArr[i] = graphical;

        }
        for(var i = 0; i < 2;i++){
          if(i==0){var index = color[1]}
          else if(i==1){var index = color[2]};
          var a = new createjs.Bitmap(images["graphical-"+num[0]+index]);
          a.regX = a.image.width / 2;
          a.regY = a.image.height / 2;
          a.scaleX = a.scaleY = 0.6;
          a.x = 230 + ((i+1) * (a.image.width + 5)) ;
          a.y = 35;
          questionArr[i+ 1] = a;
          graphicalContainer.addChild(a);
        }
        for(var i = 0; i < 2;i++){
          if(i==0){var index = color[1]}
          else if(i==1){var index = color[2]};
          var b = new createjs.Bitmap(images["graphical-"+num[1]+index]);
          b.regX = b.image.width / 2;
          b.regY = b.image.height / 2;
          b.scaleX = b.scaleY = 0.6;
          b.x = 230 + ((i+4) * (b.image.width + 5)) ;
          b.y = 35;
          questionArr[i+4] = b;
          graphicalContainer.addChild(b);
        }
      }
      else if(which == 1){
        //console.log("2-2-1")
        var num = getArrayItems(gArr,3);
        var color = getArrayItems(colorArr,2);
        for(var i = 0; i < 6;i+=3){
          var graphical = new createjs.Bitmap(images["graphical-"+num[0]+color[i/3]]);
          graphical.regX = graphical.image.width / 2;
          graphical.regY = graphical.image.height / 2;
          graphical.x = 230 + (i * (graphical.image.width + 5)) ;
          graphical.y = 35;
          graphical.cache(0,0,graphical.image.width,graphical.image.height);
          if(i==0){
            graphical.scaleX = graphical.scaleY = 1;
            var fx = glow(graphical);
            graphicalContainer.addChild(fx, graphical);
          }else{
            graphical.scaleX = graphical.scaleY = 0.6;
            graphicalContainer.addChild(graphical);
          }
          questionArr[i] = graphical;

        }
        for(var i = 0; i < 2;i++){
          if(i==0){var index = num[1]}
          else if(i==1){var index = num[2]};
          var a = new createjs.Bitmap(images["graphical-"+index+color[0]]);
          a.regX = a.image.width / 2;
          a.regY = a.image.height / 2;
          a.scaleX = a.scaleY = 0.6;
          a.x = 230 + ((i+1) * (a.image.width + 5)) ;
          a.y = 35;
          questionArr[i+1] = a;
          graphicalContainer.addChild(a);
        }
        for(var i = 0; i < 2;i++){
          if(i==0){var index = num[1]}
          else if(i==1){var index = num[2]};
          var b = new createjs.Bitmap(images["graphical-"+index+color[1]]);
          b.regX = b.image.width / 2;
          b.regY = b.image.height / 2;
          b.scaleX = b.scaleY = 0.6;
          b.x = 230 + ((i+4) * (b.image.width + 5)) ;
          b.y = 35;
          questionArr[i+4] = b;
          graphicalContainer.addChild(b);
        }
      }
    }
  }
  else if(level == 3){
    if(items == 0){//ABCDABCD
      if(which == 0){//从图形中选颜色
        // console.log("3-0-0")
        var color = getArrayItems(colorArr,2);
        var num = getArrayItems(gArr,4);
        for(var i = 0; i < 4;i++){
          var graphical = new createjs.Bitmap(images["graphical-"+num[i]+color[0]]);
          graphical.regX = graphical.image.width / 2;
          graphical.regY = graphical.image.height / 2;
          graphical.x = 230 + (i * (graphical.image.width + 5)) ;
          graphical.y = 35;
          graphical.cache(0,0,graphical.image.width,graphical.image.height);
          if(i == 0){
            graphical.scaleX = graphical.scaleY = 1;
            var fx = glow(graphical);
            graphicalContainer.addChild(fx,graphical);
          }else{
            graphical.scaleX = graphical.scaleY = 0.6;
            graphicalContainer.addChild(graphical);
          }
          questionArr.push(graphical);

        }
        var a = new createjs.Bitmap(images["graphical-"+num[0]+color[1]]);
        a.regX = a.image.width / 2;
        a.regY = a.image.height / 2;
        a.scaleX = a.scaleY = 0.6;
        a.x = 230 + (4 * (a.image.width + 5)) ;
        a.y = 35;
        var b = new createjs.Bitmap(images["graphical-"+num[1]+color[1]]);
        b.regX = b.image.width / 2;
        b.regY = b.image.height / 2;
        b.scaleX = b.scaleY = 0.6;
        b.x = 230 + (5 * (b.image.width + 5)) ;
        b.y = 35;
        var c = new createjs.Bitmap(images["graphical-"+num[2]+color[1]]);
        c.regX = c.image.width / 2;
        c.regY = c.image.height / 2;
        c.scaleX = c.scaleY = 0.6;
        c.x = 230 + (6 * (c.image.width + 5)) ;
        c.y = 35;
        var d= new createjs.Bitmap(images["graphical-"+num[3]+color[1]]);
        d.regX = d.image.width / 2;
        d.regY = d.image.height / 2;
        d.scaleX = d.scaleY = 0.6;
        d.x = 230 + (7 * (d.image.width + 5)) ;
        d.y = 35;
        questionArr.push(a);
        questionArr.push(b);
        questionArr.push(c);
        questionArr.push(d);
        graphicalContainer.addChild(a);
        graphicalContainer.addChild(b);
        graphicalContainer.addChild(c);
        graphicalContainer.addChild(d);

      }
      else if(which == 1){
        // console.log("3-0-1")

        var num = getArrayItems(gArr,2);
        var color = getArrayItems(colorArr,4);
        for(var i = 0; i < 4;i++){
          var graphical = new createjs.Bitmap(images["graphical-"+num[0]+color[i]]);
          graphical.regX = graphical.image.width / 2;
          graphical.regY = graphical.image.height / 2;
          graphical.x = 230 + (i * (graphical.image.width + 5)) ;
          graphical.y = 35;
          graphical.cache(0,0,graphical.image.width,graphical.image.height);
          if(i == 0){
            graphical.scaleX = graphical.scaleY = 1;
            var fx = glow(graphical);
            graphicalContainer.addChild(fx,graphical);
          }else{
            graphical.scaleX = graphical.scaleY = 0.6;
            graphicalContainer.addChild(graphical);
          }
          questionArr.push(graphical);

        }
        var a = new createjs.Bitmap(images["graphical-"+num[1]+color[0]]);
        a.regX = a.image.width / 2;
        a.regY = a.image.height / 2;
        a.scaleX = a.scaleY = 0.6;
        a.x = 230 + (4 * (a.image.width + 5)) ;
        a.y = 35;
        var b = new createjs.Bitmap(images["graphical-"+num[1]+color[1]]);
        b.regX = b.image.width / 2;
        b.regY = b.image.height / 2;
        b.scaleX = b.scaleY = 0.6;
        b.x = 230 + (5 * (b.image.width + 5)) ;
        b.y = 35;
        var c = new createjs.Bitmap(images["graphical-"+num[1]+color[2]]);
        c.regX = c.image.width / 2;
        c.regY = c.image.height / 2;
        c.scaleX = c.scaleY = 0.6;
        c.x = 230 + (6 * (c.image.width + 5)) ;
        c.y = 35;
        var d= new createjs.Bitmap(images["graphical-"+num[1]+color[3]]);
        d.regX = d.image.width / 2;
        d.regY = d.image.height / 2;
        d.scaleX = d.scaleY = 0.6;
        d.x = 230 + (7 * (d.image.width + 5)) ;
        d.y = 35;
        questionArr.push(a);
        questionArr.push(b);
        questionArr.push(c);
        questionArr.push(d);
        graphicalContainer.addChild(a);
        graphicalContainer.addChild(b);
        graphicalContainer.addChild(c);
        graphicalContainer.addChild(d);
      }
    }
    else if(items == 1){//AABBCCDD
      if(which == 0){//从图形中选颜色
        // console.log("3-1-0")
        var color = getArrayItems(colorArr,2);
        var num = getArrayItems(gArr,4);
        for(var i = 0; i < 8; i+=2){
          var graphical = new createjs.Bitmap(images["graphical-"+num[i/2]+color[0]]);
          graphical.regX = graphical.image.width / 2;
          graphical.regY = graphical.image.height / 2;
          graphical.x = 230 + (i * (graphical.image.width + 5)) ;
          graphical.y = 35;
          graphical.cache(0,0,graphical.image.width,graphical.image.height);
          if(i == 0){
            graphical.scaleX = graphical.scaleY = 1;
            var fx = glow(graphical);
            graphicalContainer.addChild(fx,graphical);
          }else{
            graphical.scaleX = graphical.scaleY = 0.6;
            graphicalContainer.addChild(graphical);
          }
          questionArr[i] = graphical;

          var a = new createjs.Bitmap(images["graphical-"+num[i/2]+color[1]]);
          a.regX = a.image.width / 2;
          a.regY = a.image.height / 2;
          a.scaleX = a.scaleY = 0.6;
          a.x = 230 + ((i+1) * (a.image.width + 5)) ;
          a.y = 35;
          questionArr[i+1] = a;
          graphicalContainer.addChild(a);
        }
      }
      else if(which == 1){
        // console.log("3-1-1")

        var color = getArrayItems(colorArr,4);
        var num = getArrayItems(gArr,2);
        for(var i = 0; i < 8;i+=2){
          var graphical = new createjs.Bitmap(images["graphical-"+num[0]+color[i/2]]);
          graphical.regX = graphical.image.width / 2;
          graphical.regY = graphical.image.height / 2;
          graphical.x = 230 + (i * (graphical.image.width + 5)) ;
          graphical.y = 35;
          graphical.cache(0,0,graphical.image.width,graphical.image.height);
          if(i == 0){
            graphical.scaleX = graphical.scaleY = 1;
            var fx = glow(graphical);
            graphicalContainer.addChild(fx,graphical);
          }else{
            graphical.scaleX = graphical.scaleY = 0.6;
            graphicalContainer.addChild(graphical);
          }
          questionArr[i] = graphical;

          var a = new createjs.Bitmap(images["graphical-"+num[1]+color[i/2]]);
          a.regX = a.image.width / 2;
          a.regY = a.image.height / 2;
          a.scaleX = a.scaleY = 0.6;
          a.x = 230 + ((i+1) * (a.image.width + 5)) ;
          a.y = 35;
          questionArr[i+1] = a;
          graphicalContainer.addChild(a);
        }
      }
    }
    else if(items == 2){//ABABCDCD
      if(which == 0){//从图形中选颜色
        // console.log("3-2-0")
        var num = getArrayItems(gArr,4);
        var color = getArrayItems(colorArr,2);
        for(var i = 0; i < 2;i++){
          var graphical = new createjs.Bitmap(images["graphical-"+num[i]+color[i]]);
          graphical.regX = graphical.image.width / 2;
          graphical.regY = graphical.image.height / 2;
          graphical.x = 230 + (i * (graphical.image.width + 5)) ;
          graphical.y = 35;
          graphical.cache(0,0,graphical.image.width,graphical.image.height);
          if(i == 0){
            graphical.scaleX = graphical.scaleY = 1;
            var fx = glow(graphical);
            graphicalContainer.addChild(fx,graphical);
          }else{
            graphical.scaleX = graphical.scaleY = 0.6;
            graphicalContainer.addChild(graphical);
          }
          questionArr.push(graphical);
        }
        var a = new createjs.Bitmap(images["graphical-"+num[0]+color[1]]);
        a.regX = a.image.width / 2;
        a.regY = a.image.height / 2;
        a.scaleX = a.scaleY = 0.6;
        a.x = 230 + (2 * (a.image.width + 5)) ;
        a.y = 35;
        var b = new createjs.Bitmap(images["graphical-"+num[1]+color[0]]);
        b.regX = b.image.width / 2;
        b.regY = b.image.height / 2;
        b.scaleX = b.scaleY = 0.6;
        b.x = 230 + (3 * (b.image.width + 5)) ;
        b.y = 35;
        questionArr.push(a);
        questionArr.push(b);
        graphicalContainer.addChild(a);
        graphicalContainer.addChild(b);
        for(var i = 0; i < 2;i++){
          var graphical = new createjs.Bitmap(images["graphical-"+num[i+2]+color[i]]);
          graphical.regX = graphical.image.width / 2;
          graphical.regY = graphical.image.height / 2;
          graphical.x = 230 + ((i+4) * (graphical.image.width + 5)) ;
          graphical.y = 35;
          graphical.cache(0,0,graphical.image.width,graphical.image.height)
          graphical.scaleX = graphical.scaleY = 0.6;
          questionArr.push(graphical);
          graphicalContainer.addChild(graphical);
        }
        var c = new createjs.Bitmap(images["graphical-"+num[2]+color[1]]);
        c.regX = c.image.width / 2;
        c.regY = c.image.height / 2;
        c.scaleX = c.scaleY = 0.6;
        c.x = 230 + (6 * (c.image.width + 5)) ;
        c.y = 35;
        var d = new createjs.Bitmap(images["graphical-"+num[3]+color[0]]);
        d.regX = d.image.width / 2;
        d.regY = d.image.height / 2;
        d.scaleX = d.scaleY = 0.6;
        d.x = 230 + (7 * (d.image.width + 5)) ;
        d.y = 35;
        questionArr.push(c);
        questionArr.push(d);
        graphicalContainer.addChild(c);
        graphicalContainer.addChild(d);
      }
      else if(which == 1){
        // console.log("3-2-1")

        var num = getArrayItems(gArr,2);
        var color = getArrayItems(colorArr,4);
        for(var i = 0; i < 2;i++){
          var graphical = new createjs.Bitmap(images["graphical-"+num[i]+color[i]]);
          graphical.regX = graphical.image.width / 2;
          graphical.regY = graphical.image.height / 2;
          graphical.x = 230 + (i * (graphical.image.width + 5)) ;
          graphical.y = 35;
          graphical.cache(0,0,graphical.image.width,graphical.image.height);
          if(i == 0){
            graphical.scaleX = graphical.scaleY = 1;
            var fx = glow(graphical);
            graphicalContainer.addChild(fx, graphical);
          }else{
            graphical.scaleX = graphical.scaleY = 0.6;
            graphicalContainer.addChild(graphical);
          }
          questionArr.push(graphical);
        }
        var a = new createjs.Bitmap(images["graphical-"+num[1]+color[0]]);
        a.regX = a.image.width / 2;
        a.regY = a.image.height / 2;
        a.scaleX = a.scaleY = 0.6;
        a.x = 230 + (2 * (a.image.width + 5)) ;
        a.y = 35;
        var b = new createjs.Bitmap(images["graphical-"+num[0]+color[1]]);
        b.regX = b.image.width / 2;
        b.regY = b.image.height / 2;
        b.scaleX = b.scaleY = 0.6;
        b.x = 230 + (3 * (b.image.width + 5)) ;
        b.y = 35;
        questionArr.push(a);
        questionArr.push(b);
        graphicalContainer.addChild(a);
        graphicalContainer.addChild(b);
        for(var i = 0; i < 2;i++){
          var graphical = new createjs.Bitmap(images["graphical-"+num[i]+color[i+2]]);
          graphical.regX = graphical.image.width / 2;
          graphical.regY = graphical.image.height / 2;
          graphical.x = 230 + ((i+4) * (graphical.image.width + 5)) ;
          graphical.y = 35;
          graphical.cache(0,0,graphical.image.width,graphical.image.height)
          graphical.scaleX = graphical.scaleY = 0.6;
          questionArr.push(graphical);
          graphicalContainer.addChild(graphical);
        }
        var c = new createjs.Bitmap(images["graphical-"+num[1]+color[2]]);
        c.regX = c.image.width / 2;
        c.regY = c.image.height / 2;
        c.scaleX = c.scaleY = 0.6;
        c.x = 230 + (6 * (c.image.width + 5)) ;
        c.y = 35;
        var d = new createjs.Bitmap(images["graphical-"+num[0]+color[3]]);
        d.regX = d.image.width / 2;
        d.regY = d.image.height / 2;
        d.scaleX = d.scaleY = 0.6;
        d.x = 230 + (7 * (d.image.width + 5)) ;
        d.y = 35;
        questionArr.push(c);
        questionArr.push(d);
        graphicalContainer.addChild(c);
        graphicalContainer.addChild(d);
      }
    }
  }

}
//食物 并 随机位置
function randomFood(count){
  if(count){
    for(var i = 0 ; i < count;i++){
      var num = Math.floor(Math.random()*6);
      var food = new createjs.Bitmap(images["ball-"+num]);
      //food.scaleX = food.scaleY = 0.3;
      food.regX = food.image.width / 2;
      food.regY = food.image.height / 2;
      food.x = random.foodX();
      food.y = random.foodY();
      food.hid = false;
      food.name = "food";
      food.cache(0,0,food.image.width,food.image.height);
      foodArr.push(food)
      game_current.addChild(food);
      stage.update();
    }
  }
}
//障碍物
function obstacleObj(count){
  if(count){
    for(var i = 0; i < count; i++){
      var obstacle = new createjs.Sprite(spritesheets["obstacle"],"stop");
      obstacle.regX = obstacle.getBounds().width / 2;
      obstacle.regY = obstacle.getBounds().height / 2;
      obstacle.x = random.foodX();
      obstacle.y = random.foodY();
      obstacle.name = "obstacle";
      game_current.addChild(obstacle);
      obstacleArr.push(obstacle);
    }
  }
}
//控制蛇的方向
function control(currentObj){
  currentObj.on("mousedown", function (evt) {
    this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
  });
  // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
  currentObj.on("pressmove", function (evt) {
    head.move = true;
    childIndex = this.parent.getChildIndex(currentObj);
    this.parent.parent.setChildIndex(this.parent, this.parent.parent.children.length - 1);
    //isMove = true;
    this.x = evt.stageX + this.offset.x;
    this.y = evt.stageY + this.offset.y;
    //上下左右
    if(blank.y - this.y > 20 ){//上
      if(this.x - blank.x < 15 || blank.x - this.x < 15) {
        direction.up = true;
        direction.down = false;
        direction.left = false;
        direction.right = false;
        //console.log("up true");
      }

      //两点间的距离
      if(this.x < this.startX){
        var x = this.startX - this.x;
        var y = this.startY - this.y;
        var step = Math.sqrt((x*x)+(y*y));
        }else{
          var x = this.x - this.startX;
          var y = this.y - this.startY;
          var step = Math.sqrt((x*x)+(y*y));
        }
      if(step > blank.image.width / 2){
        var xDelta = evt.target.x - blank.x;
        var yDelta = evt.target.y - blank.y;
        var angle = Math.atan(xDelta / yDelta);
        var angleDegree = angle * 180 / Math.PI;
        evt.target.rotation = angleDegree;
        this.x = (this.startX - (blank.image.width / 2) * Math.sin(angle));
        this.y = (this.startY - (blank.image.width / 2) * Math.cos(angle));
      }

    }else if(this.y - blank.y > 20){//下
      if(this.x - blank.x < 15 || blank.x - this.x < 15) {
        direction.up = false;
        direction.down = true;
        direction.left = false;
        direction.right = false
      }
        //console.log("down true");
      if(this.x < this.startX){
        var x = this.startX - this.x;
        var y = this.startY - this.y;
        var step = Math.sqrt((x*x)+(y*y));
      }else{
        var x = this.x - this.startX;
        var y = this.y - this.startY;
        var step = Math.sqrt((x*x)+(y*y));
      }
      if(step > blank.image.width / 2){
        var xDelta = evt.target.x - blank.x;
        var yDelta = evt.target.y - blank.y;
        var angle = Math.atan(xDelta / yDelta);
        var angleDegree = angle * 180 / Math.PI;
        this.rotation = angleDegree;
        this.x = (this.startX + (blank.image.width / 2) * Math.sin(angle));
        this.y = (this.startY + (blank.image.width / 2) * Math.cos(angle));
      }

    }
    if(blank.x - this.x > 20){//左
      if(this.y - blank.y < 20 || blank.y - this.y < 20) {
        direction.left = true;
        direction.right = false;
        direction.up = false;
        direction.down = false;
        //console.log("left true");
      }

      if(this.x < blank.x - blank.image.width / 2){
        this.x = blank.x - blank.image.width / 2;
      }

    }else if(this.x - blank.x > 20 ){//右
      if(this.y - blank.y < 20 || blank.y - this.y < 20){
        direction.left = false;
        direction.right = true;
        direction.up = false;
        direction.down = false;
        //console.log("right true");
      }

      if(this.x > blank.x + blank.image.width / 2){
        this.x = blank.x + blank.image.width / 2;
      }

    }
  });
  currentObj.on("pressup", function (evt) {
    evt.target.x = evt.target.startX;
    evt.target.y = evt.target.startY;
    /*direction.left =  false;
    direction.right = false;
    direction.down = false;
    direction.up = false;*/
    // isMove = false;
  });
}
//移动
function snakeMove(){
  if(isMove) {
    //mainContainer.setChildIndex(head,snakes.length);
    if (direction.left) {
      head.rotation = 90;
      mainx = 10;
      head.x -= mainx;
      path.push([head.x, head.y, head.rotation]);
      num++;
    }
    if (direction.right) {
      head.rotation = -90;
      head.move = true;
      mainx = 10;
      head.x += mainx;
      path.push([head.x, head.y, head.rotation]);
      num++;
    }
    if (direction.up) {
      head.rotation = 180;
      head.move = true;
      mainy = 10;
      head.y -= mainy;
      path.push([head.x, head.y, head.rotation]);
      num++;
    }
    if (direction.down) {
      head.rotation = 0;
      head.move = true;
      mainy = 10;
      head.y += mainy;
      path.push([head.x, head.y, head.rotation]);
      num++;
    }
    follow();
  }
  for(var idx = 0; idx <foodArr.length;idx++){
    eat(foodArr[idx]);
  }
  for(var i = 0; i < graphicalArr.length;i++){
    eat(graphicalArr[i])
  }
  for(var idx = 0; idx <obstacleArr.length;idx++){
    pauseOrEnd(obstacleArr[idx]);
  }
}
//body 跟随
function follow(){
  //蛇每次移动1个像素，那么新的身体应该跟随在当前数组的倒数第20个数组的位置;依次加等;
  if(isMove && head.move){
    var place = 0 ;
    if(path.length >= (3 * snakes.length)){
      for( var i = 0 ; i<snakes.length ; i++){
        place += 3;
        snakes[i].x = path[num - place][0];
        snakes[i].y = path[num - place][1];
        snakes[i].rotation =  path[num - place][2];
      }
    }else{
      if(direction.left){
        for( var i = 0 ; i<snakes.length ; i++){
          createjs.Tween.get(snakes[i], {loop: false,override:true})
            .to({x:head.x + ((i + 1)* head.image.width / 2),y:head.y,rotation:head.rotation},10)
        }
      }
      if(direction.right){
        for( var i = 0 ; i<snakes.length ; i++){
          createjs.Tween.get(snakes[i], {loop: false,override:true})
            .to({x:head.x - ((i + 1)* head.image.width / 2),y:head.y,rotation:head.rotation },10)
        }
      }
      if(direction.up){
        for( var i = 0 ; i<snakes.length ; i++){
          createjs.Tween.get(snakes[i], {loop: false,override:true})
            .to({x:head.x,y:head.y  + ((i + 1)* head.image.height / 2),rotation:head.rotation},10)
        }
      }
      if(direction.down){
        for( var i = 0 ; i<snakes.length ; i++){
          createjs.Tween.get(snakes[i], {loop: false,override:true})
            .to({x:head.x,y:head.y  - ((i + 1)* head.image.height / 2),rotation:head.rotation},10)
        }
      }
    }
  }
}
//吃食物或者图形
function eat(currentObj) {
  if(isMove && head.move){
    if(currentObj.name == "food"){
      var hit = false;
      var p = currentObj.globalToLocal(head.x,head.y);
      if(currentObj.hitTest(p.x,p.y) && !currentObj.hid){
        currentObj.hid = true;
        hit = true;
      }
      if(hit){
        //console.log("yes");
        playEffectSound("snake_eat");
        score += 1;
        scoreText.text = score.toString();
        game_current.removeChild(currentObj);
        foodArr.splice(foodArr.indexOf(currentObj),1);
        randomFood(1);
        var body = snakeBody(which);
        body.visible = false;
        snakes.push(body);
        body.x = head.x ;
        body.y = head.y - (body.image.height / 2* (snakes.length));
        mainContainer.addChild(body);
        mainContainer.setChildIndex(body,0);
        mainContainer.setChildIndex(head,mainContainer.children.length - 1);
        setTimeout(function () {
          body.visible = true
        },100)
      }
    }
    if(currentObj.name == "graphical" && currentObj == graphicalArr[0]){
      var x = Math.abs((currentObj.x - head.x));
      var y = Math.abs((currentObj.y - head.y));
      if(x <= 43 && y <= 43 && head.move) {
        playEffectSound("snake_graphical");
        graphicalContainer.removeChild(graphicalContainer.children[0]);
        questionArr[answer].scaleX = questionArr[answer].scaleY = 0.6;
        answer++;
        score +=5;
        scoreText.text = score.toString();
        game_current.removeChild(currentObj);
        graphicalArr.splice(graphicalArr.indexOf(currentObj),1);
        if(graphicalArr.length > 0){
          questionArr[answer].scaleX = questionArr[answer].scaleY = 1;
          var fx = glow(questionArr[answer]);
          graphicalContainer.addChildAt(fx,0);
        }
        var body = snakeBody(which);
        body.visible = false;
        snakes.push(body);
        body.x = head.x ;
        body.y = head.y - (body.image.height / 2 * (snakes.length));
        mainContainer.addChild(body);
        mainContainer.setChildIndex(body,0);
        mainContainer.setChildIndex(head,mainContainer.children.length - 1);
        setTimeout(function () {
          body.visible = true
        },100)
        if(graphicalArr.length == 0){
          counts++;
          if(counts >= 3 && counts <6){
            level = 2;
            console.log(level);
          }
          if(counts >= 6){
            level = 3;
            console.log(level);
          }
          //从新刷新图形视图
          questionArr = [];
          graphicalArr = [];
          answer = 0;
          createGraphicals();
          for(var j = 0; j < questionArr.length; j++){
            var graphical =  questionArr[j].clone();
            graphical.x = random.foodX();
            graphical.y = random.foodY();
            graphical.scaleX = graphical.scaleY = 1;
            graphical.name = "graphical";
            graphical.unorder = true;
            graphicalArr.push(graphical);
            game_current.addChild(graphical);
          }
        }
      }
    }else if(currentObj.name == "graphical" && currentObj != graphicalArr[0]){
      var x = Math.abs((currentObj.x - head.x));
      var y = Math.abs((currentObj.y - head.y));
      if(x <= 40 && y <= 40 && currentObj.unorder) {
        currentObj.unorder = false;
        score -=6;
        if(score < 0)score =0;
        scoreText.text = score.toString();
        setTimeout(function(){currentObj.unorder = true},3000);
      }
    }
  }
}
//碰到障碍物或者NPC蛇或者地图周边
function pauseOrEnd(currentObj){
  if(isMove){
    if (head.x < (11 + head.image.width / 2) || head.x > (canvas.width - (11 + head.image.width / 2))) {
      //clearInterval(timer);
      recordScore(parseInt(score));
      isMove = false;

      playEffectSound("snake_die",function(){
        playEffectSound("gameover",function(){
          // toServerData(gameScores)
          scoreToServer(gameScores)
        })
      });
    }
    if (head.y < 4 + head.image.height / 2 || head.y > (canvas.height - (4 + head.image.height / 2))) {
      //clearInterval(timer);
      isMove = false;
      recordScore(parseInt(score));
      playEffectSound("snake_die",function(){
        playEffectSound("gameover",function(){
          // toServerData(gameScores)
          scoreToServer(gameScores)
        });
      });
    }
  }
  if(currentObj.name == "obstacle"){
    var x = Math.abs((currentObj.x - head.x));
    var y = Math.abs((currentObj.y - head.y));
    if(x <= 43 && y <= 43 && isMove){
      score -= 4;
      isMove = false;
      //按照身体长度移除部分身体;
      if(snakes.length <= 20 && snakes.length >= 5){
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
      }else if(snakes.length >20 && snakes.length <=40){
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
      }else if(snakes.length >40 && snakes.length <= 60){
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
      }else if(snakes.length > 60){
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
        mainContainer.removeChildAt(0);
        snakes.splice(snakes.length - 1,1);
      }
      currentObj.gotoAndPlay("huang");
      currentObj.addEventListener("animationend",function(){
        currentObj.gotoAndPlay("broken");
        currentObj.addEventListener("animationend",function(){
          game_current.removeChild(currentObj);
          obstacleArr.splice(obstacleArr.indexOf(currentObj),1);
          obstacleObj(1);
        })
      });
      playEffectSound("snake_hit",function(){
        playEffectSound("broken");
      })

      if(score < 0)score =0;
      scoreText.text = score.toString();
      setTimeout(function(){
        isMove = true;
      },2000)
    }
  }
}
//倒计时
function handleCountDown(){
  var container = new createjs.Container();
  game_current.addChild(container);
  var blank = new createjs.Bitmap(images["mask"]);
  blank.scaleX = canvas.width / blank.image.width;
  blank.scaleY = canvas.height / blank.image.height;
  container.addChild(blank);
  var countDown = new createjs.Sprite(spritesheets["countDown"],"play");
  countDown.regX = countDown.getBounds().width / 2;
  countDown.regY = countDown.getBounds().height / 2;
  countDown.x = canvas.width / 2;
  countDown.y = canvas.height / 2;
  container.addChild(countDown);
  countDown.addEventListener("animationend",function(){
    game_current.removeChild(container);
    isMove = true;
    homeBtn.visible = true;
    sndBtn.visible = true;
    replayBtn.visible = true;
  })
}

//结束后，后台传来的数据与游戏结束内容显示
function gameOverAnimation(){
  homeBtn.visible = false;
  sndBtn.visible = false;
  nosndBtn.visible = false;
  replayBtn.visible = false;

  var result = new createjs.Bitmap(images["result"]);
  result.regX = result.image.width / 2;
  result.regY = result.image.height / 2;
  result.x = canvas.width / 2;
  result.y = canvas.height / 2;
  game_current.addChild(result);

  var text = new createjs.Text("","48px katong","#ffffff");
  text.text = scoreText.text;
  text.regX = text.getBounds().width / 2;
  text.regY = text.getBounds().height / 2;
  text.x = 520;
  text.y = 340;
  game_current.addChild(text);
  var snake = new createjs.Bitmap(images["end-snake"+which]);
  snake.regX = snake.image.width / 2;
  snake.regY = snake.image.height / 2;
  snake.x = canvas.width / 2;
  snake.y = 235;
  game_current.addChild(snake);
}

function getArrayItems(arr, num) {
  //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
  var temp_array = new Array();
  for (var index in arr) {
    temp_array.push(arr[index]);
  }
  //取出的数值项,保存在此数组
  var return_array = new Array();
  for (var i = 0; i<num; i++) {
    //判断如果数组还有可以取出的元素,以防下标越界
    if (temp_array.length>0) {
      //在数组中产生一个随机索引
      var arrIndex = Math.floor(Math.random()*temp_array.length);
      //将此随机索引的对应的数组元素值复制出来
      return_array[i] = temp_array[arrIndex];
      //然后删掉此索引的数组元素,这时候temp_array变为新的数组
      temp_array.splice(arrIndex, 1);
    } else {
      //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
      break;
    }
  }
  return return_array;
}

// 发光
var glow = function (bm) {

  /*var colors = ["63,171,255", "244,118,255", "255,221,33", "111,255,33", "33,255,111", "159,237,37"]
   var color = colors[randomInt(0, colors.length - 1)].split(",");*/
  var filters = [new createjs.BlurFilter(20, 20, 2), new createjs.ColorFilter(0, 0, 0, 1.5, 255,255, 255)];
  var fx = _getFXBitmap(bm, filters, 0, 0, bm.image.width, bm.image.height);

  return fx;
  function _getFXBitmap(source, filters, x, y, w, h) {
    source.cache(x, y, w, h);

    var bmp = new createjs.Bitmap(source.cacheCanvas);
    bmp.filters = filters;
    bmp.cache(0, 0, w, h);

    bmp.regX = source.regX;
    bmp.regY = source.regY;
    bmp.x = source.x;
    bmp.y = source.y;
    bmp.alpha = 1;

    source.uncache();

    return bmp;
  }
}

function ticker(){
  stage.update();
  snakeMove();
}
// FPS.startFPS(stage);
