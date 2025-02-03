// Create the base map layer (OpenStreetMap)
var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19
});

// Create the grayscale map layer (OpenStreetMap)
var grayscale = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create the outdoors map layer (OpenStreetMap)
var outdoors = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create the map object with center and zoom options
var map = L.map('map', {
  center: [37.0902, -95.7129], // USA's center coordinates
  zoom: 5,
  layers: [grayscale] // Default layer (Grayscale)
});

// Add base layers (grayscale, basemap, outdoors) to the map
var baseMaps = {
  "Grayscale": grayscale,
  "OpenStreetMap": basemap,
  "Outdoors": outdoors
};

// Add a control to the map to switch between the base layers
L.control.layers(baseMaps).addTo(map);

// Make a request to retrieve the earthquake geoJSON data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

  // Function to return the style data for each earthquake based on magnitude and depth
  function styleInfo(feature) {
      return {
          opacity: 1,
          fillOpacity: 1,
          fillColor: getColor(feature.geometry.coordinates[2]),
          color: "#000000",
          radius: getRadius(feature.properties.mag),
          stroke: true,
          weight: 0.5
      };
  }

  // Function to determine the color of the marker based on depth
  function getColor(depth) {
      if (depth <= 10) {
          return "#00FF00"; // Green
      } else if (depth <= 30) {
          return "#FFFF00"; // Yellow
      } else if (depth <= 50) {
          return "#FF8000"; // Orange
      } else {
          return "#FF0000"; // Red
      }
  }

  // Function to determine the radius of the earthquake marker based on magnitude
  function getRadius(magnitude) {
      if (magnitude === 0) {
          return 1;
      }
      return magnitude * 4;
  }

  // Create a GeoJSON layer for earthquakes
  var earthquakesLayer = L.geoJson(data, {
      pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng);
      },
      style: styleInfo,
      onEachFeature: function (feature, layer) {
          layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place + "<br>Depth: " + feature.geometry.coordinates[2]);
      }
  });

  // Add the earthquakes layer to the map
  earthquakesLayer.addTo(map);

  // Create a legend control object
  let legend = L.control({
      position: "bottomright"
  });

  legend.onAdd = function () {
      let div = L.DomUtil.create("div", "info legend");
      let depthIntervals = [-10, 10, 30, 50, 70];
      let colors = ["#00FF00", "#FFFF00", "#FF8000", "#FF0000"];

      // Loop through the depth intervals and add a color legend
      for (let i = 0; i < depthIntervals.length; i++) {
          div.innerHTML +=
              '<i style="background:' + colors[i] + '"></i> ' +
              depthIntervals[i] + (depthIntervals[i + 1] ? '&ndash;' + depthIntervals[i + 1] + ' km' : '+ km') + '<br>';
      }

      return div;
  };

  legend.addTo(map);

  // Make a request to retrieve the tectonic plates geoJSON data
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (plate_data) {
      // Create a layer for tectonic plates
      var tectonicPlatesLayer = L.geoJson(plate_data, {
          color: "orange",
          weight: 2,
          opacity: 0.8
      });

      // Add the tectonic plates layer to the map
      tectonicPlatesLayer.addTo(map);

      // Create a layer control to toggle layers on/off
      var overlayMaps = {
          "Tectonic Plates": tectonicPlatesLayer,
          "Earthquakes": earthquakesLayer
      };

      L.control.layers(baseMaps, overlayMaps).addTo(map);
  });
});
