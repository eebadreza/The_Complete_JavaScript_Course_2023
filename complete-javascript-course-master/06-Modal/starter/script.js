'use strict';



const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal');

const openModal = function () {
  overlay.classList.remove('hidden');
  modal.classList.remove('hidden');
};
const closeModal = function () {
  overlay.classList.add('hidden');
  modal.classList.add('hidden');
};

for (let i = 0; i < btnOpenModal.length; i++) {
    btnOpenModal[i].addEventListener('click', openModal)  
};

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);


document.addEventListener('keydown', function(e){
    if (e.code == 'Escape') {
        closeModal();
    }
})