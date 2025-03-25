<?php

    session_start();
    include_once("../includes/connection.php");
    include_once("../includes/allFunction.php");
    include_once("../includes/signup_authentication.php");

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signup</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Playwrite+SK:wght@100..400&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="../assets/css/transportation_signup.css">
</head>
<body>
    <header>
        <h1 id="logo">GoMove</h1>
    </header>
    

    <h2 id="create-account">Create Account</h2>

    <div class="user-registration">
    <form action="" method="POST">
        <div class="fullname">
            <div id="firstname">
                <input type="text" name="firstname" placeholder="Firstname" required />
            </div>
            <div id="lastname">
            <input type="text" name="lastname" placeholder="Lastname" required />
            </div>
        </div>
        <input type="email" name="email" id="email" placeholder="Email" required />
        <input type="password" name="password" id="Password" placeholder="Password" required />
        <input type="text" name="contact_no" id="contact_no" placeholder="Contact No" required />
        <center><input type="submit" name="signup" id="createAccount-btn" value="Create Account" /></center>
    </form>


        <div class="links">Already have an account? 
            <a href="../pages/transportation_login.php" id="create">Login</a> <br>
         </div>
    </div>

</body>
</html>