import mymap from "./static/js/open_layer";

window.mymap = mymap;

import("./pkg").then(module => {

  // Export the Leaflet map

  module.run_app();
});


