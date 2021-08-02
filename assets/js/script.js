//global variable declarations
var selectedCuisine = document.getElementById("cuisine");
var searchDish = document.getElementById("keyword") //need to create text input field in HTML
var apiKey = "edb7bd45b42b44c687e56d5221325bf5";
var rapidApiKey = "6f3cad5e5dmsh811feec8278bfb6p1822bfjsn3265e0b150b5"

// Spoonacular and Tasty API Call Function
var spoonacularCall = function() { 

    
    var cuisineQuery = selectedCuisine.value;
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
        wineChoice.textContent = "Recommended Wine Pairing: " + data.pairedWines[0]
        var wineDescription = document.createElement("p");
        wineDescription.textContent = data.pairingText;
        winePairing.appendChild(wineChoice);
        winePairing.appendChild(wineDescription);
        document.querySelector("body").append(winePairing);

    })
        // Make a fetch request to Tasty API for recipes based on user input
        return fetch("https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes", {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": "6f3cad5e5dmsh811feec8278bfb6p1822bfjsn3265e0b150b5",
                        "x-rapidapi-host": "tasty.p.rapidapi.com"
                }
            })
            .then(function(response) {
                return response.json();
    })
}

    
    var tastyCall = function() {
        console.log("ringing tastyCall");
    }
//event handler for search by dish/keyword
//event handler for cook button
document.querySelector("#cook").addEventListener("click", function() {
    spoonacularCall();
    tastyCall();
});
