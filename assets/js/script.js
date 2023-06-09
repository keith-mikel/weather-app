var apiKey = 'e4c6bb9ae8a3a1977d9a3922b559c63c'

var cityInput = document.getElementById('cityInput');
var searchButton = document.getElementById('searchButton')
var currentWeather = document.getElementById('currentContainer')
var fiveDayWeather = document.getElementById('fiveDayContainer')
var searchHistoryContainer = document.getElementById('searchHistory')

var cityArray = [];

searchHistory = localStorage.getItem("citystore");
cityArray = searchHistory ? JSON.parse(searchHistory) : [];
updateSearchHistoryUI(cityArray);


function fetchWeather(cityName) {
  var urlCurrent = 'https://api.openweathermap.org/data/2.5/weather?q='+ cityName +'&appid='+ apiKey + '&units=imperial';
  var storedCities = localStorage.getItem("citystore");
  cityArray = storedCities ? JSON.parse(storedCities) : [];
  cityArray.push(cityName);
  if (cityArray.length > 5) {
    cityArray = cityArray.slice(-5);
  }
  var updatedCities = JSON.stringify(cityArray);
  localStorage.setItem("citystore", updatedCities);

  // current Weather
  fetch(urlCurrent)
    .then(function (response) {
      if (response.ok){
        response.json().then(function (data) {
          console.log(data);
          var cityLat = data.coord.lat;
          var cityLon = data.coord.lon;
          var cityDisplay = data.name
          var formattedDate = dayjs.unix(data.dt).format("dddd, MMMM D");
          var currentWeatherid = data.main.temp;
          var weatherDescription = data.weather[0].description;
          var weatherIcon = data.weather[0].icon;
          var windSpeed = data.wind.speed;

          currentWeather.innerHTML = '';

          var currentWeatherData = document.createElement('div');
          currentWeatherData.classList.add('card');
          currentWeatherData.style.width = '100%';

          var cityHeaderElement = document.createElement('h2')
          cityHeaderElement.textContent = cityDisplay

          var dateElement = document.createElement('p');
          dateElement.textContent = formattedDate;

          var temperatureElement = document.createElement('p');
          temperatureElement.textContent = 'Current Temperature: '+ currentWeatherid;
          
          var weatherDescriptionElement = document.createElement('p');
          weatherDescriptionElement.textContent = weatherDescription;
          
          var weatherIconElement = document.createElement('img');
          weatherIconElement.src = 'http://openweathermap.org/img/w/' + weatherIcon + '.png';
          weatherIconElement.width = 100;
          weatherIconElement.height = 100;
          weatherIconElement.classList.add('mx-auto', 'd-block');
          

          var windSpeedElement = document.createElement('p');
          windSpeedElement.textContent = 'Wind Speed: ' + windSpeed;

          currentWeatherData.appendChild(cityHeaderElement);
          currentWeatherData.appendChild(dateElement);
          currentWeatherData.appendChild(temperatureElement);
          currentWeatherData.appendChild(weatherDescriptionElement);
          currentWeatherData.appendChild(weatherIconElement);
          currentWeatherData.appendChild(windSpeedElement);

          currentWeather.appendChild(currentWeatherData);
         


          // five day url
          var urlFiveDay = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ cityLat + '&lon=' + cityLon +'&appid=' + apiKey + '&units=imperial&cnt=5';

          // 5 Day Forecast
          fetch(urlFiveDay)
            .then(function (response) {
              if (response.ok){
                response.json().then(function (data) {
                  console.log(data);
                  fiveDayWeather.innerHTML = '';
                  for (var i = 0; i < data.list.length; i++) {
                    var formattedDate = dayjs.unix(data.list[i].dt).format("MMMM, D");
                    var temperature = data.list[i].main.temp;
                    var weatherDescription = data.list[i].weather[0].description;
                    var weatherIcon = data.list[i].weather[0].icon;
                    var windSpeed = data.list[i].wind.speed;
          
                    var card = document.createElement('div');
                    card.classList.add('card');
                    card.style.width = '18rem';

                    var dateElement = document.createElement('p');
                    dateElement.textContent = formattedDate;
          
                    var temperatureElement = document.createElement('p');
                    temperatureElement.textContent ='Temperature: ' +  temperature;
          
                    var weatherDescriptionElement = document.createElement('p');
                    weatherDescriptionElement.textContent = weatherDescription;
          
                    var weatherIconElement = document.createElement('img');
                    weatherIconElement.src = 'http://openweathermap.org/img/w/' + weatherIcon + '.png';
                    weatherIconElement.width = 100;
                    weatherIconElement.height = 100;
                    weatherIconElement.classList.add('mx-auto', 'd-block');
          
                    var windSpeedElement = document.createElement('p');
                    windSpeedElement.textContent = 'Wind Speed: ' + windSpeed;
          
                    card.appendChild(dateElement);
                    card.appendChild(temperatureElement);
                    card.appendChild(weatherDescriptionElement);
                    card.appendChild(weatherIconElement);
                    card.appendChild(windSpeedElement);
          
                    fiveDayWeather.appendChild(card);
                  }
                });
              }
            });
        });
      }
      else {
        alert('Please Enter a Valid City')
      }
    });
  
}

function updateSearchHistoryUI(cityArray) {
  searchHistoryContainer.innerHTML = ""; // Clear existing content

  cityArray.forEach(function(cityName) {
    var button = document.createElement("p");
    button.textContent = cityName;
    button.classList.add('card');
    button.style.width='18rem';
    button.classList.add("city-button");
    button.classList.add("mx-auto"); 
    searchHistoryContainer.appendChild(button);
  });
}

searchButton.addEventListener('click', function() {
  var cityName = cityInput.value;
  fetchWeather(cityName);
  updateSearchHistoryUI(cityArray);
      });

var cityButtons = document.querySelectorAll('.city-button');

cityButtons.forEach(function(cityButton) {
  cityButton.addEventListener('click', function(event) {
    var cityName = event.target.innerHTML;
    fetchWeather(cityName);
  });
});




