//global variable declarations
var selectedCuisine = document.getElementById("cuisine");
var searchDish = document.getElementById("keyword") //need to create text input field in HTML
var apiKey = "edb7bd45b42b44c687e56d5221325bf5";

//event handler for cook button
$("#cook").on("click", function() {
    //read value of cuisine selection
    var cuisineQuery = selectedCuisine.value;
    console.log(cuisineQuery);
    fetch ("https://api.spoonacular.com/recipes/complexSearch?cuisine=" 
    + cuisineQuery
    + "&apiKey=" + apiKey)

    .then(function(response) {
        // request was successful
        if (response.ok) {
          // console.log(response);
          response.json().then(function(data) {
            console.log(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function(error) {
        alert('Unable to connect to Spoonacular');
      })
  
//event handler for search by dish/keyword



});