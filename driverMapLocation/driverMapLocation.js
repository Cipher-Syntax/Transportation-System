document.getElementById('menu-icon').addEventListener('click', function() {
    document.getElementById('sidebar').classList.add('active');
});

document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('sidebar').classList.remove('active');
});

// MAP

var map = L.map('map').setView([6.92, 122.08], 12);
        
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let marker, circle;

function success(pos) {
    const lat = pos.coords.latitude;
    const long = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;
    
    console.log("Lat:", lat, "Long:", long, "Accuracy:", accuracy);
    
    const bounds = L.latLngBounds(
        [6.75, 121.80],  // Southwest: More west and south
        [7.10, 122.30]   // Northeast: More north and east
    );
    
    if (!bounds.contains([lat, long])) {
        alert("Location is outside Zamboanga City.");
        return;
    }
    
    // Remove old marker and circle
    if (marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);
    }
    
    marker = L.marker([lat, long]).addTo(map)
        .bindPopup("You are here").openPopup();
    circle = L.circle([lat, long], {radius: accuracy}).addTo(map);
    
    // Keep the map centered on the user's location
    map.setView([lat, long], 14);
}

function error(err) {
    if (err.code === 1) {
        alert("Please allow geolocation access.");
    } else {
        alert("Cannot get user's location.");
    }
}

navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    maximumAge: 0
});




document.getElementById('menu-icon').addEventListener('click', function() {
    document.getElementById('sidebar').classList.add('active');
});

document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('sidebar').classList.remove('active');
});

var map = L.map('map').setView([6.92, 122.08], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let userMarker, userCircle, driverMarker, destinationMarker;
let driverLocation = [6.91, 122.06]; // Example driver location
let userLocation = [6.92, 122.08];   // Example user location
let destination = [6.93, 122.10];    // Example destination location

// Add markers for driver and destination
driverMarker = L.marker(driverLocation).addTo(map)
    .bindPopup("Driver").openPopup();

destinationMarker = L.marker(destination).addTo(map)
    .bindPopup("Destination: Pueblo");

function success(pos) {
    const lat = pos.coords.latitude;
    const long = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;
    
    console.log("Lat:", lat, "Long:", long, "Accuracy:", accuracy);
    
    const bounds = L.latLngBounds(
        [6.75, 121.80],  // Southwest: More west and south
        [7.10, 122.30]   // Northeast: More north and east
    );
    
    if (!bounds.contains([lat, long])) {
        alert("Location is outside Zamboanga City.");
        return;
    }
    
    // Update user location
    userLocation = [lat, long];
    
    // Remove old marker and circle
    if (userMarker) {
        map.removeLayer(userMarker);
        map.removeLayer(userCircle);
    }
    
    userMarker = L.marker(userLocation).addTo(map)
        .bindPopup("You are here").openPopup();
    userCircle = L.circle(userLocation, {radius: accuracy}).addTo(map);
    
    // Calculate distance and update progress bar
    updateProgressBar();
    
    // Keep the map centered on the user's location
    map.setView(userLocation, 14);
    
    // Draw polyline from driver to user to destination
    drawRoute();
}

function error(err) {
    if (err.code === 1) {
        alert("Please allow geolocation access.");
    } else {
        alert("Cannot get user's location.");
    }
}

// Mock initial user location for testing
userMarker = L.marker(userLocation).addTo(map)
    .bindPopup("You are here").openPopup();

// Draw initial route
drawRoute();

// Update progress bar initially
updateProgressBar();

// Watch position for real-time updates
navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    maximumAge: 0
});

function drawRoute() {
    // Remove any existing polylines
    map.eachLayer(function(layer) {
        if (layer instanceof L.Polyline && !(layer instanceof L.Circle)) {
            map.removeLayer(layer);
        }
    });
    
    // Draw polyline from driver to user
    var driverToUser = L.polyline([driverLocation, userLocation], {color: '#FF5722', weight: 5}).addTo(map);
    
    // Draw polyline from user to destination
    var userToDestination = L.polyline([userLocation, destination], {color: '#673AB7', weight: 5}).addTo(map);
    
    // Fit map to show all points
    var group = new L.featureGroup([driverMarker, userMarker, destinationMarker]);
    map.fitBounds(group.getBounds(), {padding: [50, 50]});
}

function calculateDistance(point1, point2) {
    // Simple Euclidean distance for demo purposes
    // In real application, use Haversine formula or Leaflet's built-in methods
    var dx = point1[0] - point2[0];
    var dy = point1[1] - point2[1];
    return Math.sqrt(dx * dx + dy * dy);
}

function updateProgressBar() {
    // Calculate total journey distance
    const totalDistance = calculateDistance(driverLocation, destination);
    
    // Calculate distance covered so far (driver to user)
    const distanceCovered = calculateDistance(driverLocation, userLocation);
    
    // Calculate progress percentage
    const progressPercentage = (distanceCovered / totalDistance) * 100;
    
    // Update progress bar fill
    document.getElementById('progress-fill').style.width = progressPercentage + '%';
    
    // Update user marker position on progress bar
    document.getElementById('user-marker').style.left = progressPercentage + '%';
    document.getElementById('user-label').style.left = progressPercentage + '%';
    
    console.log("Progress:", progressPercentage + '%');
}

       
// Simulate driver movement (for demo purposes)
function simulateDriverMovement() {
    // Slowly move driver toward user location
    driverLocation[0] += (userLocation[0] - driverLocation[0]) * 0.1;
    driverLocation[1] += (userLocation[1] - driverLocation[1]) * 0.1;
    
    // Update driver marker position
    if (driverMarker) {
        driverMarker.setLatLng(driverLocation);
    }
    
    // Update progress bar
    updateProgressBar();
    
    // Update route
    drawRoute();
}

// Call simulate function periodically for demonstration
setInterval(simulateDriverMovement, 3000);

// Update progress bar when window is resized
window.addEventListener('resize', updateProgressBar);

// Add button to toggle driver simulation (for testing)
function addSimulationToggle() {
    const controlDiv = document.createElement('div');
    controlDiv.style.padding = '10px';
    controlDiv.style.backgroundColor = 'white';
    controlDiv.style.borderRadius = '5px';
    controlDiv.style.margin = '10px';
    controlDiv.style.cursor = 'pointer';
    controlDiv.innerHTML = 'Toggle Simulation';
    controlDiv.addEventListener('click', function() {
        // Manually trigger a simulation step
        simulateDriverMovement();
    });
    
    // Add the control to the map
    const customControl = L.Control.extend({
        options: {
            position: 'topright'
        },
        onAdd: function() {
            return controlDiv;
        }
    });
    
    map.addControl(new customControl());
}

// Add test control
addSimulationToggle();