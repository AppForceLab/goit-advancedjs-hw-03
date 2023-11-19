import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let breadData = [];
const catInfoPlaceholder = document.querySelector('.cat-info');
const loaderSelect = document.querySelector('.loader-select');
const selectWrap = document.querySelector('.selet-wrap');
const loaderInfo = document.querySelector('.loader-info');

const breedSelect = new SlimSelect({
  select: '.breed-select',
  settings: {
    showSearch: false,
    placeholderText: 'Choose the breed',
  },
  events: { afterChange: onSelect },
});

function buildSelect() {
  setVisibility(loaderSelect, true);
  setVisibility(selectWrap, false);

  fetchBreeds()
    .then(data => {
      data.forEach(({ name, id }) => {
        breadData.push({
          text: name,
          value: id,
        });
      });
      console.log(breadData);
      breedSelect.setData(breadData);

      setVisibility(loaderSelect, false);
      setVisibility(selectWrap, true);
    })
    .catch(err => {
      iziToast.error({
        title: err.message,
        message: 'Try againe later',
      });
    });
}

buildSelect();

function onSelect(values) {
  catInfoPlaceholder.innerHTML = '';
  setVisibility(loaderInfo, true);

  fetchCatByBreed(values[0].value)
    .then(data => {
      let url = data['url'];
      let catInfo = data.breeds[0];
      let imgContent = `<img class="cat-img" src="https://thumbs.dreamstime.com/b/placeholder-banner-cat-isolated-white-41538574.jpg" alt="No img" />`;
      let textContent = ``;

      if (url) {
        imgContent = ` <img class="cat-img" src="${url}" alt="cat image"/>`;
      }

      if (catInfo) {
        textContent = `
         <div class="info-box">
             <h1 class="info-box__header">${catInfo.name}</h1>
             <p class="info-box__descr">${catInfo.description}</p>
             <p><span class="info-box_span">Temperament:</span> ${catInfo.temperament}</p>
         </div>`;
      }

      setVisibility(loaderInfo, false);
      catInfoPlaceholder.innerHTML = imgContent + textContent;
    })
    .catch(err => {
      iziToast.error({
        title: err.message,
        message: 'Try againe later',
      });
    });
}

function setVisibility(el, isVisible) {
  if (isVisible) {
    el.classList.remove('visually-hidden');
  } else {
    el.classList.add('visually-hidden');
  }
}
