// Ville par défaut
let city = 'havre'
// Clé Api
const apiKey = '8a297cbfa4043dba3ad99bf0673efbc8'
// Url permettant d'obtenir les prévisions météo
// let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
let url = 'https://api.openweathermap.org/data/2.5/forecast?lang=fr&units=metric&q=' + city + '&appid=' + apiKey

// On va chercher les infos de l'url
fetch(url)
.then(response => response.json())
.then(data => {
	// Affiche le json en entier
	console.log(data)
	// Afficher la ville
	console.log(data.city.name)
	// Afficher date et heure
	console.log(data.list[0].dt_txt)
	console.log(data.list[0].main.temp)
	console.log(data.list[0].main.feels_like)
	console.log(data.list[0].weather[0].description)
	console.log(data.list[0].main.temp_min)
	console.log(data.list[0].main.temp_max)
	console.log(data.city.sunrise)
	console.log(data.city.sunset)
	console.log(data.list[0].wind.speed)
	console.log(data.list[0].main.humidity)

	document.querySelector('#interface').innerHTML = `
	<div class="meteo-app">
		<div class="meteo-card">
			<h1 class="titre">Cloudy<span class="simple">®</span></h1>
			<header class="header">
				<div class="image-card">
					<img id="weather-icon" class="image-fond" src="img/" alt="Icône météo" />
				</div>
				<h2 id="city-name">${data.city.name}</h2>
				<span class="choix-ville">
					<box-icon color="#a4d4f5" type='solid' name='map'></box-icon>
				</span>
				
				<!-- Barre de recherche -->
				<div id="search-bar" class="hidden">
					<input id="city-input" type="text" placeholder="Entrez une ville" />
					<button id="search-button">Rechercher</button>
				</div>
				<span class="reglages-icon"><box-icon color="#a4d4f5" type='solid' name='cog'></box-icon></span>
			</header>
			<div class="meteo-actuel">
				<h4 class="dateheure"><span id="dt_txt">${data.list[0].dt_txt}</span></h4>
				<h3 id="current-temp" class="temperature">--°</h3>
				<h5 class="resenti">Ressenti<span id="feels_like">--°</span></h5>
				<p id="weather-condition" class="condition">--</p>
				<p id="temp-range" class="maximale-minimale">--°/--°</p>
			</div>
			<div class="prochains-jours" id="forecast">
				<!-- Prévision pour insérées des données api via JavaScript -->
			</div>
			<div class="ventleverhumidité">
				<h5 class="leversoleil">Lever <span id="sunrise-time">--:--</span></h5>
				<h6 class="couchersoleil">Coucher <span id="sunset-time">--:--</span></h6>
				<h7 class="vents">Vent : <span id="wind-speed">-- km/h</span></h7>
				<h8 class="humidité">Humidité : <span id="humidity-level">--%</span></h8>
			</div>
		</div>
	</div>
	`
	// document.getElementById('interface')
})