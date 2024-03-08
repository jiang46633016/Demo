var board = null, starter, marks, choicePanel, realMap, myTarget, printer, currentPlans, currentPlanIndex, currentLevel, rows, cols, unitDistance, pizzarian, bitmapAll, background, passContainer;
const tileWidth = 120, tileHeight= 120;

var bitmapAreas = {
  "pizzaMap-scale":  [2, 2, 107, 6],
  "pizzaMap-white-bush1":  [111, 2, 47, 46],
  "pizzaMap-white-bush2":  [160, 2, 81, 41],
  "pizzaMap-white-bush3":  [243, 2, 28, 27],
  "pizzaMap-black-bush1":  [273, 2, 28, 31],
  "pizzaMap-black-bush2":  [303, 2, 84, 47],
  "pizzaMap-black-bush3":  [389, 2, 47, 50],
  "pizzaMap-moto":  [438, 2, 39, 78],
  "pizzaMap-refresh-button":  [479, 2, 76, 73],
  "pizzaMap-printer":  [2, 82, 289, 225],
  "pizzaMap-printer-plate":  [293, 82, 279, 20],
  "pizzaMap-container-background":  [2, 309, 624, 515],
  "pizzaMap-dialog3":  [2, 826, 242, 422],
  "pizzaMap-dialog1":  [246, 826, 194, 188],
  "pizzaMap-dialog2":  [442, 826, 310, 248],
  "pizzaMap-white-house1":  [2, 1250, 39, 60],
  "pizzaMap-white-house2":  [43, 1250, 30, 59],
  "pizzaMap-white-house3":  [75, 1250, 46, 74],
  "pizzaMap-white-house4":  [123, 1250, 42, 42],
  "pizzaMap-white-house5":  [167, 1250, 35, 59],
  "pizzaMap-black-house1":  [204, 1250, 40, 62],
  "pizzaMap-black-house2":  [246, 1250, 31, 61],
  "pizzaMap-black-house3":  [279, 1250, 48, 77],
  "pizzaMap-black-house4":  [329, 1250, 43, 43],
  "pizzaMap-black-house5":  [374, 1250, 38, 59],
  "pizzaMap-cancel-button":  [414, 1250, 99, 61],
  "pizzaMap-white-lake1":  [515, 1250, 80, 47],
  "pizzaMap-white-lake2":  [597, 1250, 83, 53],
  "pizzaMap-white-lake3":  [682, 1250, 51, 87],
  "pizzaMap-black-lake1":  [2, 1339, 86, 51],
  "pizzaMap-black-lake2":  [90, 1339, 88, 54],
  "pizzaMap-black-lake3":  [180, 1339, 51, 93],
  "pizzaMap-circle":  [233, 1339, 49, 49],
  "pizzaMap-arrow":  [284, 1339, 30, 30],
  "pizzaMap-forward-25":  [316, 1339, 99, 61],
  "pizzaMap-forward-100":  [417, 1339, 99, 61],
  "pizzaMap-forward-50":  [518, 1339, 99, 61],
  "pizzaMap-forward-5":  [316, 1339, 99, 61],
  "pizzaMap-forward-20":  [417, 1339, 99, 61],
  "pizzaMap-forward-10":  [518, 1339, 99, 61],
  "pizzaMap-half-white-road":  [619, 1339, 25, 46],
  "pizzaMap-white-cross":  [646, 1339, 25, 25],
  "pizzaMap-half-black-road":  [673, 1339, 25, 46],
  "pizzaMap-black-cross":  [700, 1339, 25, 25],
  "pizzaMap-black-shop":  [2, 1434, 58, 54],
  "pizzaMap-white-shop":  [62, 1434, 54, 51],
  "pizzaMap-ok-button":  [118, 1434, 99, 61],
  "pizzaMap-turn-right":  [219, 1434, 99, 61],
  "pizzaMap-paper":  [320, 1434, 281, 511],
  "pizzaMap-turn-left":  [603, 1434, 99, 61],
  "pizzaMap-dumb1":  [704, 1434, 25, 31],
  "pizzaMap-dumb2":  [2, 1947, 25, 31],
  "pizzaMap-white-road":  [29, 1947, 25, 92],
  "pizzaMap-black-road":  [56, 1947, 25, 92],
  "pizzaMap-white-cross-3":  [83, 1947, 25, 25],
  "pizzaMap-white-cross-1":  [110, 1947, 25, 25],
  "pizzaMap-white-cross-2-1":  [137, 1947, 25, 25],
  "pizzaMap-white-cross-2-2":  [164, 1947, 25, 25]
};

