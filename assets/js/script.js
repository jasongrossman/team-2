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
        let wineDescription = data['pairingText'];
        let display = document.createElement("div");
        display.innerHTML = wineDescription;
        console.log(wineDescription);
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
        .then(function(data) {
            console.log(data);
    })
}
    // if (response.data.length === 0) {
    //     console.log('Spoonacular could not find anything for that.');    

    // } else {
    //     console.log(response.data.pairedWines[0])
    // }

    // .catch(function(error) {
    // alert('Unable to connect to Spoonacular');
    // })
//
    // .then(function(response) {
    // // request was successful
    // // if (response.ok) {
    // // console.log(response);
    // response.json().then(function(data) {
    // console.log(data)

    // .then(function(data){ 
    //     console.log(data);
    // let cuisineQueryvalue = data['pairedWines'][0];
    // cuisineQuery.innerHTML = cuisineQueryvalue;
    // let display = document.createElement("div");
    // display.appendChild(cuisineQuery);
    

    // });
    // } else {
    // alert('Error: ' + response.statusText);
    // }
    // })
    // .catch(function(error) {
    // alert('Unable to connect to Spoonacular');
    // })

    
    var tastyCall = function() {
        console.log("ringing tastyCall");
    }
//event handler for search by dish/keyword
//event handler for cook button
document.querySelector("#cook").addEventListener("click", function() {
    spoonacularCall();
    tastyCall();
});
