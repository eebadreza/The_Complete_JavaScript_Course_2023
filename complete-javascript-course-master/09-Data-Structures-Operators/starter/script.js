'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  nme: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function(starterIndex , mainIndex){
    return [[this.starterMenu[starterIndex], this.mainMenu[mainIndex]]]
  },
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

const { nme,
  openingHours,
  starterMenu
} = restaurant;

console.log(nme,openingHours);

const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu , starterMenu);
console.log(name, openingHours, starterMenu);

let a = 111;
let b = 12;

const obj = { a:23 ,b:7 };
({a,b} = obj);
console.log(a,b);

let [main,,secondary] = restaurant.categories;
console.log(main, secondary);

 [main, secondary] = [secondary , main];
 console.log(main, secondary);