//Javascript for tab navigation horizontal scroll buttons
const btnLeft = document.querySelector(".left-btn");
const btnRight = document.querySelector(".right-btn");
const tabMenu = document.querySelector(".tab-menu");

const iconVisibility = () => {
    let scrollLeftValue = Math.ceil(tabMenu.scrollLeft);
    btnLeft.style.display = scrollLeftValue > 0 ? "block" : "none";

    let scrollableWidth = tabMenu.scrollWidth - tabMenu.clientWidth;
    btnRight.style.display = scrollableWidth > scrollLeftValue ? "block" : "none";
}

let scrollInterval;

btnRight.addEventListener("mouseover", () => {
    // Début du défilement continu
    scrollInterval = setInterval(() => {
        tabMenu.scrollLeft += 150;
        iconVisibility();
    }, 50);
});

btnRight.addEventListener("mouseout", () => {
    // Arrêt du défilement continu lorsque le curseur est retiré du bouton
    clearInterval(scrollInterval);
});

btnLeft.addEventListener("mouseover", () => {
    // tabMenu.scrollLeft -= 150;
    // setTimeout(() => iconVisibility(), 50);

    scrollInterval = setInterval(() => {
        tabMenu.scrollLeft -= 150;
        iconVisibility();
    }, 50);
});

btnLeft.addEventListener("mouseout", () => {
    clearInterval(scrollInterval);
});

window.onload = function() {
    btnRight.style.display = tabMenu.scrollWidth > tabMenu.clientWidth || tabMenu.scrollWidth >= window.innerWidth ? "block" : "none";
    btnLeft.style.display = tabMenu.scrollWidth > window.innerWidth ? "" : "none";
};

window.onresize = function() {
    btnRight.style.display = tabMenu.scrollWidth > tabMenu.clientWidth || tabMenu.scrollWidth >= window.innerWidth ? "block" : "none";
    btnLeft.style.display = tabMenu.scrollWidth > window.innerWidth ? "" : "none";
    
    let scrollLeftValue = Math.round(tabMenu.scrollLeft);

    btnLeft.style.display = scrollLeftValue > 0 ? "block" : "none";
};

//Javascript to make the tab navigation draggable
let activeDrag = false;

tabMenu.addEventListener("mousemove", (drag) => {
    if(!activeDrag) return;

    tabMenu.scrollLeft -= drag.movementX;
    iconVisibility();
    tabMenu.classList.add("dragging");
});

document.addEventListener("mouseup", () => {
    activeDrag = false;
    tabMenu.classList.remove("dragging");
});

tabMenu.addEventListener("mousedown", () => {
    activeDrag = true;
});

//Javascript to view tab contents on click tab buttons
const tabs = document.querySelectorAll(".tab");
const tabBtns = document.querySelectorAll(".tab-btn");

const tabNav = function(tabBtnClick) {
    tabBtns.forEach((tabBtn) => {
        tabBtn.classList.remove("active");
    })

    tabs.forEach((tab) => {
        tab.classList.remove("active");
    })

    tabBtns[tabBtnClick].classList.add("active");
    tabs[tabBtnClick].classList.add("active");
};

tabBtns.forEach((tabBtn, i) => {
    tabBtn.addEventListener("click", () => {
        tabNav(i);
    });
});