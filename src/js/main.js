// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
var Reveal = require("./reveal");

window.addEventListener("wheel", function(e) {
  var scrollingDown = e.wheelDeltaY < 0;
})

Reveal.initialize();