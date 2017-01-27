require("./lib/social");
var async = require("async");
// require("./lib/ads");
var track = require("./lib/tracking");

require("component-responsive-frame/child");
var Reveal = window.Reveal = require("./reveal");
var ready = require("./brightcove");

var closest = require("./lib/closest");

Reveal.initialize({
  width: 1020,
  mouseWheel: false,
  slideNumber: false,
  history: true,
  overview: false
});

var clickAdvance = true;
var unclickable = ".share, button, a, .video-js"

document.body.addEventListener("click", function(e) {
  if (!clickAdvance) return;
  var isUnclickable = closest(e.target, unclickable);
  if (!isUnclickable) Reveal.down();
});

var whitelisted = {
  3: true,
  4: true,
  11: true,
  13: true,
  14: true,
  15: true,
  16: true,
  17: true,
  22: true,
  29: true,
  33: true,
  36: true
}

Reveal.addEventListener("slidechanged", function(event) {
  if (event.indexv in whitelisted) {
    document.body.classList.add("black-logo");
  } else {
    document.body.classList.remove("black-logo");
  }
  track("interactive", "scroll", event.indexv);
});

// Load video player
var players = {
  10: "player-1",
  19: "player-2",
  25: "player-3",
  41: "player-4"
}

async.mapValues(players, function(val, key, callback) {
  ready("BJvNJNM1g", val, function(p) {
    p.on("ended", function() {
      console.log("hello")
      Reveal.down();
    });
    callback(null, p);
  });
}, function(err, players) {
  //called when all players are initialized
  Reveal.addEventListener("slidechanged", function(event) {
    for (var i in players) {
      if (event.indexv == i) {
        players[i].play();
      } else {
        players[i].pause();
      }
    }
  });
})

var freeze = function(player) {
  var config = Reveal.getConfig();
  config.touch = false;
  config.keyboard = false;
  config.controls = false;
  Reveal.configure(config);
  clickAdvance = false;

  var countdown = function() {
    var num = document.querySelector(".skip-sec"+player).innerHTML;
    document.querySelector(".skip-sec"+player).innerHTML = num - 1;

    if (num > 1) {
      setTimeout(countdown, 1000);
    } else {
      document.querySelector(".skip"+player).classList.add("hide");
    }
  };

  countdown();

  setTimeout(function() {
    config.touch = true;
    config.keyboard = true;
    config.controls = true;
    Reveal.configure(config);
    clickAdvance = true;
  }, 15000);
};