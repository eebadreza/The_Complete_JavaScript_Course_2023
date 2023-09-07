import { async } from "regenerator-runtime";
import { API_URL, RES_PER_PAGE, KEY } from "./config";
import { AJAX } from "./helper";

//////////////////////////////////////////////////////////////////////////////

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE
    },
    bookmarks: []
};

const createRecipeObject = function(data){
    const { recipe } = data.data;
    
    return {
          id: recipe.id,
          title: recipe.title,
          publisher: recipe.publisher,
          sourceUrl: recipe.source_url,
          image: recipe.image_url,
          servings: recipe.servings,
          cookingTime: recipe.cooking_time,
          ingredients: recipe.ingredients,
          ...(recipe.key && {key: recipe.key}),
        }
}

export const loadRecipe = async function(id){
    try {
        
        const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    
        state.recipe = createRecipeObject(data);

        if (state.bookmarks.some(el => el.id === id)) {
            state.recipe.bookmarked = true;
        }
        else{
            state.recipe.bookmarked = false;
        }
    
        // console.log(state.recipe);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const persistBookmark = function(){
    localStorage.setItem('bookmark', JSON.stringify(state.bookmarks));
}

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;
        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
        // console.log(data);

        state.search.results = data.data.recipes.map(el =>  { 
            return {
                id: el.id,
                title: el.title,
                publisher: el.publisher,
                image: el.image_url,
                ...(el.key && {key: el.key})
            };
        });
    
        state.search.page = 1;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const getSearchResultsPage = function(page = state.search.page){

    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return state.search.results.slice(start, end);
}

export const updateServings = function(newServings){
    
    state.recipe.ingredients.forEach(el => {
        el.quantity = el.quantity * newServings / state.recipe.servings;
    });

    state.recipe.servings = newServings;
}

export const addBookmark = function(recipe){
    state.bookmarks.push(recipe);

    if (recipe.id === state.recipe.id) {
        state.recipe.bookmarked = true;
    }

    persistBookmark();
}

export const deleteBookmark = function(id){
    const index = state.bookmarks.findIndex(el => el.id === id)
    state.bookmarks.splice(index, 1);

    if (id === state.recipe.id) {
        state.recipe.bookmarked = false;
    }

    persistBookmark();
}

const init = function(){
    const storage = localStorage.getItem('bookmark');

    if (storage) {
        state.bookmarks = JSON.parse(storage)
    }

    // console.log(state.bookmarks);
}

const clearBookmarks = function(){
    localStorage.clear('bookmark');
}

export const uploadRecipe = async function (newRecipe){
    try {
    const ingredients = Object.entries(newRecipe)
    .filter(el => el[0].startsWith('ingredient') && el[1] !== '')
    .map(el => {
        const ingArr = el[1].split(',').map(el => el.trim());
        // const ingArr = el[1].replaceAll(' ', '').split(',');
        if (ingArr.length !==3) {
            throw new Error("Wrong ingredient format! Please use the correct format!");
        }
        const [quantity, unit, description] = ingArr;
        return {quantity: quantity ? +quantity: null, unit, description};
    });

    console.log(newRecipe);

    const recipe = {
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.image,
        publisher: newRecipe.publisher,
        cooking_time: +newRecipe.cookingTime,
        servings: +newRecipe.servings,
        ingredients,
    }

    console.log(recipe);
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    // console.log(data);

    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);

    } catch (error) {
        throw error;
    }
}



init();
// clearBookmarks();