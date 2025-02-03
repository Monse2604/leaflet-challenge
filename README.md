# Leaflet Challenge

## Overview

This project involves creating a dynamic and interactive map to visualize earthquake data using Leaflet.js. It includes two parts:

1. **Part 1**: Create a basic earthquake visualization by plotting earthquake data on a map. Each earthquake is represented as a marker with varying sizes and colors based on its magnitude and depth.
2. **Part 2 (Optional)**: Enhance the map by adding tectonic plates data and providing a control panel for layer visibility. Users can switch between different base maps and toggle the visibility of earthquake markers and tectonic plate boundaries.

## Project Structure

- `Leaflet-Part-1/Starter_Code/index.html`: The HTML file for Part 1. It sets up the basic Leaflet map and visualizes earthquake data from a geoJSON feed.
- `Leaflet-Part-2/Starter_Code/index.html`: The HTML file for Part 2. It enhances the map with additional layers, including tectonic plates, and includes options for toggling between different base maps.

## How to Use

1. **Open the index.html files** in your browser to view the map visualizations.
   - For Part 1: Open the file located in `Leaflet-Part-1/Starter_Code/index.html`.
   - For Part 2: Open the file located in `Leaflet-Part-2/Starter_Code/index.html`.

2. **Map Features**:
   - Earthquakes are represented as circle markers. The size of the marker reflects the earthquake's magnitude, and the color reflects its depth.
   - The map has options to change the base layer between Satellite, Grayscale, and Outdoor styles.
   - In Part 2, tectonic plate boundaries are added as another layer, and you can toggle between earthquake data and tectonic plates using the layer control.

3. **Data**:
   - Earthquake data is pulled from the USGS GeoJSON feed, and tectonic plate data is sourced from GitHub.
   
## Key Functions

- **Leaflet.js**: Used to create interactive maps.
- **D3.js**: Used for handling and visualizing the earthquake data.
- **GeoJSON**: Used to represent earthquake and tectonic plate data.

## Technologies Used

- Leaflet.js
- D3.js
- GeoJSON

