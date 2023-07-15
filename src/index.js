import { fetchBreeds, fetchCatByBreed } from "./cat";
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const refs = {
    selector: document.querySelector('.breed-select'),
    divCatInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};

const { selector, divCatInfo, loader, error } = refs;

loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
divCatInfo.classList.add('is-hidden');
selector.classList.replace('breed-select', 'is-hidden');

fetchBreeds()
  .then(data => {
    const markup = data.map(({id,name}) => `<option value="${id}">${name}</option>`)
   .join();
    selector.innerHTML = markup;
    
    selector.classList.replace('is-hidden', 'breed-select');
    
    new SlimSelect({
    select: '.breed-select',
  });
})
  .catch(onFetchError);    

selector.addEventListener('change', onSelectBreed);

Notiflix.Notify.success('Choose your cat', {
  position: 'center-center'
});
    
function onSelectBreed(event) {
  loader.innerHTML = '';
  loader.classList.replace('is-hidden', 'loader');
  selector.classList.add('is-hidden');
  divCatInfo.classList.add('is-hidden');

  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
  .then(data => {
  loader.classList.replace('loader', 'is-hidden');
  selector.classList.remove('is-hidden');
  const { url, breeds } = data[0];
        
  divCatInfo.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width="400"/>
    <div class="description">
    <h1>${breeds[0].name}</h1>
    <p>${breeds[0].description}</p>
    <p><b>Temperament:</b> ${breeds[0].temperament}</p>
    </div>`
    divCatInfo.classList.remove('is-hidden');
    })
  .catch(onFetchError);
};

function onFetchError(error) {
  selector.classList.remove('is-hidden');
  loader.classList.replace('loader', 'is-hidden');

  Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!', {
    position: 'center-center'});
};