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