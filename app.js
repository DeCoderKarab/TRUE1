// Create a map centered at a default location (0, 0) with zoom level 13
const map = L.map('map').setView([0, 0], 13);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Create a marker that will be moved to the user's current location
let marker = L.marker([0, 0]).addTo(map);

// Check if geolocation is available in the browser
if ("geolocation" in navigator) {
    // Track the user's location continuously
    navigator.geolocation.watchPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Update marker position on the map
        const newPosition = [latitude, longitude];
        marker.setLatLng(newPosition);

        // Center the map on the user's location
        map.setView(newPosition, 13);

        console.log("Latitude: " + latitude);
        console.log("Longitude: " + longitude);
    }, function(error) {
        // Handle errors (e.g., user denies location access)
        console.error("Error getting location: " + error.message);
        alert("Error getting location: " + error.message);
    }, {
        enableHighAccuracy: true,  // Request higher accuracy
        timeout: 5000,  // Timeout for retrieving location
        maximumAge: 0  // Don't use cached location data
    });
} else {
    alert("Geolocation is not supported by this browser.");
}