'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const header = document.querySelector('.header');

const nav = document.querySelector('.nav');
const navLink = document.querySelectorAll('.nav__link');
const navLinks = document.querySelector('.nav__links');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Cookie and it's stuff
const msg = document.createElement('div');

msg.classList.add('cookie-message');
header.append(msg);
msg.innerHTML = 'We use Cookies for improved functionality and analytics <button class="btn btn--close-cookie">Got it</button>';
msg.style.backgroundColor = '#37383d';

const btnScrTo = document.querySelector('.btn--scroll-to');
const sec1 = document.querySelector('#section--1');
const cookieBtn = document.querySelector('.btn--close-cookie');

cookieBtn.addEventListener('click', ()=>{
  msg.remove();
});

btnScrTo.addEventListener('click', function () {
  sec1.scrollIntoView({
    behavior: 'smooth',
  });
});

const h1 = document.querySelector('h1');
// const hehe = () => {
// console.log('leferfg');
// h1.removeEventListener('mouseenter', hehe)
// };

// h1.addEventListener('mouseenter', hehe);
// h1.addEventListener('mouseenter', ()=>{
//   console.log('rfg');
// });

// h1.onmouseenter = function () {
//   console.log('hi');
// };

// h1.onmouseenter = function () {
//   console.log('hello');
// };

const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randColour = () => {
  return `rgb(${randInt(0, 255)},${randInt(0, 255)},${randInt(0, 255)})`;
};

navLinks.addEventListener('click', function(e){
  e.preventDefault();
  // console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);
    if (id != '#') {
      document.querySelector(id).scrollIntoView({behavior : 'smooth'})
    }
  }
})

const tabs = document.querySelectorAll('.operations__tab');
// console.log(tabs);
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');
// console.log(tabs, tabContainer, tabContent);

tabContainer.addEventListener('click', function(e){
    const clicked = e.target.closest('.operations__tab');
    // console.log(clicked);

    if(!clicked) return;

    tabs.forEach(el => el.classList.remove('operations__tab--active'));
    clicked.classList.add('operations__tab--active');

    const clickedData = clicked.getAttribute('data-tab');
    // console.log(clickedData);
    
    tabContent.forEach(el => el.classList.remove('operations__content--active'));
    // console.log(tabContent);

    const ele = document.querySelector(`.operations__content--${clickedData}`);
    // console.log(ele);
    ele.classList.add('operations__content--active');
});


const handleOver = function(e){
  if (e.target.classList.contains('nav__link')) {
    const item = e.target;
    const siblings = item.closest('.nav').querySelectorAll('.nav__link');
    const logo = item.closest('.nav').querySelector('img');
    const ttl = [...siblings, logo];
    // console.log(logo);
    ttl.forEach(el => {
      if (el !== item) {
        el.style.opacity = this;
      }
    });
  }
  else if (e.target.classList.contains('nav__logo')) {
    const item = e.target;
    const siblings = item.closest('.nav').querySelectorAll('.nav__link');
    const logo = item.closest('.nav').querySelector('img');
    const ttl = [...siblings, logo];

    ttl.forEach(el => {
      if (el !== item) {
        el.style.opacity = this;
      }
    });
  };
};

nav.addEventListener('mouseover', handleOver.bind(0.5));
nav.addEventListener('mouseout', handleOver.bind(1));

// Sticky Nav

const initCords = sec1.getBoundingClientRect()

// window.addEventListener('scroll', function(){
//   // console.log(window.scrollY);
//   // console.log(initCords.top);
//   if(window.scrollY > initCords.top){
//     nav.classList.add('sticky');
//   }
//   else{
//     nav.classList.remove('sticky');
//   }
// })

// const obsCallBack = function (entries, observer) {
//   entries.forEach(el => {
//     console.log(el);
//   })
// };
// const obsOptins = {
//   root : null,
//   threshold: 0.1 
// };
// const observer = new IntersectionObserver(obsCallBack, obsOptins);
// observer.observe(sec1);

const stickNav = function(entries){
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  }
  else{
    nav.classList.remove('sticky');
  }
}

const hlt = document.querySelector('.toaddsticky')

const observer = new IntersectionObserver(stickNav, {
  root: null,
  threshold: 0
});
observer.observe(hlt);

// Reveal Sections
const allSec = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    return;
  }
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSec.forEach(function(sec){
  sec.classList.add('section--hidden');
  sectionObserver.observe(sec);
});


const imgTarget = document.querySelectorAll('img[data-src]');

const loadingImg = function(entries, observer){
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) {
    return;
  }

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  })
  imgObserver.unobserve(entry.target);
}

// Create image Observer
const imgObserver = new IntersectionObserver(loadingImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
});

// Add Observer to all Images
imgTarget.forEach((el)=>{
  imgObserver.observe(el);
})

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currSlide = 0;
  const maxSlide = slides.length - 1;

  // slider.style.transform = 'scale(0.5)';
  // slider.style.overflow = 'visible';

  const createDots = function () {
    slides.forEach(function (_, i) {
      const ele = `<button class="dots__dot" data-slide="${i}"></button>`;
      dotContainer.insertAdjacentHTML('beforeend', ele);
    });
  };

  const addActive = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(el => {
      el.classList.remove('dots__dot--active');
    });
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const gotoSlide = function (slide) {
    slides.forEach((el, i) => {
      el.style.transform = `translate(${(i - slide) * 100}%)`;
    });
    // addActive(slide);
  };

  const nextSlide = () => {
    if (currSlide === maxSlide) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    gotoSlide(currSlide);
    addActive(currSlide);
  };

  const prevSlide = () => {
    if (currSlide === 0) {
      currSlide = maxSlide;
    } else {
      currSlide--;
    }
    gotoSlide(currSlide);
    addActive(currSlide);
  };

  const init = function () {
    gotoSlide(0);
    createDots();
    addActive(0);
  };

  init();

  btnRight.addEventListener('click', nextSlide);

  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    // console.log(e.key);
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      gotoSlide(slide);
      addActive(slide);
      // dotContainer.querySelector(`);
    }
  });
}

slider();

window.addEventListener('load', (e) => {
  console.log("Loaded");
})

window.addEventListener('beforeunload', (e) => {
  // console.log('Loaded');
  // console.log("Hey");
  e.returnValue = "";
});

