import icons from 'url:../../img/icons.svg';
// import { Fraction } from 'fractional';

//////////////////////////////////////////////////////////////////////////////

export default class View {
    
    _data;

    /**
     * Render the recieved object to the DOM
     * @param {Object | Object[]} data The data to be rendered
     * @param {boolean} [render = true] If false, create markup string instead of rendering to the DOM 
     * @returns {undefined | string} A markup string is rendered if render = false
     * @author Eebad Reza
     * @todo Nothing it's complete
     */
    render(data, render = true){

        if (!data || (Array.isArray(data)) && data.length === 0) {
          return this.renderError();
        }

        this._data = data;   
        const markup = this._generateMarkup(this.data);

        if (!render) {
          return markup;
        }

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    update(data){
      // if (!data || (Array.isArray(data)) && data.length === 0) {
      //   return this.renderError();
      // }

      this._data = data;   
      const newMarkup = this._generateMarkup(this.data);
      const newDOM = document.createRange().createContextualFragment(newMarkup);
      const newElements = Array.from(newDOM.querySelectorAll('*'));
      // console.log(newElements)
      const curElements = Array.from(this._parentElement.querySelectorAll('*'));

      newElements.forEach((newEl, i)=> {
        const curEl = curElements[i];
        // console.log(curEl, newEl.isEqualNode(curEl));

        if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
          curEl.textContent = newEl.textContent;
        }

        if (!newEl.isEqualNode(curEl)) {
          Array.from(newEl.attributes).forEach(attr =>{
            curEl.setAttribute(attr.name, attr.value)
          });
        }
      })
    }

    _clear(){
        this._parentElement.innerHTML = '';
    }

    renderSpinner = function () {
        const spinner = `
        <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>
        `
        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin', spinner);
    }

    renderError(message = this._errMsg){
        const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> 
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderMessage(message = this._message){
        const markup = `
        <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> 
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
};

// export default new View();