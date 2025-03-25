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
    <title>Driver Homepage</title>

    <link rel="stylesheet" href="../assets/css/driverHomepage.css" >
    <link rel="stylesheet" href="../assets/css/driverUserOverlay.css" >
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
    
    <div class="driver-info-container">
        <div class="driver-profile">
            <img src="/Transportation-System/images/cipher.jpg" alt="deiver-profile" >
        </div>

        <div class="driver-info">
            <div id="name">
                <h2><?php echo $_SESSION['firstname'] . " " . $_SESSION['lastname']; ?></h2>
            </div>
            <div id="contact-info">
                <p><?php echo $_SESSION['email'];?></p>
            </div>
            <div id="contact-number">
                <p><?php echo $_SESSION['contact_no'];?></p>
            </div>
        </div>

        <div class="quota">
            <h2>1 / 10</h2>
        </div>
    </div>

    <div class="interaction">
        <div class="hero-img">
            <div class="interaction-container">
                <div class="image-container">
                    <div class="hero-container">
                        <h3 id="interaction-logo">GoMove</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
            
    <hr id="separator">

    <div class="history-scroller">
        <h2 id="history">History</h2>

        <div class="history-users">
            <div class="users">
                <div class="user-img"></div>
                <p>User Name</p>
                <div class="ratings">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <a href="#">Expand</a>
            </div>

            <div class="users">
                <div class="user-img"></div>
                <p>User Name</p>
                <div class="ratings">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <a href="#">Expand</a>
            </div>

            <div class="users">
                <div class="user-img"></div>
                <p>User Name</p>
                <div class="ratings">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <a href="#">Expand</a>
            </div>

            <div class="users">
                <div class="user-img"></div>
                <p>User Name</p>
                <div class="ratings">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <a href="#">Expand</a>
            </div>

            <div class="users">
                <div class="user-img"></div>
                <p>User Name</p>
                <div class="ratings">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <a href="#">Expand</a>
            </div>

            <div class="users">
                <div class="user-img"></div>
                <p>User Name</p>
                <div class="ratings">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <a href="#">Expand</a>
            </div>

            <div class="users">
                <div class="user-img"></div>
                <p>User Name</p>
                <div class="ratings">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <a href="#">Expand</a>
            </div>

            <div class="users">
                <div class="user-img"></div>
                <p>User Name</p>
                <div class="ratings">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <a href="#">Expand</a>
            </div>

            <div class="users">
                <div class="user-img"></div>
                <p>User Name</p>
                <div class="ratings">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <a href="#">Expand</a>
            </div>

            <div class="users">
                <div class="user-img"></div>
                <p>User Name</p>
                <div class="ratings">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <a href="#">Expand</a>
            </div>

            <div class="users">
                <div class="user-img"></div>
                <p>User Name</p>
                <div class="ratings">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <a href="#">Expand</a>
            </div>

            <div class="users">
                <div class="user-img"></div>
                <p>User Name</p>
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

    <div class="overlay-container" id="userOverlay">
        <div class="display-container">
            <div class="container">
                <div class="image-container">
                    <img src="../assets/images/cipher.jpg">
                </div>
                
                <div class="location">
                    <div class="user-location">
                        <p>Name: Jenson</p>
                        <p>Location: Ayala</p>
                        <p>Destination: Pueblo</p>
                    </div>
                    
                    <div class="user-how-far-from-driver">
                        <h3>10 km far</h3>
                    </div>
                </div>
                
                <div class="action">
                    <p id="rejectBtn">Reject</p>
                    <p id="acceptBtn">Accept</p>
                </div>
            </div>
        </div>
    </div>
    
    <footer>
        <p>Copyright | &copy; 2025 | GoMove</p>
    </footer>

    <script src="../assets/js/driverHomepage.js"></script>

    
    
</body>
</html>