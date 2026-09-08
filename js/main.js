
// ... Cursor Effects ...
// Проверяем, есть ли у пользователя точный указатель (мышь или стилус)
const isMouseDevice = window.matchMedia('(pointer: fine)').matches;

if (isMouseDevice) {
    // Весь твой текущий код (const outline = ..., window.addEventListener...)
    // должен находиться ВНУТРИ этого блока if
const outline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Двигаем только кольцо
    outline.style.left = `${posX}px`;
    outline.style.top = `${posY}px`;
});

// Эффект при наведении на интерактивные элементы
const interactives = document.querySelectorAll('a, button, .work-card');
interactives.forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => outline.classList.remove('cursor-hover'));
});

}
// ... Cursor Effects ...
