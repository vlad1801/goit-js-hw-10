const BASE_URL_BREEDS = 'https://api.thecatapi.com/v1/breeds';
const BASE_URL_IMAGES = 'https://api.thecatapi.com/v1/images';
const API_KEY = 'live_Q9MwHdsjBD6qANkYqO01LZ5ibm2qoWRo7CQnkI4r4DnwicEZq7oWipcb1yn21vVG';

export function fetchBreeds() {
  return fetch(`${BASE_URL_BREEDS}?api_key=${API_KEY}`)
    .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL_IMAGES}/search?api_key=${API_KEY}&breed_ids=${breedId}`)
    .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};