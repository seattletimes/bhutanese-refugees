require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
var Reveal = require("./reveal");

Reveal.initialize({
  mouseWheel: true
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