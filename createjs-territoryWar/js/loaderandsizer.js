//vars to hold device type and width multiplier, and loadingText html element (to be addresed by rtlstorybook.js)
dType = {};
wMultiplier = {};
prevWidth = {};
prevHeight = {};
loadingText = document.getElementById('loadingTxt');
soundOutcome = {};
iOS = {};

//called via body onLoad-- so once css and html body is loaded

function load() {
  document.getElementById('coverImg').style.display = 'inline';
  //add yemiangundong jingzhi
  $("body").on('touchmove', function (event) {
    //event.preventDefault();
  });

  //STORING CANVAS DIMENSIONS AS ORIGINALLY DEFINED
  canWidth = $('#gameCanvas').width();
  canHeight = $('#gameCanvas').height();

  prevWidth = $(window).width();
  prevHeight = $(window).height();


  //DEVICE DETECTION:

  //if //**console.log doesn't exist (IE), use log instead, so //**console.log calls won't halt JS
  if (typeof console === "undefined") console = {
    log: function () {
    }
  };

  //if allowed browser- proper dType and sizing:
  if (navigator.userAgent.match(/iPad/i)) {
    //redirect of iOS <= 5.0
    //if (/OS [1-4](.*) like Mac OS X/i.fishEatFish(navigator.userAgent)) window.location.href = "oops.html";
    dType = 'iPad';
    wMultiplier = 1.0;
  }
  else if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
    //redirect of iOS <= 5.0
    //if (/OS [1-4](.*) like Mac OS X/i.fishEatFish(navigator.userAgent)) window.location.href = "oops.html";
    dType = 'iPhone';
    wMultiplier = 1.0;
  }
  //android?
  else if ((navigator.userAgent.search("Android") != -1)) { //&& (navigator.userAgent.search("Chrome") != -1)) {
    var androidversion = parseFloat(navigator.userAgent.slice(navigator.userAgent.indexOf("Android") + 8));
    if (androidversion < 4.0) window.location.href = "oops.html";
    dType = 'android';
    wMultiplier = 1.0;
  }
  //else, a desktop browser, with version-based redirect to oops.html:
  else {

    if (/Chrome[\/\s](\d+\.\d+)/.test(navigator.userAgent)) { //fishEatFish for Firefox/x.x or Firefox x.x (ignoring remaining digits);
      var chversion = new Number(RegExp.$1) // capture x.x portion and store as a number
      if (chversion < 24) window.location.href = "oops.html";
      dType = 'desktop';
      wMultiplier = 1.0;
    }
    else if (/Safari[\/\s](\d+\.\d+)/.test(navigator.userAgent)) { //fishEatFish for Firefox/x.x or Firefox x.x (ignoring remaining digits);
      var safversion = new Number(RegExp.$1) // capture x.x portion and store as a number
      //minimum safari support: 5.0 in Snow Leopard
      if (safversion < 533.21) window.location.href = "oops.html";
      dType = 'desktop';
      wMultiplier = 1.0;
    }
    else if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) { //fishEatFish for Firefox/x.x or Firefox x.x (ignoring remaining digits);
      var ffversion = new Number(RegExp.$1) // capture x.x portion and store as a number
      if (ffversion < 20) window.location.href = "oops.html";
      dType = 'desktop';
      wMultiplier = 1;
    }

    else if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) { //fishEatFish for MSIE x.x;
      var ieversion = new Number(RegExp.$1) // capture x.x portion and store as a number
      if (ieversion < 9.0) window.location.href = "oops.html";
      dType = 'ie';
      wMultiplier = 1;
    }
    else {
      //alert('unknown desktop browser');
      dType = 'desktop';
      wMultiplier = 1;
      //DESKTOP browser detect
    }
  }
  do_resize();
}

