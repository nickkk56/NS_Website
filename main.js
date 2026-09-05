// Keep the "Drawn" year in the title block current.
document.getElementById('year').textContent = new Date().getFullYear();

const dialog = document.getElementById('project-modal');

// открыть
dialog.showModal(); // показывает поверх всего + затемняет фон (::backdrop)

// закрыть
dialog.close();

// закрытие по клику на затемнённый фон
dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
});

// закрытие по Esc — работает "из коробки", ничего писать не нужно