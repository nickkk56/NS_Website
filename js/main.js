const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Мгновенно перемещаем точку
    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    // Ореол будет двигаться чуть медленнее за счет CSS transition
    outline.style.left = `${posX}px`;
    outline.style.top = `${posY}px`;
});

// Эффект при наведении на интерактивные элементы
const interactives = document.querySelectorAll('a, button, .work-card');
interactives.forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => outline.classList.remove('cursor-hover'));
});