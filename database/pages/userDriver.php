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
    <title>User Driver</title>
    <link rel="stylesheet" href="../assets/css/userDriver.css">

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

    
    <div class="driver-info-container">
        <div class="user-info">
            <div id="name">
                <h2>Cipher</h2>
            </div>
            <div id="contact-info">
                <p>programmerjustine@gmail.com</p>
                <p>0993-306-8464</p>
            </div>
        </div>

        <div class="driver-profile">
            <img src="../assets/images/cipher.jpg" alt="user-profile" >
        </div>
    </div>

    <div class="ratings">
        <i class='bx bx-star'></i>
        <i class='bx bx-star'></i>
        <i class='bx bx-star'></i>
        <i class='bx bx-star'></i>
        <i class='bx bx-star'></i>
    </div>

    
    <!-- API MAP GOES HERE (LOCATION OF THE DRIVER FROM THE USERS's PERSPECTIVE)-->
    <div class="drivers-location">
        <div id="map"></div>
    </div>

    <hr>
    <h2 class="ratings-text">Ratings</h2>
    <div class="comments">
        <div class="comments-container">
            <p class="user-name-comments">Justine Toong</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                <span class="dots">...</span>
                <span class="more hidden-content"> 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </span>
                <span class="see-more">See More</span>
            </p>
        </div>

        <hr>
        <div class="comments-container">
            <p class="user-name-comments">Justine Toong</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                <span class="dots">...</span>
                <span class="more hidden-content"> 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </span>
                <span class="see-more">See More</span>
            </p>
        </div>

        <hr>
        <div class="comments-container">
            <p class="user-name-comments">Justine Toong</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                <span class="dots">...</span>
                <span class="more hidden-content"> 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </span>
                <span class="see-more">See More</span>
            </p>
        </div>


        <hr>
        <div class="comments-container">
            <p class="user-name-comments">Justine Toong</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                <span class="dots">...</span>
                <span class="more hidden-content"> 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </span>
                <span class="see-more">See More</span>
            </p>
        </div>

        
        <hr>
        <div class="comments-container">
            <p class="user-name-comments">Justine Toong</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                <span class="dots">...</span>
                <span class="more hidden-content"> 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </span>
                <span class="see-more">See More</span>
            </p>
        </div>

        
        <hr>
        <div class="comments-container">
            <p class="user-name-comments">Justine Toong</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                <span class="dots">...</span>
                <span class="more hidden-content"> 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </span>
                <span class="see-more">See More</span>
            </p>
        </div>

        
        <hr>
        <div class="comments-container">
            <p class="user-name-comments">Justine Toong</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                <span class="dots">...</span>
                <span class="more hidden-content"> 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </span>
                <span class="see-more">See More</span>
            </p>
        </div>

        
        <hr>
        <div class="comments-container">
            <p class="user-name-comments">Justine Toong</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                <span class="dots">...</span>
                <span class="more hidden-content"> 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </span>
                <span class="see-more">See More</span>
            </p>
        </div>        
    </div>

    <div class="send-message">
        <input type="text" placeholder="Type a message..." class="message-input">
        <button class="send-btn">Send</button>
    </div>
    

<!-- 
    <footer>
        <p>Copyright | &copy; 2025 | GoMove</p>
    </footer> -->

    <script src="../assets/js/userDriver.js"></script>
</body>
</html>