(function(window) {
function Target(conf) {
    this.initialize();
    this.row = conf.row;  
    this.col = conf.col;  
    if (conf.right) this.right = true;
    else this.right = false;
    this.direction = conf.direction;
    switch(this.direction) {
        case 1: 
            this.rotation = 0;
            break;
        case -1: 
            this.rotation = 180;
            break;
        case 2: 
            this.rotation = 90;
            break;
        case -2: 
            this.rotation = 270;
            break;
    }
    this.x = (conf.col + 0.5) * tileWidth; 
    this.y = (conf.row + 0.5) * tileHeight; 
    this.house = bitmapAll.clone();
    var names = ["pizzaMap-white-house1", "pizzaMap-white-house2"];
    var name = names[Math.random() > 0.5 ? 1: 0];
    var rect = bitmapAreas[name];
    this.house.blackName = name.replace("white", "black"); 
    this.house.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
    this.house.regX = this.house.getBounds().width / 2;
    this.house.regY = this.house.getBounds().height / 2;
    this.road = bitmapAll.clone();
    rect = bitmapAreas["pizzaMap-half-white-road"];
    this.road.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
    this.road.regX = this.road.getBounds().width / 2;
    this.road.x = 5;
    this.road.rotation = -90;
    this.road.blackName = "pizzaMap-half-black-road"; 
    this.addChild(this.road);
    this.addChild(this.house);
}
Target.prototype = new createjs.Container();
Target.prototype.Container_initialize = Target.prototype.initialize;
Target.prototype.initialize = function() {
    this.Container_initialize();
}
Target.prototype.showBlackTarget = function() {
    var targetContainer = new createjs.Container();
    targetContainer.x = this.x;
    targetContainer.y = this.y;
    targetContainer.house = bitmapAll.clone();
    var rect = bitmapAreas[this.house.blackName];
    targetContainer.house.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
    targetContainer.house.regX = targetContainer.house.getBounds().width / 2;
    targetContainer.house.regY = targetContainer.house.getBounds().height / 2;
    targetContainer.road = bitmapAll.clone();
    rect = bitmapAreas["pizzaMap-half-black-road"];
    targetContainer.road.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
    targetContainer.road.regX = targetContainer.road.getBounds().width / 2;
    targetContainer.road.x = 5;
    targetContainer.road.rotation = -90;
    targetContainer.addChild(targetContainer.road);
    targetContainer.addChild(targetContainer.house);
    targetContainer.direction = this.direction;
    targetContainer.rotation = this.rotation;
    return targetContainer;
}

function Starter(conf) {
    this.arrow = bitmapAll.clone(); 
    var rect = bitmapAreas["pizzaMap-arrow"];
    this.arrow.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
    this.arrow.regX = this.arrow.getBounds().width / 2;
    this.arrow.regY = this.arrow.getBounds().height / 2;
    this.arrow.rotation = 90;
    this.circle = bitmapAll.clone(); 
    var rect = bitmapAreas["pizzaMap-circle"];
    this.circle.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
    this.circle.regX = this.circle.getBounds().width / 2;
    this.circle.regY = this.circle.getBounds().height / 2;
    this.addChild(this.circle);
    this.addChild(this.arrow);
    this.x = tileWidth * conf.col;
    this.y = tileHeight * conf.row;
    this.row = conf.row;
    this.col = conf.col;
    this.direction = conf.direction;

    this.house = bitmapAll.clone();
    var rect = bitmapAreas["pizzaMap-white-shop"];
    this.house.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
    this.house.regX = this.house.getBounds().width / 2;
    this.house.regY = this.house.getBounds().height / 2;
    this.road = bitmapAll.clone();
    rect = bitmapAreas["pizzaMap-half-white-road"];
    this.road.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
    this.road.regX = this.road.getBounds().width / 2;
    this.direction = conf.direction;
    switch(this.direction) {
        case 1: 
            this.rotation = -90;
            this.house.x = this.x - tileWidth / 2;
            this.house.y = this.y;
            this.road.x = this.x - tileWidth / 2;
            this.road.y = this.y;
            this.house.rotation = -90;
            this.road.rotation = -90;
            break;
        case -1: 
            this.rotation = 90;
            this.house.x = this.x + tileWidth / 2;
            this.house.y = this.y;
            this.road.x = this.x + tileWidth / 2;
            this.road.y = this.y;
            this.house.rotation = 90;
            this.road.rotation = 90;
            break;
        case 2: 
            this.rotation = 0;
            this.house.x = this.x;
            this.house.y = this.y - tileHeight / 2;
            this.road.x = this.x;
            this.road.y = this.y - tileHeight / 2;
            this.house.rotation = 0;
            this.road.rotation = 0;
            break;
        case -2: 
            this.rotation = 180;
            this.house.x = this.x;
            this.house.y = this.y + tileHeight / 2;
            this.road.x = this.x;
            this.road.y = this.y + tileHeight / 2;
            this.house.rotation = 180;
            this.road.rotation = 180;
            break;
    }
    board.addChild(this.road);
    board.addChild(this.house);
    createjs.Tween.get(this.circle, {"loop": true})
            .to({"scaleX": 1, "scaleY": 1}, 500)
            .to({"scaleX": 0, "scaleY": 0}, 500);
}
Starter.prototype = new createjs.Container();
Starter.prototype.Container_initialize = Starter.prototype.initialize;
Starter.prototype.initialize = function() {
    this.Container_initialize();
}
Starter.prototype.showBlackStarter = function() {
    var starterContainer = new createjs.Container();
    starterContainer.x = this.x;
    starterContainer.y = this.y;
    starterContainer.house = bitmapAll.clone();
    var rect = bitmapAreas["pizzaMap-black-shop"];
    starterContainer.house.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
    starterContainer.house.regX = starterContainer.house.getBounds().width / 2;
    starterContainer.house.regY = starterContainer.house.getBounds().height / 2;
    starterContainer.road = bitmapAll.clone();
    rect = bitmapAreas["pizzaMap-half-black-road"];
    starterContainer.road.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
    starterContainer.road.regX = starterContainer.road.getBounds().width / 2;
    starterContainer.addChild(starterContainer.road);
    starterContainer.addChild(starterContainer.house);
    starterContainer.direction = this.direction;
    switch(this.direction) {
        case 1: 
            starterContainer.house.rotation = -90;
            starterContainer.road.rotation = -90;
            starterContainer.house.x = -tileWidth / 2;
            starterContainer.house.y = 0;
            starterContainer.road.x = -tileWidth / 2 + 5;
            starterContainer.road.y = 0;
            break;
        case -1: 
            starterContainer.house.rotation = 90;
            starterContainer.road.rotation = 90;
            starterContainer.house.x = tileWidth / 2;
            starterContainer.house.y = 0;
            starterContainer.road.x = tileWidth / 2 - 5;
            starterContainer.road.y = 0;
            break;
        case 2: 
            starterContainer.house.rotation = 0;
            starterContainer.road.rotation = 0;
            starterContainer.house.x = 0;
            starterContainer.house.y = -tileHeight / 2;
            starterContainer.road.x = 0;
            starterContainer.road.y = -tileHeight / 2 + 5;
            break;
        case -2: 
            starterContainer.house.rotation = 180;
            starterContainer.road.rotation = 180;
            starterContainer.house.x = 0;
            starterContainer.house.y = tileHeight / 2;
            starterContainer.road.x = 0;
            starterContainer.road.y = tileHeight / 2 - 5;
            break;
    }
    return starterContainer;
}

function Pizzarian() {
    var src = images["pizzaMap-all"];
    this.initialize(src);
    var rect = bitmapAreas["pizzaMap-moto"];
    this.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
    this.row = starter.row;  
    this.col = starter.col;  
    this.origRow = starter.row;  
    this.origCol = starter.col;  
    this.x = starter.col * tileWidth; 
    this.y = starter.row * tileHeight; 
    this.origX = this.x; 
    this.origY = this.y; 
    this.scaleX = tileWidth / 150; 
    this.scaleY = tileHeight / 150; 
    this.regX = this.getBounds().width / 2;
    this.regY = this.getBounds().height / 2;
    this.direction = starter.direction;
    this.origDirection = starter.direction;
    switch(this.direction) {
        case 1: 
            this.rotation = 90;
            this.origRotation = 90;
            break;
        case -1: 
            this.rotation = -90;
            this.origRotation = -90;
            break;
        case 2: 
            this.rotation = 180;
            this.origRotation = 180;
            break;
        case -2: 
            this.rotation = 0;
            this.origRotation = 0;
            break;
    }
    this.status = "stop";
}
Pizzarian.prototype = new createjs.Bitmap();
Pizzarian.prototype.Bitmap_initialize = Pizzarian.prototype.initialize;
Pizzarian.prototype.initialize = function(src) {
    this.Bitmap_initialize(src);
}
Pizzarian.prototype.go = function() {
    if (pizzarian.status == "stop") {
        pizzarian.status = "moving";
        currentPlanIndex = 0;
        pizzarian.move();
    }
}
Pizzarian.prototype.move = function() {
    var success = true; 
    if (currentPlanIndex < currentPlans.length) {
        var plan = currentPlans[currentPlanIndex];
        plan.text.color = "#f9983e";
        var x = this.x, y = this.y, rotation = this.rotation, time;
        switch (this.direction) {
            case 1:
                if (plan.distance == 0) {
                    time = 1000;
                    rotation = this.rotation + plan.rotation;
                    if (plan.rotation == 90) this.direction = 2;
                    else if (plan.rotation == -90) this.direction = -2;
                } else if (this.col < cols && board.horizontalMap[this.row][Math.floor(this.col)] == 1) {
                    var units = plan.distance / unitDistance;
                    var col = this.col;
                    while (col < cols && board.horizontalMap[this.row][Math.floor(col)] == 1) {
                        col += 0.5;
                        if ((col - this.col) == units) break;
                    }
                    if ( (col - this.col) < units ) {
                        success = false;
                        units = col - this.col;
                    }
                    x = this.x + units * tileWidth;
                    if (plan.rotation != 0) {
                        rotation = this.rotation + plan.rotation;
                        if (plan.rotation == 90) this.direction = 2;
                        else if (plan.rotation == -90) this.direction = -2;
                    }
                    time = 1000 * plan.distance / unitDistance;
                    this.col += units;
                } else {
                    time = 0;
                }
                break;
            case -1:
                if (plan.distance == 0) {
                    time = 1000;
                    rotation = this.rotation + plan.rotation;
                    if (plan.rotation == 90) this.direction = -2;
                    else if (plan.rotation == -90) this.direction = 2;
                } else if (this.col > 0 && board.horizontalMap[this.row][Math.floor(this.col)-1 ] == 1) {
                    var units = plan.distance / unitDistance;
                    var col = this.col;
                    while (col > 0 && board.horizontalMap[this.row][Math.floor(col-0.5)] == 1) {
                        col -= 0.5;
                        if ((this.col - col) == units) break;
                    }
                    if ( (this.col - col) < units ) {
                        success = false;
                        units = this.col - col;
                    }
                    x = this.x - units * tileWidth;
                    if (plan.rotation != 0) {
                        rotation = this.rotation + plan.rotation;
                        if (plan.rotation == 90) this.direction = -2;
                        else if (plan.rotation == -90) this.direction = 2;
                    }
                    time = 1000 * plan.distance / unitDistance;
                    this.col -= units;
                } else {
                    time = 0;
                }
                break;
            case 2:
                if (plan.distance == 0) {
                    time = 1000;
                    rotation = this.rotation + plan.rotation;
                    if (plan.rotation == 90) this.direction = -1;
                    else if (plan.rotation == -90) this.direction = 1;
                } else if (this.row < rows && board.verticalMap[Math.floor(this.row)][this.col] == 1) {
                    var units = plan.distance / unitDistance;
                    var row = this.row;
                    while (row < rows && board.verticalMap[Math.floor(row)][this.col] == 1) {
                        row += 0.5;
                        if ((row - this.row) == units) break;
                    }
                    if ( (row - this.row) < units ) {
                        success = false;
                        units = row - this.row;
                    }
                    y = this.y + units * tileHeight;
                    if (plan.rotation != 0) {
                        if (plan.rotation == 90) this.direction = -1;
                        else if (plan.rotation == -90) this.direction = 1;
                        rotation = this.rotation + plan.rotation;
                    }
                    if (plan.distance > 0) { 
                        time = 1000 * plan.distance / unitDistance;
                    } else time = 1000;
                    this.row += units;
                } else {
                    time = 0;
                }
                break;
            case -2:
                if (plan.distance == 0) {
                    time = 1000;
                    rotation = this.rotation + plan.rotation;
                    if (plan.rotation == 90) this.direction = 1;
                    else if (plan.rotation == -90) this.direction = -1;
                } else if (this.row > 0 && board.verticalMap[Math.floor(this.row-1)][this.col] == 1) {
                    var units = plan.distance / unitDistance;
                    var row = this.row;
                    while (row > 0 && board.verticalMap[Math.floor(row-0.5)][this.col] == 1) {
                        row -= 0.5;
                        if ((this.row - row) == units) break;
                    }
                    if ( (this.row - row) < units ) {
                        success = false;
                        units = this.row - row;
                    }
                    y = this.y - units * tileHeight;
                    if (plan.rotation != 0) {
                        if (plan.rotation == 90) this.direction = 1;
                        else if (plan.rotation == -90) this.direction = -1;
                        rotation = this.rotation + plan.rotation;
                    }
                    if (plan.distance > 0) { 
                        time = 1000 * plan.distance / unitDistance;
                    } else time = 1000;
                    this.row -= units;
                } else {
                    time = 0;
                }
                break;
        }
        if (time > 0) {
            var mark = new createjs.Shape();
            var idx = board.blackContainer.getChildIndex(pizzarian);
            board.blackContainer.addChildAt(mark, idx);
            marks.push(mark);
            var width = Math.abs(this.x - x);
            var height = Math.abs(this.y - y);
            var direction;
            var startX = 0, startY = 0;
            if (width == 0) {
                width = 10;
                startX = -5;
                startY = -5;
                targetScaleX = 1;
                targetScaleY = 1;
                if (this.y > y) targetScaleY = -1;
                mark.scaleY = 0;
            }
            if (height == 0) {
                height = 10;
                startY = -5;
                targetScaleX = 1;
                targetScaleY = 1;
                if (this.x > x) targetScaleX = -1;
                mark.scaleX = 0;
            }
            mark.graphics.beginFill("#ffed2d").drawRect(startX, startY, width, height);
            mark.x = this.x;
            mark.y = this.y;
            createjs.Tween.get(plan.text)
                    .to({"x": plan.text.x + 50}, 500)
                    .wait(time)
                    .to({"x": plan.text.x}, 500);
            createjs.Tween.get(this)
                    .to({"x": x, "y": y, "rotation": rotation}, time)
                    .call(function() {
                        currentPlanIndex++;
                        pizzarian.move();
                    });
            createjs.Tween.get(mark)
                    .to({"scaleX": targetScaleX, "scaleY": targetScaleY}, time);
        } else { // 失败
            success = false;
            createjs.Tween.get(plan.text)
                    .to({"x": plan.text.x + 20}, 300)
                    .to({"x": plan.text.x}, 300)
                    .to({"x": plan.text.x + 20}, 300)
                    .to({"x": plan.text.x}, 300);
            createjs.Tween.get(pizzarian)
                    .to({"rotation": pizzarian.rotation + 15}, 300)
                    .to({"rotation": pizzarian.rotation - 15}, 300)
                    .to({"rotation": pizzarian.rotation + 15}, 300)
                    .to({"rotation": pizzarian.rotation}, 300)
        }
    } else { // 判断是否抵达目的地
        switch (myTarget.direction) {
            case 1:
                if (Math.floor(pizzarian.row) != myTarget.row ||
                    pizzarian.row == myTarget.row || 
                    (pizzarian.col != myTarget.col + 1) || 
                    (pizzarian.direction != myTarget.direction * -1)) {
                    success = false;
                }
                break;
            case -1:
                if (Math.floor(pizzarian.row) != myTarget.row ||
                    pizzarian.row == myTarget.row || 
                    pizzarian.col != myTarget.col || 
                    (pizzarian.direction != myTarget.direction * -1)) {
                    success = false;
                }
                break;
            case 2:
                if ((pizzarian.row != myTarget.row + 1) ||
                    pizzarian.col == myTarget.col || 
                    Math.floor(pizzarian.col) != myTarget.col || 
                    (pizzarian.direction != myTarget.direction * -1)) {
                    success = false;
                }
                break;
            case -2:
                if (pizzarian.row != myTarget.row ||
                    pizzarian.col == myTarget.col || 
                    Math.floor(pizzarian.col) != myTarget.col || 
                    (pizzarian.direction != myTarget.direction * -1)) {
                    success = false;
                }
                break;
        }
        if (!success) {
            createjs.Tween.get(pizzarian)
                    .to({"rotation": pizzarian.rotation + 15}, 300)
                    .to({"rotation": pizzarian.rotation - 15}, 300)
                    .to({"rotation": pizzarian.rotation + 15}, 300)
                    .to({"rotation": pizzarian.rotation}, 300)
        } else {
            celebrate();
        }
    }
    if (!success) {
        createjs.Tween.get(pizzarian)
                .wait(1500)
                .call(function() {
                    pizzarian.row = pizzarian.origRow;
                    pizzarian.col = pizzarian.origCol;
                    pizzarian.direction = pizzarian.origDirection;
                    pizzarian.x = pizzarian.origX;
                    pizzarian.y = pizzarian.origY;
                    pizzarian.rotation = pizzarian.origRotation;
                    pizzarian.status = "stop";
                    for (var markIdx = 0; markIdx < marks.length; markIdx++) {
                        marks[markIdx].parent.removeChild(marks[markIdx]);
                    }
                    createjs.Tween.get(realMap)
                            .to({"alpha": 0}, 1000)
                            .call(function() {
                                this.parent.removeChild(this);
                                printer.reset();
                            });
                });
    }
}

function Printer(x, y) {
    this.initialize();
    this.width = board.gridWidth;
    this.height = board.gridHeight;
    this.x = x; 
    this.y = y; 
    this.currentRow = 0;
    this.printer = bitmapAll.clone(); 
    var rect = bitmapAreas["pizzaMap-printer"];
    this.printer.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
    this.printer.y = 360;
    //this.printer.scaleX = 200 / this.printer.getBounds().width;
    this.printer.scaleX = 1; 
    this.printer.scaleY = this.printer.scaleX;
    this.printerPlate = bitmapAll.clone(); 
    rect = bitmapAreas["pizzaMap-printer-plate"];
    this.printerPlate.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
    this.printerPlate.x = 8;
    this.printerPlate.y = 400;
    this.addChild(this.printer);
    this.addChild(this.printerPlate);
    this.paperContainer = new createjs.Container();
    this.paper = new createjs.Container();
    this.paperBg = bitmapAll.clone(); 
    rect = bitmapAreas["pizzaMap-paper"];
    this.paperBg.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
    //this.paperBg.scaleX = 200 / this.paperBg.image.width;
    this.paperBg.scaleX = 1; 
    this.paperBg.scaleY = this.paperBg.scaleX;
    this.paper.x = 0;
    this.paper.y = this.printer.y - 100;
    this.paper.addChild(this.paperBg);
    this.paperContainer.addChild(this.paper);
    var mask = new createjs.Shape();
    mask.graphics.drawRect(0, -100, 300, 520);
    this.paperContainer.mask = mask;
    this.paperContainer.x = 5;
    this.addChildAt(this.paperContainer, 1)
    this.currentTextY = 150;
    var chars = ["A", "B", "C", "D", "E", "F", "G", "H"];
    var position = chars[myTarget.col] + (myTarget.row + 1); 
    var hint = new createjs.Text("1个披萨送到位于\n             的住宅", "20px Arial", "#117169");
    var positionText = new createjs.Text(position, "25px Arial", "#f9983e");
    hint.x = 70;
    hint.y = 100;
    positionText.x = 90;
    positionText.y = 120;
    this.paper.addChild(hint);
    this.paper.addChild(positionText);
    this.texts = [];
}
Printer.prototype = new createjs.Container();
Printer.prototype.Container_initialize = Printer.prototype.initialize;
Printer.prototype.initialize = function() {
    this.Container_initialize();
}
Printer.prototype.reset = function() {
    this.paper.x = this.paper.origX;
    this.paper.y = this.paper.origY;
    this.paperContainer.addChild(this.paper);
    for (var textIdx = this.texts.length - 1; textIdx >= 0; textIdx--) {
        this.paper.y += this.texts[textIdx].getMeasuredHeight() + 15;
        this.currentTextY -= this.texts[textIdx].getMeasuredHeight() + 15;
        this.paper.removeChild(this.texts[textIdx]);
        this.paper.removeChild(this.texts[textIdx].line);
    }
    this.texts = [];
    currentPlans = [];
}
Printer.prototype.addPlan = function(plan) {
    var text = new createjs.Text(plan.text, "20px Arial", "#297c2c");
    text.x = 20;
    text.y = this.currentTextY;
    this.currentTextY += text.getMeasuredHeight() + 15;
    this.paper.addChild(text);
    text.line = new createjs.Shape();
    text.line.graphics.setStrokeDash([10,5]).beginStroke("#5c897d").moveTo(0, 0).lineTo(150, 0);
    text.line.x = 20;
    text.line.y = text.y + 20;
    this.paper.addChild(text.line);
    this.texts.push(text);
    this.paper.y -= text.getMeasuredHeight() + 15;
    var currentPlan = {}; 
    currentPlan.rotation = plan.rotate;
    currentPlan.distance = plan.distance;
    currentPlan.text = text;
    currentPlans.push(currentPlan);
}
Printer.prototype.cancelPlan = function() {
    if (currentPlans.length > 0) {
        currentPlans.pop();
        var text = this.texts.pop();
        text.parent.removeChild(text.line);
        text.parent.removeChild(text);
        this.paper.y += text.getMeasuredHeight() + 15;
        this.currentTextY -= text.getMeasuredHeight() + 15;
    }
}

function Plan(conf) {
    this.initialize();
    this.rotate = conf.rotation;
    this.distance = conf.distance;
    this.name = conf.id;
    //this.background = new createjs.Shape();
    //this.addChild(this.background);
    this.icon = bitmapAll.clone(); 
    var rect;
    if (conf.id != "forward") {
        rect = bitmapAreas["pizzaMap-turn-" + conf.id];
    } else {
        rect = bitmapAreas["pizzaMap-forward-" + conf.distance];
    }
    this.icon.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
    this.addChild(this.icon);
    this.width = this.icon.getBounds().width;
    this.text = conf.text;
    //this.text = new createjs.Text(conf.text, "20px Arial", "white");
    //this.text.x = this.icon.x + this.icon.image.width + 10;
    //this.text.y = 10;
    //this.width = this.text.x + this.text.getMeasuredWidth() + 10;
    //this.addChild(this.text);
    //this.background.graphics.clear().beginFill("#19b6bb").drawRoundRect(0, 0, this.width, this.icon.image.height+20, 20);
}
Plan.prototype = new createjs.Container();
Plan.prototype.Container_initialize = Plan.prototype.initialize;
Plan.prototype.initialize = function() {
    this.Container_initialize();
}

function Board() {
    this.initialize();
    this.width = tileWidth * cols;
    this.height = tileHeight * rows;
    this.horizontalMap = [];
    this.verticalMap = [];
}
Board.prototype = new createjs.Container();
Board.prototype.Container_initialize = Board.prototype.initialize;
Board.prototype.initialize = function() {
    this.Container_initialize();
}
Board.prototype.init = function(horizontalMapConf, verticalMapConf, startConf, targetConf){
    currentPlans = [];
    var containerBackground = bitmapAll.clone();
    var rect = bitmapAreas["pizzaMap-container-background"];
    containerBackground.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
    containerBackground.scaleX = 1.1;
    containerBackground.scaleY = 1.1;
    stage.addChild(containerBackground);

    var items = ["pizzaMap-white-lake1", "pizzaMap-white-lake2", "pizzaMap-white-lake3", "pizzaMap-white-bush1", "pizzaMap-white-bush2","pizzaMap-white-bush3","pizzaMap-white-house3","pizzaMap-white-house4","pizzaMap-white-house5"];
    this.items = [];
    for (var rowIdx = 0; rowIdx < rows; rowIdx++) {
        for (var colIdx = 0; colIdx < cols; colIdx++) {
            var rnd = Math.random();
            if (rnd > 0.2) {
                var idx = Math.floor(Math.random() * items.length);
                while (idx > 5) {
                    var conflict = false;
                    for (var targetIdx = 0; targetIdx < targetConf.length; targetIdx++) {
                        if (targetConf[targetIdx].row == rowIdx && targetConf[targetIdx].col == colIdx) {
                            conflict = true;
                            break;
                        }
                    }
                    if (conflict) {
                        idx = Math.floor(Math.random() * items.length);
                    } else break;
                }
                var itemName = items[idx];
                var item = bitmapAll.clone(); 
                var rect = bitmapAreas[itemName];
                item.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
                item.x = colIdx * tileWidth + ( 20 + Math.random() * 80);
                item.y = rowIdx * tileHeight + ( 20 + Math.random() * 80);
                item.regX = item.getBounds().width / 2;
                item.regY = item.getBounds().height / 2;
                if (idx <= 5) {
                    item.rotation = Math.floor(Math.random() * 360);
                } else {
                    var houseRotations = [0, 90, 180, 270];
                    var rndRotation = houseRotations[Math.floor(Math.random() * houseRotations.length)];
                    item.rotation = rndRotation; 
                }
                item.blackName = itemName.replace("white", "black");
                this.addChild(item);
                this.items.push(item);
            }
        }
    }
    var chars = ["A", "B", "C", "D", "E", "F", "G", "H"];
    this.frame = new createjs.Shape();
    for (var rowIdx = 0; rowIdx <= rows; rowIdx++) {
        if (rowIdx == 0 || rowIdx == rows) {
            this.frame.graphics.setStrokeDash([5, 0]).beginStroke("#6e6ed4").moveTo(0, rowIdx*tileWidth).lineTo(cols*tileWidth, rowIdx*tileWidth);
        } else {
            this.frame.graphics.setStrokeDash([5, 5]).beginStroke("#6e6ed4").moveTo(0, rowIdx*tileWidth).lineTo(cols*tileWidth, rowIdx*tileWidth);
        }
        if (rowIdx < rows) {
            var rowId = new createjs.Text(rowIdx+1, "20px Arial", "#6e6ed4");
            rowId.x = -15;
            rowId.y = tileWidth * (rowIdx + 0.5) - 10; 
            this.addChild(rowId);
        }
    }
    for (var colIdx = 0; colIdx <= cols; colIdx++) {
        if (colIdx == 0 || colIdx == cols) {
            this.frame.graphics.setStrokeDash([5, 0]).beginStroke("#6e6ed4").moveTo(colIdx*tileWidth, 0).lineTo(colIdx*tileWidth, rows*tileWidth);
        } else {
            this.frame.graphics.setStrokeDash([5, 5]).beginStroke("#6e6ed4").moveTo(colIdx*tileWidth, 0).lineTo(colIdx*tileWidth, rows*tileWidth);
        }
        if (colIdx < cols) {
            var colId = new createjs.Text(chars[colIdx], "20px Arial", "#6e6ed4");
            colId.x = tileWidth * (colIdx + 0.5) - 5;
            colId.y = -20; 
            this.addChild(colId);
        }
    }
    this.addChild(this.frame);
    this.mapContainer = new createjs.Container();
    var maskShape = new createjs.Shape();
    maskShape.graphics.drawRect(0, 0, tileWidth * cols, tileHeight * rows);
    this.mapContainer.mask = maskShape;
    this.addChild(this.mapContainer);
    this.drawWhiteRoad(horizontalMapConf, verticalMapConf);
    var scale = bitmapAll.clone();
    rect = bitmapAreas["pizzaMap-scale"];
    scale.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
    scale.scaleX = tileWidth / scale.getBounds().width;
    scale.x = 0;
    scale.y = this.height + 10;
    this.addChild(scale);
    var scaleText = new createjs.Text(unitDistance + "米", "20px Arial", "#6e6ed4");
    scaleText.x = scale.x + tileWidth / 2;
    scaleText.y = scale.y + 10;
    scaleText.regX = scaleText.getMeasuredWidth() / 2;
    this.addChild(scaleText);

    starter = new Starter(startConf);
    this.addChild(starter);
    
    //if (board.circuits.length > 0) {
    //    pizzaMap.regX = board.circuits[0].pizzaMap.image.width / 2; 
    //    pizzaMap.regY = board.circuits[0].pizzaMap.image.height / 2;
    //}
    this.targets = [];
    for (var idx = 0; idx < targetConf.length; idx++) {
        var target = new Target(targetConf[idx]);
        if (target.right) myTarget = target; 
        this.addChild(target);
        this.targets.push(target);
    }
}
Board.prototype.drawWhiteRoad = function(horizontalMapConf, verticalMapConf) {
    for (var rowIdx = 0; rowIdx <= rows; rowIdx++) {
        this.horizontalMap.push([]);
        for (var colIdx = 0; colIdx < cols; colIdx++) {
            this.horizontalMap[rowIdx].push(horizontalMapConf[rowIdx][colIdx]); 
            if (horizontalMapConf[rowIdx][colIdx] == 1) {
                var crossImgConf = getCrossImgName(rowIdx, colIdx);
                var road0 = bitmapAll.clone(); 
                rect = bitmapAreas[crossImgConf[0]];
                road0.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
                road0.regX = road0.getBounds().width / 2;
                road0.regY = road0.getBounds().height / 2;
                road0.rotation = crossImgConf[1];
                road0.x = tileWidth * colIdx;
                road0.y = tileHeight * rowIdx;
                this.mapContainer.addChild(road0);
                var road1 = bitmapAll.clone(); 
                rect = bitmapAreas["pizzaMap-white-road"];
                road1.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
                road1.regX = road1.getBounds().width / 2; 
                road1.scaleY = (tileHeight - 23) / road1.getBounds().height;
                road1.rotation = -90;
                //road.scaleX = tileWidth / road.getBounds().width;
                //road.scaleY = road.scaleX; 
                road1.x = tileWidth * colIdx + 11;
                road1.y = tileHeight * rowIdx;
                this.mapContainer.addChild(road1);
                var road2 = bitmapAll.clone(); 
                crossImgConf = getCrossImgName(rowIdx, colIdx+1);
                rect = bitmapAreas[crossImgConf[0]];
                road2.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
                road2.regX = road2.getBounds().width / 2;
                road2.regY = road2.getBounds().height / 2;
                road2.rotation = crossImgConf[1];
                road2.x = tileWidth * colIdx + tileWidth - 1;
                road2.y = tileHeight * rowIdx;
                this.mapContainer.addChild(road2);
            }
        }
    }
    for (var rowIdx = 0; rowIdx < rows; rowIdx++) {
        this.verticalMap.push([]);
        for (var colIdx = 0; colIdx <= cols; colIdx++) {
            this.verticalMap[rowIdx].push(verticalMapConf[rowIdx][colIdx]);
            if (verticalMapConf[rowIdx][colIdx] == 1) {
                var crossImgConf = getCrossImgName(rowIdx, colIdx);
                var road0 = bitmapAll.clone(); 
                rect = bitmapAreas[crossImgConf[0]];
                road0.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
                road0.regX = road0.getBounds().width / 2;
                road0.regY = road0.getBounds().height / 2;
                road0.rotation = crossImgConf[1];
                road0.x = tileWidth * colIdx;
                road0.y = tileHeight * rowIdx;
                this.mapContainer.addChild(road0);
                var road1 = bitmapAll.clone(); 
                rect = bitmapAreas["pizzaMap-white-road"];
                road1.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
                road1.regX = road1.getBounds().width / 2; 
                road1.scaleY = (tileHeight - 23) / road1.getBounds().height;
                road1.rotation = 0;
                //road.scaleX = tileWidth / road.getBounds().width;
                //road.scaleY = road.scaleX; 
                road1.x = tileWidth * colIdx;
                road1.y = tileHeight * rowIdx + 11;
                this.mapContainer.addChild(road1);
                crossImgConf = getCrossImgName(rowIdx+1, colIdx);
                var road2 = bitmapAll.clone(); 
                rect = bitmapAreas[crossImgConf[0]];
                road2.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
                road2.regX = road2.getBounds().width / 2;
                road2.regY = road2.getBounds().height / 2;
                road2.rotation = crossImgConf[1];
                road2.x = tileWidth * colIdx;
                road2.y = tileHeight * rowIdx + tileHeight - 1;
                this.mapContainer.addChild(road2);
            }
        }
    }

    function getCrossImgName(rowIdx, colIdx) {
        var name, rotation;
        var roadDirections = [];
        if (rowIdx > 0 && verticalMapConf[rowIdx-1][colIdx] == 1) {
            roadDirections.push(-2);
        }
        if (rowIdx < rows && verticalMapConf[rowIdx][colIdx] == 1) {
            roadDirections.push(2);
        }
        if (colIdx > 0 && horizontalMapConf[rowIdx][colIdx-1] == 1) {
            roadDirections.push(-1);
        }
        if (colIdx < cols && horizontalMapConf[rowIdx][colIdx] == 1) {
            roadDirections.push(1);
        }
        switch (roadDirections.length) {
            case 1:
                name = "pizzaMap-white-cross-3";
                if (roadDirections[0] == 1) {
                    rotation = 90; 
                } else if (roadDirections[0] == -1) {
                    rotation = -90; 
                } else if (roadDirections[0] == 2) {
                    rotation = 180; 
                } else if (roadDirections[0] == -2) {
                    rotation = 0; 
                }
                break;
            case 2:
                if (Math.abs(roadDirections[0]) != Math.abs(roadDirections[1])) { // 两路相连
                    name = "pizzaMap-white-cross-2-1";
                    if (roadDirections[0] * roadDirections[1] == 2) {
                        if (roadDirections.indexOf(1) == -1) {
                            // -1 && -2
                            rotation = 180; 
                        } else {
                            // 1 && 2
                            rotation = 0; 
                        }
                    } else {
                        if (roadDirections.indexOf(1) == -1) {
                            // -1 && 2
                            rotation = 90; 
                        } else {
                            // 1 && -2
                            rotation = -90; 
                        }
                    }
                } else { // 两路相对
                    name = "pizzaMap-white-cross-2-2";
                    if (Math.abs(roadDirections[0]) == 1) {
                        // 1 && -1
                        rotation = 90; 
                    } else { 
                        // 2 && -2
                        rotation = 0; 
                    }
                }
                break;
            case 3:
                name = "pizzaMap-white-cross-1";
                if (roadDirections.indexOf(1) == -1) {
                    rotation = -90; 
                } else if (roadDirections.indexOf(2) == -1) {
                    rotation = 0; 
                } else if (roadDirections.indexOf(-1) == -1) {
                    rotation = 90; 
                } else if (roadDirections.indexOf(-2) == -1) {
                    rotation = 180; 
                }
                break;
            case 4:
                name = "pizzaMap-white-cross";
                rotation = 0;
                break;
        }
        return [name, rotation];
    }
}
Board.prototype.drawBlackRoad = function() {
    if (this.blackContainer) {
        return;
    }
    this.blackContainer = new createjs.Container();
    this.blackContainer.x = 50;
    this.blackContainer.y = 55;

    for (var itemIdx = 0; itemIdx < this.items.length; itemIdx++) {
        var item = bitmapAll.clone(); 
        var rect = bitmapAreas[this.items[itemIdx].blackName];
        item.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
        item.x = this.items[itemIdx].x;
        item.y = this.items[itemIdx].y;
        item.regX = item.getBounds().width / 2;
        item.regY = item.getBounds().height / 2;
        item.rotation = this.items[itemIdx].rotation;
        this.blackContainer.addChild(item);
    }

    for (var rowIdx = 0; rowIdx <= rows; rowIdx++) {
        for (var colIdx = 0; colIdx < cols; colIdx++) {
            if (this.horizontalMap[rowIdx][colIdx] == 1) {
                var road0 = bitmapAll.clone(); 
                rect = bitmapAreas["pizzaMap-black-cross"];
                road0.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
                road0.regY = road0.getBounds().height / 2;
                road0.rotation = 0;
                road0.x = tileWidth * colIdx - 13;
                road0.y = tileHeight * rowIdx;
                this.blackContainer.addChild(road0);
                var road1 = bitmapAll.clone(); 
                rect = bitmapAreas["pizzaMap-black-road"];
                road1.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
                road1.regX = road1.getBounds().width / 2; 
                road1.scaleY = (tileHeight - 20) / road1.getBounds().height;
                road1.rotation = -90;
                //road.scaleX = tileWidth / road.getBounds().width;
                //road.scaleY = road.scaleX; 
                road1.x = tileWidth * colIdx + 11;
                road1.y = tileHeight * rowIdx;
                this.blackContainer.addChild(road1);
                var road2 = bitmapAll.clone(); 
                rect = bitmapAreas["pizzaMap-black-cross"];
                road2.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
                road2.regY = road2.getBounds().height / 2;
                road2.rotation = 0;
                road2.x = tileWidth * colIdx + (tileWidth - 13);
                road2.y = tileHeight * rowIdx;
                this.blackContainer.addChild(road2);
            }
        }
    }
    for (var rowIdx = 0; rowIdx < rows; rowIdx++) {
        for (var colIdx = 0; colIdx <= cols; colIdx++) {
            if (this.verticalMap[rowIdx][colIdx] == 1) {
                var road0 = bitmapAll.clone(); 
                rect = bitmapAreas["pizzaMap-black-cross"];
                road0.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
                road0.regX = road0.getBounds().width / 2;
                road0.rotation = 0;
                road0.x = tileWidth * colIdx;
                road0.y = tileHeight * rowIdx - 13;
                this.blackContainer.addChild(road0);
                var road1 = bitmapAll.clone(); 
                rect = bitmapAreas["pizzaMap-black-road"];
                road1.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
                road1.regX = road1.getBounds().width / 2; 
                road1.scaleY = (tileHeight - 20) / road1.getBounds().height;
                road1.rotation = 0;
                //road.scaleX = tileWidth / road.getBounds().width;
                //road.scaleY = road.scaleX; 
                road1.x = tileWidth * colIdx;
                road1.y = tileHeight * rowIdx + 11;
                this.blackContainer.addChild(road1);
                var road2 = bitmapAll.clone(); 
                rect = bitmapAreas["pizzaMap-black-cross"];
                road2.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
                road2.regX = road2.getBounds().width / 2;
                road2.rotation = 0;
                road2.x = tileWidth * colIdx;
                road2.y = tileHeight * rowIdx + (tileHeight - 13);
                this.blackContainer.addChild(road2);
            }
        }
    }
    for (var targetIdx = 0; targetIdx < this.targets.length; targetIdx++) {
        var blackTarget = this.targets[targetIdx].showBlackTarget();
        this.blackContainer.addChild(blackTarget);
    }

    var blackStarter = starter.showBlackStarter();
    this.blackContainer.addChild(blackStarter);
    pizzarian = new Pizzarian();
    this.blackContainer.addChild(pizzarian);
}

    window.Target = Target;
    window.Pizzarian = Pizzarian;
    window.Starter = Starter;
    window.Plan = Plan;
    window.Printer = Printer;
    window.Board = Board;
}(window));

