document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const aside = document.querySelector('.aside');

    menuToggle.addEventListener('click', (e) => {
        aside.classList.toggle('active');

        if (aside.classList.contains('active')) {
            menuToggle.textContent = '✕';
        } else {
            menuToggle.textContent = '☰';
        }
        e.stopPropagation();
    });

    document.addEventListener('click', (e) => {
        if (!aside.contains(e.target) && !menuToggle.contains(e.target)) {
            aside.classList.remove('active');
            menuToggle.textContent = '☰';
        }
    })
});