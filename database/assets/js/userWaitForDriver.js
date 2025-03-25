document.addEventListener("DOMContentLoaded", function () {
    const waitContainer = document.getElementById("wait-container");
    const driverLateContainer = document.getElementById("driver-late-container");
    const loader = document.getElementById("loader");
    const waitButton = document.querySelector(".wait");
    const cancelButton = document.querySelector(".cancel");

    driverLateContainer.style.display = "none";

    function showDriverLateContainer() {
        waitContainer.style.display = "none";
        driverLateContainer.style.display = "block";
        loader.style.display = "none";
    }

    function restartWaiting() {
        driverLateContainer.style.display = "none";
        waitContainer.style.display = "block";
        loader.style.display = "block";
        setTimeout(showDriverLateContainer, 10000);
    }

    setTimeout(showDriverLateContainer, 10000);
    waitButton.addEventListener("click", restartWaiting);
    cancelButton.addEventListener("click", () => {
        window.location.href = "/Transportation-System/userHomepage/userHomepage.html";
    });
});

document.getElementById('menu-icon').addEventListener('click', function() {
    document.getElementById('sidebar').classList.add('active');
});

document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('sidebar').classList.remove('active');
});