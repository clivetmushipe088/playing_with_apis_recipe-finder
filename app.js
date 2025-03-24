async function searchRecipes() {
    const query = document.getElementById('searchInput').value;
    const diet = document.getElementById('dietFilter').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<div class="loading">Loading...</div>';

    try {
        const response = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&diet=${diet}&addRecipeInformation=true`
        );
        const data = await response.json();
        displayRecipes(data.results);
    } catch (error) {
        resultsDiv.innerHTML = `<div class="error">Failed to fetch recipes. Please try again.</div>`;
    }
}

function displayRecipes(recipes) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (recipes.length === 0) {
        resultsDiv.innerHTML = '<div class="error">No recipes found.</div>';
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = `
            <div class="recipe-card">
                <h3>${recipe.title}</h3>
                <img src="${recipe.image}" alt="${recipe.title}">
                <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
                <p><strong>Servings:</strong> ${recipe.servings}</p>
                <a href="${recipe.sourceUrl}" target="_blank">View Recipe</a>
            </div>
        `;
        resultsDiv.innerHTML += recipeCard;
    });
}