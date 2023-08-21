'use strict';

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
  dateFormatted = this.date.toString().slice(4,10);
  id = (Date.now() + '').slice(-10);
  clicks = 0;

  constructor(coords, distance, duration){
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }

  _setDescription(){
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${this.dateFormatted}`;
  }

  click(){
    this.clicks++;
    // console.log(this.clicks);
  }
}

class Running extends Workout{

  type = 'running';

  constructor(coords, distance, duration, cadence){
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }
  
  calcPace(){
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout{

  type = 'cycling';
  
  constructor(coords, distance, duration, elevation){
    super(coords, distance, duration);
    this.elevation = elevation;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed(){
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }

}

class App{

  #map;
  #mapEvent;
  #workouts = [];
  #mapZoomLevel = 13;

  constructor(){
    this._getPosition();
    this._getLocalStorage();
    form.addEventListener('submit', this._newWorkout.bind(this))
    inputType.addEventListener('change', this._toggleElevationField)
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
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

  _hideForm(){
    inputCadence.value = inputDuration.value = inputElevation.value = inputDistance.value = '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => form.style.display = 'grid', 1000)
  }

  _loadMap(pos){
    
    const { latitude } = pos.coords;
    const { longitude } = pos.coords;

    const coords = [ latitude, longitude];
  
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
    
    this.#workouts.forEach(el => {
      // this._renderWorkout(el);
      this._renderWorkoutMarker(el);
    });
  }

  _newWorkout(e){
    
    e.preventDefault();

    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value; 
    const { lat, lng } = this.#mapEvent.latlng;
    
    let workout;

    const validInputs = (...inputs) => inputs.every(el => Number.isFinite(el))
    const negativeInput = (...inputs) => inputs.every(el => el > 0);

    if (type === 'running') {
      const cadence = +inputCadence.value;

      if(!validInputs(distance, duration, cadence)){
        return alert('Inputs need to be a Number!');
      }

      if(!negativeInput(distance, duration, cadence)){
        return alert('Inputs need to be a Positive Number!');
      }

      workout = new Running([lat, lng], distance, duration, cadence);
      this.#workouts.push(workout);
    }

    if (type === 'cycling') {
      const elevation = +inputElevation.value; 

      if(!validInputs(distance, duration, elevation)){
        return alert('Inputs need to be a Number!');
      }

      if(!negativeInput(distance, duration)){
        return alert('Inputs need to be a Positive Number!');
      }

      workout = new Cycling([lat, lng], distance, duration, elevation);
      this.#workouts.push(workout);

    }

    this._renderWorkoutMarker(workout);
    this._renderWorkout(workout);
    this._hideForm()
    this._setLocalStorage();

  }

  _toggleElevationField(){
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _renderWorkoutMarker(workout){
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: `${workout.type}-popup`
    }))
    .setPopupContent(`${workout.type === 'running' ? '🏃' : '🚴‍♀️'} ${workout.description}`)
    .openPopup();
  }

  _renderWorkout(workout){
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${workout.type === 'running' ? '🏃' : '🚴‍♀️'}</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
    `
    if (workout.type === 'running') {
      html += `
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.pace.toFixed(1)}</span>
        <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">🦶🏼</span>
        <span class="workout__value">${workout.cadence}</span>
        <span class="workout__unit">spm</span>
      </div>
      </li>
      `
    }
    if (workout.type === 'cycling') {
      html += `
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.speed.toFixed(1)}</span>
        <span class="workout__unit">km/h</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⛰</span>
        <span class="workout__value">${workout.elevation}</span>
        <span class="workout__unit">m</span>
      </div>
    </li>
      `

    }
    
    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e){
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) {
      return;
    }
    
    // console.log(workoutEl)
    const workoutData = this.#workouts.find(work => work.id === workoutEl.dataset.id);
    // console.log(workoutData)
    // workoutData.click();

    this.#map.setView(workoutData.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1
      }
    });

    // console.log(workoutData)
  }

  _setLocalStorage(){
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage(){
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) {
      return;
    }

    this.#workouts = data;

    this.#workouts.forEach(el => {
      this._renderWorkout(el);
      // this._renderWorkoutMarker(el);
    });

  }

  reset(){
    localStorage.removeItem('workouts');
    location.reload()
  }
}

const app = new App();

  // const placeMarker = function(lat, lng){
    
  // }