function celebrate() {
    passContainer = new createjs.Container();
    passContainer.bg = new createjs.Shape();
    passContainer.bg.graphics.beginFill("grey").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
    passContainer.addChild(passContainer.bg);
    var light = new createjs.Bitmap(images["pizzaMap-light"]);
    light.regX = light.getBounds().width / 2;
    light.regY = light.getBounds().height / 2;
    light.x = stage.canvas.width / 2;
    light.y = stage.canvas.height / 2;
    passContainer.addChild(light);
    createjs.Tween.get(light, {"loop": true})
            .to({"rotation": 360}, 3000);
    var pizza = new createjs.Bitmap(images["pizzaMap-pizza"]);
    pizza.regX = pizza.getBounds().width / 2;
    pizza.regY = pizza.getBounds().height / 2;
    pizza.x = stage.canvas.width / 2;
    pizza.y = stage.canvas.height / 2;
    passContainer.addChild(pizza);
    var star = new createjs.Sprite(spritesheets["pizzaMap-star"]);
    star.gotoAndPlay("play");
    star.regX = star.getBounds().width / 2;
    star.regY = star.getBounds().height / 2;
    star.x = stage.canvas.width / 2 - 100;
    star.y = stage.canvas.height / 2 - 50;
    passContainer.addChild(star);
    stage.addChild(passContainer);
    if (currentLevel < gameAllConfig["levels"].length - 1) {
        setTimeout(function() {
            passContainer.removeAllChildren();
            passContainer.parent.removeChild(passContainer);
            next_level();
        }, 3000);
    }
}

