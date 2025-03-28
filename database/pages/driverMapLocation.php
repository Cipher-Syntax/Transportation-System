<?php
    session_start();

    include("../includes/connection.php");
    include("../includes/allFunction.php");
    
    $user_data = check_login($conn);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Map</title>

    <link rel="stylesheet" href="../assets/css/driverMapLocation.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

    
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    crossorigin=""/>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
    crossorigin=""></script>

</head>
<body>
    <header>
        <div class="sidebar-menu">
            <i class='bx bx-menu' id="menu-icon"></i>
            <div class="sidebar" id="sidebar">
                <button class="close-btn" id="close-btn">
                    <i class='bx bx-menu' id="menu-icon"></i>
                </button>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">History</a></li>
                    <li><a href="#">Settings</a></li>
                </ul>
                <a href="#" class="logout">Logout</a>
            </div>
        </div>

        <div class="logo">
            <h1>GoMove</h1>
        </div>
        <i class='bx bx-bell' id="notif-bell"></i>
    </header>

    <div class="container">
        <div class="user-location">
            <p>Name: Jenson</p>
            <p>Location: Ayala</p>
            <p>Destination: Pueblo</p>
            <p>Contact No: 0993-306-8464</p>
        </div>
    </div>


    <div class="map-container">
        <div id="map"></div>
    </div>

  
    <!-- New Progress Bar Container replacing the action div -->
    <div class="progress-container">
        <div class="progress-bar">
            <div class="progress-fill" id="progress-fill"></div>
            
            <!-- Location markers -->
            <div class="location-marker driver-marker">
                <i class='bx bxs-car'></i>
            </div>
            <div class="location-marker user-marker" id="user-marker">
                <i class='bx bxs-user'></i>
            </div>
            <div class="location-marker destination-marker">
                <i class='bx bxs-map'></i>
            </div>
            
            <!-- Location labels -->
            <div class="location-label driver-label">Driver</div>
            <div class="location-label user-label" id="user-label">You</div>
            <div class="location-label destination-label">Pueblo</div>
        </div>
    </div>

    <footer>
        <p>Copyright | &copy; 2025 | GoMove</p>
    </footer>

    
    <script src="../assets/js/driverMapLocation.js"></script>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
    crossorigin=""></script>
    
</body>
</html>