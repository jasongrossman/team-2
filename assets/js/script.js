//global variable declarations
var selectedCuisine = document.getElementById("cuisine");
var searchDish = document.getElementById("keyword") //need to create text input field in HTML
var apiKey = "edb7bd45b42b44c687e56d5221325bf5";

    var spoonacularCall = function() {
    //build API query call to Spoonacular based on dropdown menu value 
    var cuisineQuery = selectedCuisine.value;
    fetch("https://api.spoonacular.com/food/wine/pairing" 
    + "?food=" 
    + cuisineQuery
    + "&apiKey=" + apiKey)

    .then(function(response) {
    response.json().then(function(data) {
    console.log(data)

    .then(function(response) {
    if (response.data.length === 0) {
        console.log('Spoonacular could not find anything for that.');    

    } else {
        console.log(response.data.pairedWines[0])
    }
})
    .catch(function(error) {
    alert('Unable to connect to Spoonacular');
    })

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
    });
    })
    // });
    // } else {
    // alert('Error: ' + response.statusText);
    // }
    // })
    // .catch(function(error) {
    // alert('Unable to connect to Spoonacular');
    // })
}

    var tastyCall = function() {
        console.log("ringing tastyCall");
    }

  
//event handler for search by dish/keyword
//event handler for cook button
$("#cook").on("click", function() {
    spoonacularCall();
    tastyCall();
});
