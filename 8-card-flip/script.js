// for single card
const card = document.querySelector('.card__inner');

card.addEventListener('click', function () {
    card.classList.toggle('is-flipped');
})


// for multiple cards
// const cards = document.querySelectorAll('.card__inner');

// cards.forEach((cards) => cards.addEventListener('click', function () {
//     cards.classList.toggle('is-flipped');
// }));