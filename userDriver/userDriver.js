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

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the drivers-location div
    const driversLocation = document.querySelector('.drivers-location');
    
    // Create a close button element
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '<i class="bx bx-x"></i>';
    closeButton.className = 'map-close-btn';
    closeButton.style.display = 'none'; // Initially hidden
    
    // Append the close button to the drivers-location div
    driversLocation.appendChild(closeButton);
    
    // Store the original styles to revert back later
    let originalStyles = {
        width: driversLocation.style.width || '100%',
        height: driversLocation.style.height || '400px',
        position: driversLocation.style.position || 'static',
        zIndex: driversLocation.style.zIndex || 'auto',
        top: driversLocation.style.top || 'auto',
        left: driversLocation.style.left || 'auto',
        margin: driversLocation.style.margin || '0 0 50px 0'
    };
    
    // Function to expand the map
    function expandMap() {
        // Save current scroll position
        const scrollPos = window.scrollY;
        
        // Apply fullscreen styles
        driversLocation.style.position = 'fixed';
        driversLocation.style.top = '0';
        driversLocation.style.left = '0';
        driversLocation.style.width = '100%';
        driversLocation.style.height = '100%';
        driversLocation.style.zIndex = '1000';
        driversLocation.style.margin = '0';
        driversLocation.style.backgroundColor = '#fff'; // Optional: change background to make it stand out
        
        // Show the close button
        closeButton.style.display = 'block';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.zIndex = '1001';
        closeButton.style.backgroundColor = '#323232';
        closeButton.style.color = '#fff';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '50%';
        closeButton.style.width = '40px';
        closeButton.style.height = '40px';
        closeButton.style.fontSize = '24px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.display = 'flex';
        closeButton.style.justifyContent = 'center';
        closeButton.style.alignItems = 'center';
        
        // Store scroll position as a data attribute
        driversLocation.setAttribute('data-scroll', scrollPos);
        
        // Disable body scrolling
        document.body.style.overflow = 'hidden';
    }
    
    // Function to collapse the map back to original size
    function collapseMap() {
        // Restore original styles
        driversLocation.style.position = originalStyles.position;
        driversLocation.style.top = originalStyles.top;
        driversLocation.style.left = originalStyles.left;
        driversLocation.style.width = originalStyles.width;
        driversLocation.style.height = originalStyles.height;
        driversLocation.style.zIndex = originalStyles.zIndex;
        driversLocation.style.margin = originalStyles.margin;
        
        // Hide close button
        closeButton.style.display = 'none';
        
        // Re-enable body scrolling
        document.body.style.overflow = 'auto';
        
        // Restore scroll position
        const scrollPos = parseInt(driversLocation.getAttribute('data-scroll') || '0');
        window.scrollTo(0, scrollPos);
    }
    
    // Add click event listener to the drivers-location div
    driversLocation.addEventListener('click', function(event) {
        // Only expand if the click was directly on the div and not on a child element like the close button
        if (event.target === driversLocation || event.target.classList.contains('map-container')) {
            expandMap();
        }
    });
    
    // Add click event listener to the close button
    closeButton.addEventListener('click', function(event) {
        collapseMap();
        event.stopPropagation(); // Prevent the click from propagating to the drivers-location div
    });
});