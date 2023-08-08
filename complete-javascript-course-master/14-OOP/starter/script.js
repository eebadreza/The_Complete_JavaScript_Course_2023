// 'use strict';


// // const Person = function(fname, byear){
// //     this.fname = fname;
// //     this.byear = byear;
// // }

// const d = new Date();
// const y = d.getFullYear();
// // console.log(y);


// // const jonas = new Person('jonas', 2002);
// // console.log(jonas);


// // const mikhel = new Person('mikhel', 1982);
// // const sharron = new Person('sharron', 2012);

// // // console.log(jonas.byear);

// // Person.prototype.calcAge = function () {
// //     return (y - this.byear);
// // }

// // console.log(jonas.calcAge());
// // console.log(mikhel.calcAge());
// // console.log(sharron.calcAge());
// // console.log(Person.prototype.constructor);



// // const BMW = new Car('BMW', 120);
// // const mercedes = new Car('mercedes', 95);

// // BMW.accelerate();
// // BMW.brake();


// //////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////

// const PersonCL = class {
    
//     constructor(fname, bYear){
//         this.fname = fname;
//         this.bYear = bYear;
//     }

//     calAge(){
//         console.log(y - this.bYear);
//     }

//     get age(){
//         return y - this.bYear;
//     }

//     set fname(n){
//         n = n.trim();
//         if (n.includes(' ')) {
//             this._fname  = n;
//         }
//         else{
//             alert(`${n} is not full name!!`);
//         }
//     }
//     get fname(){
//         return this._fname;
//     }


// }

// class Student extends PersonCL {
//     constructor(fname, bYear, course){
//         super(fname, bYear);
//         this.course = course;
//     }
// }

// const mary = new Student('Mary Diaz', 2000, "Arts");
// console.log(mary);

// const jessica = new PersonCL("Jessica Davis", 2002);
// // jessica.calAge();
// // console.log(jessica.age);
// // console.log(jessica.fname);

// // Person.hey = function (){
// //     console.log("My House 🥲");
// // };

// // jessica.hey();
// // Person.hey();

// // console.log(jessica.__proto__ === Person.prototype);
// // console.log(Person.prototype);
// // console.log(jessica.fname);

// // const acc = {
// //     owner : 'Jessica',
// //     movements : [1,2,3,4,5,5,6,7],
// //     bYear : 2003,

// //     get latestVal(){
// //         return this.movements.at(-1);
// //     },
// //     set latestVal(val){
// //         this.movements.push(val);
// //     },
// //     get age(){
// //         return y - this.bYear; 
// //     }
// // }

// // console.log(acc.latestVal);
// // acc.latestVal = 32;
// // console.log(acc.latestVal);
// // console.log(acc.movements);
// // console.log(acc.age);


// //////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////

// // const Car = class {

// //     constructor(make, speed){
// //         this.make = make;
// //         this.speed = speed;
// //     }

// //     get speedUS(){
// //         return this.speed / 1.6;
// //     }

// //     set speedUS(s){
// //         this.speed = s * 1.6;
// //     }

// //     accelerate(){
// //         this.speed += 10;
// //     }
// // } 

// // const amg = new Car('amg GT', 230);

// // console.log(amg.speedUS);
// // amg.accelerate();
// // amg.speedUS = 5;
// // console.log(amg.speedUS);

// // const Person = function(fName, bYear){
// //     this.fName = fName;
// //     this.bYear = bYear;
// // }

// // Person.prototype.calAge = function(){
// //     return y - this.bYear;
// // }

// // const Student = function (fName, bYear, course) {
// //      Student.call(this, fName, bYear);
// //      this.course = course;
// // };

// // const mike = new Student("Mike", 2002, "B.TECH");
// // console.log(mike);


// //////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////

// // const Car = function (make, speed) {
// //   this.make = make;
// //   this.speed = speed;
// // };

// // // const swift = new Car('swift', 120);
// // // const wagonR = new Car('wagonR', 100);
// // // const baleno = new Car('baleno', 150);

// // Car.prototype.accelerate = function (s) {
// //   this.speed += s;
// //   console.log(this.speed);
// // };

// // Car.prototype.brake = function (s) {
// //   this.speed -= s;
// //   console.log(this.speed);
// // };

// // const EV = function(make, speed, charge){
// //     Car.call(this, make, speed);
// //     this.charge = charge;
// // }
// // // const tesla = new EV('tesla', 100, 78);
// // // console.log(tesla);

// // EV.prototype = Object.create(Car.prototype);

// // EV.prototype.chargeTo = function(to){
// //     this.charge = to;
// // }

// // const tesla = new EV('tesla', 100, 78);
// // console.log(tesla);

