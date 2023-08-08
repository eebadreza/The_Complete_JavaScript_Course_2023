// 'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const ctr = document.querySelector('.container');
// let temp = true;
// let reload = false;

// var lat, lng;

// //////////////////////////////////////////////////////////////////////////////

// // const options = {
// //   enableHighAccuracy: true,
// //   timeout: 5000,
// //   maximumAge: 0,
// // };

// // function success(pos) {
// //   const crd = pos.coords;
// //   lat = crd.latitude;
// //   lng = crd.longitude;
// // }

// // function error(err) {
// //   console.warn(`ERROR(${err.code}): ${err.message}`);
// // }

// // navigator.geolocation.getCurrentPosition(success, error, options);

// const whereAmI = function (latt, long) {

//   getPosition().then((pos) => {
//     const {latitude : latt, longitude : long} = pos.coords;
//     return fetch(
//       `https://geocode.xyz/${latt},${long}?geoit=json&auth=487025519882359443924x71551`
//     );
//   })
//     .then(res => {
//       if (!res.ok) {
//         throw new Error('Something wrong  with Geolocation');
//       }
//       return res.json();
//     })
//     .then(data => {
//       return fetch(`https://restcountries.com/v3.1/alpha/${data.prov}`);
//     })
//     .then(res => {
//       if (!res.ok) {
//         throw new Error('Country not Found');
//       }
//       return res.json();
//     })
//     .then(data => {
//       renderData(data[0]);
//       console.log("hi");
//       const neighbour = data[0].borders;
//       // console.log(neighbour);

//       if (!neighbour) {
//         throw new Error('No Countries in Border');
//       }

//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour[0]}`)
//     })
//     .then(res => {
//       if (!res.ok) {
//         throw new Error('No Countries in Border');
//       }
//       return res.json();
//     })
//     .then(data => {
//       // console.log(data[0]);
//       renderData(data[0], 'neighbour')
//     })
//     .catch(err => renderError(err))
//     .finally(() =>{
//       countriesContainer.style.opacity = 1;
//     })
// };

btn.addEventListener('click', function () {
  whereAmI();
  btn.style.opacity = 0;
});

const langStr = (v) => {
  const it = Object.values(v)
    let s = '';
    it.forEach(e => s += e + ' ');
  return s.trim();
};

