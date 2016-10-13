require("./lib/social");
var async = require("async");
// require("./lib/ads");
var track = require("./lib/tracking");

require("component-responsive-frame/child");
var Reveal = require("./reveal");
var ready = require("./brightcove");

Reveal.initialize({
  width: 1020,
  mouseWheel: true,
  slideNumber: false,
  history: true
});

var whitelisted = {
  3: true,
  7: true,
  9: true,
  10: true,
  11: true,
  14: true,
  20: true,
  23: true,
  25: true
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
  6: "player-1",
  12: "player-2",
  17: "player-3",
  28: "player-4"
}

async.mapValues(players, function(val, key, callback) {
  ready("B15NOtCZ", val, p => callback(null, p));
}, function(err, players) {
  //called when all players are initialized
  console.log(players)
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

ready("Nk8AFQkhe", "player-ad", function(player) {
  window.ad = player;
  console.log("ready")
  Reveal.addEventListener("slidechanged", function(event) {
    console.log("scrolled")
    if (event.indexv == 16) {
      console.log("play ad")
      player.play();
      player.ima3.adPlayer.play();
    } else {
      console.log("stop ad")
      player.ima3.adPlayer.pause();
    }
  });
});
