const delay = 1000;

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
    id: "baked-fish",
    title: "Baked fish",
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
}

export default RecipesApi;
