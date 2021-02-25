
// My API key to OpenWeather API
var api = '4d52cf6d12c63448e460f11ea75544d2';
var units = 'imperial';
savedCity = []

// Variable IDs
var cityUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + locator + '&units=imperial&appid=' + api;
// var cityUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Henderson&units=imperial&appid=4d52cf6d12c63448e460f11ea75544d2;
var currencity = '';
currentTime = moment();
$("#currentTime").text(currentTime.format("dddd MMM Do, YYYY h:mm:ss a"));

var locator = $("#city-input");
var searchHistory = $("#history");
var submitButton = $("#submitCity");
var currentCity = $("#current-city");
var tempNow = $("temperature");
var humidity = $("#current-humidity");
var windspeed = $("#current-wind-speed");
var uv = $("#uv-index");
var weatherContent = $("#weather-content");
var clearHistory = $("#clear-history");

$(document).on('submit', function (event) {
    event.preventDefault();

    var inputValue = locator.val().trim()

    apiWeather(inputValue);
    searchHistory(inputValue);
    locator.val("");

})

submitButton.on("click", function (event) {
    event.preventDefault();

    var inputValue = locator.val().trim()
    apiWeather(inputValue)
    locator.val("");


});

clearHistory.on("click", function(){
    savedcities = []
})
searchHistory.on("click","li.city-btn", function(event) {
    var value = $(this).data("value");
    apiWeather(value);
    searchHistory(value); 

});

// Syncs with Open Weather Map API
function apiWeather(locator) {
    
    // Fetches input data
    var cityUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + locator + "&units=imperial&appid=" + api;
    fetch(cityUrl)
    .then(function(response){
        return response.json();      
    }).then(function(response){
        console.log(response);
        currentCity.text(response.name);
        currentCity.append("<small class='text-muted' id='current-date'>");
        tempNow.text(response.main.temp);
        tempNow.append("&deg;F");
        humidity.text(response.main.humidity + "%");
        windspeed.text(response.wind.speed + "MPH");

        var lat = response.coord.lat;
        var lon = response.coord.lon;
        

        var uv = "https://api.openweathermap.org/data/2.5/uvi?&lat=" + lat + "&lon=" + lon + "&appid=" + api;
        // Fetches UV data
        fetch(uv)
        .then(function(response){
            return response.json(); 
        }).then(function(response){
            $('#uv-index').html( response.value);
        });

    
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=" + api + "&lat=" + lat +  "&lon=" + lon;
        
        // Fetches 5 Day Forecast
        fetch(forecastURL)
    .then(function(response){
        return response.json();   
        }).then(function(response){
            console.log(response);
            // Empties so forecast doesnt overload
            $('#five-day-forecast').empty();
            for (var i = 1; i < response.list.length; i+=8) {

                var forecastDateString = moment(response.list[i].dt_txt).format("L");
                console.log(forecastDateString);

                var forecastCol = $("<div class='col-12 col-md-6 col-lg forecast-day mb-3'>");
                var forecastCard = $("<div class='card'>");
                var forecastCardBody = $("<div class='card-body'>");
                var forecastDate = $("<h5 class='card-title'>");
                var forecastIcon = $("<img>");
                var forecastTemp = $("<p class='card-text mb-0'>");
                var forecastHumidity = $("<p class='card-text mb-0'>");


                $('#five-day-forecast').append(forecastCol);
                forecastCol.append(forecastCard);
                forecastCard.append(forecastCardBody);

                forecastCardBody.append(forecastDate);
                forecastCardBody.append(forecastIcon);
                forecastCardBody.append(forecastTemp);
                forecastCardBody.append(forecastHumidity);
                
                forecastIcon.attr("src", "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                forecastIcon.attr("alt", response.list[i].weather[0].main)
                forecastDate.text(forecastDateString);
                forecastTemp.text(response.list[i].main.temp);
                forecastTemp.prepend("Temp: ");
                forecastTemp.append("&deg;F");
                forecastHumidity.text(response.list[i].main.humidity);
                forecastHumidity.prepend("Humidity: ");
                forecastHumidity.append("%");
                
            }
        });

    });

    

};

