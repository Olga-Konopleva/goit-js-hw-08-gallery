import galleryItems from './gallery-items.js';

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

const gallery = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const imageModalRef = modalRef.querySelector('.lightbox__image');
const btnCloseRef = modalRef.querySelector('.lightbox__button');

const items = galleryItems.map(item => {
    const li = document.createElement('li');
    li.classList.add('gallery__item');
    const a = document.createElement('a');
    a.setAttribute('href', item.original);
    li.append(a);
    const img = document.createElement('img');
    img.classList.add('gallery__link');
    img.setAttribute('src', item.preview);
    img.setAttribute('data-source', item.original);
    img.setAttribute('alt', item.description);
    a.append(img);
    return li;
});

gallery.append(...items);

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.

gallery.addEventListener('click', event => {
  event.preventDefault();
 const srcOriginal = event.target.dataset.source; 
 const altImg = event.target.alt;
 console.log(event.target.tagName);
 // Открытие модального окна по клику на элементе галереи.
 if(event.target.tagName === 'IMG') {
    modalRef.classList.add('is-open');
 };
 changeAttributes(srcOriginal, altImg);
})


// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].Очистка значения атрибута src элемента img.lightbox__image.
btnCloseRef.addEventListener('click', () => {
  modalRef.classList.remove('is-open');
  changeAttributes('',''); 
})

// Подмена значения атрибута src элемента img.lightbox__image.
function changeAttributes (src, alt) {
 imageModalRef.src = src;
 imageModalRef.alt = alt;
}

