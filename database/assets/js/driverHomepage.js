document.getElementById('menu-icon').addEventListener('click', function() {
    document.getElementById('sidebar').classList.add('active');
});

document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('sidebar').classList.remove('active');
});

// Script to handle the overlay timing
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('userOverlay');
    const rejectBtn = document.getElementById('rejectBtn');
    const acceptBtn = document.getElementById('acceptBtn');

    // Function to show overlay
    function showOverlay() {
        overlay.style.display = 'flex';
        
        // Hide after 3 minutes (180000 milliseconds)
        setTimeout(function() {
            overlay.style.display = 'none';
        }, 180000);
    }

    // Handle button clicks
    rejectBtn.addEventListener('click', function() {
        overlay.style.display = 'none';
    });

    acceptBtn.addEventListener('click', function() {
        overlay.style.display = 'none';
        // Add additional code here for accepting the ride
    });

    // For testing purposes, you can uncomment this to show the overlay immediately
    // showOverlay();

    // You might want to trigger this based on a server event
    // For example, you could check for new ride requests every few seconds

    // Simulating a ride request after 5 seconds for demo purposes
    // In production, this would be triggered by server events or websockets
    setTimeout(showOverlay, 5000);
});