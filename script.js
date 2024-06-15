document.addEventListener('DOMContentLoaded', function() {
    var startButton = document.querySelector('.start-button');
    startButton.addEventListener('click', toggleStartMenu);
});

function toggleStartMenu() {
    var startMenu = document.querySelector('#start-menu');
    startMenu.classList.toggle('show');
}
