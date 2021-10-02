
var apiKey = 'b945e6c55db2211fcf73cb3bc9d8d3c7';
var currentWeather = document.querySelector("#currentWeather");
var storedCitySearched;
var day1 = document.querySelector("#day1");
var day2 = document.querySelector("#day2");

// Store searched city
function storeSearchedCity(event) {
    event.preventDefault();
    var citySearched = document.querySelector(".form-control");
    localStorage.setItem("storedCitySearched", JSON.stringify(citySearched.value));
    storedCitySearched = JSON.parse(localStorage.getItem("storedCitySearched"));
    fetchData();
}

// Fetch Weather Data function
function fetchData() {
    var forecastQueryUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + storedCitySearched + "&units=imperial&appid=" + apiKey;
    var currentQueryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + storedCitySearched + "&units=imperial&appid=" + apiKey;

    //Forecast weather
    fetch(forecastQueryUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    var cityName = document.querySelector('h1');
                    cityName.textContent = "Current Weather in " + data.city.name;
                    //day 1
                    //date
                    var date = document.createElement('li');
                    date.textContent = data.list[0].dt_txt;
                    day1.appendChild(date);
                    //icon
                    var icon = document.getElementById('img1');
                    var iconCode = data.list[0].weather[0].icon;
                    icon.setAttribute("src", "http://openweathermap.org/img/wn/" + iconCode + ".png")
                    day1.appendChild(icon);
                    //temp
                    var temp1 = document.createElement('li');
                    temp1.textContent = "Temp: " + data.list[0].main.temp;
                    day1.appendChild(temp1);
                    //wind
                    var wind1 = document.createElement('li');
                    wind1.textContent = "Wind: " + data.list[0].wind.speed;
                    day1.appendChild(wind1);
                    //humidity
                    var humidity1 = document.createElement('li');
                    humidity1.textContent = "Humidity: " + data.list[0].main.humidity; + "%";
                    day1.appendChild(humidity1);             
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
                    temperature.textContent = "Temperature: " + data.main.temp + " F";
                    currentWeather.appendChild(temperature);
                    //show wind
                    var wind = document.createElement('li');
                    wind.textContent = "Wind: " + data.wind.speed + " MPH";
                    currentWeather.appendChild(wind);
                    //show humidity
                    var humidity = document.createElement('li');
                    humidity.textContent = "Humidity: " + data.main.humidity + "%";
                    currentWeather.appendChild(humidity);
                    //show uvIndex
                    var uvIndex = document.createElement('li');
                    uvIndex.textContent = "UV Index: " + data.clouds.all + "%";
                    currentWeather.appendChild(uvIndex);
                });
            } else {
                alert('Whoops, something went wrong: ' + response.statusText);
            }; 
    });
    
};



// Call "fetchWeatherData" when Search button is clicked
document.getElementById('searchButton').addEventListener("click", storeSearchedCity);
