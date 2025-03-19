document.getElementById('menu-icon').addEventListener('click', function() {
    document.getElementById('sidebar').classList.add('active');
});

document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('sidebar').classList.remove('active');
});

document.addEventListener('DOMContentLoaded', function() {
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
    
    overlayForm.style.display = 'none';

    linkCatchphrase.addEventListener('click', function() {
        overlayForm.style.display = 'block';
    });

    cancelAction.addEventListener('click', function() {
        overlayForm.style.display = 'none';
        resetForm();
    });
    
    locationInput.addEventListener('input', calculatePrice);
    destinationInput.addEventListener('input', calculatePrice);
    
    function calculatePrice() {
        if (locationInput.value && destinationInput.value) {

            const distance = simulateDistanceCalculation(locationInput.value, destinationInput.value);
            
            const price = baseRate + (perKmRate * distance);
            priceDisplay.textContent = `PHP ${price.toFixed(0)}`;
        }
    }
    
    function simulateDistanceCalculation(from, to) {

        const stringHash = (from.length * 3) + (to.length * 2);
        const distance = 5 + (stringHash % 15);
        
        return distance;
    }
  
    function resetForm() {
        document.querySelectorAll('.overlay-form-input input').forEach(input => {
            input.value = '';
        });
        priceDisplay.textContent = 'PHP --';
    }
    
    goAction.addEventListener('click', function() {
        if (nameInput.value && locationInput.value && destinationInput.value && contactInput.value) {
            window.location.href = '/Transportation-System/userWaitForDriver/userWaitForDriver.html';
        } else {
            alert('Please fill in all required fields');
        }
    });
       // Map initialization
       var map = L.map('map').setView([6.9214, 122.0790], 12);

       L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
           maxZoom: 19,
           attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
       }).addTo(map);
   
       // For storing markers
       let originMarker, originCircle;
       let destinationMarker;
       let userLocation = null;
   
       // Get user location
       function getUserLocation() {
           navigator.geolocation.getCurrentPosition(
               function(pos) {
                   const lat = pos.coords.latitude;
                   const lng = pos.coords.longitude;
                   const accuracy = pos.coords.accuracy;
   
                   // Check if location is within Zamboanga City
                   const bounds = L.latLngBounds(
                       [6.80, 121.90],  // More southwest coverage
                       [7.00, 122.20]   // More northeast coverage
                   );
   
                   if (!bounds.contains([lat, lng])) {
                       alert("Location is outside Zamboanga City.");
                       return;
                   }
   
                   userLocation = {
                       lat: lat,
                       lng: lng,
                       accuracy: accuracy
                   };
   
                   // Remove old marker and circle
                   if (originMarker) {
                       map.removeLayer(originMarker);
                       map.removeLayer(originCircle);
                   }
   
                   // Add new marker and circle
                   originMarker = L.marker([lat, lng]).addTo(map)
                       .bindPopup("Your current location").openPopup();
                   originCircle = L.circle([lat, lng], {radius: accuracy, color: 'blue'}).addTo(map);
   
                   // Set map view
                   map.setView([lat, lng], 14);
   
                   // Get address from coordinates using reverse geocoding
                   reverseGeocode(lat, lng, function(address) {
                       locationInput.value = address || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
                       // If we already have a destination, calculate price
                       if (destinationInput.value) {
                           calculatePrice();
                       }
                   });
               },
               function(err) {
                   if (err.code === 1) {
                       alert("Please allow geolocation access.");
                   } else {
                       alert("Cannot get user's location.");
                   }
               },
               { enableHighAccuracy: true }
           );
       }
   
       // Reverse geocoding
       function reverseGeocode(lat, lng, callback) {
           // Using Nominatim for reverse geocoding
           const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
           
           fetch(url)
               .then(response => response.json())
               .then(data => {
                   const address = data.display_name;
                   callback(address);
               })
               .catch(error => {
                   console.error("Error with reverse geocoding:", error);
                   callback(null);
               });
       }
   
       // Forward geocoding
       function forwardGeocode(address, callback) {
           // Add "Zamboanga City" to make the search more specific
           const searchAddress = address + ", Zamboanga City";
           const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchAddress)}`;
           
           fetch(url)
               .then(response => response.json())
               .then(data => {
                   if (data && data.length > 0) {
                       const result = data[0];
                       callback({
                           lat: parseFloat(result.lat),
                           lng: parseFloat(result.lon),
                           display_name: result.display_name
                       });
                   } else {
                       callback(null);
                   }
               })
               .catch(error => {
                   console.error("Error with forward geocoding:", error);
                   callback(null);
               });
       }
   
       // Calculate distance between two points in km
       function calculateDistance(lat1, lon1, lat2, lon2) {
           const R = 6371; // Radius of the earth in km
           const dLat = deg2rad(lat2 - lat1);
           const dLon = deg2rad(lon2 - lon1);
           const a = 
               Math.sin(dLat/2) * Math.sin(dLat/2) +
               Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
               Math.sin(dLon/2) * Math.sin(dLon/2);
           const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
           const distance = R * c; // Distance in km
           return distance;
       }
   
       function deg2rad(deg) {
           return deg * (Math.PI/180);
       }
   
       // Calculate price based on actual distance
       function calculatePrice() {
           if (!userLocation || !destinationMarker) {
               return;
           }
   
           const distance = calculateDistance(
               userLocation.lat, 
               userLocation.lng, 
               destinationMarker.getLatLng().lat, 
               destinationMarker.getLatLng().lng
           );
   
           const price = baseRate + (perKmRate * distance);
           priceDisplay.textContent = `PHP ${price.toFixed(0)}`;
       }
   
       // Handle destination input change
       destinationInput.addEventListener('input', debounce(function() {
           const query = destinationInput.value.trim();
           if (query.length > 2) {
               forwardGeocode(query, function(result) {
                   if (result) {
                       // Remove old destination marker if exists
                       if (destinationMarker) {
                           map.removeLayer(destinationMarker);
                       }
   
                       // Add new destination marker
                       destinationMarker = L.marker([result.lat, result.lng], {
                           icon: L.icon({
                               iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                               iconSize: [25, 41],
                               iconAnchor: [12, 41],
                               popupAnchor: [1, -34],
                               shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                               shadowSize: [41, 41]
                           })
                       }).addTo(map)
                           .bindPopup("Destination: " + result.display_name).openPopup();
   
                       // Fit map to show both markers
                       if (originMarker) {
                           const bounds = L.latLngBounds(
                               [userLocation.lat, userLocation.lng],
                               [result.lat, result.lng]
                           );
                           map.fitBounds(bounds);
                       } else {
                           map.setView([result.lat, result.lng], 14);
                       }
   
                       // Calculate price
                       calculatePrice();
                   }
               });
           }
       }, 500));
   
       // Debounce function to limit API calls
       function debounce(func, wait) {
           let timeout;
           return function() {
               const context = this;
               const args = arguments;
               clearTimeout(timeout);
               timeout = setTimeout(function() {
                   func.apply(context, args);
               }, wait);
           };
       }
   
       // Show form when catchphrase is clicked
       linkCatchphrase.addEventListener('click', function() {
           overlayForm.style.display = 'block';
           // Get user location when form is displayed
           getUserLocation();
       });
   
       // Hide form and reset when cancel is clicked
       cancelAction.addEventListener('click', function() {
           overlayForm.style.display = 'none';
           resetForm();
       });
   
       // Form reset function
       function resetForm() {
           document.querySelectorAll('.overlay-form-input input').forEach(input => {
               input.value = '';
           });
           priceDisplay.textContent = 'PHP --';
           
           // Remove markers
           if (originMarker) {
               map.removeLayer(originMarker);
               map.removeLayer(originCircle);
               originMarker = null;
               originCircle = null;
           }
           
           if (destinationMarker) {
               map.removeLayer(destinationMarker);
               destinationMarker = null;
           }
       }
   
       // Handle form submission
       goAction.addEventListener('click', function() {
           if (nameInput.value && locationInput.value && destinationInput.value && contactInput.value) {
               window.location.href = '/Transportation-System/userWaitForDriver/userWaitForDriver.html';
           } else {
               alert('Please fill in all required fields');
           }
       });
   
       // Allow clicking on map to set destination
       map.on('click', function(e) {
           if (overlayForm.style.display === 'block') {
               // Remove old destination marker if exists
               if (destinationMarker) {
                   map.removeLayer(destinationMarker);
               }
   
               // Add new destination marker
               destinationMarker = L.marker(e.latlng).addTo(map)
                   .bindPopup("Destination").openPopup();
   
               // Get address from coordinates
               reverseGeocode(e.latlng.lat, e.latlng.lng, function(address) {
                   destinationInput.value = address || `${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`;
                   calculatePrice();
               });
           }
       });


});
