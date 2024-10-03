'use strict';

import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';

// DOM Elements
const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
const loadMoreContainer = document.querySelector('.load-more-container');
const loadMoreBtn = document.getElementById('load-more');
const endMessage = document.getElementById('end-message');

// API Information
const API_KEY = '46312866-230437729350338e2d6e4b6e5';
const BASE_URL = 'https://pixabay.com/api/';
const IMAGES_PER_PAGE = 40;

// State
let state = {
  currentPage: 1,
  currentQuery: '',
  totalHits: 0,
};

// Initialize UI
function initializeUI() {
  loadMoreBtn.textContent = 'Load more';
  loadMoreBtn.style.display = 'none';
  loadMoreContainer.appendChild(loadMoreBtn);
  endMessage.style.display = 'none';
}

// Handle Search Form Submission
form.addEventListener('submit', handleSearchSubmit);

function handleSearchSubmit(e) {
  e.preventDefault();
  const query = document.getElementById('search-query').value.trim();
  if (query) {
    resetSearchState(query);
    searchImages(query, state.currentPage);
  } else {
    iziToast.error({ title: 'Error', message: 'Please enter a search term!' });
  }
}

// Reset search state for a new query
function resetSearchState(query) {
  state.currentPage = 1;
  state.currentQuery = query;
  state.totalHits = 0;
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';
  endMessage.style.display = 'none';
}

// Fetch images from API
async function searchImages(query, page) {
  toggleLoader(true);
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page,
        per_page: IMAGES_PER_PAGE,
      },
    });
    handleSearchResponse(response.data);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again!',
    });
  } finally {
    toggleLoader(false);
  }
}

// Handle search API response
function handleSearchResponse(data) {
  state.totalHits = data.totalHits;

  if (data.hits.length > 0) {
    displayImages(data.hits);
    toggleLoadMoreButton(data.hits.length);
    smoothScroll();
  } else {
    iziToast.error({
      title: 'No Results',
      message: 'Sorry, no images found. Please try again!',
    });
  }
}

// Display images in the gallery
function displayImages(images) {
  const galleryItems = images.map(createGalleryItem).join('');
  gallery.innerHTML += galleryItems;
  refreshLightbox();
}

// Create gallery item markup
function createGalleryItem(image) {
  return `
    <a href="${image.largeImageURL}" class="gallery-item">
      <img src="${image.webformatURL}" alt="${image.tags}" />
      <div class="image-info">
        <span><i class="fas fa-heart"></i> ${image.likes}</span>
        <span><i class="fas fa-eye"></i> ${image.views}</span>
        <span><i class="fas fa-comments"></i> ${image.comments}</span>
        <span><i class="fas fa-download"></i> ${image.downloads}</span>
      </div>
    </a>
  `;
}

// Refresh SimpleLightbox
function refreshLightbox() {
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}

// Toggle loader visibility
function toggleLoader(isVisible) {
  loader.style.display = isVisible ? 'block' : 'none';
}

// Toggle load more button visibility
function toggleLoadMoreButton(itemsLoaded) {
  if (state.currentPage * IMAGES_PER_PAGE >= state.totalHits) {
    loadMoreBtn.style.display = 'none';
    endMessage.style.display = 'block';
  } else {
    loadMoreBtn.style.display = 'block';
    endMessage.style.display = 'none';
  }
}

// Smooth scroll effect
function smoothScroll() {
  const galleryItemHeight = document
    .querySelector('.gallery-item')
    .getBoundingClientRect().height;
  window.scrollBy({ top: galleryItemHeight * 2, behavior: 'smooth' });
}

// Load more images
loadMoreBtn.addEventListener('click', loadMoreImages);

async function loadMoreImages() {
  state.currentPage++;
  await searchImages(state.currentQuery, state.currentPage);
}

// Initialize the app
initializeUI();
