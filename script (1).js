const searchBtn = document.querySelector('.searchBtn');
const searchBox = document.querySelector('.searchBox');
const recipeContainer = document.querySelector('.recipe-container'); 
const recipeDetails = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');



// function to get recipe
const fetchrecipes = async (query) => {
  try {
    recipeContainer.innerHTML = "<h3>fetching recipe.........</h3>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    
    
    recipeContainer.innerHTML = "";


response.meals.forEach(meal =>{
  const recipeDiv = document.createElement('div'); // create div  in javascript
 recipeDiv.classList.add('recipe');
  recipeDiv.innerHTML= 
  `
  <img src="${meal.strMealThumb}">  
<h3> ${meal.strMeal}</h3>
<p> ${meal.strArea}</p>
<p> ${meal.strCategory}</p>
  `
  // creating vie recipe button
const button = document.createElement('button');
button.textContent ="view recipe";

recipeDiv.appendChild(button);
// adding eventlistener to recipe button

button.addEventListener('click', ()=>{
openRecipePopup(meal);
});
  //  above (image , area , category of meals)
    recipeContainer.appendChild(recipeDiv); 
})

// if recpe is not exist
  } catch (err) {
   recipeContainer.innerHTML = `<h2> error in fetching recipes </h2>`;
   console.log("wrong");
  }
};
//  funtion to fetch ingredients and measurements

const fetchingIngredients =  (meal) =>{
  let ingredientsList = "";
  for(let i=1; i<=20; i++){
    const ingredient = meal[`strIngredient${i}`];
    if(ingredient){
      const measure =  meal [`strMeasure${i}`];
      ingredientsList += `<li> ${measure} ${ingredient}</li>`
    }
    else{
      break;
  
    }
    
  }
  return ingredientsList;
  }
// openrecipePopup function
const openRecipePopup = (meal) => {
recipeDetails.innerHTML =
`
<h2 class = "recipenName"> ${meal.strMeal}</h2>
<h3 > Ingredients:</h3>
<ul class = "ingredientsList"> ${fetchingIngredients(meal)}</ul>
<div class= "instructions"> 
<h3> Instructions:</h3>
<p> ${meal.strInstructions}</p>
</div>
`
recipeDetails.parentElement.style.display = "block";
}

 recipeCloseBtn.addEventListener('click',()=>{
  recipeDetails.parentElement.style.display="none";
 });

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const searchInput = searchBox.value; // take input property name
  if(!searchInput){
    recipeContainer.innerHTML = `<h2> Type the meal in the search </h2>`;
    return;
  }
  fetchrecipes(searchInput);
  

});



