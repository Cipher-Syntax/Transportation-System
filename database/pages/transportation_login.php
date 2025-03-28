<?php

    session_start();
    include_once("../includes/connection.php");
    include_once("../includes/allFunction.php");
    include_once("../includes/login_authentication.php");

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Playwrite+SK:wght@100..400&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="../assets/css/transportation_login.css" >
</head>
<body>
    <header>
        <h1 id="logo">GoMove</h1>
    </header>
    

    <h2 id="login">Log in</h2>

    <div class="user-registration">
        <form method="POST">
            <input type="email" name="email" id="email" placeholder="Email" required/>
            <input type="password" name="password" id="Password" placeholder="Password" required/>
            
            <center><input type="submit" name="button" id="login-btn" value="Login" /></center>
        </form>

        <div class="links">Don't have an account? 
            <a href="../pages/transportation_signup.php" id="create">Create Account</a> <br>
            <a href="#" id="forgot">Forgot Password?</a>
         </div>
    </div>
</body>
</html>