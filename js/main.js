
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


// Функция для запуска анимации при скролле
const revealOnScroll = () => {
    const observerOptions = {
        threshold: 0.15 // Элемент считается "видимым", когда 15% его площади показалось на экране
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Добавляем класс, когда элемент входит в зону видимости
                entry.target.classList.add('active');
                // Если хочешь, чтобы анимация проигрывалась только один раз,
                // можно раскомментировать строку ниже:
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Находим все элементы с классом .reveal и запускаем за ними слежку
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
};

// Запускаем функцию после загрузки страницы
document.addEventListener('DOMContentLoaded', revealOnScroll);

// Функция для обработки кликов с задержкой
const setupDelayedLinks = () => {
    // Выбираем все карточки или кнопки, которые должны иметь эффект
    // В твоем случае это .cta-card или .btn
    const delayedElements = document.querySelectorAll('.cta-card, .btn');

    delayedElements.forEach(el => {
        el.addEventListener('click', function(e) {
            // 1. Проверяем, есть ли у элемента ссылка (href)
            const href = this.getAttribute('href');

            if (href && href !== '#') {
                // 2. Останавливаем мгновенный переход браузера
                e.preventDefault();

                // 3. Добавляем класс "нажатия"
                this.classList.add('is-pressed');

                // 4. Ждем 200мс (0.2 сек) и переходим
                setTimeout(() => {
                    window.location.href = href;
                }, 200);
            }
        });
    });
};

// Запускаем функцию после загрузки DOM
document.addEventListener('DOMContentLoaded', setupDelayedLinks);
// Modal Elements
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.querySelector('.modal-close');
const workCards = document.querySelectorAll('.work-card');

const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalDescription = document.getElementById('modalDescription');
const modalImage = document.getElementById('modalImage');
const modalStack = document.getElementById('modalStack');

// Gallery State
let currentImages = [];
let currentIndex = 0;

// Navigation Buttons
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Функция обновления картинки в модалке
const updateModalImage = () => {
    modalImage.src = currentImages[currentIndex];
};

workCards.forEach(card => {
    card.addEventListener('click', () => {
        // 1. Извлекаем данные
        const title = card.getAttribute('data-title');
        const category = card.getAttribute('data-category');
        const description = card.getAttribute('data-description');
        const stack = card.getAttribute('data-stack');

        // 2. Работа с галереей (превращаем строку в массив)
        const imagesAttr = card.getAttribute('data-images');
        currentImages = imagesAttr ? imagesAttr.split(',') : [];
        currentIndex = 0;

        // 3. Наполняем текст
        modalTitle.textContent = title;
        modalCategory.textContent = category;
        modalDescription.textContent = description;
        modalStack.textContent = stack;

        // 4. Настраиваем картинку
        if (currentImages.length > 0) {
            updateModalImage();
            // Показываем/скрываем кнопки навигации (если фото больше одного)
            document.querySelector('.modal-nav').style.display = currentImages.length > 1 ? 'flex' : 'none';
        }

        // 5. Открываем
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Навигация по фото
nextBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Чтобы не сработал клик по overlay
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateModalImage();
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateModalImage();
});

// Закрытие
const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
};

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});