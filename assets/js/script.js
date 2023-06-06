var apiKey = 'e4c6bb9ae8a3a1977d9a3922b559c63c'

var cityInput = document.getElementById('cityInput');
var searchButton = document.getElementById('searchButton')
var currentWeather = document.getElementById('currentContainer')
var fiveDayWeather = document.getElementById('fiveDayContainer')
var searchHistoryContainer = document.getElementById('searchHistory')

searchButton.addEventListener('click', function () {
    var cityName = cityInput.value;
    var urlCurrent = 'https://api.openweathermap.org/data/2.5/weather?q='+ cityName +'&appid='+ apiKey + '&units=imperial';
        // current Weather
        fetch(urlCurrent)
        .then(function (response) {
            if (response.ok){
                response.json().then(function (data) {
                    console.log(data)
                    var cityLat = data.coord.lat
                    var cityLon = data.coord.lon
                    currentWeather.textContent = data.main.temp



                    // five day url
                    var urlFiveDay = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ cityLat + '&lon=' + cityLon +'&appid=' + apiKey + '&units=imperial&cnt=5';

                    // 5 Day Forecast
                    fetch(urlFiveDay)
                    .then(function (response) {
                        if (response.ok){
                            response.json().then(function (data) {
                                console.log(data)
                                
                                for (var i = 0; i < data.list.length; i++) {
                                    var temperature = data.list[i].main.temp;
                                    var p = document.createElement('p');
                                    p.textContent = temperature;
                                    fiveDayWeather.appendChild(p);
                                }
                                
                        })
                    }
                });
                // Save search history in local storage
                var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
                searchHistory.push(cityName);
                localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

                // Clear previous search history buttons
                searchHistoryContainer.innerHTML = '';

                // Display search history buttons
                for (var i = 0; i < searchHistory.length; i++) {
                  var historyButton = document.createElement('button');
                  historyButton.textContent = searchHistory[i];
                  historyButton.addEventListener('click', function() {
                    cityInput.value = this.textContent;
                    searchButton.click();
                  });
                }
            })
        }
    })
})

// Retrieve search history from local storage and display
var storedSearchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
for (var i = 0; i < storedSearchHistory.length; i++) {
  var historyButton = document.createElement('button');
  historyButton.textContent = storedSearchHistory[i];
  historyButton.addEventListener('click', function() {
    cityInput.value = this.textContent;
    searchButton.click();
  });
  searchHistoryContainer.appendChild(historyButton);
}
