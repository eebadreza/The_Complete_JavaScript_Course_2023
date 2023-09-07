import { async } from 'regenerator-runtime';
import * as model from './model.js'
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import ResultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import resultsView from './views/resultsView.js';
import BookmarksView from './views/bookmarksView.js';
import AddRecipeView from './views/addRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import bookmarksView from './views/bookmarksView.js';

//////////////////////////////////////////////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function(){
  try {

    const id = window.location.hash.slice(1);

    if (!id) {
      return;
    }

    resultsView.update(model.getSearchResultsPage());

    recipeView.renderSpinner();

    await model.loadRecipe(id);
    
    recipeView.render(model.state.recipe);
    
    // controlServings(4);
    BookmarksView.update(model.state.bookmarks);
  } 
  catch (e) {

    // alert(e);
    console.error(e);
    recipeView.renderError();

  }
};

const controlSearchResults = async function(){
  // model.loadSearchResults()
  try {

    ResultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) {
      return;         
    }

    await model.loadSearchResults(query);
    // console.log(model.state.search.results);
    // ResultsView.render(model.state.search.results);

    ResultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);

  } catch (e) {
    console.error(e);
  }
}

const controlPagination = function(gotoPage){
  // console.log(gotoPage)
    ResultsView.render(model.getSearchResultsPage(gotoPage));
    paginationView.render(model.state.search);
}

const controlServings = function(newServings){
    // update servings
    model.updateServings(newServings);
    //update view
    recipeView.update(model.state.recipe);
};

const controlAddBookmark = function(){
  // Add/Remove Bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  }
  else{
    model.deleteBookmark(model.state.recipe.id);
  }
  
  // Update recipe View
  recipeView.update(model.state.recipe);
  BookmarksView.render(model.state.bookmarks);
  
}

const controlBookmarks = function(){
  BookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function (newRecipe) {
  try {

    AddRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    recipeView.render(model.state.recipe);

    AddRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // setTimeout(function(){
    //   AddRecipeView.toggleWindow();
    // }, MODAL_CLOSE_SEC*1000)
    
  } catch (error) {
    console.log(error);
    AddRecipeView.renderError(error);
  }
  

}

const init = function () {

  BookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandelerRender(controlRecipes);
  recipeView.addHandelerUpdateServings(controlServings);
  recipeView.addHandelerAddBookmark(controlAddBookmark);
  searchView.addHandelerRender(controlSearchResults); 
  paginationView.addHandlerClick(controlPagination);
  AddRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
