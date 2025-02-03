// Create the 'basemap' tile layer that will be the background of our map.
let streetMap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create the map object with center and zoom options.
let map = L.map("map", {
  center: [37.0902, -95.7129], // Coordinates of the center of the USA
  zoom: 5,
  layers: [streetMap] // Default layer is the street map
});

// Add the 'basemap' tile layer to the map.
streetMap.addTo(map);

// Function to determine the color of the marker based on the depth
function getColor(depth) {
  if (depth <= 10) return "#98E030"; // Green for shallow earthquakes
  else if (depth <= 30) return "#E2E035"; // Yellow for medium-depth earthquakes
  else if (depth <= 50) return "#E8A030"; // Orange for deeper earthquakes
  else if (depth <= 70) return "#E87530"; // Red for deep earthquakes
  else return "#E83A30"; // Dark red for the deepest
}

// Function to determine the radius of the earthquake marker based on its magnitude
function getRadius(magnitude) {
  if (magnitude === 0) return 1;
  return magnitude * 4; // Scale radius by 4
}

// Style function for each earthquake marker
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 0.8,
    fillColor: getColor(feature.geometry.coordinates[2]), // Set color by depth
    color: "#000000", // Black border
    radius: getRadius(feature.properties.mag), // Set radius by magnitude
    weight: 0.5
  };
}

// Fetch earthquake data from the USGS
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {
  // Add GeoJSON layer to the map once the file is loaded
  L.geoJson(data, {
    // Turn each feature into a circleMarker on the map
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    // Set the style for each circleMarker using the styleInfo function
    style: styleInfo,
    // Create a popup for each marker to display the magnitude and location of the earthquake
    onEachFeature: function (feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(map);

  // Create a legend control object
  let legend = L.control({
    position: "bottomright"
  });

  // Add the legend details
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");
    let depths = [0, 10, 30, 50, 70]; // Depth intervals
    let labels = [];

    // Loop through the depth intervals to generate labels with colored squares for each interval
    for (let i = 0; i < depths.length; i++) {
      div.innerHTML +=
        '<i style="background:' + getColor(depths[i]) + '"></i> ' + 
        depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + ' km<br>' : '+ km'); // Format legend labels
    }

    return div;
  };

  // Add the legend to the map
  legend.addTo(map);
});
