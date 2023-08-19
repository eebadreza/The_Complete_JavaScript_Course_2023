'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

class Workout{
  
  date = new Date();
  id = (Date.now() + '').slice(-10);

  constructor(coords, dist, dur){
    this.coords = coords;
    this.dist = dist;
    this.dur = dur;
    // console.log(id);
  }
}

class Running extends Workout{
  constructor(coords, dist, dur, cadence){
    super(coords, dist, dur);
    this.cadence = cadence;
    this.calcPace();
  }
  
  calcPace(){
    this.pace = this.dur / this.dist;
    return this.pace;
  }
}

class Cycling extends Workout{
  
  constructor(coords, dist, dur, eleGain){
    super(coords, dist, dur);
    this.cadence = eleGain;
    this.calcSpeed();
  }

  calcSpeed(){
    this.speed = this.dist / (this.dur / 60);
    return this.speed;
  }

}

const r1 = new Running([11, -13], 5.2, 24, 178);
const c1 = new Cycling([12, 22], 5.2, 24, 178);
console.log(r1, c1);

class App{

  #map;
  #mapEvent;

  constructor(){
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this))
    inputType.addEventListener('change', this._toggleElevationField)
  }

  _getPosition(){
    if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition( 
      this._loadMap.bind(this), 
      function () {
        alert('Could not get your Location');
      }
    );
  }

  _showForm(mapE){
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _loadMap(pos){
    const { latitude } = pos.coords;
    const { longitude } = pos.coords;

    const coords = [ latitude, longitude];
  
    this.#map = L.map('map').setView(coords, 16);
    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this))
  }

  _newWorkout(e){
    e.preventDefault();
    // console.log(this);
    inputCadence.value = inputDuration.value = inputElevation.value = inputDistance.value = '';
    // console.log(this.#mapEvent)
    const {lat, lng} = this.#mapEvent.latlng;
    L.marker( [lat, lng])
      .addTo(this.#map)
      .bindPopup(L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup'
    }))
    .setPopupContent('Workout')
    .openPopup();
  }

  _toggleElevationField(){
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
}

const app = new App();

  // const placeMarker = function(lat, lng){
    
  // }
