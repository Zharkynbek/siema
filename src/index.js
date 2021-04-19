import './styles.css';
import gallery from './gallery-items.js';
import Siema from 'siema';

const refs = {
  gallery: document.querySelector('.gallery'),
  modal: document.querySelector('.lightbox'),
  modalImg: document.querySelector('.lightbox__image'),
  siema: document.querySelector('.siema'),
};
let activeIndex = 0;
const markup = gallery.map(({ original, description }) => {
  return `<div class="gallery__item">
  <img class="gallery__image"  src="${original}" alt="${description}">
  </div>`;
});
refs.siema.insertAdjacentHTML('beforeend', markup.join(''));
refs.gallery.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  markup.forEach((el, ind) => {
    if (el.includes(e.target.src)) {
      activeIndex = ind;
    }
  });
  window.addEventListener('keyup', keyboardManipulation);
  refs.modal.classList.add('is-open');
  refs.modalImg.src = e.target.dataset.source;
});
refs.modal.addEventListener('click', e => {
  if (e.target.nodeName === 'IMG') {
    return;
  }
  closeModal();
});
function closeModal() {
  window.removeEventListener('keyup', keyboardManipulation);
  refs.modal.classList.remove('is-open');
  refs.modalImg.src = '#';
}
function keyboardManipulation({ key }) {
  switch (key) {
    case gallery.length - 1 > activeIndex && 'ArrowRight':
      activeIndex += 1;
      refs.modalImg.src = gallery[activeIndex].original;
      break;
    case activeIndex > 0 && 'ArrowLeft':
      activeIndex -= 1;
      refs.modalImg.src = gallery[activeIndex].original;
      break;
    case activeIndex === gallery.length - 1 && 'ArrowRight':
      activeIndex = 0;
      refs.modalImg.src = gallery[activeIndex].original;
      break;
    case activeIndex === 0 && 'ArrowLeft':
      activeIndex = gallery.length - 1;
      refs.modalImg.src = gallery[activeIndex].original;
      break;
    case 'Escape':
      closeModal();
      break;
    default:
      alert('что-то пошло не так');
  }
}

const mySiema = new Siema();
document.querySelector('.pre').addEventListener('click', () => mySiema.prev());
document.querySelector('.next').addEventListener('click', () => mySiema.next());
new Siema();

const str1 = 'doGG';
const str2 = 'dGGo'; // true

const str3 = 'hello woRld';
const str4 = 'woRld hello'; // true

const str5 = 'dog';
const str6 = 'dGo'; // false

const getBool = (a, b) => {
  return a.split('').sort().join('') === b.split('').sort().join('');
};

console.log(getBool(str5, str6));
