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
    let destinationMarker;
    let map;
    let userLocation = null;
    let destinationLocation = null;

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

        // Add click event on map to set destination
        map.on('click', function(e) {
            if (destinationInput === document.activeElement || !locationInput.value) {
                setDestinationFromMap(e.latlng);
            }
        });
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
        userMarker = L.marker(e.latlng, {
            icon: L.divIcon({
                className: 'user-marker',
                html: '<div style="background-color: #1E8449; width: 12px; height: 12px; border-radius: 50%; border: 3px solid white;"></div>',
                iconSize: [18, 18],
                iconAnchor: [9, 9]
            })
        }).addTo(map)
            .bindPopup(`Your location`).openPopup();

        // Add accuracy circle
        L.circle(e.latlng, radius).addTo(map);

        // Update the location input with coordinates or reverse geocode
        reverseGeocode(e.latlng, 'location');

        // Ask user if they want to use current location
        if (!locationInput.value) {
            setTimeout(() => {
                if (confirm("Use current location?")) {
                    destinationInput.focus();
                }
            }, 500);
        }
    }

    function setDestinationFromMap(latlng) {
        // Clear previous destination marker
        if (destinationMarker) {
            map.removeLayer(destinationMarker);
        }

        // Set destination marker
        destinationMarker = L.marker(latlng, {
            icon: L.divIcon({
                className: 'destination-marker',
                html: '<div style="background-color: #F39C12; width: 12px; height: 12px; border-radius: 50%; border: 3px solid white;"></div>',
                iconSize: [18, 18],
                iconAnchor: [9, 9]
            })
        }).addTo(map)
            .bindPopup('Destination').openPopup();

        destinationLocation = latlng;
        
        // Set destination with reverse geocode
        reverseGeocode(latlng, 'destination');
        
        // If we have both points, draw route and calculate actual distance
        if (userLocation && destinationLocation) {
            drawRoute();
            calculateActualDistance();
        }
    }

    function drawRoute() {
        // Check if a route layer already exists and remove it
        if (window.routeLayer) {
            map.removeLayer(window.routeLayer);
        }
        
        // Draw a simple line for the route
        window.routeLayer = L.polyline([
            [userLocation.lat, userLocation.lng],
            [destinationLocation.lat, destinationLocation.lng]
        ], {
            color: '#27AE60',
            weight: 4,
            opacity: 0.7
        }).addTo(map);
        
        // Fit the map to show both points
        let bounds = L.latLngBounds([userLocation, destinationLocation]);
        map.fitBounds(bounds, {padding: [30, 30]});
    }

    function calculateActualDistance() {
        // Calculate actual distance in kilometers
        const lat1 = userLocation.lat;
        const lon1 = userLocation.lng;
        const lat2 = destinationLocation.lat;
        const lon2 = destinationLocation.lng;
        
        // Haversine formula to calculate distance
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2-lat1);
        const dLon = deg2rad(lon2-lon1); 
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        const distance = R * c; // Distance in km
        
        // Update price based on actual distance
        updatePrice(distance);
    }

    function deg2rad(deg) {
        return deg * (Math.PI/180);
    }

    function updatePrice(distance) {
        const price = baseRate + (perKmRate * distance);
        priceDisplay.textContent = `PHP ${price.toFixed(0)}`;
    }

    function onLocationError(e) {
        alert(`Error: ${e.message}`);
        console.error('Location error:', e);
    }

    function reverseGeocode(latlng, field) {
        // Reverse geocode to get address
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`)
            .then(response => response.json())
            .then(data => {
                if (field === 'location') {
                    locationInput.value = data.display_name;
                } else if (field === 'destination') {
                    destinationInput.value = data.display_name;
                }
                
                // If both fields have values, calculate price
                if (locationInput.value && destinationInput.value) {
                    calculatePrice();
                }
            })
            .catch(err => {
                console.error('Error getting address:', err);
                if (field === 'location') {
                    locationInput.value = `${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`;
                } else if (field === 'destination') {
                    destinationInput.value = `${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`;
                }
            });
    }

    // Search for location when typing in the destination field
    function setupDestinationSearch() {
        let searchTimeout;
        
        destinationInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (destinationInput.value.length > 3) {
                    searchLocation(destinationInput.value, 'destination');
                }
            }, 500);
        });
    }

    // Search for location when typing in the location field
    function setupLocationSearch() {
        let searchTimeout;
        
        locationInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (locationInput.value.length > 3) {
                    searchLocation(locationInput.value, 'location');
                }
            }, 500);
        });
    }

    function searchLocation(query, field) {
        // Nominatim search API
        fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&viewbox=121.8790,6.7214,122.2790,7.1214&bounded=1`)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    // Get the first result
                    const result = data[0];
                    const latlng = L.latLng(result.lat, result.lon);
                    
                    // Update the appropriate field and marker
                    if (field === 'location') {
                        userLocation = latlng;
                        map.setView(latlng, 16);
                        if (userMarker) map.removeLayer(userMarker);
                        userMarker = L.marker(latlng, {
                            icon: L.divIcon({
                                className: 'user-marker',
                                html: '<div style="background-color: #1E8449; width: 12px; height: 12px; border-radius: 50%; border: 3px solid white;"></div>',
                                iconSize: [18, 18],
                                iconAnchor: [9, 9]
                            })
                        }).addTo(map);
                        locationInput.value = result.display_name;
                    } else if (field === 'destination') {
                        setDestinationFromMap(latlng);
                    }
                    
                    // If both origin and destination exist, draw route
                    if (userLocation && destinationLocation) {
                        drawRoute();
                        calculateActualDistance();
                    }
                }
            })
            .catch(err => {
                console.error('Error searching location:', err);
            });
    }

    // Event listeners for form interactions
    linkCatchphrase.addEventListener('click', function() {
        overlayForm.style.display = 'block';
        createMapElements();
        setupDestinationSearch();
        setupLocationSearch();
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

    destinationInput.addEventListener('click', function() {
        if (map) {
            // Change cursor to indicate clicking on map will set destination
            map.getContainer().style.cursor = 'crosshair';
            
            // Show tooltip or instruction
            const instructionDiv = document.createElement('div');
            instructionDiv.id = 'map-instruction';
            instructionDiv.style.position = 'absolute';
            instructionDiv.style.bottom = '10px';
            instructionDiv.style.left = '50%';
            instructionDiv.style.transform = 'translateX(-50%)';
            instructionDiv.style.backgroundColor = 'rgba(30, 132, 73, 0.8)';
            instructionDiv.style.color = 'white';
            instructionDiv.style.padding = '8px';
            instructionDiv.style.borderRadius = '4px';
            instructionDiv.style.zIndex = '1000';
            instructionDiv.style.pointerEvents = 'none';
            instructionDiv.textContent = 'Click on map to set destination';
            
            // Remove existing instruction if exists
            const existingInstruction = document.getElementById('map-instruction');
            if (existingInstruction) {
                existingInstruction.remove();
            }
            
            document.getElementById('map').appendChild(instructionDiv);
            
            // Remove instruction after 3 seconds
            setTimeout(() => {
                if (document.getElementById('map-instruction')) {
                    document.getElementById('map-instruction').remove();
                }
                map.getContainer().style.cursor = '';
            }, 3000);
        }
    });

    // Manual price calculation for destination input
    destinationInput.addEventListener('input', calculatePrice);

    function calculatePrice() {
        if (locationInput.value && destinationInput.value) {
            if (userLocation && destinationLocation) {
                // We already have calculated actual distance
                calculateActualDistance();
            } else {
                // Fallback to estimated distance
                const distance = simulateDistanceCalculation(locationInput.value, destinationInput.value);
                const price = baseRate + (perKmRate * distance);
                priceDisplay.textContent = `PHP ${price.toFixed(0)}`;
            }
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
        if (map) {
            if (userMarker) map.removeLayer(userMarker);
            if (destinationMarker) map.removeLayer(destinationMarker);
            if (window.routeLayer) map.removeLayer(window.routeLayer);
            userMarker = null;
            destinationMarker = null;
            destinationLocation = null;
        }
    }

    goAction.addEventListener('click', function() {
        if (nameInput.value && locationInput.value && destinationInput.value && contactInput.value) {
            // Store location and destination in localStorage
            if (userLocation && destinationLocation) {
                localStorage.setItem('userLocation', JSON.stringify({
                    lat: userLocation.lat,
                    lng: userLocation.lng,
                    address: locationInput.value
                }));
                
                localStorage.setItem('userDestination', JSON.stringify({
                    lat: destinationLocation.lat,
                    lng: destinationLocation.lng,
                    address: destinationInput.value
                }));
            }
            
            window.location.href = '/Transportation-System/userWaitForDriver/userWaitForDriver.html';
        } else {
            alert('Please fill in all required fields');
        }
    });
});