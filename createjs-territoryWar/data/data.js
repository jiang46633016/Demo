var spritesheets = new Array();
var gameAllConfig = {
  "name": "territoryWar",
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
  "loadManiFest": [
    {id: "dodo-loading", src: "img/dodo-loading.png"},
    {id: "replay-btn", src: "img/btn_replay.png"},
    {id: "home-btn", src: "img/btn_home.png"},
    {id: "snd-btn", src: "img/btn_snd.png"},
    {id: "nosnd-btn", src: "img/btn_nosnd.png"},
    {id: "pop", src: "img/pop.png"},
    {id: "sure", src: "img/sure.png"},
    {id: "cancel", src: "img/cancel.png"}
  ],
  "loadSprite": function () {
    spritesheets["game-load"] = new createjs.SpriteSheet({
      "images": [load_preload.images["dodo-loading"]],
      "frames": [
        [1, 1, 400, 360, 0, 0, 0],
        [403, 1, 400, 360, 0, 0, 0],
        [805, 1, 400, 360, 0, 0, 0],
        [1207, 1, 400, 360, 0, 0, 0],
        [1609, 1, 400, 360, 0, 0, 0],
        [2011, 1, 400, 360, 0, 0, 0],
        [2413, 1, 400, 360, 0, 0, 0],
        [2815, 1, 400, 360, 0, 0, 0],
        [3217, 1, 400, 360, 0, 0, 0],
        [3619, 1, 400, 360, 0, 0, 0],
        [4021, 1, 400, 360, 0, 0, 0],
        [4423, 1, 400, 360, 0, 0, 0],
        [4825, 1, 400, 360, 0, 0, 0]
      ],
      "animations": {
        "play": {"frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
      },
    });
  },
  "rewardPosition": [
    [644, 45],//milk
    [538, 45],//juice
    [435, 45],//mineral
    [456, 125],//end_home
    [622, 125]//end_replay
  ],
  "territoryWar_manifest": [
    {src: "img/door.png", id: "load-door"},
    {src: "img/bg.png", id: "bg"},
    {src: "img/enemy1.png", id: "enemy1"},
    {src: "img/enemy50.png", id: "enemy50"},
    {src: "img/level0.png", id: "level0"},
    {src: "img/level1.png", id: "level1"},
    {src: "img/level2.png", id: "level2"},
    {src: "img/level3.png", id: "level3"},
    {src: "img/level4.png", id: "level4"},
    {src: "img/soldierNumBg.png", id: "soldierNumBg"},
    {src: "img/small-pink-house.png", id: "own1"},
    {src: "img/big-pink-house.png", id: "own50"},
    {src: "img/ownTower.png", id: "ownTower"},
    {src: "img/enemyTower.png", id: "enemyTower"},
    {src: "img/publicTower.png", id: "publicTower"},
    {src: "img/bomb.png", id: "bomb"},
    {src: "img/octopus.png", id: "own"},
    {src: "img/starfish-walk.png", id: "enemy"},
    {src: "img/gray-turtle.png", id: "publicTurtle"},
    {src: "img/pink-turtle.png", id: "ownTurtle"},
    {src: "img/yellow-turtle.png", id: "enemyTurtle"},
    {src: "img/smoke.png", id: "smoke"},
    {src: "img/tornado.png", id: "tornado"},
    {src: "img/yellow-flag.png", id: "yellowFlag"},
    {src: "img/star-top.png", id: "starFlag"},
    {src: "img/arrow.png", id: "arrow"},
    {src: "img/fire.png", id: "fire"},
    {src: "img/ball.png", id: "ball"},
    {src: "img/bar.png", id: "bar"},
    {src: "img/barBg.png", id: "barBg"},
    {src: "img/win.png", id: "win"},
    {src: "img/lose.png", id: "lose"},
    {src: "img/hand.png", id: "hand"},

    {src: "img/end/end_home.png", id: "end_home"},
    {src: "img/end/end_replay.png", id: "end_replay"},
    {src: "img/end/template.png", id: "template"},
    {src: "img/end/star.png", id: "end_star"}
  ],
  "content": [
    {
      background: "level0",
      bases: [{
        type: "own1",
        x: 367,
        y: 285,
        count: 20,
        paths: [1]
      }, {
        type: "enemy1",
        x: 640,
        y: 285,
        count: 20,
        paths: [0]
      }]
    },
    {
      background: "level1",
      bases: [{
        type: "own1",
        x: 142,
        y: 285,
        count: 20,
        paths: [1, 3]
      }, {
        type: "own1",
        x: 395,
        y: 83,
        count: 15,
        paths: [0, 2, 5]
      }, {
        type: "publicTurtle",
        x: 476,
        y: 277,
        count: 11,
        paths: [1, 3]
      }, {
        type: "publicTurtle",
        x: 354,
        y: 515,
        count: 10,
        paths: [0, 2, 7]
      }, {
        type: "publicTurtle",
        x: 653,
        y: 284,
        count: 12,
        paths: [5, 7]
      }, {
        type: "publicTurtle",
        x: 780,
        y: 142,
        count: 11,
        paths: [1, 4, 6]
      }, {
        type: "enemy1",
        x: 875,
        y: 290,
        count: 40,
        paths: [5, 7]
      }, {
        type: "publicTurtle",
        x: 805,
        y: 488,
        count: 10,
        paths: [3, 4, 6]
      }]
    },
    {
      background: "level2",
      bases: [{
        type: "own1",
        x: 182,
        y: 285,
        count: 27,
        paths: [1, 3]
      }, {
        type: "own1",
        x: 295,
        y: 93,
        count: 30,
        paths: [0, 2]
      }, {
        type: "publicTower",
        x: 368,
        y: 298,
        count: 14,
        paths: [1, 3, 5]
      }, {
        type: "publicTurtle",
        x: 275,
        y: 495,
        count: 10,
        paths: [0, 2, 4]
      }, {
        type: "publicTower",
        x: 506,
        y: 512,
        count: 13,
        paths: [3, 8]
      }, {
        type: "publicTower",
        x: 627,
        y: 298,
        count: 12,
        paths: [2, 6, 8]
      }, {
        type: "publicTurtle",
        x: 700,
        y: 103,
        count: 11,
        paths: [5, 7]
      }, {
        type: "enemy1",
        x: 835,
        y: 280,
        count: 41,
        paths: [6, 8]
      }, {
        type: "publicTurtle",
        x: 725,
        y: 488,
        count: 12,
        paths: [4, 5, 7]
      }]
    },
    {
      background: "level3",
      bases: [{
        type: "own1",
        x: 172,
        y: 270,
        count: 21,
        paths: [1, 7, 8]
      }, {
        type: "publicTurtle",
        x: 310,
        y: 90,
        count: 21,
        paths: [0, 2, 8]
      }, {
        type: "publicTower",
        x: 506,
        y: 111,
        count: 12,
        paths: [1, 3]
      }, {
        type: "publicTurtle",
        x: 683,
        y: 100,
        count: 10,
        paths: [2, 4, 8]
      }, {
        type: "enemy1",
        x: 845,
        y: 280,
        count: 30,
        paths: [3, 5, 8]
      }, {
        type: "publicTurtle",
        x: 705,
        y: 498,
        count: 12,
        paths: [4, 6, 8]
      }, {
        type: "publicTower",
        x: 500,
        y: 522,
        count: 10,
        paths: [5, 7, 8]
      }, {
        type: "publicTurtle",
        x: 283,
        y: 495,
        count: 12,
        paths: [0, 6, 8]
      }, {
        type: "publicTower",
        x: 498,
        y: 300,
        count: 12,
        paths: [0, 1, 3, 4, 5, 7]
      }]
    },
  ],
  "territoryWar_spritesheets": function () {
    spritesheets["load-door"] = new createjs.SpriteSheet({
      "images": [images["load-door"]],
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
    spritesheets["own1"] = new createjs.SpriteSheet({
      "images": [images["own1"]],
      "frames": [
        [1, 1, 89, 113, 0, 0, 0],
        [92, 1, 89, 113, 0, 0, 0],
        [183, 1, 89, 113, 0, 0, 0],
        [274, 1, 89, 113, 0, 0, 0],
        [365, 1, 89, 113, 0, 0, 0],
        [456, 1, 89, 113, 0, 0, 0],
        [547, 1, 89, 113, 0, 0, 0],
        [638, 1, 89, 113, 0, 0, 0]
      ],
      'animations': {
        'play': {
          'frames': [0, 1, 2, 3, 4, 5, 6, 7],
          next: false
        }
      },
    });
    spritesheets["own50"] = new createjs.SpriteSheet({
      "images": [images["own50"]],
      "frames": [
        [1, 1, 184, 184, 0, 0, 0],
        [187, 1, 184, 184, 0, 0, 0],
        [373, 1, 184, 184, 0, 0, 0],
        [559, 1, 184, 184, 0, 0, 0],
        [745, 1, 184, 184, 0, 0, 0],
        [931, 1, 184, 184, 0, 0, 0],
        [1117, 1, 184, 184, 0, 0, 0],
        [1303, 1, 184, 184, 0, 0, 0],
        [1489, 1, 184, 184, 0, 0, 0],
        [1675, 1, 184, 184, 0, 0, 0]
      ],
      'animations': {
        'play': {
          'frames': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          next: false
        }
      },
    });
    spritesheets["publicTurtle"] = new createjs.SpriteSheet({
      "images": [images["publicTurtle"]],
      "frames": [
        [1, 1, 116, 68, 0, 0, 0],
        [119, 1, 116, 68, 0, 0, 0],
        [237, 1, 116, 68, 0, 0, 0],
        [355, 1, 116, 68, 0, 0, 0],
        [473, 1, 116, 68, 0, 0, 0],
        [591, 1, 116, 68, 0, 0, 0],
        [709, 1, 116, 68, 0, 0, 0],
        [827, 1, 116, 68, 0, 0, 0],
        [945, 1, 116, 68, 0, 0, 0],
        [1063, 1, 116, 68, 0, 0, 0]
      ],
      'animations': {
        'play': {
          'frames': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          next: false
        }
      },
    });
    spritesheets["ownTurtle"] = new createjs.SpriteSheet({
      "images": [images["ownTurtle"]],
      "frames": [
        [1, 1, 116, 68, 0, 0, 0],
        [119, 1, 116, 68, 0, 0, 0],
        [237, 1, 116, 68, 0, 0, 0],
        [355, 1, 116, 68, 0, 0, 0],
        [473, 1, 116, 68, 0, 0, 0],
        [591, 1, 116, 68, 0, 0, 0],
        [709, 1, 116, 68, 0, 0, 0],
        [827, 1, 116, 68, 0, 0, 0],
        [945, 1, 116, 68, 0, 0, 0],
        [1063, 1, 116, 68, 0, 0, 0]
      ],
      'animations': {
        'play': {
          'frames': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          next: false
        }
      },
    });
    spritesheets["enemyTurtle"] = new createjs.SpriteSheet({
      "images": [images["enemyTurtle"]],
      "frames": [
        [1, 1, 116, 68, 0, 0, 0],
        [119, 1, 116, 68, 0, 0, 0],
        [237, 1, 116, 68, 0, 0, 0],
        [355, 1, 116, 68, 0, 0, 0],
        [473, 1, 116, 68, 0, 0, 0],
        [591, 1, 116, 68, 0, 0, 0],
        [709, 1, 116, 68, 0, 0, 0],
        [827, 1, 116, 68, 0, 0, 0],
        [945, 1, 116, 68, 0, 0, 0],
        [1063, 1, 116, 68, 0, 0, 0]
      ],
      'animations': {
        'play': {
          'frames': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          next: false
        }
      },
    });
    spritesheets["own"] = new createjs.SpriteSheet({
      "images": [images["own"]],
      "frames": [
        [1, 1, 70, 70, 0, 0, 0],
        [73, 1, 70, 70, 0, 0, 0],
        [145, 1, 70, 70, 0, 0, 0],
        [217, 1, 70, 70, 0, 0, 0],
        [289, 1, 70, 70, 0, 0, 0],
        [361, 1, 70, 70, 0, 0, 0]
      ],
      'animations': {
        'play': {
          'frames': [0, 1, 2, 3, 4, 5],
          next: false
        }
      },
    });
    spritesheets["enemy"] = new createjs.SpriteSheet({
      "images": [images["enemy"]],
      "frames": [
        [1, 1, 80, 80, 0, 0, 0],
        [83, 1, 80, 80, 0, 0, 0],
        [165, 1, 80, 80, 0, 0, 0],
        [247, 1, 80, 80, 0, 0, 0],
        [329, 1, 80, 80, 0, 0, 0],
        [411, 1, 80, 80, 0, 0, 0]
      ],
      'animations': {
        'play': {
          'frames': [0, 1, 2, 3, 4, 5],
          next: false
        }
      },
    });
    spritesheets["yellowFlag"] = new createjs.SpriteSheet({
      "images": [images["yellowFlag"]],
      "frames": [
        [1, 1, 39, 57, 0, 0, 0],
        [42, 1, 39, 57, 0, 0, 0],
        [83, 1, 39, 57, 0, 0, 0],
        [124, 1, 39, 57, 0, 0, 0],
        [165, 1, 39, 57, 0, 0, 0],
        [206, 1, 39, 57, 0, 0, 0],
        [247, 1, 39, 57, 0, 0, 0],
        [288, 1, 39, 57, 0, 0, 0],
        [329, 1, 39, 57, 0, 0, 0],
        [370, 1, 39, 57, 0, 0, 0]
      ],
      'animations': {
        'play': {
          'frames': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          next: false
        }
      },
    });
    spritesheets["starFlag"] = new createjs.SpriteSheet({
      "images": [images["starFlag"]],
      "frames": [
        [1, 1, 55, 55, 0, 0, 0],
        [58, 1, 55, 55, 0, 0, 0],
        [115, 1, 55, 55, 0, 0, 0],
        [172, 1, 55, 55, 0, 0, 0],
        [229, 1, 55, 55, 0, 0, 0],
        [286, 1, 55, 55, 0, 0, 0],
        [343, 1, 55, 55, 0, 0, 0],
        [400, 1, 55, 55, 0, 0, 0],
        [457, 1, 55, 55, 0, 0, 0],
        [514, 1, 55, 55, 0, 0, 0],
        [571, 1, 55, 55, 0, 0, 0],
        [628, 1, 55, 55, 0, 0, 0]
      ],
      'animations': {
        'play': {
          'frames': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          next: false
        }
      },
    });
    spritesheets["tornado"] = new createjs.SpriteSheet({
      "images": [images["tornado"]],
      "frames": [
        [1, 1, 152, 199, 0, 0, 0],
        [155, 1, 152, 199, 0, 0, 0],
        [309, 1, 152, 199, 0, 0, 0],
        [463, 1, 152, 199, 0, 0, 0],
        [617, 1, 152, 199, 0, 0, 0]
      ],
      'animations': {
        'play': {
          'frames': [0, 1, 2, 3, 4],
          next: false
        }
      },
    });
    spritesheets["smoke"] = new createjs.SpriteSheet({
      "images": [images["smoke"]],
      "frames": [
        [1, 1, 107, 47, 0, 0, 0],
        [110, 1, 107, 47, 0, 0, 0],
        [219, 1, 107, 47, 0, 0, 0],
        [328, 1, 107, 47, 0, 0, 0]
      ],
      'animations': {
        'play': {
          'frames': [0, 1, 2, 3],
          next: false
        }
      },
    });
    spritesheets["bomb"] = new createjs.SpriteSheet({
      "images": [images["bomb"]],
      "frames": [
        [1, 1, 120, 120, 0, 0, 0],
        [123, 1, 120, 120, 0, 0, 0],
        [245, 1, 120, 120, 0, 0, 0],
        [367, 1, 120, 120, 0, 0, 0],
        [489, 1, 120, 120, 0, 0, 0],
        [611, 1, 120, 120, 0, 0, 0],
        [733, 1, 120, 120, 0, 0, 0]
      ],
      'animations': {
        'play': {
          'frames': [0, 1, 2, 3, 4, 5, 6],
          next: false
        }
      },
    });
    spritesheets["fire"] = new createjs.SpriteSheet({
      "images": [images["fire"]],
      "frames": [
        [1, 1, 239, 125, 0, 0, 0],
        [242, 1, 239, 125, 0, 0, 0],
        [483, 1, 239, 125, 0, 0, 0],
        [724, 1, 239, 125, 0, 0, 0],
        [965, 1, 239, 125, 0, 0, 0],
        [1206, 1, 239, 125, 0, 0, 0],
        [1447, 1, 239, 125, 0, 0, 0],
        [1688, 1, 239, 125, 0, 0, 0],
        [1929, 1, 239, 125, 0, 0, 0]
      ],
      'animations': {
        'play': {
          'frames': [0, 1, 2, 3, 4, 5, 6, 7, 8],
          next: false
        }
      },
    });
  }
};
