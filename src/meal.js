// Get the meal name from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const mealName = urlParams.get('meal');

// Update the recipe name
const recipeNameElement = document.getElementById('recipeName');
recipeNameElement.textContent = mealName;

// Fetch the meal details using the meal name and update the page accordingly
fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
  .then((response) => response.json())
  .then((data) => {
    const recipeImageElement = document.getElementById('recipeImage');
    const ingredientListElement = document.getElementById('ingredientList');
    const instructionListElement = document.getElementById('instructionList');
    const tagListElement = document.getElementById('tagList');
    const sourceLinkElement = document.getElementById('sourceLink');
    const youtubeLinkElement = document.getElementById('ClickHere');
    const strAreaElement = document.getElementById('strArea');
    const countryImageElement = document.getElementById('countryImage');

    if (data.meals && data.meals.length > 0) {
      const meal = data.meals[0];
      recipeImageElement.src = meal.strMealThumb;

      // Extract and display ingredients
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal['strIngredient' + i];
        const measure = meal['strMeasure' + i];
        if (ingredient && measure) {
          const ingredientItem = document.createElement('li');
          ingredientItem.textContent = `${measure} ${ingredient}`;
          ingredientListElement.appendChild(ingredientItem);
        }
      }

      // Extract and display instructions
      const instructions = meal.strInstructions.split('\r\n');
      instructions.forEach((instruction) => {
        if (instruction.trim() !== '') {
          const instructionItem = document.createElement('li');
          instructionItem.textContent = instruction;
          instructionListElement.appendChild(instructionItem);
        }
      });

      // Extract and display tags (strTags field)
      if (meal.strTags) {
        const tags = meal.strTags.split(',');
        tags.forEach((tag) => {
          const tagItem = document.createElement('li');
          tagItem.textContent = tag;
          tagListElement.appendChild(tagItem);
        });
      }

      // Extract and display source link
      if (meal.strSource) {
        sourceLinkElement.href = meal.strSource;
        sourceLinkElement.textContent = 'Recipe Source';
      } else {
        sourceLinkElement.style.display = 'none'; // Hide the source link if not available
      }

      // Extract and display YouTube link
      if (meal.strYoutube) {
        youtubeLinkElement.href = meal.strYoutube;
        youtubeLinkElement.textContent = 'Click Here';
      } else {
        youtubeLinkElement.style.display = 'none'; // Hide the YouTube link if not available
      }

    }
  })
  .catch((error) => {
    console.error("There was an error fetching the meal details:", error);
  });

