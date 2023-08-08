"use strict";
// let driverLiscence = false;
// const passTest = true;

// if (passTest) {
//   driverLiscence = true;
// }
// if (driverLiscence) {
//   console.log("Can drive");
// }
// // function foodProcessor(noApples,noOranges) {
// //     console.log(noApples,noOranges);
// //     return (`Juice made up of ${noApples} apples and ${noOranges} oranges.`);
// // }

// // let x = foodProcessor(10,6);
// // console.log(x);

// // Function Declaration
// function calAge(birthYear){
//     return 2022-birthYear;
// }
// //console.log(calAge(2002));

// // Function Expression
// let myAge = function (birthYear){
//     return 2022-birthYear;
// }
// //console.log(myAge(2002));

// // Anonymous Function
// let myAge1 = birthYear => 2022-birthYear;
//console.log(myAge1(2002));

// let retirementAge = (birthYear, name) => {
//     const age = 2022 - birthYear;
//     return `${name} retires in ${60-age} years`;
// }
//console.log(retirementAge(2002,'Eebad'));

// calAvg = (v1,v2,v3) => (v1+v2+v3)/2;

// let dolphinScores = [44,23,71];
// let koalaScores = [65,154,58];

// const avg1 = calAvg(dolphinScores[0],dolphinScores[1],dolphinScores[2]);
// const avg2 = calAvg(koalaScores[0],koalaScores[1],koalaScores[2]);
// //console.log();
// checkWinner(avg1,avg2);

// function checkWinner(avg1,avg2){
//     if (avg1 > avg2*2) {
//         console.log(`Dolphin's win by ${avg1} vs ${avg2}`);
//     }
//     else if (avg1*2 < avg2){
//         console.log(`Koala's win by ${avg1} vs ${avg2}`);
//     }
// }

// const friends = [`miachel`,`raphiel`,`samiael`];
// console.log(friends);

// let tip = function (billAmt){
//     if (billAmt <= 300 && billAmt >= 50) {
//         return billAmt*0.15;
//     } else {
//         return billAmt*0.2;
//     }
// }
//console.log(tip(100));

// let arrBill = [100,200,300];

// console.log(arrBill);

// let arrTip = [];
// arrTip.push(tip(arrBill[0]));
// arrTip.push(tip(arrBill[1]));
// arrTip.push(tip(arrBill[2]));

// console.log(arrTip);

// let total = [];
// total.push(arrTip[0]+arrBill[0]);
// total.push(arrTip[1]+arrBill[1]);
// total.push(arrTip[2]+arrBill[2]);

// console.log(total);

// const student1 = {
//     fName:'Jonas',
//     lName:'Blue',
//     birthYear:2002,
//     job:'teacher',
//     friends:[`miachel`,`raphiel`,`samiael`],

//     calAge: function(currentYear){
//         this.age = currentYear-this.birthYear;
//         return this.age;
//     },
//     hasDriverLiscence : true
// }

// console.log(student1);
// console.log(student1.fName);
// console.log(student1['fName']);
// console.log(student1.calAge(2022));

// let toKnow = prompt("What do you want to know?");

// if (student1[toKnow]) {
//     console.log(student1[toKnow]);
// } else {
//     console.log(`Wrong request : ${toKnow}`);
// }

//console.log(`${student1.fName} is ${student1.age}-year old ${student1.job}, and ${(student1.hasDriverLiscence) ? "has a driver's license" : "doesn't have a driving license"}.`);

// const p1 = {
//     fName:'Jhon',
//     lname:'Smith',
//     mass: 92,
//     height: 1.95,

//     calcBMI : function() {
//         this.BMI = this.mass/(this.height**2);
//         return this.BMI;
//     }
// }
// const p2 = {
//     fName:'Mark',
//     lname:'Miller',
//     mass: 78,
//     height: 1.69,
//     calcBMI : function() {
//         this.BMI = this.mass/(this.height**2);
//         return this.BMI;
//     }
// }

// console.log(p2.calcBMI());
// console.log(p1.calcBMI());

// if (p1.calcBMI() > p2.calcBMI()) {
//     console.log(`${p1.fName}'s BMI (${p1.BMI}) is greater than ${p2.fName}'s BMI (${p2.BMI})`);
// }
// else if (p1.calcBMI() < p2.calcBMI()) {
//     console.log(`${p2.fName}'s BMI (${p2.BMI}) is greater than ${p1.fName}'s BMI (${p1.BMI})`);
// }

// let dice = Math.trunc(Math.random()*7);
//console.log(dice);

// while (dice !== 6) {
//     console.log(`You rolled ${dice}`);
//     dice = Math.trunc(Math.random()*7);
// }

// let bills = [22,295,176,440,37,105,10,1100,86,52];

// let tips = [];
// let totals = [];

// function calTip(bill) {
//     if (bill <= 300 && bill >= 50) {
//         return bill*0.15;
//     }else{
//         return bill*0.2;
//     }
// }

// function calTotal(bill,tip) {
//     return bill+tip;
// }

// function calAvg(arr){
//     let sum=0;
//     for (let i = 0; i < arr.length; i++) {
//         sum += arr[i];
//     }
//     return (sum/arr.length)
// }
// for (let i = 0; i < bills.length; i++) {
//     tips.push(calTip(bills[i]));
//     totals.push(calTotal(bills[i],tips[i]));
// }

// console.log(bills);
// console.log(tips);
// console.log(totals);
// console.log(calAvg(bills));
// function logger() {
//     console.log("Hey this is logging");
// }
// logger();

// function calAge(year, month) {
//   let currMonth = 2;
//   let currYear = 2023;
//   if (month < currMonth) {
//     return currYear - year;
//   } else {
//     return currYear - year - 1;
//   }
// }
// const age = calAge(2002, 1);
// console.log(age);

// const myAge = function (year, month) {
//   let currMonth = 2;
//   let currYear = 2023;
//   if (month < currMonth) {
//     return currYear - year;
//   } else {
//     return currYear - year - 1;
//   }
// };
// const ag = myAge(2002, 2);
// console.log(ag);

// const jce = (apples, oranges) => {
//   return `Juice with ${apples} apples and ${oranges} oranges.`;
// };

// console.log(jce(5, 10));

// const arr = ["marcus", "sid", "mallisa"];
// console.log(arr);

// const arr1 = new Array(1, 2, 3, 4, 5, 6, 7, 8);
// console.log(arr1);

// const details = ["Eebad", "Reza", 20, "L", 9096608234];
// console.log(details);

// console.log(typeof details);

// const Jonas = ["Jonas", "Blue", 35,];

let currentYear = 2023
const student1 = {
    fName:'Jonas',
    lName:'Blue',
    birthYear:2002,
    job:'teacher',
    friends:[`miachel`,`raphiel`,`samiael`],

    calAge: function(){
        this.age = currentYear-this.birthYear;
        return this.age;
    },
    hasDriverLiscence : true,
    getSummary: function () {
        return `${this.fName} is a ${this.calAge()} year old ${this.job}, and he ${this.hasDriverLiscence?'has a':"doesn't have a"} driver's liscence.`
    }
}
console.log(student1);

console.log(student1.getSummary());

for (let i = 0; i < 11; i++)
     console.log("Hi");