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
    <title>Waiting Area</title>
    <link rel="stylesheet" href="../assets/css/userWaitForDriver.css"> 

    
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
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


    
    <div class="container" id="wait-container">
        <div class="car">
            <img src="/Transportation-System/images/car_logo.png">
        </div>
        <div class="loading-text">Wait for your driver<span class="dots"></span></div>
        <div class="note-text">Note: This may take a while...</div>
        <div class="loader" id="loader"></div>
    </div>

    <div class="driver-late-container" id="driver-late-container">
        <div class="car">
            <img src="/Transportation-System/images/car_logo.png">
        </div>
        <div class="driver-loading-text">Driver is taking too long<span class="dots"></span></div>
        <div class="user-choice">
            <p class="cancel">Cancel</p>
            <p class="wait">Wait</p>
        </div>
    </div>
    
    <footer>
        <p>Copyright | &copy; 2025 | GoMove</p>
    </footer>

    <script src="../assets/js/userWaitForDriver.js"></script>


</body>
</html>