function planSelect(evt) {
    var target = evt.currentTarget;
}

function planClicked(evt) {
    var target = evt.currentTarget;
    printer.addPlan(target);
}

function cancelPlan(evt) {
    printer.cancelPlan();
}

function game_pizzaMap() {
    currentLevel = 0;
    realMap = null;
    bitmapAll = new createjs.Bitmap(images["pizzaMap-all"]);
    var levels = gameAllConfig["levels"];
    rows = levels[currentLevel]["row"];
    cols = levels[currentLevel]["col"];
    unitDistance = levels[currentLevel]["unitDistance"];
    background = new createjs.Bitmap(images["pizzaMap-background1"]);
    stage.addChild(background);
    board = new Board(); 
    board.init(levels[currentLevel]["horizontalMap"], levels[currentLevel]["verticalMap"], levels[currentLevel]["start"], levels[currentLevel]["targets"]);
    board.x = 50; 
    board.y = (stage.canvas.height - board.height) / 2 - 60; 
    stage.addChild(board);
    printer = new Printer(700, 50);
    stage.addChild(printer);
    choicePanel = new createjs.Container();
    var panelWidth = stage.canvas.width, panelHeight = 150;
    var panelBackground = new createjs.Shape();  
    panelBackground.graphics.beginFill("#fffbd9").drawRoundRect(0, 0, panelWidth, panelHeight, 5);
    choicePanel.addChild(panelBackground);
    var choiceConf = levels[currentLevel]["choices"]; 
    var plans = [];
    var y = 20;
    var totalWidth = 0;
    for (var idx = 0; idx < choiceConf.length; idx++) {
        var plan = new Plan(choiceConf[idx]);
        plan.y = y;
        choicePanel.addChild(plan);
        plan.on("click", planClicked);
        plans.push(plan);
        totalWidth += plan.width;
    }

    totalWidth += 250;

    var delta = (panelWidth - totalWidth) / (plans.length + 2);
    var xOffset = delta / 2;
    for (var idx = 0; idx < plans.length; idx++) {
        plans[idx].x = xOffset; 
        xOffset += plan.width + delta;
    }

    var start = bitmapAll.clone(); 
    var rect = bitmapAreas["pizzaMap-ok-button"];
    start.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
    var cancel = bitmapAll.clone(); 
    rect = bitmapAreas["pizzaMap-cancel-button"];
    cancel.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
    start.x = xOffset; start.y = y;
    cancel.x = xOffset + start.getBounds().width + delta; cancel.y = y;
    cancel.on("click", cancelPlan);
    choicePanel.addChild(start);
    choicePanel.addChild(cancel);
    start.addEventListener("click", function() { 
        var idx = stage.getChildIndex(choicePanel);
        marks = [];
        if (!realMap) {
            realMap = new createjs.Container();
            realMap.background = new createjs.Bitmap(images["pizzaMap-background2"]);
            realMap.masking = new createjs.Bitmap(images["pizzaMap-mask"]) 
            realMap.addChild(realMap.background, realMap.masking);
            board.drawBlackRoad();
            realMap.addChild(board.blackContainer);
            printer.paper.origX = printer.paper.x;
            printer.paper.origY = printer.paper.y;
            printer.paper.x = 700;
            printer.paper.y = 50;
            realMap.addChild(printer.paper);
            stage.addChild(realMap);
            pizzarian.go();
        } else {
            realMap.alpha = 1;
            stage.addChild(realMap);
            printer.paper.origX = printer.paper.x;
            printer.paper.origY = printer.paper.y;
            printer.paper.x = 700;
            printer.paper.y = 50;
            realMap.addChild(printer.paper);
            pizzarian.go();
        }
    });
    choicePanel.x = (stage.canvas.width - panelWidth) / 2;
    choicePanel.y = board.y + board.height + 60;
    stage.addChild(choicePanel);
}

