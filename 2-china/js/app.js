const parallax_el = document.querySelectorAll(".parallax");
const main = document.querySelector("main");
let x_value = 0, y_value = 0;

let rotate_degree = 0;

function update(cursor_position) {
    parallax_el.forEach(el => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotate_speed = el.dataset.rotation;

        let is_in_left = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;

        let z_value = (cursor_position - parseFloat(getComputedStyle(el).left)) * is_in_left * 0.1;

        el.style.transform = `perspective(2300px) translateZ(${z_value * speedz}px) 
        rotateY(${rotate_degree * rotate_speed}deg)
        translateX(calc(-50% + ${-x_value * speedx}px)) 
        translateY(calc(-50% + ${y_value * speedy}px))`;

    })
}

update(0);

window.addEventListener("mousemove", (e) => {

    if (timeline.isActive()) return;

    x_value = e.clientX - window.innerWidth / 2;
    y_value = e.clientY - window.innerHeight / 2;

    rotate_degree = (x_value / (window.innerWidth / 2)) * 20;

    update(e.clientX);

});


if (window.innerWidth >= 725) {
    main.style.maxHeight = `${window.innerWidth * 0.6}px`;
} else {
    main.style.maxHeight = `${window.innerWidth * 1.6}px`;

}

// GSAP animation

let timeline = gsap.timeline();

// l'animation est bug :-:
Array.from(parallax_el)
    .filter((el) => !el.classList.contains("text"))
    .forEach((el) => {
        timeline.from(
            el,
            {
                top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
                duration: 3.5,
                ease: "power3.out"

            },
            "1"
            // nombre de sec avant que le browser fasse l'animation
        );

    });

// getBoundingClientRect pour récupérer le nombre pixel au dessus du titre

timeline.from(".text h1", {
    y: window.innerHeight - document.querySelector(".text h1").getBoundingClientRect().top + 200,
    duration: 2,
}, "2.5")
    .from(
        ".text h2",
        {
            y: -150,
            opacity: 0,
            duration: 1.5,
        }, "3"
    )
    .from(".hide",
        {
            opacity: 0,
            duration: 1.5,

        }, "3");
