'use strict';

// const { type } = require("express/lib/response");

// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
4
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const calcDisplayBalance = (arr) =>{
    arr.balance  = arr.movements.reduce((acc, el) => acc + el);
    labelBalance.textContent = arr.balance +' €';
}

const displayMovement = function(movements, sort = false){
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((element, i) => {

    const type = element > 0 ? 'deposit' : 'withdrawal';
    const data = `
          <div class="movements__row">
          <div class="movements__type movements__type--${
            element > 0 ? 'deposit' : 'withdrawal'
          }">${i + 1 + ' ' + type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${Math.abs(element)}</div>
          </div>`;

      containerMovements.insertAdjacentHTML('afterbegin', data);
  });
}

const calcDisplaySummary = function(arr){
  const info1 = arr.movements.filter(el => el > 0).reduce(((acc, num) => { return acc + num}), 0);
  labelSumIn.textContent = info1 + " €";
  const info2 = arr.movements
    .filter(el => el < 0)
    .reduce((acc, num) => {
      return acc + num;
    }, 0);
  labelSumOut.textContent = Math.abs(info2) + ' €';
  const info3 = arr.movements.filter((ar) => ar > 0).map((el) => el * arr.interestRate /100).filter(el => el >= 1).reduce((acc, el) => acc + el, 0);
  labelSumInterest.textContent = info3 + ' €';
}

const createUsernames = function (acc) {
  acc.forEach(el => {
    el.username = el.owner
      .toLowerCase()
      .split(' ')
      .map(e => e[0])
      .join('');
  });
};

createUsernames(accounts);

// On Login Event 
btnLogin.addEventListener('click', function(e){
  e.preventDefault();
  const exist = accounts.find( (acc) => {
    return acc.username === inputLoginUsername.value;
  });
  // console.log(typeof(exist.pin));

  if (exist?.pin === Number(inputLoginPin.value)) {
    // Display UI and Welcome
    // console.log('Login');

    displayMovement(exist.movements);
    calcDisplaySummary(exist);
    calcDisplayBalance(exist);

    labelWelcome.textContent = `Welcome ${exist.username}`;

    containerApp.style.opacity = 100;

    // Clear login fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    // console.log(labelWelcome.textContent.split(' ')[1]);
  }
})

btnTransfer.addEventListener('click', function(e){
  e.preventDefault();

  const from = accounts?.find(acc => acc.username === labelWelcome.textContent.split(" ")[1]);

  // console.log(labelWelcome.textContent);

  const amt = Number(inputTransferAmount.value);
  
  const to = accounts?.find(function (acc) {
    return acc.username === inputTransferTo.value;
  });

  to.balance = to.movements.reduce((acc, el) => acc + el);

  if (to.username !== from.username && amt !== 0) {
    if (amt > 0 && amt < from.balance) {
      from.balance -= amt;
      to.balance += amt;
      to.movements.push(amt);
      from.movements.push(amt * -1);
      displayMovement([from.movements[from.movements.length - 1]]);
      calcDisplayBalance(from);
      calcDisplaySummary(from);
    }
    // console.log(to.movements, from.movements);
    
  }
  // console.log(to.balance, from.balance);
  // console.log(to.movements, from.movements);

  inputTransferAmount.value = '';
  inputTransferTo.value = '';
  inputTransferAmount.blur();
  
})

btnLoan.addEventListener('click', (e) =>{
  e.preventDefault();

  const amt = Number(inputLoanAmount.value);
  const userInfo = document.querySelector('.welcome').textContent.split(" ")[1];
  const curr = accounts.find(el => el.username === userInfo);

  if (amt > 0 && curr.movements.some(deposit => deposit >= amt * 0.1)) {
    curr.movements.push(amt);
    displayMovement([curr.movements[curr.movements.length - 1]]);
    calcDisplayBalance(curr);
    calcDisplaySummary(curr);
  }
  inputLoanAmount.value = "";
  inputLoanAmount.blur();
})

btnClose.addEventListener('click', function(e){
  e.preventDefault();
  // inputCloseUsername;
  // inputClosePin;
  const closing = accounts.find(el => el.username == inputCloseUsername.value && el.pin == inputClosePin.value);
  // console.log(closing);
  const index = accounts?.findIndex(arr => arr === closing);
  // console.log(index);
  accounts.splice(index, 1);
  // console.log(accounts);
  inputClosePin.value = "";
  inputCloseUsername.value = "";
  containerApp.style.opacity = 0;

})

