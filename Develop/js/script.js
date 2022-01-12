let city_name = "";
let API_KEY = "";

let api = `api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`


// Function to handle getting user input to the city seasrch field
function getCity() {
    // Get the input element
    let cityInput = document.getElementById("city-search-form");
    let cityButton = document.getElementById("city-search-submit-button");
    // button click event to save the input element text content
    cityButton.addEventListener("click", function() {
        // save city name to city name variable
        city_name = cityInput.value;
        cityInput.value = "";
        console.log(city_name);
    });
}


// Main function to handle execution
function main() {
    getCity();
}

main();