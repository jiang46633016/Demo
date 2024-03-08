function game_territoryWar() {
  game_current.removeAllChildren();
  stage.removeChild(loadAnimation);
  stage.removeChild(progress);
  totalTime = gameAllConfig.totalTime;
  createjs.Ticker.removeEventListener("tick", main_ticker);
  createjs.Ticker.addEventListener("tick", ticker);

  //加载背景以及显示计时、分数或内容的背景
  show.gameBg("bg");

  levelContainer = new createjs.Container();
  game_current.addChild(levelContainer);
  //播放loading动画
  handleLoadSprite("load-door", territoryWar_init);
}

function territoryWar_init() {
  var result = game_current.getChildByName("resultPic");
  game_current.removeChild(result);
  levelContainer.removeAllChildren();
  createjs.Tween.removeAllTweens();

  var containers = [];
  var selectCons = [];
  var copySelectCons = [];
  var paths = {};
  var adleTime = 0;
  var tornadoNum = current_level == 0 ? 50 : 0;
  var win = false;
  var lose = false;
  var hand;

  var gameData = gameAllConfig["content"][current_level];
  console.log(gameData)
  var levelBg = new createjs.Bitmap(images[gameData["background"]]);
  levelBg.regX = levelBg.image.width / 2;
  levelBg.regY = levelBg.image.height / 2;
  levelBg.x = stage.canvas.width / 2;
  levelBg.y = stage.canvas.height / 2;

  var ball = new createjs.Bitmap(images["ball"]);
  ball.x = 3;
  ball.y = 3;
  var barBg = new createjs.Bitmap(images["barBg"]);
  barBg.x = 3;
  barBg.y = 2;
  var bar = new createjs.Bitmap(images["bar"]);
  var barCon = new createjs.Container();
  barCon.x = stage.canvas.width / 2;
  barCon.y = stage.canvas.height - 60;
  var progress = new createjs.Shape();
  progress.x = 30;
  progress.y = 12;
  moveExperienceBar(progress, tornadoNum, 158);
  var barText = new createjs.Text(tornadoNum + " / 50", "20px Arial", "#3c3c3c");
  barCon.addChild(barBg, progress, bar, ball, barText);
  barCon.regX = barCon.getBounds().width / 2;
  barCon.regY = barCon.getBounds().height / 2;
  barCon.name = "barCon";
  barCon.progressText = barText;
  barCon.progress = progress;
  barCon.on("pressmove", function (evt) {
    if (tornadoNum < 50) {
      return;
    }
    var tornado = levelContainer.getChildByName("tornado");
    levelContainer.removeChild(tornado);
    tornado = new createjs.Sprite(spritesheets["tornado"]);
    tornado.scaleX = tornado.scaleY = 0.6;
    tornado.regX = tornado.getBounds().width / 2;
    tornado.regY = tornado.getBounds().height / 2;
    tornado.x = evt.stageX;
    tornado.y = evt.stageY;
    tornado.name = "tornado";
    tornado.gotoAndStop();
    levelContainer.addChild(tornado);
  })
  barCon.on("pressup", function (evt) {
    var tornado = levelContainer.getChildByName("tornado");
    if (!tornado) return;
    if (current_level == 0) {
      createjs.Tween.removeTweens(hand);
      hand.x = containers[0].x;
      hand.y = containers[0].y;
      hand.count = 0;
      createjs.Tween.get(hand, {loop: true})
        .to({
          x: containers[1].x,
          y: containers[1].y
        }, 1500)
        .wait(500)
        .call(function () {
          this.count++;
          if (this.count > 3) {
            createjs.Tween.removeTweens(this);
            levelContainer.removeChild(this);
          }
        })
    }
    levelContainer.removeChild(tornado);
    this.progressText.text = "0 / 50";
    tornadoNum = 0;
    this.progress.graphics.clear().beginFill("#FFEB62").drawRect(0, 0, 10, 20);
    tornado.play();
    tornado.count = 3;
    tornado.on("animationend", function () {
      this.count--
      if (this.count <= 0) {
        this.stop();
        levelContainer.removeChild(this);
      }
    });
    var attackedCon = null;
    levelContainer.addChild(tornado);
    for (var i = 0; i < containers.length; i++) {
      var container = containers[i];
      var bounds = container.getBounds();
      if (!container.isOwn && Math.abs(evt.stageX - container.x) <= (bounds.width / 2 + tornado.getBounds().width * tornado.scaleX / 2) && Math.abs(evt.stageY - container.y) <= (bounds.height / 2 + tornado.getBounds().height * tornado.scaleY / 2)) {
        attackedCon = container;
      }
    }
    if (attackedCon) {
      attackedCon.soldierCount.text = parseInt(attackedCon.soldierCount.text / 3);
      attackedCon.soldierCount.regX = attackedCon.soldierCount.getBounds().width / 2;
      if (attackedCon.movingSoldiers) {
        for (var i = 0; i < attackedCon.movingSoldiers.length; i++) {
          var soldier = attackedCon.movingSoldiers[i];
          if (Math.abs(soldier.x - tornado.x) < tornado.getBounds().width / 2 && Math.abs(soldier.y - tornado.y) < tornado.getBounds().height / 2) {
            createjs.Tween.removeTweens(soldier);
            levelContainer.removeChild(soldier);
          }
        }
      }
    }
  })
  barText.regX = barText.getBounds().width / 2;
  barText.regY = barText.getBounds().height / 2;
  barText.x = barCon.getBounds().width / 2;
  barText.y = barCon.getBounds().height / 2 - 4;
  levelContainer.addChild(levelBg, barCon);

  for (var i = 0; i < gameData["bases"].length; i++) {
    var baseData = gameData["bases"][i];
    createBaseCon(baseData, i);
  }

  // 第一关教程
  if (current_level == 0) {
    hand = new createjs.Bitmap(images["hand"]);
    hand.scaleX = hand.scaleY = 0.7;
    hand.regX = hand.image.width / 2;
    hand.regY = hand.image.height / 2 - 20;
    hand.x = barCon.x;
    hand.y = barCon.y;
    levelContainer.addChild(hand);

    createjs.Tween.get(hand, {loop: true})
      .to({
        x: containers[1].x,
        y: containers[1].y
      }, 2500)
      .wait(500)
  }
  setTimeDate();
  // 增长数量与随机动作
  var timer = setInterval(function () {
    adleTime += 500;
    win = true;
    lose = true;
    for (var i = 0; i < containers.length; i++) {
      var container = containers[i];
      if (container.base.spriteSheet && container.time && (adleTime % container.time == 0)) {
        container.base.play();
      }
      if (adleTime % (randomInt(2, 3) * 1000) == 0 && parseInt(container.soldierCount.text) < 100 && !container.isPublic && !container.isTower) {
        container.soldierCount.text = container.soldierCount.text + 1;
        container.soldierCount.regX = container.soldierCount.getBounds().width / 2;
        if (container.type == "own1" && parseInt(container.soldierCount.text) == 50) {
          changeBase(container, "own50");
        } else if (container.type == "enemy1" && parseInt(container.soldierCount.text) == 50) {
          changeBase(container, "enemy50");
        }
      }
      if (adleTime % (randomInt(4, 5) * 1000) == 0 && parseInt(container.soldierCount.text) < 100 && container.isPublic && !container.isTower) {
        container.soldierCount.text = container.soldierCount.text + 1;
        container.soldierCount.regX = container.soldierCount.getBounds().width / 2;
      }
      // 自动攻击
      // 主动攻击public小与1/3, 受到攻击时边路补充
      if (adleTime % 3000 == 0) {
        if (container.isEnemy) {
          for (var j = 0; j < containers.length; j++) {
            var neighbor = containers[j];
            if (container.paths.indexOf(neighbor.index) !== -1 && parseInt(neighbor.soldierCount.text) <= parseInt(container.soldierCount.text) / 3) {
              dispatchSoldiers(container, neighbor, false);
            }
          }
        }
      }
      if (container.isEnemy) {
        win = false;
      }
      if (container.isOwn) {
        lose = false;
      }
    }
    if (win) {
      clearInterval(timer);
      if (current_level == gameAllConfig["content"]["length"] - 1) {
        current_level = 0;
        recordScore(15 * current_level + 5);
        toServerData(gameScores);
      } else {
        current_level++;
        setTimeout(function () {
          showResultPic(true);
        }, 1500)
        setTimeout(function () {
          territoryWar_init();
        }, 4500)
      }
      win = true;
    }
    if (lose) {
      clearInterval(timer);
      showResultPic(false);
      setTimeout(function () {
        current_level = 0;
        recordScore(15 * current_level + 5);
        toServerData(gameScores);
      }, 2000)
      lose = true;
    }
  }, 500)

  // 创建内容
  function createBaseCon(data, index) {
    var container = new createjs.Container();
    var base, soldierBg, soldierCount, flag;
    soldierBg = new createjs.Bitmap(images["soldierNumBg"]);
    soldierBg.scaleX = soldierBg.scaleY = 0.8;
    soldierCount = new createjs.Text(data.count, "24px Arial", "#3c3c3c");
    soldierCount.regX = soldierCount.getBounds().width / 2;
    soldierCount.regY = soldierCount.getBounds().height / 2;
    switch (data.type) {
      case "own1":
        base = new createjs.Sprite(spritesheets[data.type]);
        container.x = data.x + 20;
        container.y = data.y;
        container.time = randomInt(6, 12) * 500;
        container.isOwn = true;
        soldierBg.x = 70;
        soldierBg.y = 0;
        soldierCount.x = 67 + soldierBg.image.width * soldierCount.scaleX / 2;
        soldierCount.y = 20;
        break;
      case "own50":
        base = new createjs.Sprite(spritesheets[data.type]);
        base.scaleX = base.scaleY = 0.8;
        container.x = data.x - 10;
        container.y = data.y - 30;
        container.time = randomInt(6, 12) * 500;
        container.isOwn = true;
        soldierBg.x = 110;
        soldierBg.y = 20;
        soldierCount.x = 140;
        soldierCount.y = 40;
        break;
      case "publicTower":
        base = new createjs.Bitmap(images[data.type]);
        container.x = data.x + 30;
        container.y = data.y;
        container.isPublic = true;
        container.isTower = true;
        soldierBg.x = 60;
        soldierBg.y = -20;
        soldierCount.x = 90;
        soldierCount.y = 0;
        break;
      case "ownTower":
        base = new createjs.Bitmap(images[data.type]);
        container.x = data.x + 30;
        container.y = data.y;
        container.isOwn = true;
        container.isTower = true;
        container.time = randomInt(6, 12) * 500;
        soldierBg.x = 60;
        soldierBg.y = -20;
        soldierCount.x = 90;
        soldierCount.y = 0;
        break;
      case "enemyTower":
        base = new createjs.Bitmap(images[data.type]);
        container.x = data.x + 30;
        container.y = data.y;
        container.isEnemy = true;
        container.isTower = true;
        soldierBg.x = 60;
        soldierBg.y = -20;
        soldierCount.x = 90;
        soldierCount.y = 0;
        break;
      case "publicTurtle":
        base = new createjs.Sprite(spritesheets[data.type]);
        container.x = data.x + 10;
        container.y = data.y + 40;
        container.time = randomInt(6, 12) * 500;
        container.isPublic = true;
        soldierBg.x = 80;
        soldierBg.y = -20;
        soldierCount.x = 110;
        soldierCount.y = 0;
        break;
      case "enemy1":
        base = new createjs.Bitmap(images[data.type]);
        container.x = data.x + 20;
        container.y = data.y + 40;
        container.isEnemy = true;
        soldierBg.x = 80;
        soldierBg.y = -20;
        soldierCount.x = 110;
        soldierCount.y = 0;
        flag = new createjs.Sprite(spritesheets["yellowFlag"]);
        flag.x = 40;
        flag.y = -40;
        flag.play();
        break;
      case "enemy50":
        base = new createjs.Bitmap(images[data.type]);
        base.scaleX = base.scaleY = 0.8;
        container.x = data.x;
        container.y = data.y;
        container.isEnemy = true;
        soldierBg.x = 100;
        soldierBg.y = 0;
        soldierCount.x = 130;
        soldierCount.y = 20;
        flag = new createjs.Sprite(spritesheets["yellowFlag"]);
        flag.x = 72;
        flag.y = -15;
        flag.play();
        break;
    }
    base.regX = base.getBounds().width / 2;
    base.regY = base.getBounds().height / 2;
    base.x = base.getBounds().width / 2;
    base.y = base.getBounds().height / 2;
    container.addChild(base, soldierBg, soldierCount);
    if (flag) {
      container.addChild(flag);
    }
    container.regX = container.getBounds().width / 2;
    container.regY = container.getBounds().height / 2;
    container.index = index;
    container.name = "baseCon" + index;
    container.base = base;
    container.soldierBg = soldierBg;
    container.soldierCount = soldierCount;
    container.flag = flag ? flag : null;
    container.type = data.type;
    container.startX = data.x;
    container.startY = data.y;
    container.paths = data.paths;
    containers.push(container);
    /*container.on("mousedown", function (evt) {
      this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
    });
    container.on("pressmove", function (evt) {
      this.x = evt.stageX + this.offset.x;
      this.y = evt.stageY + this.offset.y;
      console.log(this.x, this.y)
    });*/
    if (container.isOwn) {
      bindEvent(container);
    }
    if (container.time) {
      container.base.on("animationend", function () {
        this.stop();
      })
    }
    levelContainer.addChild(container);
  }

  // 绑定事件
  function bindEvent(target) {
    target.on("pressmove", function (evt) {
      // console.log(this.name, evt.stageX, evt.stageY);
      if (current_level == 0 && hand) {
        levelContainer.removeChild(hand);
      }
      this.currentCon = null;
      var arrowCon = levelContainer.getChildByName("arrowCon");
      if (arrowCon) {
        levelContainer.removeChild(arrowCon);
      }
      arrowCon = new createjs.Container();
      arrowCon.name = "arrowCon";
      levelContainer.addChild(arrowCon);
      drawArrow(arrowCon, target, {x: evt.stageX, y: evt.stageY});
      // 画所有选中的线
      if (selectCons.length > 0) {
        for (var i = 0; i < selectCons.length; i++) {
          var selectCon = selectCons[i];
          drawArrow(arrowCon, selectCon, {x: evt.stageX, y: evt.stageY});
        }
      }
      for (var i = 0; i < containers.length; i++) {
        var con = containers[i];
        // 判断自己的建筑碰撞
        if (selectCons.indexOf(con) === -1 && con.isOwn && Math.abs(evt.stageX - con.x) <= con.getBounds().width * con.scaleX / 2 && Math.abs(evt.stageY - con.y) <= con.getBounds().height * con.scaleY / 2) {
          selectCons.push(con);
        }
        copySelectCons = [].concat(selectCons);
        if ((Math.abs(evt.stageX - con.x) <= con.getBounds().width * con.scaleX / 2) && (Math.abs(evt.stageY - con.y) <= con.getBounds().height * con.scaleY / 2)) {
          // 从选中数组中 去除目标
          var targetSelectArrIndex = selectCons.indexOf(con);
          if (targetSelectArrIndex !== -1) {
            copySelectCons.splice(targetSelectArrIndex, 1, null);
          }
          // 计算路径
          calcPath(con);
          arrowCon.removeAllChildren();
          // 绘画路径
          // console.log( paths )
          drawPath(con);
          this.currentCon = con;
        }
      }
    })

    target.on("pressup", function () {
      var arrowCon = levelContainer.getChildByName("arrowCon");
      if (arrowCon) {
        levelContainer.removeChild(arrowCon);
      }
      if (this.currentCon) {
        pathDispatchSoldiers(this.currentCon);
      }
      selectCons = [];
      copySelectCons = [];
      paths = {};
      this.currentCon = null;
    })
  }

  function removeBindEvent(target) {
    target.removeAllEventListeners("mousedown");
    target.removeAllEventListeners("pressmove");
    target.removeAllEventListeners("pressup");
  }

  // 画箭头
  function drawArrow(container, source, target) {
    var arrowStart, arrowEnd;
    switch (source.type) {
      case "own1":
        arrowStart = {x: source.x - 20, y: source.y + 30};
        break;
      case "own50":
        arrowStart = {x: source.x + 20, y: source.y + 60};
        break;
      case "ownTower":
        arrowStart = {x: source.x - 25, y: source.y + 10};
        break;
      default :
        arrowStart = {x: source.x, y: source.y};
    }
    switch (target.type) {
      case "own1":
        arrowEnd = {x: target.x - 20, y: target.y + 30};
        break;
      case "own50":
        arrowEnd = {x: target.x + 10, y: target.y + 60};
        break;
      case "enemy1":
        arrowEnd = {x: target.x - 20, y: target.y - 10};
        break;
      case "enemy50":
        arrowEnd = {x: target.x + 10, y: target.y + 10};
        break;
      case "publicTower":
        arrowEnd = {x: target.x - 25, y: target.y + 10};
        break;
      case "ownTower":
        arrowEnd = {x: target.x - 25, y: target.y + 10};
        break;
      case "enemyTower":
        arrowEnd = {x: target.x - 25, y: target.y + 10};
        break;
      default :
        arrowEnd = {x: target.x, y: target.y};
    }
    /*var arrow = new createjs.Bitmap(images["arrow"]);
     arrow.x = source.x;
     arrow.y = source.y;
     arrow.scaleX = Math.sqrt(Math.pow(Math.abs(target.x - source.x), 2) + Math.pow(Math.abs(target.y - source.y), 2)) / arrow.image.width;
     arrow.scaleY = 1;
     arrow.regX = 0;
     arrow.regY = arrow.image.height / 2;
     arrow.alpha = 0.6;
     arrow.rotation = calcAngle({x: source.x, y: source.y}, {x: target.x, y: target.y});
     container.addChild(arrow);*/
    var arrow = new createjs.Bitmap(images["arrow"]);
    arrow.x = arrowStart.x;
    arrow.y = arrowStart.y;
    arrow.scaleX = Math.sqrt(Math.pow(Math.abs(arrowEnd.x - arrowStart.x), 2) + Math.pow(Math.abs(arrowEnd.y - arrowStart.y), 2)) / arrow.image.width;
    arrow.scaleY = 1;
    arrow.regX = 0;
    arrow.regY = arrow.image.height / 2;
    arrow.alpha = 0.6;
    arrow.rotation = calcAngle({x: arrowStart.x, y: arrowStart.y}, {x: arrowEnd.x, y: arrowEnd.y});
    container.addChild(arrow);
  }

  // 计算角度
  function calcAngle(startPoint, endPoint) {
    var px = startPoint.x;
    var py = startPoint.y;
    var mx = endPoint.x;
    var my = endPoint.y;
    var disX = Math.abs(px - mx);
    var disY = Math.abs(py - my);
    var radina = Math.atan(disY / disX);//用反三角函数求弧度
    var angle = Math.round(180 / (Math.PI / radina))
    // 第一象限
    if (mx > px && my < py) {
      angle = 360 - angle;
    }
    // 第二象限
    if (mx < px && my < py) {
      angle = 180 + angle;
    }
    // 第三象限
    if (mx < px && my > py) {
      angle = 180 - angle;
    }
    // 第四象限
    if (mx > px && my > py) {
      angle = angle;
    }
    // y轴负方向
    if (mx == px && my < py) {
      angle = 270;
    }
    // y轴正方向
    if (mx == px && my > py) {
      angle = 90;
    }
    // x轴正方向
    if (mx > px && my == py) {
      angle = 0;
    }
    // x轴负方向
    if (mx < px && my == py) {
      angle = 180;
    }
    return Math.ceil(angle);
  }

  // 画路径
  function drawPath(target) {
    var arrowCon = levelContainer.getChildByName("arrowCon");
    if (paths[target.index]) {
      // 第一阶级
      for (var i = 0; i < paths[target.index].length; i++) {
        var path = paths[target.index][i];
        drawArrow(arrowCon, path, target);
        drawPath(path);
      }
    } else {
      return;
    }
  }

  // 派兵
  function dispatchSoldiers(source, target, isOwn) {
    if (source.movingSoldiers && source.movingSoldiers.length > 0) {
      for (var i = 0; i < source.movingSoldiers.length; i++) {
        var movingSoldier = source.movingSoldiers[i];
        if (movingSoldier && !movingSoldier.isMoving) {
          createjs.Tween.removeTweens(movingSoldier);
          levelContainer.removeChild(movingSoldier);
        }
      }
    }
    source.movingSoldiers = [];
    for (var i = 0; i < parseInt(parseInt(source.soldierCount.text) * 2 / 3); i++) {
      //派出自己的兵
      if (isOwn) {
        var soldier = new createjs.Sprite(spritesheets["own"]);
        // 敌方派兵
      } else {
        var soldier = new createjs.Sprite(spritesheets["enemy"]);
      }
      soldier.regX = soldier.getBounds().width / 2;
      soldier.regY = soldier.getBounds().height / 2;
      soldier.x = source.startX;
      if (source.type === "publicTower" || source.type === "ownTower" || source.type == "enemyTower") {
        soldier.y = source.startY;
      } else {
        soldier.y = source.startY + 20;
      }
      soldier.index = i;
      soldier.play();
      soldier.alpha = 0;
      // 这里数组有问题
      source.movingSoldiers.push(soldier);
      levelContainer.addChild(soldier);
      var dis = Math.sqrt(Math.pow(Math.abs(target.x - source.x), 2) + Math.pow(Math.abs(target.y - source.y), 2), 2);
      var arrivalTime = dis / 300 * 2000;
      var targetY = null;
      if (target.type == "enemy1") {
        targetY = target.startY + 20;
      } else {
        targetY = target.startY;
      }
      createjs.Tween.get(soldier)
        .wait(i * 300)
        .to({
          alpha: 1
        })
        .call(function () {
          this.isMoving = true;
          source.soldierCount.text = source.soldierCount.text > 0 ? parseInt(source.soldierCount.text) - 1 : parseInt(source.soldierCount.text);
          source.soldierCount.regX = source.soldierCount.getBounds().width / 2;
          source.soldierCount.regY = source.soldierCount.getBounds().height / 2;
        })
        .to({
          x: target.startX,
          y: targetY
        }, arrivalTime)
        .call(function () {
          var isSameSide, isTower, smoke;
          var barCon = levelContainer.getChildByName("barCon");
          isSameSide = judgeSameSide(source, target);
          switch (target.type) {
            case "own1":
              smoke = new createjs.Sprite(spritesheets["smoke"]);
              smoke.x = target.x - 20;
              smoke.y = target.y + 35;
              break;
            case "own50":
              smoke = new createjs.Sprite(spritesheets["smoke"]);
              smoke.x = target.x + 20;
              smoke.y = target.y + 70;
              break;
            case "publicTower":
              if (isSameSide) {
                smoke = new createjs.Sprite(spritesheets["smoke"]);
              } else {
                smoke = new createjs.Sprite(spritesheets["fire"]);
              }
              smoke.x = target.x - 30;
              smoke.y = target.y + 20;
              isTower = true;
              break;
            case "ownTower":
              if (isSameSide) {
                smoke = new createjs.Sprite(spritesheets["smoke"]);
              } else {
                smoke = new createjs.Sprite(spritesheets["fire"]);
              }
              smoke.x = target.x - 30;
              smoke.y = target.y + 20;
              isTower = true;
              break;
            case "enemyTower":
              if (isSameSide) {
                smoke = new createjs.Sprite(spritesheets["smoke"]);
              } else {
                smoke = new createjs.Sprite(spritesheets["fire"]);
              }
              smoke.x = target.x - 30;
              smoke.y = target.y + 20;
              isTower = true;
              break;
            case "publicTurtle":
              smoke = new createjs.Sprite(spritesheets["smoke"]);
              smoke.x = target.x - 10;
              smoke.y = target.y + 5;
              break;
            case "enemy1":
              smoke = new createjs.Sprite(spritesheets["smoke"]);
              smoke.x = target.x - 20;
              smoke.y = target.y;
              break;
            case "enemy50":
              smoke = new createjs.Sprite(spritesheets["smoke"]);
              smoke.x = target.x;
              smoke.y = target.y + 40;
              break;
          }
          if (isSameSide) {
            target.soldierCount.text = parseInt(target.soldierCount.text) + 1;
          } else {
            target.soldierCount.text = parseInt(target.soldierCount.text) >= 1 ? parseInt(target.soldierCount.text) - 1 : parseInt(target.soldierCount.text);
            if (source.isOwn || (target.isOwn && source.isEnemy)) {
              if (tornadoNum < 50) {
                tornadoNum++;
                barCon.progressText.text = tornadoNum + " / 50";
                barCon.progressText.regX = barCon.progressText.getBounds().width / 2;
                moveExperienceBar(barCon.progress, tornadoNum, 158);
              } else {
                createjs.Tween.get(barCon)
                  .to({
                    alpha: 0.5
                  }, 100)
                  .to({
                    alpha: 1
                  }, 100)
              }
            }
          }
          if (parseInt(target.soldierCount.text) == 0) {
            // 变成自己
            if (isTower) {
              if (isOwn) {
                changeBase(target, "ownTower");
              } else {
                changeBase(target, "enemyTower");
              }
            } else {
              if (isOwn) {
                changeBase(target, "own1");
              } else {
                changeBase(target, "enemy1");
              }
            }
          } else if (parseInt(target.soldierCount.text) == 50 && !target.isPublic) {
            if (isOwn && !isTower) {
              changeBase(target, "own50");
            } else if (!isOwn && !isTower) {
              changeBase(target, "enemy50");
            }
          }
          target.soldierCount.regX = target.soldierCount.getBounds().width / 2;
          target.soldierCount.regY = target.soldierCount.getBounds().height / 2;
          if (smoke) {
            smoke.regX = smoke.getBounds().width / 2;
            smoke.regY = smoke.getBounds().height / 2;
            smoke.play();
            smoke.on("animationend", function () {
              levelContainer.removeChild(this);
            })
            levelContainer.addChild(smoke);
          }
          levelContainer.removeChild(this);
        })
    }
  }

  // 变换基地
  function changeBase(container, type) {
    container.removeChild(container.base);
    var newbase, flag;
    switch (type) {
      case "own1":
        newbase = new createjs.Sprite(spritesheets[type]);
        container.x = container.startX + 20;
        container.y = container.startY;
        container.soldierBg.x = 70;
        container.soldierBg.y = 0;
        container.soldierCount.x = 67 + container.soldierBg.image.width * container.soldierCount.scaleX / 2;
        container.soldierCount.y = 20;
        container.isOwn = true;
        container.isEnemy = false;
        container.isTower = false;
        container.time = randomInt(3, 7) * 1000;
        bindEvent(container);
        break;
      case "own50":
        newbase = new createjs.Sprite(spritesheets[type]);
        newbase.scaleX = newbase.scaleY = 0.8;
        container.x = container.startX - 10;
        container.y = container.startY - 30;
        container.soldierBg.x = 110;
        container.soldierBg.y = 20;
        container.soldierCount.x = 140;
        container.soldierCount.y = 40;
        container.isOwn = true;
        container.isEnemy = false;
        container.isTower = false;
        container.time = randomInt(3, 7) * 1000;
        bindEvent(container);
        break;
      case "ownTower":
        newbase = new createjs.Bitmap(images[type]);
        container.x = container.startX + 30;
        container.y = container.startY;
        container.soldierBg.x = 60;
        container.soldierBg.y = -20;
        container.soldierCount.x = 90;
        container.soldierCount.y = 0;
        container.isOwn = true;
        container.isEnemy = false;
        container.isTower = true;
        container.time = null;
        bindEvent(container);
        break;
      case "enemyTower":
        newbase = new createjs.Bitmap(images[type]);
        container.x = container.startX + 30;
        container.y = container.startY;
        container.soldierBg.x = 60;
        container.soldierBg.y = -20;
        container.soldierCount.x = 90;
        container.soldierCount.y = 0;
        container.isEnemy = true;
        container.isTower = true;
        container.isOwn = false;
        container.time = null;
        removeBindEvent(container);
        break;
      case "enemy1":
        newbase = new createjs.Bitmap(images[type]);
        container.x = container.startX + 20;
        container.y = container.startY + 40;
        container.soldierBg.x = 80;
        container.soldierBg.y = -20;
        container.soldierCount.x = 110;
        container.soldierCount.y = 0;
        container.isEnemy = true;
        container.isOwn = false;
        container.isTower = false;
        container.time = null;
        removeBindEvent(container);
        flag = new createjs.Sprite(spritesheets["yellowFlag"]);
        flag.x = 40;
        flag.y = -40;
        flag.play();
        break;
      case "enemy50":
        newbase = new createjs.Bitmap(images[type]);
        newbase.scaleX = newbase.scaleY = 0.8;
        container.x = container.startX;
        container.y = container.startY;
        container.soldierBg.x = 100;
        container.soldierBg.y = 0;
        container.soldierCount.x = 130;
        container.soldierCount.y = 20;
        container.isEnemy = true;
        container.isOwn = false;
        container.isTower = false;
        container.time = null;
        removeBindEvent(container);
        flag = new createjs.Sprite(spritesheets["yellowFlag"]);
        flag.x = 72;
        flag.y = -15;
        flag.play();
        break;
    }
    newbase.regX = newbase.getBounds().width / 2;
    newbase.regY = newbase.getBounds().height / 2;
    newbase.x = newbase.getBounds().width / 2;
    newbase.y = newbase.getBounds().height / 2;
    container.addChildAt(newbase, 0);
    if (container.flag) {
      container.removeChild(container.flag);
      container.flag = null;
    }
    if (flag) {
      container.addChild(flag);
      container.flag = flag;
    }
    container.regX = container.getBounds().width / 2;
    container.regY = container.getBounds().height / 2;
    container.type = type;
    container.base = newbase;
    if (newbase.spriteSheet) {
      newbase.on("animationend", function () {
        this.stop();
      })
    }
    container.isPublic = false;
  }

  // 计算路径
  function calcPath(target) {
    var candidates = [];
    // 计算出目标相邻对象
    for (var i = 0; i < target.paths.length; i++) {
      var path = target.paths[i];
      for (var j = 0; j < copySelectCons.length; j++) {
        var copySelectCon = copySelectCons[j];
        if (copySelectCon && path === copySelectCon.index) {
          // paths.push(selectCon);
          candidates.push(copySelectCon);
          copySelectCons[j] = null;
        }
      }
    }
    if (candidates.length > 0) {
      for (var i = 0; i < candidates.length; i++) {
        var candidate = candidates[i];
        paths[target.index] = candidates;
        calcPath(candidate);
      }
    } else {
      paths[target.index] = candidates;
    }
  }

  // 根据路径 派兵
  function pathDispatchSoldiers(target) {
    if (paths[target.index]) {
      // 第一阶级
      for (var i = 0; i < paths[target.index].length; i++) {
        var path = paths[target.index][i];
        dispatchSoldiers(path, target, true);
        pathDispatchSoldiers(path);
      }
    } else {
      return;
    }
  }

  function judgeSameSide(source, target) {
    if (source.isOwn && target.isOwn) {
      return true;
    } else if (source.isEnemy && target.isEnemy) {
      return true;
    } else {
      return false;
    }
  }

  function moveExperienceBar(bar, currentVal, max) {
    var unit = max / 50;
    bar.graphics.clear().beginFill("#FFEB62").drawRect(0, 0, parseInt(currentVal * unit), 20);
  }

  function showResultPic(isWin) {
    var container = new createjs.Container();
    container.name = "resultPic";
    var mask = new createjs.Shape();
    mask.graphics.beginFill("#000000").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
    mask.alpha = 0.6;
    var bitmapStr = isWin ? "win" : "lose";
    var result = new createjs.Bitmap(images[bitmapStr]);
    result.regX = result.image.width / 2;
    result.regY = result.image.height / 2;
    result.x = stage.canvas.width / 2;
    result.y = stage.canvas.height / 2;
    container.addChild(mask, result);
    game_current.addChild(container);
  }
}

function ticker() {
  stage.update();
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//结束后，后台传来的数据与游戏结束内容显示
function gameOverAnimation() {
  homeBtn.visible = false;
  sndBtn.visible = false;
  replayBtn.visible = false;

  var templete = new createjs.Bitmap(images["template"]);
  templete.regX = templete.image.width / 2;
  templete.regY = templete.image.height / 2;
  templete.x = canvas.width / 2;
  templete.y = -30;

  var endTime = new createjs.Text("总用时: " + (gameAllConfig.totalTime - totalTime) + " s", "24px katong", "#3c3c3c");
  endTime.regX = endTime.getBounds().width / 2;
  endTime.regY = endTime.getBounds().height / 2;
  endTime.x = 487;
  endTime.y = -75;
  templateContainer.addChild(templete, endTime);

  for (var i = 0; i < current_level; i++) {
    var star = new createjs.Bitmap(images["end_star"])
    star.regX = star.image.width / 2;
    star.regY = star.image.height / 2;
    star.x = 368 + (i * 70)
    star.y = -140
    templateContainer.addChild(star)
  }
  current_level = 0;
  createjs.Tween.get(templateContainer)
    .to({y: canvas.height / 2}, 3000, createjs.Ease.bounceOut)

}