function next_level() {
    currentLevel++;
    stage.removeAllChildren();
    var levels = gameAllConfig["levels"];
    rows = levels[currentLevel]["row"];
    cols = levels[currentLevel]["col"];
    unitDistance = levels[currentLevel]["unitDistance"];
    background = new createjs.Bitmap(images["pizzaMap-background1"]);
    stage.addChild(background);
    board = new Board(); 
    board.init(levels[currentLevel]["horizontalMap"], levels[currentLevel]["verticalMap"], levels[currentLevel]["start"], levels[currentLevel]["targets"]);
    board.x = 50; 
    board.y = (stage.canvas.height - board.height) / 2 - 60; 
    stage.addChild(board);
    printer = new Printer(700, 50);
    stage.addChild(printer);
    choicePanel = new createjs.Container();
    var panelWidth = stage.canvas.width, panelHeight = 150;
    var panelBackground = new createjs.Shape();  
    panelBackground.graphics.beginFill("#fffbd9").drawRoundRect(0, 0, panelWidth, panelHeight, 5);
    choicePanel.addChild(panelBackground);
    var choiceConf = levels[currentLevel]["choices"]; 
    var plans = [];
    var y = 20;
    var totalWidth = 0;
    for (var idx = 0; idx < choiceConf.length; idx++) {
        var plan = new Plan(choiceConf[idx]);
        plan.y = y;
        choicePanel.addChild(plan);
        plan.on("click", planClicked);
        plans.push(plan);
        totalWidth += plan.width;
    }

    totalWidth += 250;

    var delta = (panelWidth - totalWidth) / (plans.length + 2);
    var xOffset = delta / 2;
    for (var idx = 0; idx < plans.length; idx++) {
        plans[idx].x = xOffset; 
        xOffset += plan.width + delta;
    }

    var start = bitmapAll.clone(); 
    var rect = bitmapAreas["pizzaMap-ok-button"];
    start.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
    var cancel = bitmapAll.clone(); 
    rect = bitmapAreas["pizzaMap-cancel-button"];
    cancel.sourceRect = new createjs.Rectangle(rect[0], rect[1], rect[2], rect[3]);
    start.x = xOffset; start.y = y;
    cancel.x = xOffset + start.getBounds().width + delta; cancel.y = y;
    cancel.on("click", cancelPlan);
    choicePanel.addChild(start);
    choicePanel.addChild(cancel);
    start.addEventListener("click", function() { 
        var idx = stage.getChildIndex(choicePanel);
        marks = [];
        if (!realMap) {
            realMap = new createjs.Container();
            realMap.background = new createjs.Bitmap(images["pizzaMap-background2"]);
            realMap.masking = new createjs.Bitmap(images["pizzaMap-mask"]) 
            realMap.addChild(realMap.background, realMap.masking);
            board.drawBlackRoad();
            realMap.addChild(board.blackContainer);
            printer.paper.origX = printer.paper.x;
            printer.paper.origY = printer.paper.y;
            printer.paper.x = 700;
            printer.paper.y = 50;
            realMap.addChild(printer.paper);
            stage.addChild(realMap);
            pizzarian.go();
        } else {
            realMap.alpha = 1;
            stage.addChild(realMap);
            printer.paper.origX = printer.paper.x;
            printer.paper.origY = printer.paper.y;
            printer.paper.x = 700;
            printer.paper.y = 50;
            realMap.addChild(printer.paper);
            pizzarian.go();
        }
    });
    choicePanel.x = (stage.canvas.width - panelWidth) / 2;
    choicePanel.y = board.y + board.height + 60;
    stage.addChild(choicePanel);
}
