//global variable declarations
var selectedCuisine = document.getElementById("cuisine");
var selectedKeyword = document.getElementById("keyword-input");
var searchDish = document.getElementById("keyword") //need to create text input field in HTML
var apiKey = "edb7bd45b42b44c687e56d5221325bf5";
var rapidApiKey = "6f3cad5e5dmsh811feec8278bfb6p1822bfjsn3265e0b150b5"
var cuisineQuery = "";


// Spoonacular and Tasty API Call Function
var spoonacularCall = function() { 

    
    // Make a fetch request to Spoonacular for wine pairing based on user cuisine query
    fetch("https://api.spoonacular.com/food/wine/pairing" +
        "?food=" +
        cuisineQuery +
        "&apiKey=" + 
        apiKey
        )

    .then(function(response) {
        return response.json();
    })
    
    .then(function(data) {
        console.log(data);
        //create container to hold wine pairing response:
        var winePairing = document.createElement("div");
        winePairing.addClass = "wine-pairing"
        var wineChoice = document.createElement("h2");
        wineChoice.textContent = "RECOMMENDED WINE PAIRING: " + data.pairedWines[0].toUpperCase();
        var wineDescription = document.createElement("p");
        wineDescription.textContent = data.pairingText;
        winePairing.appendChild(wineChoice);
        winePairing.appendChild(wineDescription);
        // Details of wine pairing
        var wineDetails = document.createElement("p");
        wineDetails.textContent = data.productMatches[0].description;
        winePairing.appendChild(wineDetails);
        // Wine logo
        var wineImg = document.createElement("img");
        wineImg.setAttribute("src", data.productMatches[0].imageUrl);
        winePairing.appendChild(wineImg);
        // Link to order wine
        var wineLink = document.createElement("a");
        wineLink.setAttribute("href", data.productMatches[0].link);
        wineLink.innerHTML = "ORDER YOUR WINE";
        winePairing.appendChild(wineLink);
        document.querySelector("body").append(winePairing);
    })
}

    
    var tastyCall = function() {
        // Make a fetch request to Tasty API for recipes based on user input
        fetch("https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes"
            +"&q=" + cuisineQuery, 
            {
            "method": "GET",
            params: {from: '0', size: '20', tags: 'under_30_minutes', q: cuisineQuery},
            "headers": {
                "x-rapidapi-key": "6f3cad5e5dmsh811feec8278bfb6p1822bfjsn3265e0b150b5",
                "x-rapidapi-host": "tasty.p.rapidapi.com"
        }
    })
        .then(function(response) {
            return response.json()
            
        .then(function(data) {
            console.log(data);
            //create container to hold recipe information
            var recipeContainer = document.createElement("div");
            recipeContainer.addClass = "recipe-container";
            var recipeName = document.createElement("h2");
            recipeName.textContent = "TRY THIS RECIPE: " + data.results[0].name.toUpperCase();
            recipeContainer.appendChild(recipeName);
            document.querySelector("body").append(recipeContainer);

            // Image of recipe
            var recipeImg = document.createElement("img");
            recipeImg.addClass = "recipe-img";
            recipeImg.setAttribute("src", data.results[0].thumbnail_url);
            recipeContainer.appendChild(recipeImg);

            //retrieve cooking time, servings and ingredient list
            var cookingTime = document.createElement("h4");
            cookingTime.addClass = "cooking-time";
            cookingTime.textContent = "Cooking time: " + data.results[0].cook_time_minutes + " minutes";
            recipeContainer.appendChild(cookingTime);
            var servings = document.createElement("h4");
            servings.textContent = "Servings: " + data.results[0].num_servings;
            cookingTime.appendChild(servings);

            var recipeIngredients = document.createElement("ul");
            recipeIngredients.addClass = "recipe-ingredients";
            recipeIngredients.textContent = "Ingredients:";

            for (i=0; i<data.results[0].sections[0].components.length; i++) {
                var recipeIngredientLi = document.createElement("li");
                recipeIngredientLi.addClass = "recipe-ingredient-li";
                recipeIngredientLi.textContent = data.results[0].sections[0].components[i].ingredient.name + ": ";
                var recipeIngredientMeasure = document.createElement("span");
                //if ingredient measurement = 0, then display "to taste" instead of 0 quantity.
                if (data.results[0].sections[0].components[i].measurements[0].quantity > 0) {
                    recipeIngredientMeasure.textContent = data.results[0].sections[0].components[i].measurements[0].quantity + " " + data.results[0].sections[0].components[i].measurements[0].unit.abbreviation;
                } else {
                    recipeIngredientMeasure.textContent = "to taste."
                }
                recipeIngredientLi.appendChild(recipeIngredientMeasure);
                recipeIngredients.appendChild(recipeIngredientLi);
            }
            document.querySelector("body").append(recipeIngredients);

            //create list to add recipe instructions
            var recipeInstructions = document.createElement("ul");
            recipeInstructions.addClass = "recipe-instructions";
            recipeInstructions.textContent = "Instructions:"

            for (i=0; i<data.results[0].instructions.length; i++) {
                var recipeInstructionLi = document.createElement("li");
                recipeInstructionLi.addClass = "recipe-instruction-li";
                recipeInstructionLi.textContent = data.results[0].instructions[i].display_text;
                recipeInstructions.appendChild(recipeInstructionLi);
            }
            console.log(recipeInstructions);
            document.querySelector("body").append(recipeInstructions);


            });
        })
    };
//event handler for search by dish/keyword
//event handler for cook button
document.querySelector("#cook").addEventListener("click", function() {
    cuisineQuery = selectedCuisine.value;
    spoonacularCall();
    tastyCall();
});

document.querySelector("#keyword").addEventListener("click", function() {
    cuisineQuery = selectedKeyword.value;
    spoonacularCall();
    tastyCall();
});
