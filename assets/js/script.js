// key for openweather
var apiKey = 'e4c6bb9ae8a3a1977d9a3922b559c63c';

// links to html
var cityInput = document.getElementById('cityInput');
var searchButton = document.getElementById('searchButton');
var currentWeather = document.getElementById('currentContainer');
var fiveDayWeather = document.getElementById('fiveDayContainer');
var searchHistoryContainer = document.getElementById('searchHistory');

// empty array for search history
var cityArray = [];

// fetch and display the search history from local storage
searchHistory = localStorage.getItem('citystore');
cityArray = searchHistory ? JSON.parse(searchHistory) : [];
updateSearchHistoryUI(cityArray);

// function to fetchweather from open weather
function fetchWeather(cityName) {
  var urlCurrent =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    cityName +
    '&appid=' +
    apiKey +
    '&units=imperial';
    // store searched city in local storage
  var storedCities = localStorage.getItem('citystore');
  cityArray = storedCities ? JSON.parse(storedCities) : [];
  cityArray.push(cityName);
  if (cityArray.length > 5) {
    cityArray = cityArray.slice(-5);
  }
  var updatedCities = JSON.stringify(cityArray);
  localStorage.setItem('citystore', updatedCities);

  // current Weather
  fetch(urlCurrent)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          // variables for each required data snippet
          var cityLat = data.coord.lat;
          var cityLon = data.coord.lon;
          var cityDisplay = data.name;
          var formattedDate = dayjs.unix(data.dt).format('dddd, MMMM D');
          var currentWeatherid = data.main.temp;
          var weatherDescription = data.weather[0].description;
          var weatherIcon = data.weather[0].icon;
          var windSpeed = data.wind.speed;
          var humidity = data.main.humidity;

          currentWeather.innerHTML = '';

          // create elements for each piece of data

          var currentWeatherData = document.createElement('div');
          currentWeatherData.classList.add('card');
          currentWeatherData.style.width = '100%';

          var cityHeaderElement = document.createElement('h2');
          cityHeaderElement.textContent = cityDisplay;

          var dateElement = document.createElement('p');
          dateElement.textContent = formattedDate;

          var temperatureElement = document.createElement('p');
          temperatureElement.textContent =
            'Current Temperature: ' + currentWeatherid;

          var weatherDescriptionElement = document.createElement('p');
          weatherDescriptionElement.textContent = weatherDescription;

          var weatherIconElement = document.createElement('img');
          weatherIconElement.src =
            'http://openweathermap.org/img/w/' + weatherIcon + '.png';
          weatherIconElement.width = 100;
          weatherIconElement.height = 100;
          weatherIconElement.classList.add('mx-auto', 'd-block');

          var windSpeedElement = document.createElement('p');
          windSpeedElement.textContent = 'Wind Speed: ' + windSpeed;

          var humidityElement = document.createElement('p');
          humidityElement.textContent = 'Humidity: ' + humidity + '%';

          // input the data into html
          currentWeatherData.appendChild(cityHeaderElement);
          currentWeatherData.appendChild(dateElement);
          currentWeatherData.appendChild(temperatureElement);
          currentWeatherData.appendChild(weatherDescriptionElement);
          currentWeatherData.appendChild(weatherIconElement);
          currentWeatherData.appendChild(windSpeedElement);
          currentWeatherData.appendChild(humidityElement);

          currentWeather.appendChild(currentWeatherData);

          // five day url
          var urlFiveDay =
            'https://api.openweathermap.org/data/2.5/forecast?lat=' +
            cityLat +
            '&lon=' +
            cityLon +
            '&appid=' +
            apiKey +
            '&units=imperial';

          // 5 Day Forecast
          fetch(urlFiveDay)
            .then(function (response) {
              if (response.ok) {
                response.json().then(function (data) {
                  console.log(data);
                  fiveDayWeather.innerHTML = '';
                  // iterate per day by increasing by 8 based on the 3 hour 5 day forecast
                  for (var i = 0; i < data.list.length; i += 8) {
                    var formattedDate = dayjs
                      .unix(data.list[i].dt)
                      .format('MMMM, D');
                      // variables to iterate for each give data snippet
                    var temperature = data.list[i].main.temp;
                    var weatherDescription =
                      data.list[i].weather[0].description;
                    var weatherIcon = data.list[i].weather[0].icon;
                    var windSpeed = data.list[i].wind.speed;
                    var humidity = data.list[i].main.humidity;

                    // creating elements for each data snippet
                    var card = document.createElement('div');
                    card.classList.add('card');
                    card.style.width = '18rem';

                    var dateElement = document.createElement('p');
                    dateElement.textContent = formattedDate;

                    var temperatureElement = document.createElement('p');
                    temperatureElement.textContent =
                      'Temperature: ' + temperature;

                    var weatherDescriptionElement =
                      document.createElement('p');
                    weatherDescriptionElement.textContent =
                      weatherDescription;

                    var weatherIconElement = document.createElement('img');
                    weatherIconElement.src =
                      'http://openweathermap.org/img/w/' +
                      weatherIcon +
                      '.png';
                    weatherIconElement.width = 100;
                    weatherIconElement.height = 100;
                    weatherIconElement.classList.add('mx-auto', 'd-block');

                    var windSpeedElement = document.createElement('p');
                    windSpeedElement.textContent = 'Wind Speed: ' + windSpeed;

                    var humidityElement = document.createElement('p');
                    humidityElement.textContent = 'Humidity: ' + humidity + '%';
                    
                    // inputing data into the html for 5 day forecast
                    card.appendChild(dateElement);
                    card.appendChild(temperatureElement);
                    card.appendChild(weatherDescriptionElement);
                    card.appendChild(weatherIconElement);
                    card.appendChild(windSpeedElement);
                    card.appendChild(humidityElement);

                    fiveDayWeather.appendChild(card);
                  }
                });
              }
            });
        });
        // condition if fetch fails
      } else {
        alert('Please Enter a Valid City');
      }
    });
}

// update the search history
function updateSearchHistoryUI(cityArray) {
  searchHistoryContainer.innerHTML = ''; // Clear existing content

  cityArray.forEach(function (cityName) {
    var button = document.createElement('p');
    button.textContent = cityName;
    button.classList.add('card');
    button.style.width = '18rem';
    button.classList.add('city-button');
    button.classList.add('mx-auto');
    searchHistoryContainer.appendChild(button);

    // Add event listener to each city button
    button.addEventListener('click', function (event) {
      var cityName = event.target.innerHTML;
      fetchWeather(cityName);
    });
  });
}

// event to run the fetch weather on click of the submit button
searchButton.addEventListener('click', function () {
  var cityName = cityInput.value;
  fetchWeather(cityName);
  updateSearchHistoryUI(cityArray);
});