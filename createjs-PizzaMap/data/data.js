var spritesheets = new Array();
var gameAllConfig = {
  "name": "pizzaMap",
  "sndBgSrc": "snake_bg.mp3",
  "effectSoundsFile": "snake_game_effect.mp3",
  "effectData": [
    {'duration': 1150, 'id': 'broken', 'startTime': 0},
    {'duration': 4076, 'id': 'countDown', 'startTime': 1650},
    {'duration': 4703, 'id': 'gameover', 'startTime': 6226},
    {'duration': 575, 'id': 'snake_die', 'startTime': 11429},
    {'duration': 392, 'id': 'snake_eat', 'startTime': 12504},
    {'duration': 523, 'id': 'snake_graphical', 'startTime': 13396},
    {'duration': 601, 'id': 'snake_hit', 'startTime': 14419},
    {'duration': 2613, 'id': 'snake_yun', 'startTime': 15520}
  ],
  "loadMainFest": [
    {id: "load-door", src: "img/door.png"},
    {id: "replay-btn", src: "img/btn_replay.png"},
    {id: "home-btn", src: "img/btn_home.png"},
    {id: "snd-btn", src: "img/btn_snd.png"},
    {id: "nosnd-btn", src: "img/btn_nosnd.png"},
    {id: "replay-click", src: "img/replay_click.png"},
    {id: "home-click", src: "img/home_click.png"},
    {id: "pop", src: "img/pop.png"},
    {id: "sure", src: "img/sure.png"},
    {id: "cancel", src: "img/cancel.png"},

    {src:"img/countDown.png",id:"countDown"},
    {src:"img/target.png",id:"target"},

    {src:"img/end/counting.png",id:"counting"},
    {src:"img/end/end_home.png",id:"end-home"},
    {src:"img/end/end_replay.png",id:"end-replay"},
    {src:"img/end/light.png",id:"light"},
    {src:"img/end/template.png",id:"template"},
    {src:"img/end/shensu.png",id:"shensu"},
    {src:"img/end/shoukuai.png",id:"shoukuai"},
    {src:"img/end/xietiao.png",id:"xietiao"},
    {src:"img/end/endFish1.png",id:"endfish-Boss0"},
    {src:"img/end/endFish2.png",id:"endfish-Boss1"},
    {src:"img/end/endfishmain.png",id:"endfish-main"}
  ],
  "loadSprite": function () {
    spritesheets["load-door"] = new createjs.SpriteSheet({
      "images": [load_preload.getResult("load-door")],
      "frames": [
        [1, 1, 1016, 632, 0, 0, 0],
        [1019, 1, 1016, 632, 0, 0, 0],
        [2037, 1, 1016, 632, 0, 0, 0],
        [3055, 1, 1016, 632, 0, 0, 0],
        [4073, 1, 1016, 632, 0, 0, 0],
        [5091, 1, 1016, 632, 0, 0, 0],
        [6109, 1, 1016, 632, 0, 0, 0],
        [7127, 1, 1016, 632, 0, 0, 0],
        [1, 635, 1016, 632, 0, 0, 0],
        [1019, 635, 1016, 632, 0, 0, 0],
        [2037, 635, 1016, 632, 0, 0, 0],
        [3055, 635, 1016, 632, 0, 0, 0],
        [4073, 635, 1016, 632, 0, 0, 0],
        [5091, 635, 1016, 632, 0, 0, 0],
        [6109, 635, 1016, 632, 0, 0, 0],
        [7127, 635, 1016, 632, 0, 0, 0],
        [1, 1269, 1016, 632, 0, 0, 0],
        [1019, 1269, 1016, 632, 0, 0, 0],
        [2037, 1269, 1016, 632, 0, 0, 0],
        [3055, 1269, 1016, 632, 0, 0, 0],
        [4073, 1269, 1016, 632, 0, 0, 0],
        [5091, 1269, 1016, 632, 0, 0, 0],
        [6109, 1269, 1016, 632, 0, 0, 0],
        [7127, 1269, 1016, 632, 0, 0, 0],
        [1, 1903, 1016, 632, 0, 0, 0],
        [1019, 1903, 1016, 632, 0, 0, 0],
        [2037, 1903, 1016, 632, 0, 0, 0],
        [3055, 1903, 1016, 632, 0, 0, 0],
        [4073, 1903, 1016, 632, 0, 0, 0],
        [5091, 1903, 1016, 632, 0, 0, 0],
        [6109, 1903, 1016, 632, 0, 0, 0],
        [7127, 1903, 1016, 632, 0, 0, 0],
        [1, 2537, 1016, 632, 0, 0, 0],
        [1019, 2537, 1016, 632, 0, 0, 0],
        [2037, 2537, 1016, 632, 0, 0, 0],
        [3055, 2537, 1016, 632, 0, 0, 0],
        [4073, 2537, 1016, 632, 0, 0, 0],
        [5091, 2537, 1020, 632, 0, 0, 0]
      ],
      'animations': {
        'play': {
          'frames': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
          next: false
        }
      },
    });
  },
  "pizzaMap_mainfest": [
    {src:"img/new/bg.jpg",id:"pizzaMap-background2"},
    {src:"img/new/bg02.jpg",id:"pizzaMap-background1"},
    {src:"img/new/mengban.png",id:"pizzaMap-mask"},
    {src:"img/new/songpisa.png",id:"pizzaMap-all"},
    {src:"img/start.png",id:"start"},
    {src:"img/ship.png",id:"ship"},
    {src:"img/boom.png",id:"boom"},
    {src:"img/withdraw.png",id:"cancel"},
    {src:"img/tile.png",id:"floor"},
    {src:"img/road.png",id:"road"},
    {src:"img/printer.png",id:"printer"},
    {src:"img/paper.png",id:"paper"},
    {src:"img/bai-zuo.png",id:"white-left"},
    {src:"img/bai-you.png",id:"white-right"},
    {src:"img/bai-shang.png",id:"white-forward"},
    {src:"img/lan-zuo.png",id:"blue-left"},
    {src:"img/lan-you.png",id:"blue-right"},
    {src:"img/lan-shang.png",id:"blue-forward"},
    {src:"img/target.png",id:"target"},
    {src:"img/result/faguang.png",id:"pizzaMap-light"},
    {src:"img/result/pisa.png",id:"pizzaMap-pizza"},
    {src:"img/result/xingxingfaguang.png",id:"pizzaMap-star"}
  ],
  "pizzaMap_spritesheets": function () {
    spritesheets["pizzaMap-star"] = new createjs.SpriteSheet({
      "images": [images["pizzaMap-star"]],
      "frames": [
        [2, 2, 278, 338],
        [282, 2, 278, 338],
        [562, 2, 278, 338],
        [2, 342, 278, 338],
        [282, 342, 278, 338],
        [562, 342, 278, 338],
        [2, 682, 278, 338],
        [282, 682, 278, 338]
      ],
      "animations": {
        "play": { "frames": [0, 1, 2, 3, 4, 5, 6, 7] },
      }
    });
  },
  "levels": [{
    "row": 4,
    "col": 5,
    "unitDistance": 50,
    "horizontalMap": [ 
        [0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1],
        [1, 1, 1, 0, 1],
        [1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    "verticalMap": [ 
        [0, 1, 1, 0, 1, 0],
        [0, 1, 0, 1, 1, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 1, 1, 0, 0, 0]
    ],
    "choices": [
        {"id": "left", "rotation": -90, "distance": 0, "text": "左转"},
        {"id": "right", "rotation": 90, "distance": 0, "text": "右转"},
        {"id": "forward", "rotation": 0, "distance": 25, "text": "向前25米"},
        {"id": "forward", "rotation": 0, "distance": 50, "text": "向前50米"},
        {"id": "forward", "rotation": 0, "distance": 100, "text": "向前100米"}
    ],
    "start": {"row": 1, "col": 1, "direction": 1},
    "targets": [
        {"row": 1, "col": 4, "right": false, "direction": 2},
        {"row": 3, "col": 2, "right": true, "direction": -2},
        {"row": 2, "col": 1, "right": false, "direction": -1}
    ]
    }, {
    "row": 4,
    "col": 5,
    "unitDistance": 50,
    "horizontalMap": [ 
        [0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1],
        [1, 1, 1, 0, 1],
        [1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    "verticalMap": [ 
        [0, 1, 1, 0, 1, 0],
        [0, 1, 0, 1, 1, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 1, 1, 0, 0, 0]
    ],
    "choices": [
        {"id": "left", "rotation": -90, "distance": 0, "text": "左转"},
        {"id": "right", "rotation": 90, "distance": 0, "text": "右转"},
        {"id": "forward", "rotation": 0, "distance": 25, "text": "向前25米"},
        {"id": "forward", "rotation": 0, "distance": 50, "text": "向前50米"},
        {"id": "forward", "rotation": 0, "distance": 100, "text": "向前100米"}
    ],
    "start": {"row": 1, "col": 1, "direction": 1},
    "targets": [
        {"row": 1, "col": 4, "right": true, "direction": 2},
        {"row": 3, "col": 2, "right": false, "direction": -2},
        {"row": 2, "col": 1, "right": false, "direction": -1}
    ]
  }]
}
