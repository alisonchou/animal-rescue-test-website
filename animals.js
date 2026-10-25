const STORAGE_KEY = 'favoriteAnimals';
const animals = [
  { id: 0, name: 'Tabitha', species: 'Cat', age: '5 years' },
  { id: 1, name: 'Strawberry', species: 'Dog', age: '3 months' },
  { id: 2, name: 'Mochi', species: 'Cat', age: '2 years' },
  { id: 3, name: 'Mango', species: 'Cat', age: '4 months' }
];

let favorites = loadFavorites();

const animalList = document.getElementById('animal-list');
const favoritesList = document.getElementById('favorites-list');
const favoritesCount = document.getElementById('favorites-total');
const noFavorites = document.getElementById('no-favorites');

function loadFavorites() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveFavorites() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

function isFavorite(id) {
  return favorites.includes(id);
}

function toggleFavorite(id) {
  if (isFavorite(id)) {
    // remove from favorites
    favorites = favorites.filter((favoriteId) => favoriteId !== id);
  } else {
    // add to favorites
    favorites.push(id);
  }

  saveFavorites();
  render();
}

function createAnimalCard(animal) {
  const saved = isFavorite(animal.id); // whether animal is favorited
  return `<li class='animal-card'>
      <img src='media/${animal.name.toLowerCase()}.jpg' alt='${animal.name}, a ${animal.species.toLowerCase()}'>
      <h3>${animal.name}</h3>
      <p>${animal.species}, ${animal.age}</p>
      <button type='button' class='${saved ? 'saved' : ''}' data-id='${animal.id}' aria-pressed='${saved}'>
        ${saved ? 'Saved' : 'Save'}
      </button>
    </li>`;
}

function createFavoriteItem(animal) { // item in Favorites list
  return `<li>
      <span><strong>${animal.name}</strong> (${animal.species})</span>
      <button type='button' class='remove' data-id='${animal.id}'>Remove</button>
    </li>`;
}

function renderAnimals() {
  animalList.innerHTML = animals.map(createAnimalCard).join('');
}

function renderFavorites() {
  const favoriteAnimals = animals.filter((animal) => isFavorite(animal.id));
  favoritesList.innerHTML = favoriteAnimals.map(createFavoriteItem).join('');
  favoritesCount.textContent = favoriteAnimals.length;
  noFavorites.hidden = favoriteAnimals.length > 0;
}

function render() {
  renderAnimals();
  renderFavorites();
}

function handleClick(event) {
  const button = event.target.closest('button[data-id]');
  if (button) {
    toggleFavorite(Number(button.dataset.id));
  }
}

animalList.addEventListener('click', handleClick);
favoritesList.addEventListener('click', handleClick);

render();
