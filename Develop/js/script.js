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
    fetch(url)
    .then(function(response) {
       if (response.ok) {
        response.json()
        .then(function(data) {
            function getCity(data) {
                let todaysWeatherTitle = document.getElementById("todays-weather-title");
                let name = data.name;
                todaysWeatherTitle.textContent = name;
                let latitude = data.coord.lat;
                let longitude = data.coord.lon;
                let cityUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
                fetch(cityUrl)
                .then(function(response) {
                    response.json()
                    .then(function(data) {
                        console.log(data);
                        displayData(data);
                    });
                });
            }
            getCity(data);
        });
        let savedSeaches = document.getElementById("saved-searches-container");
        let newSave = document.createElement("li");
        newSave.classList.add("saved-search");
        savedSeaches.appendChild(newSave);
        newSave.textContent = city_name;
       }
    });
}

// Function to handle displaying the data
function displayData(weatherData) {
    // Get the elements to be assigned values
    let temperature = document.getElementById("temp");
    let wind = document.getElementById("wind");
    let humidity = document.getElementById("humidity");
    let uvIndex = document.getElementById("uvi");

    console.log(weatherData);
    
    // Get the useful information from the data
    let currentTemp = weatherData.current.feels_like;
    let windSpeed = weatherData.current.wind_speed;
    let currentHumidity = weatherData.current.humidity;
    let uvi = weatherData.current.uvi;

    // Assign the text content of the html to the values from the api
    temperature.textContent = "Temperature: " + currentTemp;
    wind.textContent = "Wind: " + windSpeed;
    humidity.textContent = "Humidity: " + currentHumidity;
    uvIndex.textContent = "UV Index: " + uvi;
}

// Main function to handle execution
function main() {
    getCity();
}

main();