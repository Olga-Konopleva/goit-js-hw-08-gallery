import galleryItems from './gallery-items.js';

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

const gallery = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const imageModalRef = modalRef.querySelector('.lightbox__image');
const overlayRef = modalRef.querySelector('.lightbox__overlay');
const btnCloseRef = modalRef.querySelector('[data-action="close-lightbox"]');
const btnLeftRef = modalRef.querySelector('[data-action="left-lightbox"]');
const btnRightRef = modalRef.querySelector('[data-action="right-lightbox"]');

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
    img.setAttribute('data-index', galleryItems.indexOf(item));
    img.setAttribute('alt', item.description);
    a.append(img);
    return li;
});

gallery.append(...items);

let activeIndex;
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.

gallery.addEventListener('click', event => {
 event.preventDefault();
 activeIndex = Number(event.target.dataset.index);

 const srcOriginal = event.target.dataset.source; 
 const altImg = event.target.alt;
 changeAttributes(srcOriginal, altImg);
 openModal(event);
})

// Закрытие модального окна по клику на div.lightbox__overlay.
overlayRef.addEventListener('click', onOverlayClick);

// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].Очистка значения атрибута src элемента img.lightbox__image.
btnCloseRef.addEventListener('click', closeModal);

// Для перелистывания по кнопкам влево и вправо
btnLeftRef.addEventListener('click', onClickLeft);
btnRightRef.addEventListener('click', onClickRight);

function onOverlayClick (event) {
  if(event.target.className === "lightbox__overlay") {
    closeModal();
  };
}

function closeModal (event) {
  modalRef.classList.remove('is-open');
  changeAttributes('','');
  window.removeEventListener('keydown', flipArrows);
  window.removeEventListener('keydown', onEsc); 
}

// Подмена значения атрибута src элемента img.lightbox__image.
function changeAttributes (src, alt) {
 imageModalRef.src = src;
 imageModalRef.alt = alt;
}

// Открытие модального окна по клику на элементе галереи.
function openModal () {
  if(event.target.tagName === 'IMG') {
    modalRef.classList.add('is-open');
    window.addEventListener('keydown', onEsc);
    window.addEventListener('keydown', flipArrows);
 };
}

function onEsc (event) {
  if(event.code === 'Escape') {
    closeModal();
  }; 
}

// Перелистівание галлереи по клавишам влево и вправо
function flipArrows (event) {
  if(event.which === 37) {
    onClickLeft();
  }
  if(event.which === 39) {
    onClickRight();
  }
}

function onClickLeft () {
  if(activeIndex>0){
    imageModalRef.src = galleryItems[activeIndex-=1].original;
    }
}

function onClickRight () {
  if(activeIndex < galleryItems.length - 1){
    imageModalRef.src = galleryItems[activeIndex+=1].original;
    }
}

