const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipecontainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn =document.querySelector('.recipe-close-btn');


// function to get recipe 
const fetchRecipes =  async (query) => {
  recipecontainer.innerHTML = "<h2>Fetching Recipes...</h2>"; 
  try {
  
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const response = await data.json();

  recipecontainer.innerHTML = ""; 
  response.meals.forEach(meal =>  {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</P>
    `
    const button = document.createElement('button');
    button.textContent = "View Recipe";
    recipeDiv.appendChild (button);

     // the Adding addEventListener to recipe button  
     button.addEventListener('click', ()=> {
         openRecipPopup(meal);
     }); 
    recipecontainer.appendChild(recipeDiv);
  });
  
} 
catch (error) {
  recipecontainer.innerHTML = "<h2> Error in Fetching Recipes...</h2>";  
}

}
// function fetch ingredients
const fetchingredients = (meal) => {     // using this for loop 
  let ingredientsList  = "";
  for (let i=1; i<=20; i++){
    const ingredients = meal[`strIngredient${i}`];
    if (ingredients) {
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredients}</li>`
    }
    else {
      break;
    }
  }
  return ingredientsList;
}
const openRecipPopup = (meal) => {
  recipeDetailsContent.innerHTML = `
   <h2 class = "recipeName">${meal.strMeal}</h2>
   <h3>Ingredents:</h3>
   <ul class = "ingredientList">${fetchingredients(meal)}</ul>
   <div class="recipeInstructions">
     <h3>Instructions:</h3>
     <p>${meal.strInstructions}</p>
   </div>
  `
  recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click',()=> {   // button code 
  recipeDetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener('click', (e) => {
     e.preventDefault();
  const searchInput = searchBox.value.trim();
  if (!searchInput){
    recipecontainer.innerHTML = `<h2>Type the meal in the search box.</h2>`;
    return;
  }
  fetchRecipes(searchInput);
});


