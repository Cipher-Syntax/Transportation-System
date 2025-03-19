document.addEventListener('DOMContentLoaded', function() {
    // Original event listeners
    document.getElementById('menu-icon').addEventListener('click', function() {
        document.getElementById('sidebar').classList.add('active');
    });

    document.getElementById('close-btn').addEventListener('click', function() {
        document.getElementById('sidebar').classList.remove('active');
    });

    // GoMove form functionality
    const linkCatchphrase = document.getElementById('link-catchphrase');
    const overlayForm = document.querySelector('.overlay-form');
    const cancelAction = document.querySelector('.cancel');
    const goAction = document.querySelector('.go');
    const priceDisplay = document.querySelector('.php-price');
    const locationInput = document.querySelector('.location');
    const destinationInput = document.querySelector('.destination');
    const nameInput = document.querySelector('.name');
    const contactInput = document.querySelector('.contact-no');

    const baseRate = 50;
    const perKmRate = 25;
    let userMarker;
    let map;
    let userLocation = null;

    // Hide overlay form initially
    overlayForm.style.display = 'none';

    // Create map container elements
    function createMapElements() {
        // Map container for the form
        const mapContainer = document.createElement('div');
        mapContainer.id = 'map';
        mapContainer.style.width = '90%';
        mapContainer.style.height = '200px';
        mapContainer.style.marginLeft = 'auto';
        mapContainer.style.marginRight = 'auto';
        mapContainer.style.marginBottom = '20px';
        mapContainer.style.marginTop = '20px';

        // Add map container after the input fields
        const overlayFormInput = document.querySelector('.overlay-form-input');
        overlayFormInput.after(mapContainer);

        // Add Leaflet CSS to head
        const leafletCSS = document.createElement('link');
        leafletCSS.rel = 'stylesheet';
        leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        leafletCSS.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        leafletCSS.crossOrigin = '';
        document.head.appendChild(leafletCSS);

        // Load Leaflet script
        loadScript('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', initMap);
    }

    function loadScript(url, callback) {
        const script = document.createElement('script');
        script.src = url;
        script.onload = callback;
        document.head.appendChild(script);
    }

    function initMap() {
        // Initialize map centered at Zamboanga City
        map = L.map('map', {
            center: [6.9214, 122.0790], // Coordinates for Zamboanga City
            zoom: 13,
            minZoom: 11, // Prevents zooming out too far
            maxBounds: [
                [6.7214, 121.8790], // Southwest corner
                [7.1214, 122.2790]  // Northeast corner
            ],
            maxBoundsViscosity: 1.0 // Makes the bounds "sticky"
        });
        
        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Immediately try to get user location
        getUserLocation();

        // Add a location control button
        const locationButton = L.control({ position: 'bottomright' });
        locationButton.onAdd = function() {
            const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
            div.innerHTML = '<a href="#" title="Find My Location" style="font-weight: bold; text-decoration: none;">📍</a>';
            div.onclick = function() {
                getUserLocation();
                return false;
            };
            return div;
        };
        locationButton.addTo(map);
    }

    function getUserLocation() {
        if (navigator.geolocation) {
            map.locate({
                setView: true,
                maxZoom: 16,
                enableHighAccuracy: true,
                watch: true // Continuously watch position
            });

            // Event when location is found
            map.on('locationfound', onLocationFound);
            
            // Event when location error occurs
            map.on('locationerror', onLocationError);
        } else {
            alert('Geolocation is not supported by your browser');
        }
    }

    function onLocationFound(e) {
        const radius = e.accuracy / 2;
        userLocation = e.latlng;

        // Clear previous marker if exists
        if (userMarker) {
            map.removeLayer(userMarker);
        }

        // Add user marker
        userMarker = L.marker(e.latlng).addTo(map)
            .bindPopup(`You are within ${radius} meters from this point`).openPopup();

        // Add accuracy circle
        L.circle(e.latlng, radius).addTo(map);

        // Update the location input with coordinates or reverse geocode
        reverseGeocode(e.latlng);

        // Ask user if they want to use current location
        if (!locationInput.value) {
            setTimeout(() => {
                if (confirm("Use current location?")) {
                    destinationInput.focus();
                }
            }, 500);
        }
    }

    function onLocationError(e) {
        alert(`Error: ${e.message}`);
        console.error('Location error:', e);
    }

    function reverseGeocode(latlng) {
        // Reverse geocode to get address
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`)
            .then(response => response.json())
            .then(data => {
                locationInput.value = data.display_name;
            })
            .catch(err => {
                console.error('Error getting address:', err);
                locationInput.value = `${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`;
            });
    }

    // Event listeners for form interactions
    linkCatchphrase.addEventListener('click', function() {
        overlayForm.style.display = 'block';
        createMapElements();
    });

    cancelAction.addEventListener('click', function() {
        overlayForm.style.display = 'none';
        resetForm();
    });

    locationInput.addEventListener('click', function() {
        if (map && !locationInput.value) {
            getUserLocation();
        }
    });

    // Manual price calculation for destination input
    destinationInput.addEventListener('input', calculatePrice);

    function calculatePrice() {
        if (locationInput.value && destinationInput.value) {
            const distance = simulateDistanceCalculation(locationInput.value, destinationInput.value);
            const price = baseRate + (perKmRate * distance);
            priceDisplay.textContent = `PHP ${price.toFixed(0)}`;
        }
    }

    function simulateDistanceCalculation(from, to) {
        // Simulate distance calculation
        const stringHash = (from.length * 3) + (to.length * 2);
        const distance = 5 + (stringHash % 15);
        return distance;
    }

    function resetForm() {
        document.querySelectorAll('.overlay-form-input input').forEach(input => {
            input.value = '';
        });
        priceDisplay.textContent = 'PHP --';
        
        // Reset map if exists
        if (map && userMarker) {
            map.removeLayer(userMarker);
            userMarker = null;
        }
    }

    goAction.addEventListener('click', function() {
        if (nameInput.value && locationInput.value && destinationInput.value && contactInput.value) {
            // Store location in localStorage
            if (userLocation) {
                localStorage.setItem('userLocation', JSON.stringify({
                    lat: userLocation.lat,
                    lng: userLocation.lng,
                    address: locationInput.value
                }));
            }
            
            window.location.href = '/Transportation-System/userWaitForDriver/userWaitForDriver.html';
        } else {
            alert('Please fill in all required fields');
        }
    });
});