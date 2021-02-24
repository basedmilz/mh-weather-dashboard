var apiKey = '4d52cf6d12c63448e460f11ea75544d2';
var units = 'imperial';
var cityUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey
var currencity = '';
var finder = document.querySelector("finder")
var displayer = document.querySelector("thecity")

fetch(cityUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })

console.log(finder)

var currentUpdate = function (x) {
    fetch(cityUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayWeather(data, x);
        })
}

var displayWeather = function(finder) {
    displayer.textContent = finder;

}