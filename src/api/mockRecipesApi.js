import * as fish from './fish.json';
import * as meat from './meat.json';
import * as bakery from './bakery.json';
import * as desserts from './desserts.json';
const delay = 1000;

let detailedRecipes = {};
detailedRecipes.meat = meat;
detailedRecipes.fish = fish;
detailedRecipes.bakery = bakery;
detailedRecipes.desserts = desserts;

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const recipes = [
  {
    id: "crunchy-apple-pie-without-eggs",
    title: "Crunchy apple pie without eggs",
    cookingTime: "45",
    category: "Bakery"
  },
  {
    id: "currant-brownie",
    title: "Currant brownie",
    cookingTime: "70",
    category: "Bakery"
  },
  {
    id: "berry-sour-cream-pie",
    title: "Berry sour cream pie",
    cookingTime: "100",
    category: "Bakery"
  },
  {
    id: "baked-dorado",
    title: "Baked dorado",
    cookingTime: "50",
    category: "Fish"
  },
  {
    id: "cottage-chees-biscuits",
    title: "Cottage cheese biscuits",
    cookingTime: "60",
    category: "Bakery"
  },
  {
    id: 'mild-apple-pie',
    title: 'Mild apple pie',
    cookingTime: "90",
    category: "Bakery"
  },
  {
    id: 'aunt-beef',
    title: 'Aunt beef',
    cookingTime: "120",
    category: "Meat"
  },
  {
    id: 'braised-rabbit',
    title: 'Braised rabbit',
    cookingTime: "120",
    category: "Meat"
  },
  {
    id: 'baked-pork',
    title: 'Baked pork',
    cookingTime: "120",
    category: "Meat"
  },
  {
    id: 'chocolate-cake',
    title: 'Chocolate cake',
    cookingTime: "120",
    category: "Desserts"
  },
  {
    id: 'italian-ice-cream',
    title: 'Italian ice-cream',
    cookingTime: "30",
    category: "Desserts"
  }
];

class RecipesApi {
  static getAllRecipes() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], recipes));
      }, delay);
    });
  }

  static getRecipeData(category, id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Object.keys(detailedRecipes).forEach(key => {
          if (key === category) {
            let recipe = detailedRecipes[category][id];
            resolve(recipe);
          }
        });
      }, delay);
    });
  }
}

export default RecipesApi;
