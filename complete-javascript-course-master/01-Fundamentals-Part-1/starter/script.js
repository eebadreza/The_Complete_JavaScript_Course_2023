// var js='Amazing';
// if (js=='Amazing') {
//     //alert('jS is fun');
// }
// let country = 'India';
// let continent = 'Asia';
// let population = '139.34 Cr';
// console.log(country);
// console.log(continent);
// console.log(population);

// function logger() {
//     console.log("Suppppp");
// }
// logger();
// logger();
// logger();

// function foodProcess(apl,org) {
//     console.log(`Juice made up of ${apl} apples and ${org} oranges`);
// }
// foodProcess(3,11);

// const age1 = getAge1(2002);

// function getAge1(yr) {
//     return 2022-yr;
// }

// const getAge2 = function (yr) {
//     return 2022-yr;
// }

// const age2 = getAge2(2012);

// const getAge3 = yr => 2022-yr;

// const age3 = getAge3(1992);

// console.log(age1,age2,age3);
// //console.log(age2);
// let js = 'amazing';
//       if (js === 'amazing')
//         //alert('JavaScript is Fun !!');
//     console.log(4+5+6);
//     console.log('Jonas');
//     console.log(4+'6');
//     console.log(4-'6');
//     let name = 'namaywa'
//     console.log(name);
// const jhonHeight = 2.06;
// const jhonWeight = 96;

// const marksHeight = 1.85;
// const marksWeight = 86;

// const jBMI = jhonWeight/jhonHeight**2;
// const mBMI = marksWeight/marksHeight**2;
// //const markHigherBMI = mBMI > jBMI;

// console.log(jBMI,mBMI);

// if (mBMI > jBMI) {
//     console.log(`Mark's BMI is higher than Jhon's BMI by ${mBMI-jBMI}.`);
// }
// else if (mBMI == jBMI) {
//     console.log(`Mark's BMI is equal to Jhon's BMI.`);
// }
// else{
//     console.log(`Jhon's BMI is higher than Mark's BMI by ${jBMI-mBMI}.`);
// }
// let dolphins = [96,100,110];

// let koalas = [109,195,106];

// let sum1=0,sum2=0,minScore1=Number.MAX_SAFE_INTEGER ,minScore2=Number.MAX_SAFE_INTEGER;

// for (let i = 0; i< dolphins.length; i++) {
//   sum1 += dolphins[i];
//   sum2 += koalas[i];
//   if (dolphins[i]<minScore1) {
//     minScore1 = dolphins[i];
//   }
//   if (koalas[i]<minScore2) {
//     minScore2 = koalas[i];
//   }
// }
// console.log(minScore1,minScore2);

// console.log(sum1,sum2);
// if (sum1 > sum2 && minScore1 >= 100) {
//     console.log(`Dolphin's have greater points than Koala's`);
// }
// else if (sum1 === sum2 && minScore2 >= 100) {
//     console.log(`Dolphin's have equal points as Koala's`);
// }
// else if(sum1 < sum2 && minScore2 >= 100){
//     console.log(`Koala's have greater points than Dolphin's`);
// }
// let billAmt = Number(prompt("Enter amount of money to pay ?"));
// let tip;

// if (billAmt >=50 && billAmt <=300) {
//     tip = billAmt * 0.15;
// } else {
//     tip = billAmt * 0.20;
// }

// let ttl = billAmt + tip;
// console.log(`Bill : ${billAmt} :: Tip : ${tip} :: Total : ${ttl}`);

let jhonWt = Number(prompt("Enter Jhon's weight : "));
let jhonHt = Number(prompt("Enter Jhon's height : "));
let billWt = Number(prompt("Enter Bill's weight : "));
let billHt = Number(prompt("Enter Bill's height : "));

// let jhomBMI = (jhonWt / jhonHt) * jhonHt;
// let billBMI = (billWt / billHt) * billHt;

// if (jhomBMI > billBMI) {
//   console.log("Jhon's BMI greater than Bill's BMI");
// } else if (jhomBMI < billBMI) {
//   console.log("Jhon's BMI less than Bill's BMI");
// } else {
//   console.log("BMI are equal");
// }

jhonWt > 0
  ? jhonHt > 0
    ? billWt > 0
      ? billWt > 0
        ? console.log("ok")
        : console.log("Error")
      : console.log("Error")
    : console.log("Error")
  : console.log("Error");
