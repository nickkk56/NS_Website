// Keep the "Drawn" year in the title block current.
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- project modal ----------
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalTag = document.getElementById('modal-tag');
const modalDesc = document.getElementById('modal-desc');
const modalThumb = document.getElementById('modal-thumb');
const modalClose = document.getElementById('modal-close');

function openModal(card){
    modalTitle.textContent = card.dataset.title || '';
    modalTag.textContent = card.dataset.tag || '';
    modalDesc.textContent = card.dataset.desc || '';
    const thumbBg = card.querySelector('.thumb')?.style.background || '';
    modalThumb.style.background = thumbBg;
    modal.showModal();
}

document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => openModal(card));
    // let keyboard users (Tab + Enter) open it too, since the card isn't a <button>
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' '){
            e.preventDefault();
            openModal(card);
        }
    });
});

modalClose.addEventListener('click', () => modal.close());

// click on the dimmed backdrop closes the modal
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
});