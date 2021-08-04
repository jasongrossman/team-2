//global variable declarations
var selectedCuisine = document.getElementById("cuisine");
var selectedKeyword = document.getElementById("keyword-input");
var searchDish = document.getElementById("keyword");
var apiKey = "edb7bd45b42b44c687e56d5221325bf5";
var rapidApiKey = "6f3cad5e5dmsh811feec8278bfb6p1822bfjsn3265e0b150b5";
var cuisineQuery = "";

// Tasty API Call Function
var tastyCall = function () {
    // Remove query history
    $(".recipe-container").html("");
    $(".recipe-container").remove();
    $(".wine-pairing").html("");
    $(".wine-pairing").remove();

    // Make a fetch request to Tasty API for recipes based on user input
    fetch(
        "https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes" +
        "&q=" +
        cuisineQuery, {
            method: "GET",
            params: {
                from: "0",
                size: "20",
                tags: "under_30_minutes",
                q: cuisineQuery,
            },
            headers: {
                "x-rapidapi-key": "6f3cad5e5dmsh811feec8278bfb6p1822bfjsn3265e0b150b5",
                "x-rapidapi-host": "tasty.p.rapidapi.com",
            },
        }
    ).then(function (response) {
        return response
            .json()

            .then(function (data) {
                console.log(data);

                //create randomizer to select a random recipe from returned search results
                var randomizer = Math.floor(Math.random() * data.results.length);
                console.log(randomizer);
                console.log(data.results.length);

                //create container to hold recipe information
                var recipeContainer = document.createElement("div");
                recipeContainer.setAttribute("class", "recipe-container box");
                var recipeName = document.createElement("h2");
                recipeName.textContent =
                    "TRY THIS RECIPE: " + data.results[randomizer].name.toUpperCase();
                recipeContainer.appendChild(recipeName);
                document.querySelector("body").append(recipeContainer);

                // Image of recipe
                var recipeImg = document.createElement("img");
                recipeImg.setAttribute("class", "recipe-img");
                recipeImg.setAttribute("src", data.results[randomizer].thumbnail_url);
                recipeContainer.appendChild(recipeImg);

                //retrieve cooking time, servings and ingredient list
                var cookingTime = document.createElement("h4");
                cookingTime.setAttribute("class", "cooking-time");
                if (data.results[randomizer].cook_time_minutes == null) {
                    console.log("There are no cooking time details");
                } else {
                    cookingTime.textContent =
                        "Cooking time: " +
                        data.results[randomizer].cook_time_minutes +
                        " minutes";
                    recipeContainer.appendChild(cookingTime);
                }
                var servings = document.createElement("h4");
                servings.textContent =
                    "Servings: " + data.results[randomizer].num_servings;
                cookingTime.appendChild(servings);

                var recipeIngredients = document.createElement("ul");
                recipeIngredients.setAttribute("class", "recipe-ingredients");
                recipeIngredients.textContent = "Ingredients:";

                for (
                    i = 0; i < data.results[randomizer].sections[0].components.length; i++
                ) {
                    var recipeIngredientLi = document.createElement("li");
                    recipeIngredientLi.setAttribute("class", "recipe-ingredient-li");
                    recipeIngredientLi.textContent =
                        data.results[randomizer].sections[0].components[i].ingredient.name +
                        ": ";
                    var recipeIngredientMeasure = document.createElement("span");
                    //if ingredient measurement = 0, then display "to taste" instead of 0 quantity.
                    if (
                        data.results[randomizer].sections[0].components[i].measurements[0]
                        .quantity > 0
                    ) {
                        recipeIngredientMeasure.textContent =
                            data.results[randomizer].sections[0].components[i].measurements[0]
                            .quantity +
                            " " +
                            data.results[randomizer].sections[0].components[i].measurements[0]
                            .unit.abbreviation;
                    } else {
                        recipeIngredientMeasure.textContent = "";
                    }
                    recipeIngredientLi.appendChild(recipeIngredientMeasure);
                    recipeIngredients.appendChild(recipeIngredientLi);
                }
                document.querySelector(".recipe-container").append(recipeIngredients);

                //create list to add recipe instructions
                var recipeInstructions = document.createElement("ul");
                recipeInstructions.setAttribute("class", "recipe-instructions");
                recipeInstructions.textContent = "Instructions:";

                for (i = 0; i < data.results[randomizer].instructions.length; i++) {
                    var recipeInstructionLi = document.createElement("li");
                    recipeInstructionLi.setAttribute("class", "recipe-instruction-li");
                    recipeInstructionLi.textContent =
                        data.results[randomizer].instructions[i].display_text;
                    recipeInstructions.appendChild(recipeInstructionLi);
                }
                console.log(recipeInstructions);
                document.querySelector(".recipe-container").append(recipeInstructions);
            });
    });
};

// Spoonacular API Call Function
var spoonacularCall = function () {
    // Make a fetch request to Spoonacular for wine pairing based on user cuisine query
    fetch(
            "https://api.spoonacular.com/food/wine/pairing" +
            "?food=" +
            cuisineQuery +
            "&apiKey=" +
            apiKey
        )
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data);
            //create container to hold wine pairing response:
            var winePairing = document.createElement("div");
            winePairing.setAttribute("class", "wine-pairing box");
            var wineChoice = document.createElement("h2");
            wineChoice.textContent =
                "RECOMMENDED WINE PAIRING: " + data.pairedWines[0].toUpperCase();
            var wineDescription = document.createElement("p");
            wineDescription.textContent = data.pairingText;
            winePairing.appendChild(wineChoice);
            winePairing.appendChild(wineDescription);
            // Details of wine pairing
            var wineDetails = document.createElement("p");
            wineDetails.textContent = data.productMatches[0].description;
            winePairing.appendChild(wineDetails);
            // Wine logo
            var wineImgDiv = document.createElement("div");
            wineImgDiv.setAttribute("class", "wine-img");
            var wineImg = document.createElement("img");
            wineImg.setAttribute("src", data.productMatches[0].imageUrl);
            winePairing.appendChild(wineImgDiv);
            wineImgDiv.appendChild(wineImg);
            // Link to order wine
            var wineLink = document.createElement("a");
            wineLink.setAttribute("class", "wine");
            wineLink.setAttribute("href", data.productMatches[0].link);
            // Link opens new browser
            wineLink.setAttribute("target", "_blank");
            wineLink.setAttribute("rel", "noopener");
            wineLink.innerHTML = "ORDER YOUR WINE HERE";
            winePairing.appendChild(wineLink);
            document.querySelector("body").append(winePairing);
        });
};

//Event handler for cook button

document.querySelector("#cuisine-search")
    .addEventListener("click", function () {
        cuisineQuery = selectedCuisine.value;
        tastyCall();
        spoonacularCall();
    });

//Event handler for search by dish/keyword
document.querySelector("#keyword-search")
    .addEventListener("click", function () {
        cuisineQuery = selectedKeyword.value;
        tastyCall();
        spoonacularCall();
    });