const renderData = function (data, className = '') {

  const [values] = Object.values(data.currencies);
  const html = `
        <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} Mil. people</p>
            <p class="country__row"><span>🗣️</span>${langStr(data.languages)}</p>
            <p class="country__row"><span>💰</span>${values.name}</p>
          </div>
        </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  
}

/////////////////////////////////////////////////////////////////////////////////

const renderError = function(msg){

  countriesContainer.insertAdjacentHTML('beforeend', '<h3 width="100%"><center> SOMETHING WENT WRONG </h3>');
  countriesContainer.insertAdjacentHTML('beforeend', '<p><center>' + msg + '</center></p>');
  countriesContainer.insertAdjacentHTML('beforeend', '<h3 width="100%"><center> Refresh to Try Again </h3>');
  countriesContainer.style.display = 'block';
  // btn.style.opacity = 1
}

// /////////////////////////////////////////////////////////////////////////////////

// console.log('Test Start');
// // setTimeout(() => console.log("0 sec Timer"),0)
// // Promise.resolve('Resolve Promise 1').then(res => console.log(res))
// // Promise.resolve('Resolve Promise 2').then(res => {
// //   for (let index = 0; index < 10000; index++) {}
// //   console.log(res);
// // });
// // console.log('Test End');

// // const lotteryPromise = new Promise(function (resolve, reject) {
// //   console.log("Lottery Draw Happening");
// //   setTimeout(() => {
// //     if (Math.random() <= 0.5) {
// //       resolve('Won');
// //     } else {
// //       reject(new Error('Lost'));
// //     }
// //   }, 2000);
// // })

// // lotteryPromise.then((res) => console.log(res)).catch((err) => console.log(err))

const wait  = function(sec){
  return new Promise(function(resolve){
    setTimeout(resolve, sec * 1000);
  })
};

// // wait(3)
// //   .then(() => {
// //     console.log('Waited 3 seconds');
// //     return wait(1);
// //   })
// //   .then(() => {
// //     console.log('Waited 4 seconds');
// //     return wait(1);
// //   })
// //   .then(() => {
// //     console.log('Waited 5 seconds');
// //     return wait(1);
// //   })
// //   .then(() => {
// //     console.log('Waited 6 seconds');
// //     return wait(1);
// //   })
// //   .then(() => {
// //     console.log('Waited 7 seconds');
// //   });

// const getPosition = function () {
//   return new Promise(function(resolve, reject){
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition()
//             .then((pos) => console.log(pos))
//             .catch((err) => console.error(err));

/////////////////////////////////////////////////////////////////////////////////

let imgC = document.querySelector('.images');
// let currentImg, nextPath;

/////////////////////////////////////////////////////////////////////////////////
// const createImg = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     // const img = document.createElement('img');
//     // img.src = imgPath;
//     console.log('Hello');
//     reject(new Error('Incorrect Source of Data'));
//     resolve(imgPath);
//   })
//     .then(path => {
//       console.log('Hi');
//       imgE.src = path;
//       return imgE;
//     })
//     .then(el => {
//       console.log('Hey');
//       el.classList.add('images');
//     })
//     .catch(err => console.error(err));
// };

// createImg('img/img-1.jpg');

/////////////////////////////////////////////////////////////////////////////////

// const createImg = function(imgPath){
//   return new Promise(function(resolve, reject){
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', () =>{
//       imgC.append(img);
//       resolve(img);
//     })

//     img.addEventListener('error', () => {
//       reject(new Error('Image not Found'));
//     });

//   })
// }

// createImg('img/img-1.jpg').then(img => {
//   setTimeout((img) => {
//     imgC.style.display = 'none';
//   }, 2000)
// }).catch((err) => console.log(err))

/////////////////////////////////////////////////////////////////////////////////

// const createImg = function(path1, path2){
//   return new Promise(function(resolve, reject){

//     const imgE = document.createElement('img');
//     imgE.src = path1;
//     currentImg = imgE;
//     nextPath = path2;
//     console.log('hi');

//     imgE.addEventListener('load', () =>{
//       console.log('img1 loaded');
//       imgC.append(imgE);
//       resolve(wait(2));
//     })

//     imgE.addEventListener('error', () => {
//       reject(new Error("Image not Found"))
//     });
//   })
// }

// createImg('img/img-1.jpg','img/img-2.jpg')
// .then(() => {

//   console.log('hi2');
//   currentImg.style.display = 'none';
//   currentImg.src = nextPath;

//   currentImg.addEventListener('load', () => {
//     console.log('img2 loaded');
//     currentImg.style.display = 'block';
//     return wait(2);
//   });
//   currentImg.addEventListener('error', () => {
//     throw new Error('Image not Found');
//   });

// })
// .then(() =>{
//   // i = currentImg;
//     console.log('hi3');
//    currentImg.addEventListener('load', () => {
//      console.log('img2 loaded');
//      currentImg.style.display = 'block';
//     return wait(2);
//    });
//    currentImg.addEventListener('error', () => {
//      throw new Error('Image not Found');
//    });
// })
// .then(() =>{
//   currentImg.style.display = 'none';
// })
// .catch(err => console.log(err))

let current;
const path1 = 'img/img-1.jpg';
const path2 = 'img/img-2.jpg';

// const createImg = function () {
//   return new Promise(function(resolve, reject){
//     const imgE = document.createElement('img');
//     imgE.src = path1;

//     imgE.addEventListener('load', function () {
//       //resolve
//       imgC.append(imgE);
//       resolve(imgE);
//     });
//     imgE.addEventListener('error', function () {
//       //reject
//       reject(new Error("Image not Found"));
//     });
//   })
// }

// createImg()
// .then(img => {
//   // See
//   current = img;
//   console.log('img 1 loaded');
//   return wait(2);
// })
// .then(() =>{
//   // Hide
//     console.log('img 1 hide');
//   current.style.display = 'none';
//   return wait(2);
// })
// .then(() =>{
//   // see
//   current.src = path2;
//   current.addEventListener('load', function () {
//       current.style.display = 'block';
//       console.log('img 2 loaded');
//       return wait(2);
//   });
//   current.addEventListener('error', function () {
//     throw new Error('Image not Found');
//   });
// })
// .then(() =>{
//   // hide
//   current.style.display = 'none';
//   console.log('img 2 hide');
//   return wait(2)
// })
// .then(() =>{
//   console.log('finish');
// })
// .catch(err => console.log(err))

//////////////////////////////////

// let current;
// const path1 = 'img/img-1.jpg';
// const path2 = 'img/img-2.jpg';

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const createImg = function () {
//   return new Promise(function (resolve, reject) {
//     const imgE = document.createElement('img');
//     imgE.src = path1;

//     imgE.addEventListener('load', function () {
//       imgC.append(imgE);
//       resolve(imgE);
//     });
//     imgE.addEventListener('error', function () {
//       reject(new Error('Image not Found'));
//     });
//   });
// };

// createImg()
//   .then(img => {
//     current = img;
//     console.log('img 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     console.log('img 1 hide');
//     current.style.display = 'none';
//     return wait(2);
//   })
//   .then(() => {
//     current.src = path2;
//     return wait(2); // Using the wait function to return a promise
//   })
//   .then(() => {
//     console.log('img 2 loaded');
//     current.style.display = 'block';
//     return wait(2);
//   })
//   .then(() => {
//     console.log('img 2 hide');
//     current.style.display = 'none';
//     return wait(2);
//   })
//   .then(() => {
//     console.log('finish');
//   })
//   .catch(err => console.log(err));
// let current;
// const createImg = function (path) {
//   return new Promise(function (resolve, reject) {
//     const imgE = document.createElement('img');
//     imgE.src = path;

//     imgE.addEventListener('load', () => {
//       imgC.append(imgE);
//       current = imgE;
//       resolve(imgE);
//     });
//     imgE.addEventListener('error', () => {
//       reject(new Error('Image not Found'));
//     });
//   });
// };

// createImg('img/img-1.jpg')
//   .then(img => {
//     console.log('img 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     current.style.display = 'none';
//     return wait(2);
//   })
//   .then(() => {
//     return createImg('img/img-2.jpg');
//   })
//   .then(img => {
//     console.log('img 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     current.style.display = 'none';
//   })
//   .catch(err => {
//     console.log(err);
//   });

// path1 = 'img/img-1.jpg';
// path2 = 'img/img-2.jpg';
// createImg(path1)
// .then(img => {
//   // See
//   console.log('img 1 loaded');
//   return wait(2);
// })
// .then(() =>{
//   // Hide
//   console.log('img 1 hide');
//   current.style.display = 'none';
//   return wait(2);
// })
// .then(() =>{
//   // see
//    return new Promise((resolve, reject) =>{
//     current.src = path2;
//     current.addEventListener('load', function () {
//       current.style.display = 'block';
//       resolve(current);
//   });
//   current.addEventListener('error', function () {
//     reject(new Error('Image not Found'));
//   });
// })})
// .then(img => {
//   // See
//   console.log('img 2 loaded');
//   return wait(2);
// })
// .then(() =>{
//   // hide
//   current.style.display = 'none';
//   console.log('img 2 hide');
// })
// .then(() =>{
//   console.log('finish');
// })
// .catch(err => console.log(err))

const getPosition = function () {
  return new Promise(function(resolve, reject){
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function(){
try {
  
  const pos = await getPosition();
  const { latitude: latt, longitude: long } = pos.coords;
  const geoData = await fetch(
    `https://geocode.xyz/${latt},${long}?geoit=json&auth=487025519882359443924x71551`
  );
  // console.log(geoData);
  if (!geoData.ok) {
    throw new Error('Problem getting location');
  }
  const v = await geoData.json();
  // console.log(v);
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${v.prov}`);
  if (!res.ok) {
    throw new Error('Problem getting country Data');
  }
  const data = await res.json();
  // console.log(data[0]);
  renderData(data[0]);
} catch (err) {
  console.log(err);
  renderError(err.message);
}finally{
  countriesContainer.style.opacity = 1;
}
}



// const loadNPause = async function(){
//     const imgE = document.createElement('img');
//     imgE.src = path1;
//     imgE.addEventListener('load', function(){
//       imgC.append(imgE);
//       console.log();
//     })
//     imgE.addEventListener('error', function () {
//       reject(new Error("Img not found"))
//     });

// }

