require("./lib/social");
var async = require("async");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
var Reveal = require("./reveal");
var ready = require("./brightcove");

Reveal.initialize({
  width: 1020,
  mouseWheel: true,
  slideNumber: true,
  history: true
});

var whitelisted = {
  2: true,
  3: true,
  7: true,
  9: true,
  12: true,
  15: true,
  17: true,
  20: true
}

Reveal.addEventListener("slidechanged", function(event) {
  if (event.indexv in whitelisted) {
    document.body.classList.add("black-logo");
  } else {
    document.body.classList.remove("black-logo");
  }
});

// Load video player
var players = {
  6: "player-1",
  12: "player-2",
  16: "player-3",
  26: "player-4"
}

async.mapValues(players, function(val, key, callback) {
  ready("Nk8AFQkhe", val, p => callback(null, p));
}, function(err, players) {
  //called when all players are initialized
  console.log(players)
  Reveal.addEventListener("slidechanged", function(event) {
    if (event.indexv in players) {
      players[event.indexv].play();
    } else {
      players[event.indexv].stop();
    }
  });
})

ready("Nk8AFQkhe", "player-1", function(p) {
  // p.on("ended", function() {
  //   animateScroll("#words");
  // })
});