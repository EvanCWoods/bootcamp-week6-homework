let city_name = "";
let API_KEY = "3e577ad9e250c4dd28d83578156049cc";


// Function to handle getting user input to the city seasrch field
function getCity() {
    // Get the input element
    let cityInput = document.getElementById("city-search-form");
    let cityButton = document.getElementById("city-search-submit-button");
    // button click event to save the input element text content
    cityButton.addEventListener("click", function() {
        // save city name to city name variable
        city_name = cityInput.value;
        let api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`
        cityInput.value = "";
        getData(api_url);
    });
}

// Function to get the weather data
function getData(url) {
    // fetch the url
    console.log(url);
    fetch(url)
    .then(function(response) {
       if (response.ok) {
        response.json()
        .then(function(data) {
            console.log(data);
        });
        let savedSeaches = document.getElementById("saved-searches-container");
        let newSave = document.createElement("li");
        newSave.classList.add("saved-search");
        savedSeaches.appendChild(newSave);
        newSave.textContent = city_name;
       }
    });
}

// Main function to handle execution
function main() {
    getCity();
}

main();