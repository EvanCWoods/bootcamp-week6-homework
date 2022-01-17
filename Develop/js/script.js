let city_name = "";
let API_KEY = "3e577ad9e250c4dd28d83578156049cc";


let cityButton = document.getElementById("city-search-submit-button");
cityButton.addEventListener("click", function() {
    let cityInput = document.getElementById("city-search-form");
    city_name = cityInput.value;
    getCity(cityInput.value);
    cityInput.value = "";
});

// Function to handle getting user input to the city seasrch field
function getCity(city) {
    // save city name to city name variable
    let api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    getData(api_url);
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
                console.log(data);
                let todaysWeatherTitle = document.getElementById("todays-weather-title");
                let name = data.name;
                todaysWeatherTitle.textContent = name
                let latitude = data.coord.lat;
                let longitude = data.coord.lon;
                let cityUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
                fetch(cityUrl)
                .then(function(response) {
                    response.json()
                    .then(function(data) {
                        let dateTime = new Date(data.current.dt * 1000).toLocaleString();
                        dateTime = dateTime.split(",");
                        dateTime = dateTime[0];
                        let currentIcon = document.getElementById("today-img");
                        let icon = data.current.weather[0].icon;
                        currentIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
                        todaysWeatherTitle.textContent = name + " (" + dateTime + ") ";
                        currentIcon.style.display = "block";
                        getForecast(data);
                        displayData(data);
                    });
                });
            }
            getCity(data);
        });
        if (city_name != "") {
            createSavedList(city_name);
        }
       }
    });
}

function createSavedList(value) {
    let savedSeaches = document.getElementById("saved-searches-container");
    let newSave = document.createElement("li");
    let savedButton = document.createElement("button");
    newSave.classList.add("saved-search");
    savedButton.classList.add("savedButton");
    savedSeaches.appendChild(newSave);
    newSave.appendChild(savedButton);
    savedButton.textContent = value;
    saveToStorage(value);
};

// Function to handle displaying the data
function displayData(weatherData) {
    // Get the elements to be assigned values
    let temperature = document.getElementById("temp");
    let wind = document.getElementById("wind");
    let humidity = document.getElementById("humidity");
    let uvIndex = document.getElementById("uv-index")

    
    // Get the useful information from the data
    let currentTemp = weatherData.current.feels_like;
    let windSpeed = weatherData.current.wind_speed;
    let currentHumidity = weatherData.current.humidity;
    let uvi = weatherData.current.uvi;

    // Assign the text content of the html to the values from the api
    temperature.textContent = "Temperature: " + currentTemp + " C";
    wind.textContent = "Wind: " + windSpeed + " KM/H";
    humidity.textContent = "Humidity: " + currentHumidity + " %";
    uvIndex.textContent = uvi;

    // Filter color codes based on UV value
    if (uvi <= 4 ) {
        uvIndex.style.background = "green";
    } else if (uvi > 4 && uvi <= 8) {
        uvIndex.style.background = "yellow";
    } else {
        uvIndex.style.background = "red";
    }
}

// Function to get and display the 5 day forecast in the displayData() function 
function getForecast(data) {
    // get the card from the DOM'
    let forecastContainer = document.getElementById("forecast-container");
    forecastContainer.innerHTML = "";
    // Get the next 5 days
    for (let i=0; i<5; i++) {
        let forecastCard = document.createElement("div");
        forecastCard.classList.add("forecast-card");
        forecastContainer.appendChild(forecastCard);
        // get the date for each day
        let dateTime = new Date(data.daily[i].dt * 1000).toLocaleString();
        dateTime = dateTime.split(",");
        dateTime = dateTime[0];
        let forecastDate = document.createElement("h1");
        forecastDate.classList.add("forecast-date");
        forecastDate.textContent = dateTime;
        forecastCard.appendChild(forecastDate);
        // Get the icon for the weather
        let icon = data.daily[i].weather[0].icon;
        let forecastIcon = document.createElement("img");
        forecastIcon.classList.add("forecast-icon");
        forecastIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
        forecastCard.appendChild(forecastIcon);
        // get the temperature for each day
        let temperature = data.daily[i].feels_like.day;
        let forecastTemperature = document.createElement("p");
        forecastTemperature.textContent = "Temperature: " + temperature + " C";
        forecastCard.appendChild(forecastTemperature);
        forecastTemperature.classList.add("forecast-temperature");
        // get the wind for each day
        let wind = data.daily[i].wind_speed;
        let forecastWind = document.createElement("p");
        forecastWind.textContent = "Wind: " + wind + " KM/H";
        forecastCard.appendChild(forecastWind);
        forecastWind.classList.add("forecast-wind");
        // get the humidity for each day
        let humidity = data.daily[i].humidity;
        let forecastHumidity = document.createElement("p");
        forecastHumidity.textContent = "Humidity: " + humidity + "%";
        forecastCard.appendChild(forecastHumidity);
        forecastHumidity.classList.add("forecast-humidity");
    }
    // get the date for each day
    // get the icons
    console.log(data);
    // add each day to a card to be displayed at the bottom of the page
}

// Function to save searches to local storage
function saveToStorage(cityName) {
    localStorage.setItem(`${cityName}`, cityName);
}

// Function to loop through all 
function getStorage() {
    for (let i=0; i<localStorage.length; i++) {
        createSavedList(localStorage.getItem(localStorage.key(i)));
    }
}


// Get data from local storage to search again on click
let buttonWrapper = document.getElementById("saved-searches-container");
buttonWrapper.addEventListener("click", function(event) {
    let reSearchCity = localStorage.getItem(event.target.textContent);
    getCity(reSearchCity);
})
getStorage();
