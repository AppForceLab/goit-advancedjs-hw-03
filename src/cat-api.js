import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_ZYoofX8lPZPksK64naQNqNt6Z7k97j9su2yVEy5XBJSvDx99KWxen8fXWLm5gIKg';

const BASE_URL = 'https://api.thecatapi.com';
const END_POINT_BREEDS = 'v1/breeds';
const END_POINT_SEARCH = 'v1/images/search';

function errorScan(resp) {
  if (resp.status != 200) {
    throw Error(resp.statusText || 'Anknown error');
  }
}

async function fetchBreeds() {
  const resp = await axios.get(`${BASE_URL}/${END_POINT_BREEDS}`);
  errorScan(resp);
  return resp.data;
}

async function fetchCatByBreed(breed_ids) {
  const resp = await axios.get(
    `${BASE_URL}/${END_POINT_SEARCH}?breed_ids=${breed_ids}`
  );
  errorScan(resp);
  return resp.data[0];
}

export { fetchBreeds, fetchCatByBreed };
