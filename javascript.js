
// My API key to OpenWeather API
var apiKey = '4d52cf6d12c63448e460f11ea75544d2';
var units = 'imperial';

// Variable IDs
// var cityUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + locator + '&units=imperial&appid=' + apiKey;
// var cityUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Henderson&units=imperial&appid=4d52cf6d12c63448e460f11ea75544d2;
var currencity = '';
currentTime = moment();
$("#currentTime").text(currentTime.format("dddd MMM Do, YYYY h:mm:ss a"));

var locator = $("#city-input")
var searchHistory = $("history");
var submitButton = $("submitCity")
var currentCity = $("current-city")
var tempNow = $("temperature")
var humidity = $("#current-humidity")
var windspeed = $("#current-wind-speed")
var uv = $("#uv-index")
var weatherContent = $("weather-content")
var locatorValue = locator.val().trim()

$(document).on('submit', function (event) {
    event.preventDefault();
    apiWeather(event);
});


function apiWeather(CityID) {
    var cityUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + locator + '&appid=' + apiKey + '&units=imperial';
    fetch(cityUrl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
        }).catch(function () {

        })

}
// fetch(cityUrl)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (response) {
//         currentCity.text(response.name);

//     }
//     )