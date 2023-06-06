

var apiKey = 'e4c6bb9ae8a3a1977d9a3922b559c63c'

var cityName = 'Minneapolis'

var urlCurrent = 'https://api.openweathermap.org/data/2.5/weather?q='+ cityName +'&appid='+ apiKey + '&units=imperial'

var cityLat = '44.98'

var cityLon = '-93.2638'

var urlFiveDay = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ cityLat + '&lon=' + cityLon +'&appid=' + apiKey + '&units=imperial&cnt=5'


// current Weather
fetch(urlCurrent)
.then(function (response) {
    if (response.ok){
        response.json().then(function (data) {
            console.log(data)
        })
    }
});


// 5 Day Forecast
fetch(urlFiveDay)
.then(function (response) {
    if (response.ok){
        response.json().then(function (data) {
            console.log(data)
        })
    }
});

