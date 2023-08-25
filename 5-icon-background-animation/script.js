document.addEventListener("DOMContentLoaded", function () {

    let section = document.querySelector("section")

    for (let i = 0; i < 20; i++) {
        let row = document.querySelector(".row");
        let clonedRow = row.cloneNode(true); // Cloner l'élément .row
        section.appendChild(clonedRow); // Ajouter le clone à la section
    }
});
