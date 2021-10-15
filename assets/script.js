
var apiKey = 'b945e6c55db2211fcf73cb3bc9d8d3c7';
var currentWeather = document.querySelector("#currentWeather");
var citySearched = {
    citySearches: []
};

var day1 = document.querySelector("#day1");
var day2 = document.querySelector("#day2");
var day3 = document.querySelector("#day3");
var day4 = document.querySelector("#day4");
var day5 = document.querySelector("#day5");

// Display searchedHistory as buttons
var searchHistory = document.querySelector("#searchHistory");

function displaySearchHistory () {
    $('.addedButton').remove();
    storedCitySearched = JSON.parse(localStorage.getItem("storedCitySearched"));
    console.log(storedCitySearched);
    if (storedCitySearched == null) {
        return;  
    } else {
        for (var i=0; i < citySearched.citySearches.length; i++) {
            var searchX = citySearched.citySearches[i];

            var listButton = document.createElement("button");
            listButton.setAttribute("class", "addedButton");
            listButton.setAttribute("data-attribute", searchX.value);
            listButton.textContent = searchX;
            searchHistory.appendChild(listButton);
        };
        clearUi();
        fetchData();
    };
};

// Store searched city in storage and as global variable
function storeSearchedCity(event) {
    event.preventDefault();
    var storedCitySearched = JSON.parse(localStorage.getItem("storedCitySearched"));
    if (storedCitySearched !== null) {
        citySearched = storedCitySearched;
        var cityInput = document.querySelector(".form-control");
        citySearched.citySearches.unshift(cityInput.value);
    } else {
        var cityInput = document.querySelector(".form-control");
        citySearched.citySearches.unshift(cityInput.value);
    }
    localStorage.setItem("storedCitySearched", JSON.stringify(citySearched));
    displaySearchHistory();
}

// Clear existing weather details
function clearUi() {
    $('.addedElement').remove();
}

// Fetch Weather Data function
function fetchData() {

    var forecastQueryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + storedCitySearched.citySearches[0] + "&units=imperial&appid=" + apiKey;
    var currentQueryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + storedCitySearched.citySearches[0] + "&units=imperial&appid=" + apiKey;

    //Forecast weather fetch
    fetch(forecastQueryUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    var cityName = document.querySelector('h1');
                    cityName.textContent = "Current Weather in " + data.city.name;
    
                    var cardArray = [day1, day2, day3, day4, day5];
                    i = 0;
                    for (var j = 0; j < 40; j++) {
                        var today = moment().format("D");
                        var jsonDay = moment(data.list[j].dt, "X").format("D");
                        var hour = moment(data.list[j].dt, "X").format("H");
                        if ((jsonDay != today) && (hour == 15)) {
                            //date                            
                            var date = document.createElement('li');
                            date.setAttribute("class", "addedElement");
                            date.textContent = moment(data.list[j].dt, "X").format("l");
                            cardArray[i].appendChild(date);
                            //icon
                            var icon = document.createElement('img');
                            icon.setAttribute("class", "addedElement");
                            var iconCode = data.list[j].weather[0].icon;
                            icon.setAttribute("src", "https://openweathermap.org/img/wn/" + iconCode + ".png");
                            cardArray[i].appendChild(icon);
                            //temp
                            var temp1 = document.createElement('li');
                            temp1.setAttribute("class", "addedElement");
                            temp1.textContent = "Temp: " + data.list[j].main.temp + "F";
                            cardArray[i].appendChild(temp1);
                            //wind
                            var wind1 = document.createElement('li');
                            wind1.setAttribute("class", "addedElement");
                            wind1.textContent = "Wind: " + data.list[j].wind.speed + " MPH";
                            cardArray[i].appendChild(wind1);
                            //humidity
                            var humidity1 = document.createElement('li');
                            humidity1.setAttribute("class", "addedElement");
                            humidity1.textContent = "Humidity: " + data.list[j].main.humidity + "%";
                            cardArray[i].appendChild(humidity1);
                            i++;
                        };   
                    };            
                });
            };
    });
    
    //Current weather fetch
    fetch(currentQueryUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    //show temp
                    var temperature = document.createElement('li');
                    temperature.setAttribute("class", "addedElement");
                    temperature.textContent = "Temperature: " + data.main.temp + " F";
                    currentWeather.appendChild(temperature);
                    //show wind
                    var wind = document.createElement('li');
                    wind.setAttribute("class", "addedElement");
                    wind.textContent = "Wind: " + data.wind.speed + " MPH";
                    currentWeather.appendChild(wind);
                    //show humidity
                    var humidity = document.createElement('li');
                    humidity.setAttribute("class", "addedElement");
                    humidity.textContent = "Humidity: " + data.main.humidity + "%";
                    currentWeather.appendChild(humidity);
                    //show uvIndex
                    var uvIndex = document.createElement('li');
                    uvIndex.setAttribute("class", "addedElement");
                    uvIndex.textContent = "UV Index: " + data.clouds.all + "%";
                    currentWeather.appendChild(uvIndex);
                });
            } else {
                alert('Whoops, something went wrong: ' + response.statusText);
            }; 
    });
    
};

displaySearchHistory();

//Historic search button click
var historicSearchButton = function (event) {
    var cityButt = event.target.textContent('button');

    if (cityButt) {
        console.log(cityButt);
    };
};

//Listener for clicking searched cities buttons
$(document).on('click', '.addedButton', historicSearchButton);

// Call "fetchWeatherData" when Search button is clicked
document.getElementById('searchButton').addEventListener("click", storeSearchedCity);