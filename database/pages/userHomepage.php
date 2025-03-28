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
    <title>Homepage</title>
    <link rel="stylesheet" href="../assets/css/userHompage.css">

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
    

    <div class="user-info-container">
        <div class="user-info">
            <div id="name">
            <h2><?php echo $_SESSION['firstname'] . " " . $_SESSION['lastname']; ?></h2>
            </div>
            <div id="contact-info">
                <p><?php echo $_SESSION['email'];?></p>
                <p><?php echo $_SESSION['contact_no'];?></p>
            </div>
        </div>

        <div class="user-profile">
            <img src="/Transportation-System/images/cipher.jpg" alt="user-profile" >
        </div>
    </div>

    <div class="interaction">
        <div class="hero-img">
            <div class="interaction-container">
                <div class="image-container">
                    <div class="hero-container">
                        <h3 id="interaction-logo">GoMove</h3>
                        <a href="#" id="link-catchphrase">Need a ride?....</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="overlay-form">
            <div class="overlay-logo">
                <h2>GoMove</h2>
            </div>

            <div class="overlay-form-input">
                <input type="txt" name="name" placeholder="Enter your name: " class="name">
                <input type="txt" name="location" placeholder="Location: " class="location">
                <input type="txt" name="destination" placeholder="Destination: " class="destination">
                <input type="txt" name="contact-no" placeholder="Contact No: " class="contact-no">
            </div>

            <div class="map-integration">
                <div id="map"></div>
            </div>
            

            <div class="price">
                <h3 class="php-price">PHP </h3>
            </div>

            <div class="action">
                <p class="cancel">Cancel</p>
                <p class="go">Go</p>
            </div>
        </div>
    </div>
    

    <hr id="separator">

    <div class="history-scroller">
        <h2 id="history">History</h2>

        <div class="history-drivers">
            <div class="drivers">
                <div class="driver-img"></div>
                <p>Driver Name</p>
                <div class="ratings">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <a href="#">Expand</a>
            </div>

            <div class="drivers">
                <div class="driver-img"></div>
                <p>Driver Name</p>
                <div class="ratings">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <a href="#">Expand</a>
            </div>

            <div class="drivers">
                <div class="driver-img"></div>
                <p>Driver Name</p>
                <div class="ratings">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <a href="#">Expand</a>
            </div>

            <div class="drivers">
                <div class="driver-img"></div>
                <p>Driver Name</p>
                <div class="ratings">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <a href="#">Expand</a>
            </div>

            <div class="drivers">
                <div class="driver-img"></div>
                <p>Driver Name</p>
                <div class="ratings">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <a href="#">Expand</a>
            </div>

            <div class="drivers">
                <div class="driver-img"></div>
                <p>Driver Name</p>
                <div class="ratings">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <a href="#">Expand</a>
            </div>

            <div class="drivers">
                <div class="driver-img"></div>
                <p>Driver Name</p>
                <div class="ratings">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <a href="#">Expand</a>
            </div>

            <div class="drivers">
                <div class="driver-img"></div>
                <p>Driver Name</p>
                <div class="ratings">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <a href="#">Expand</a>
            </div>

            <div class="drivers">
                <div class="driver-img"></div>
                <p>Driver Name</p>
                <div class="ratings">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <a href="#">Expand</a>
            </div>

            <div class="drivers">
                <div class="driver-img"></div>
                <p>Driver Name</p>
                <div class="ratings">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <a href="#">Expand</a>
            </div>

            <div class="drivers">
                <div class="driver-img"></div>
                <p>Driver Name</p>
                <div class="ratings">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <a href="#">Expand</a>
            </div>

            <div class="drivers">
                <div class="driver-img"></div>
                <p>Driver Name</p>
                <div class="ratings">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <a href="#">Expand</a>
            </div>

            <div class="drivers">
                <div class="driver-img"></div>
                <p>Driver Name</p>
                <div class="ratings">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <a href="#">Expand</a>
            </div>
        </div>
    </div>

    <footer>
        <p>Copyright | &copy; 2025 | GoMove</p>
    </footer>

    <script src="../assets/js/userHomepage.js"></script>
    
</body>
</html>