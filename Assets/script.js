// Ville par défaut
let city = 'havre';
// Clé API
const apiKey = '8a297cbfa4043dba3ad99bf0673efbc8';
// URL pour obtenir les prévisions météo
let url = 'https://api.openweathermap.org/data/2.5/forecast?lang=fr&units=metric&q=' + city + '&appid=' + apiKey;

// Fonction pour formater l'heure
function getFormattedTime(timestamp, locale) {
    // Créer une date à partir du timestamp
    const date = new Date(timestamp * 1000); // Multiplier par 1000 car OpenWeatherMap renvoie les timestamps en secondes
    // Options de formatage
    const options = { hour: 'numeric', minute: 'numeric' };
    // Retourner l'heure formatée
    return new Intl.DateTimeFormat(locale, options).format(date);
}

// Fetch pour récupérer les données météo
fetch(url)
    .then(response => response.json())
    .then(data => {
        // Extraire les heures de lever et coucher du soleil
        const sunrise = getFormattedTime(data.city.sunrise, 'fr-FR');
        const sunset = getFormattedTime(data.city.sunset, 'fr-FR');

        // Insérer le contenu dans la page
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
                        <h3 id="current-temp" class="temperature">${data.list[0].main.temp}°</h3>
                        <h5 class="resenti">Ressenti<span id="feels_like"> ${data.list[0].main.feels_like}°</span></h5>
                        <p id="weather-condition" class="condition">${data.list[0].weather[0].description}</p>
                        <p id="temp-range" class="maximale-minimale">min ${data.list[0].main.temp_min}° / max ${data.list[0].main.temp_max}°</p>
                    </div>
                    <div class="prochains-jours" id="forecast">
                        <!-- Prévision pour insérées des données API via JavaScript -->
                    </div>
                    <div class="ventleverhumidité">
                        <h5 class="leversoleil">Lever<span id="sunrise-time">${sunrise}</span></h5>
                        <h6 class="couchersoleil">Coucher <span id="sunset-time">${sunset}</span></h6>
                        <h7 class="vents">Vent<span id="wind-speed">${data.list[0].wind.speed} km/h</span></h7>
                        <h8 class="humidité">Humidité<span id="humidity-level">${data.list[0].main.humidity} %</span></h8>
                    </div>
                </div>
            </div>
        `;
    });
