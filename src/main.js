import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
const API_KEY = '46312866-230437729350338e2d6e4b6e5';

form.addEventListener('submit', e => {
  e.preventDefault();
  const query = document.getElementById('search-query').value.trim();
  if (query) {
    searchImages(query);
  } else {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
      position: 'topCenter',
      timeout: 3000,
    });
  }
});

function searchImages(query) {
  loader.style.display = 'block';
  gallery.innerHTML = ''; // Clear gallery before the new search
  fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
      query
    )}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      loader.style.display = 'none';
      if (data.hits.length > 0) {
        displayImages(data.hits);
      } else {
        iziToast.info({
          title: 'No Results',
          message: 'Sorry, no images found. Please try another search term!',
          position: 'topCenter',
          timeout: 3000,
        });
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      loader.style.display = 'none';
      iziToast.error({
        title: 'Error',
        message:
          'Failed to fetch images. Please check your internet connection and try again.',
        position: 'topCenter',
        timeout: 3000,
      });
    });
}

function displayImages(images) {
  const galleryItems = images
    .map(
      image => `
    <a href="${image.largeImageURL}" class="gallery-item" data-lightbox="gallery" data-title="${image.tags}">
      <img src="${image.webformatURL}" alt="${image.tags}" />
      <div class="image-info">
        <span><i class="fas fa-heart"></i> ${image.likes}</span>
        <span><i class="fas fa-eye"></i> ${image.views}</span>
        <span><i class="fas fa-comments"></i> ${image.comments}</span>
        <span><i class="fas fa-download"></i> ${image.downloads}</span>
      </div>
    </a>
  `
    )
    .join('');
  gallery.innerHTML = galleryItems;
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}
