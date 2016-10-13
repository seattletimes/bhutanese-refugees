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
  history: true
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
  10: true,
  12: true,
  13: true,
  14: true,
  15: true,
  16: true,
  21: true,
  28: true,
  32: true,
  35: true
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
  9: "player-1",
  18: "player-2",
  24: "player-3",
  40: "player-4"
}

async.mapValues(players, function(val, key, callback) {
  ready("B15NOtCZ", val, p => callback(null, p));
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
  }, 10000);
};

ready("Nk8AFQkhe", "ad-player-1", function(player) {
  var hasBeenPlayed = false;
  Reveal.addEventListener("slidechanged", function(event) {
    if (event.indexv == 17) {
      player.play();
      player.ima3.adPlayer.play();
      if (!hasBeenPlayed) freeze("1");
    } else {
      player.ima3.adPlayer.pause();
    }
  });
  player.on("ads-ad-started", function() {
    hasBeenPlayed = true;
  });
  player.on("ads-ad-ended", function() {
    Reveal.down();
  });
});

ready("Nk8AFQkhe", "ad-player-2", function(player) {
  var hasBeenPlayed = false;
  Reveal.addEventListener("slidechanged", function(event) {
    if (event.indexv == 39) {
      player.play();
      player.ima3.adPlayer.play();
      if (!hasBeenPlayed) freeze("2");
    } else {
      player.ima3.adPlayer.pause();
    }
  });
  player.on("ads-ad-started", function() {
    hasBeenPlayed = true;
  });
  player.on("ads-ad-ended", function() {
    Reveal.down();
  });
});