function do_resize() {

  var stageWidth = document.documentElement.clientWidth;
  var stageHeight = document.documentElement.clientHeight;
  //iPhone:
  if (dType == "iPhone") {
    //PORTRAIT:
    if (stageWidth == 320 || stageWidth == 568) {
      if (stageWidth < stageHeight) {
        $('#gameCanvas').width($(window).width());
        $('#coverImg').width($(window).width());
        $('#gameCanvas').height($('#gameCanvas').width() * 0.65625);
        $('#coverImg').height($('#coverImg').width() * 0.65625);
      }
      //LANDSCAPE
      else {
        $('#gameCanvas').height(stageHeight);
        $('#coverImg').height(stageHeight);
        $('#gameCanvas').width(stageHeight * 1.77380952380952);
        $('#coverImg').width(stageHeight * 1.77380952380952);
      }
    }
    if (stageWidth == 375 || stageWidth == 667) {
      if (stageWidth < stageHeight) {
        $('#gameCanvas').width($(window).width());
        $('#coverImg').width($(window).width());
        $('#gameCanvas').height($('#gameCanvas').width() * 0.65625);
        $('#coverImg').height($('#coverImg').width() * 0.65625);
      }
      //LANDSCAPE
      else {
        $('#gameCanvas').height(stageHeight);
        $('#coverImg').height(stageHeight);
        $('#gameCanvas').width(stageHeight * 1.77380952380952);
        $('#coverImg').width(stageHeight * 1.77380952380952);
      }
    }
    if (stageWidth == 414 || stageWidth == 736) {
      if (stageWidth < stageHeight) {
        $('#gameCanvas').width($(window).width());
        $('#coverImg').width($(window).width());
        $('#gameCanvas').height($('#gameCanvas').width() * 0.65625);
        $('#coverImg').height($('#coverImg').width() * 0.65625);
      }
      //LANDSCAPE
      else {
        $('#gameCanvas').height(stageHeight);
        $('#coverImg').height(stageHeight);
        $('#gameCanvas').width(stageHeight * 1.77380952380952);
        $('#coverImg').width(stageHeight * 1.77380952380952);
      }
    }

  }
  //add iPad
  if (dType == "iPad") {
    if (stageWidth == 768 || stageWidth == 1024) {
      if (stageWidth < stageHeight) {
        $('#gameCanvas').width($(window).width());
        $('#coverImg').width($(window).width());
        $('#gameCanvas').height($('#gameCanvas').width() * 0.65625);
        $('#coverImg').height($('#coverImg').width() * 0.65625);
      } else {
        $('#gameCanvas').height(stageHeight);
        $('#coverImg').height(stageHeight);
        if (stageHeight * 1.52380952380952 > 1024) {
          $('#gameCanvas').width(1024);
          $('#coverImg').width(1024);
        } else {
          $('#gameCanvas').width(stageHeight * 1.52380952380952);
          $('#coverImg').width(stageHeight * 1.52380952380952);
        }
      }
    }
    if (stageWidth == 1366) {
      $('#gameCanvas').height(stageHeight);
      $('#coverImg').height(stageHeight);
      $('#gameCanvas').width(stageHeight * 1.333984375);
      $('#coverImg').width(stageHeight * 1.333984375);
    }
  }

  //INTERNET EXPLORER:
  if (dType == 'ie') {
    $('#gameCanvas').width($(window).width() * wMultiplier);
    $('#coverImg').width($(window).width() * wMultiplier);
    $('#gameCanvas').height($('#gameCanvas').width() * 0.65625);
    $('#coverImg').height($('#coverImg').width() * 0.65625);
  }
  else if (dType == 'android') {
    //PORTRAIT:
    if (stageWidth < stageHeight) {
      $('#gameCanvas').width($(window).width() * wMultiplier);
      $('#coverImg').width($(window).width() * wMultiplier);
      $('#gameCanvas').height($('#gameCanvas').width() * 0.65625);
      $('#coverImg').height($('#coverImg').width() * 0.65625);
    }else if(stageWidth > stageHeight && stageWidth / stageHeight == 1.6) {
      $('#gameCanvas').height(stageHeight);
      $('#coverImg').height(stageHeight);
      $('#gameCanvas').width(stageHeight * 1.60380952380952);
      $('#coverImg').width(stageHeight * 1.60380952380952);
    }else{
      $('#gameCanvas').height(stageHeight);
      $('#coverImg').height(stageHeight);
      $('#gameCanvas').width(stageHeight * 1.77380952380952);
      $('#coverImg').width(stageHeight * 1.77380952380952);
    }
  }

  //"everything"
  else if (dType == "desktop") {
    $('#gameCanvas').height($(window).height() * wMultiplier);
    $('#coverImg').height($(window).height() * wMultiplier);
    $('#gameCanvas').width($(window).width());
    $('#coverImg').width($(window).width());
  }

  //to horizontally center everything in div canvas_parent
  $('#canvas_parent').css('margin-left', ($(window).width() - $('#gameCanvas').width()) / 2);
  $('#canvas_parent').css('margin-right', ($(window).width() - $('#gameCanvas').width()) / 2);
  //to vertically center everything in div canvas_parent
  $('#canvas_parent').css('margin-top', ( $(window).height() - $('#gameCanvas').height() ) / 2);
  $('#canvas_parent').css('margin-bottom', ( $(window).height() - $('#gameCanvas').height() ) / 2);

  if (wMultiplier == 1.0) {

  }
  prevWidth = $(window).width();
  prevHeight = $(window).height();
}

$(window).resize(function () {
  do_resize();
});

function beginLoader() {
  $("#big_mask").hide();
  $("#startBtn").hide();
}
