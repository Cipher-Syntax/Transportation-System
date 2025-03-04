const dots = document.querySelector('.dots');

let count = 0;

setInterval(() => {
    count = (count + 1) % 4; // Loop through 0,1,2,3
    dots.innerHTML = ".".repeat(count);
}, 500);
