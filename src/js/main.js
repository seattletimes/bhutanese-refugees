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
  history: false
});

var whitelisted = {
  3: true,
  7: true,
  8: true,
  9: true,
  11: true,
  14: true,
  18: true,
  21: true,
  23: true
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
      players[event.indexv].pause();
    }
  });
})

ready("Nk8AFQkhe", "player-1", function(p) {
  // p.on("ended", function() {
  //   animateScroll("#words");
  // })
});