let sorted = false;
btnSort.addEventListener('click', function(e){
  e.preventDefault();
  const curr = accounts?.find(
    el => el.username === labelWelcome.textContent.split(' ')[1]
  );
  // console.log(curr);
  displayMovement(curr.movements, !sorted);
  sorted = !sorted;
})



/////////////////////////////////////////////////
/////////////////////////////////////////////////

// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////



/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const checkAge = function(ageArr){
//   let type = "";  
//   ageArr.forEach(el =>{
//       if (el < 3) {
//         type = "a Puppy 🦮"
//       } else {
//         type = " an Adult 🐕"
//       }
//       console.log(`Dog number ${el} is ${type}`);
//     });
// }

// const checkDogs = function (ageArr1, ageArr2) {
//   //arr.splice(2);
//   let arr = [...ageArr1.slice(1, ageArr1.length - 2), ...ageArr2];
//   return arr;
// };
// const [arr1, arr2] = [[3, 5, 2, 11, 7], [4, 1, 15, 8, 3]];


// checkAge(checkDogs(arr1, arr2));


//const arr = [1,2,3,4,5,6,7]

//console.log(arr);
//let user =  'Steven Thomas Williams';
// let arrUSRF = []



// accounts.forEach((acc) => {
//   console.log(acc.username);
// })


// const arr = movements.filter(function (mov){
//   return mov > 0;
// })
// console.log(arr);

// const bal = movements.reduce(function(acc, el){
//   return acc + el; 
// }, 0)


// // console.log(bal);

// const max = movements.reduce(function(acc, el){
//   if(acc > el)
//     return acc;
//   else
//     return el;
// }, movements[0]);

// // console.log(max);
// const arr1 = accounts.map(function (mov) {
//   return mov.owner.toLowerCase().split(" ").map(el => el[0]).join("");
// });

// console.log(arr1);

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const testData = [5, 2, 4, 1, 15, 8, 3];
//  const testData = [16, 6, 10, 5, 6, 1, 4];


// const calcHumanAge = testData.map((data) =>{
//     if (data <= 2) {
//       return data*2;
//     } else {
//       return 16+ (data * 4);
//     }
// })
// //console.log(calcHumanAge);

// const sumAge = calcHumanAge
//     .filter(function (humanAge) {
//       return humanAge >= 18;
//     });
// const final = sumAge.reduce((acc, el) => acc + el, 0) / sumAge.length
// // console.log(final);
// const val = 200;
// const infoD = movements.filter(function(el, i, arr){
//   // console.log(val);  
//   return el > val;
// })

// xconsole.log(infoD);


// console.log(Array.from({length : 7}, () => 1));

// console.log(Array.from({ length: 7 }, (curr, i) => {
//   // console.log(curr);
//   return i+1;
// }));


// console.log(
//   Array.from({ length: 100}, ( ) => {
//     // console.log(curr);
//     return Math.trunc(Math.random() * 6) + 1;
//   })
// );

// const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
// console.log(movementsUI);

// labelBalance.addEventListener('click', (e) =>{
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'), 
//     el => Number(el.textContent.replace('€', ""))
//   );
//   console.log(movementsUI);
// })


// const bankDepositSum = accounts.flatMap(el => el.movements).filter(el => el > 0).reduce((acc, el) => acc + el);
// // console.log(bankDepositSum);
// // const count = 0;
// const bankDepositAtl1K = accounts.map(el => el.movements).flat().reduce((count, el) => el >= 1000 ? count += 1 : count, 0);
// // console.log(bankDepositAtl1K);

const {deposit, withdraw} = accounts.flatMap(el => el.movements).reduce((acc, el) => {
    // el > 0 ? acc.deposit += el : acc.withdraw += el;
    // acc[el > 0 ? 'deposit' : 'withdraw'] += el;
    return acc;
}, {deposit : 0, withdraw : 0});



const titleCon = function(str){
    const exceptins = ['a', 'an','but','or','in','the','on','and'];
    return str.toLowerCase().split(" ").map(el => {
      if(!exceptins.includes(el))
        return el[0].toUpperCase() + el.slice(1);
      else
        return el;
      }).join(" ");
}

console.log(titleCon("qwedn in wsWWwa on a esqjnf"));
// console.log(deposit, withdraw);
