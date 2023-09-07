import View from "./View";
import PreviewView from "./previewView.js";
import icons from 'url:../../img/icons.svg';

class ResultsView extends View{
    
    _parentElement = document.querySelector('.results'); 
    _errMsg = 'No recipies found for your query! Please try again';
    _message = '';

    _generateMarkup(){

        // console.log(this._data);
        return this._data.map(bookmarks => PreviewView.render(bookmarks, false)).join('');
        
    }

}

export default new ResultsView();