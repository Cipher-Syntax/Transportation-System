document.addEventListener("DOMContentLoaded", function () {
    let toggleButtons = document.querySelectorAll(".see-more");

    toggleButtons.forEach(button => {
        button.addEventListener("click", function () {
            let commentContainer = this.parentElement;
            let dots = commentContainer.querySelector(".dots");
            let moreText = commentContainer.querySelector(".more");

            if (dots.style.display === "none") {
                dots.style.display = "inline";
                moreText.style.display = "none";
                this.innerHTML = "See More";
            } else {
                dots.style.display = "none";
                moreText.style.display = "inline";
                this.innerHTML = "See Less";
            }
        });
    });
});

document.getElementById('menu-icon').addEventListener('click', function() {
    document.getElementById('sidebar').classList.add('active');
});

document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('sidebar').classList.remove('active');
});


// var map = L.map('map').setView([6.9214, 122.0790], 14);
var map = L.map('map').setView([6.9214, 122.0790], 12);

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


    // Restrict location to Zamboanga City bounds
    const bounds = L.latLngBounds(
        [6.80, 121.90],  // More southwest coverage
        [7.00, 122.20]   // More northeast coverage
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