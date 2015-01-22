var weatherData = {
	city: document.querySelector("#city"),
	weather: document.querySelector("#weather"),
	temperature: document.querySelector("#temperature"),
	temperatureValue: 0,
	units: "°F"
};

/* Assigning Location and Calling Weather API */

function getLocationAndWeather(){
	if (window.XMLHttpRequest){
		var xhr = new XMLHttpRequest();
		xhr.addEventListener("load", function() {
			
			var response = JSON.parse(xhr.responseText);

			var position = {
				latitude: response.latitude,
				longitude: response.longitude
			};

			var cityName = response.city;
			
			var weatherSimpleDescription = response.weather.simple;
			var weatherDescription = response.weather.description;
		
			var weatherTemperature = response.weather.temperature;

			weatherData.temperatureValue = weatherTemperature;

			loadBackground(position.latitude, position.longitude, weatherSimpleDescription);
			weatherData.city.innerHTML = cityName;
			weatherData.weather.innerHTML =  weatherDescription;
			weatherData.temperature.innerHTML = weatherTemperature + weatherData.units;

		}, false);
		
		/* 
		The wrapping service which detects the user's IP address and then makes two calls: 
			1) to smart-ip.net to convert the IP address to location (longitude and latitude) 
			2) to openweathermap.org using the location and the API key to retrieve the weather information
		*/ 

		xhr.open("GET", "https://fourtonfish.com/tutorials/weather-web-app/getlocationandweather.php?owapikey=e31f72028ebd58da364e32d136a2568b&units=imperial", true);
		xhr.send();
	}
	else{
		//
	}						
}


/* Calling Flicker API */
function loadBackground(lat, lon, weatherTag) {
	var script_element = document.createElement('script');

	script_element.src = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3d0e75971a98e2c6702bd15b6bf729c6&lat=" + lat + "&lon=" + lon + "&accuracy=1&tags=" + weatherTag + "&sort=relevance&extras=url_l&format=json";

	document.getElementsByTagName('head')[0].appendChild(script_element);
}

function jsonFlickrApi(data){
	
	var photo = data.photos.photo[0];
	document.querySelector("body").style.backgroundImage = "url('" + photo.url_l + "')";
}

getLocationAndWeather();
