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

    function onMapClick(e) {
        alert("You clicked the map at " + e.latlng);
    }
    
    map.on('click', onMapClick);
});
