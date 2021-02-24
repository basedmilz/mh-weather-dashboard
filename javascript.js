var apiKey = '4d52cf6d12c63448e460f11ea75544d2'; 
var units = 'imperial';
var cityUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city+ '&appid=' + apiKey 
var currentity = 'Henderson';
var city = document.querySelector("finder")
 
fetch(cityUrl)
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data);
})

console.log(finder)
