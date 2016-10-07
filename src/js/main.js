// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
var Reveal = require("./reveal");

Reveal.initialize({
  mouseWheel: true
});

var whitelisted = {
  2: true,
  4: true,
  6: true,
  8: true,
  9: true,
  10: true,
  11: true,
  13: true,
  15: true,
  16: true
}

Reveal.addEventListener("slidechanged", function(event) {
  if (event.indexv in whitelisted) {
    document.body.classList.add("black-logo");
  } else {
    document.body.classList.remove("black-logo");
  }
});