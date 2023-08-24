import * as model from './model.js'
import recipeView from './views/recipeView.js'
import 'core-js/stable';
import 'regenerator-runtime/runtime';

//////////////////////////////////////////////////////////////////////////////

const recipeContainer = document.querySelector('.recipe');

///////////////////////////////////////

const controlRecipes = async function(){
  try {

    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) {
      return;
    }

    recipeView.renderSpinner();
    
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);

  } 
  catch (e) {

    alert(e);

  }
}

window.addEventListener('hashchange', controlRecipes)
window.addEventListener('load', controlRecipes)