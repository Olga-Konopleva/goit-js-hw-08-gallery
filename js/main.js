import galleryItems from './gallery-items.js';

const gallery = document.querySelector('.js-gallery');

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








/* 
<li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li> */