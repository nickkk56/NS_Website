// Keep the "Drawn" year in the title block current.
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- project data ----------
// One object per project, keyed by the same string used in
// data-project="..." on the card in index.html.
// "desc" is an array — each string becomes its own paragraph in the modal,
// so add as many as you need.
const projects = {
    terraviva: {
        title: 'Terraviva',
        tag: 'Competition entry — 2024',
        images: [
            'images/terraviva/1.jpg',
            'images/terraviva/2.jpg',
            'images/terraviva/3.jpg'
        ],
        desc: [
            'A competition proposal exploring adaptive reuse of industrial waterfront structures.',
            'Replace this with the real project text — you can add as many paragraphs as you want by adding more strings to this array in main.js.'
        ]
    },
    villa: {
        title: 'Private Villa',
        tag: 'Arch · Str · MEP · Site — In progress',
        images: [
            'images/villa/1.jpg',
            'images/villa/2.jpg'
        ],
        desc: [
            'A fully coordinated four-discipline villa project used to establish office-wide BIM standards.'
        ]
    },
    student01: {
        title: 'Student Project 01',
        tag: 'Academic — 2022',
        images: ['images/student01/1.jpg'],
        desc: ['Placeholder description — replace with the real project text.']
    },
    student02: {
        title: 'Student Project 02',
        tag: 'Academic — 2022',
        images: [
            'images/terraviva/1.jpg',
            'images/terraviva/2.jpg'   // <-- вот вторая фотка
        ],
        desc: ['Placeholder description — replace with the real project text.']
    }
};

// ---------- project modal ----------
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalTag = document.getElementById('modal-tag');
const modalDesc = document.getElementById('modal-desc');
const modalGallery = document.getElementById('modal-gallery');
const modalClose = document.getElementById('modal-close');

function openModal(projectKey){
    const project = projects[projectKey];
    if (!project) return;

    modalTitle.textContent = project.title;
    modalTag.textContent = project.tag;

    // build one <img> per entry in project.images
    modalGallery.innerHTML = '';
    project.images.forEach((src) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = project.title;
        modalGallery.appendChild(img);
    });

    // build one <p> per paragraph in project.desc
    modalDesc.innerHTML = '';
    project.desc.forEach((paragraph) => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        modalDesc.appendChild(p);
    });

    modal.showModal();
}

document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => openModal(card.dataset.project));
    // let keyboard users (Tab + Enter) open it too, since the card isn't a <button>
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' '){
            e.preventDefault();
            openModal(card.dataset.project);
        }
    });
});

modalClose.addEventListener('click', () => modal.close());

// click on the dimmed backdrop closes the modal
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
});