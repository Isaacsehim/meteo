const urlParams = new URLSearchParams(window.location.search);
let city = urlParams.get('city');

moment.locale('fr');

// 1er option - Ville par défaut
// let city = 'havre';

// 2ème option - Recherche texte pour ville
if (city == null || city == "") {
	city = 'havre'
}

// Clé API
const apiKey = '8a297cbfa4043dba3ad99bf0673efbc8';
// URL pour obtenir les prévisions météo
let url = 'https://api.openweathermap.org/data/2.5/forecast?lang=fr&units=metric&q=' + city + '&appid=' + apiKey;

function precise(x) {
	return x.toPrecision(2);
  }

// Fonction pour sortir la barre de recherche hidden  
// function setVisibility(id) {
// document.getElementById(id).style.visibility = 'visible';
// }

// Fetch pour récupérer les données météo
fetch(url)
    .then(response => response.json())
    .then(data => {
        // Extraire les heures de lever et coucher du soleil
        let sunrise = new Date (data.city.sunrise * 1000)
        let sunset = new Date (data.city.sunset * 1000)
		console.log(data)
        // Insérer le contenu dans la page
        document.querySelector('#interface').innerHTML = `
            <div class="meteo-app">
                <div class="meteo-card">
                    <h1 class="titre">Cloudy<span class="simple">®</span></h1>
                    <header class="header">
                        <div class="image-card">
                            <img id="weather-icon" class="image-fond" src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png" alt="Icône météo" />
                        </div>
                        <h2 id="city">${data.city.name}</h2>
                        <span class="choix-ville">
                            <box-icon color="#a4d4f5" type='solid' name='map'></box-icon>
                        </span>
                        
                        <!-- Barre de recherche -->
                        <form id="search-bar">
                            <input id="city-input" name="city" type="text" placeholder="Entrez une ville"/>
                            <button id="search-button">Rechercher</button>
                        </form>
                        <span class="reglages-icon"><box-icon color="#a4d4f5" type='solid' name='cog'></box-icon></span>
                    </header>
                    <div class="meteo-actuel">
                        <h4 class="date"><span id="dt_txt">${moment(data.list[0].dt_txt).locale('fr').format('LL')}</span></h4>
						<p class="heure"><span id="dt_txt">${moment(data.list[0].dt_txt).locale('fr').format('LT')}</span></p>
                        <h3 id="current-temp" class="temperature">${precise(data.list[0].main.temp)}°</h3>
                        <h5 class="ressenti">Ressenti<span id="feels_like"> ${precise(data.list[0].main.feels_like)}°</span></h5>
                        <p id="weather-condition" class="condition">${data.list[0].weather[0].description}</p>
                        <p id="temp-range" class="maximale-minimale">Min ${precise(data.list[0].main.temp_min)}° / Max ${precise(data.list[0].main.temp_max)}°</p>
                    </div>
                    <div class="prochains-jours" id="forecast">
                        <!-- Prévision pour insérées des données API via JavaScript -->
                    </div>
                    <div class="ventleverhumidité">
                        <h5 class="leversoleil">Lever<span id="sunrise-time">${moment(sunrise).locale('fr').format('LT')}</span></h5>
                        <h6 class="couchersoleil">Coucher <span id="sunset-time">${moment(sunset).locale('fr').format('LT')}</span></h6>
                        <h7 class="vents">Vent<span id="wind-speed">${precise(data.list[0].wind.speed* 3.6)} km/h</span></h7>
                        <h8 class="humidité">Humidité<span id="humidity-level">${data.list[0].main.humidity} %</span></h8>
                    </div>
                </div>
            </div>
        `
    });
