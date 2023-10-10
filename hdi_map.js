// Initializing the map
var map = L.map('map').setView([0, 0], 2);

// Adding a basemap layer (e.g., OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Loading the GeoJSON data and add it as a layer to the map
var geojsonLayer = L.geoJSON(filtered_geojson_file.geojson).addTo(map);

// Loading human development data from a CSV file using fetch
fetch('human_development_data.csv')
    .then(response => response.text())
    .then(csvData => {
        // Parsing CSV data
        var lines = csvData.split('\n');
        var headers = lines[0].split(',');
        var csvDataArray = [];

        for (var i = 1; i < lines.length; i++) {
            var currentLine = lines[i].split(',');
            var rowData = {};
            for (var j = 0; j < headers.length; j++) {
                rowData[headers[j]] = currentLine[j];
            }
            csvDataArray.push(rowData);
        }

        // Processing and adding the data to the GeoJSON features
        geoJSONLayer.eachLayer(function (layer) {
            var countryCode = layer.feature.properties.ISO_A2;
            var countryData = csvDataArray.find(function (row) {
                return row.country_code === countryCode;
            });
            if (countryData) {
                layer.feature.properties.human_development_index = countryData.hdi;
            }
        });

        // Add GeoJSON layer to the map
        geoJSONLayer.addTo(map);
    });

geoJSONLayer.bindPopup(function (layer) {
    return 'Country: ' + layer.feature.properties.NAME + '<br>Human Development Index: ' + layer.feature.properties.human_development_index;
});

// Customizing the styling and popup content for GeoJSON features here
geoJSONLayer.setStyle({
    fillColor: 'green',
    fillOpacity: 0.7,
    color: 'black',
});

// Fitting the map to the bounds of the GeoJSON layer
map.fitBounds(geojsonLayer.getBounds());
