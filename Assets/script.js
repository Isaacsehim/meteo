// Définir la ville par défaut ou obtenir la ville via les paramètres d'URL
const urlParams = new URLSearchParams(window.location.search);
let city = urlParams.get('city') || 'havre'; // Ville par défaut si aucune n'est donnée

// Clé API et URL pour obtenir les prévisions météo
const apiKey = '8a297cbfa4043dba3ad99bf0673efbc8';
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lang=fr&units=metric&q=${city}&appid=${apiKey}`;

moment.locale('fr');

// Fonction pour arrondir les valeurs numériques
function precise(x) {
  return x.toPrecision(2);
}

function preciseWeather(x) {
  return Number(x.toFixed(1));
}

// Appel à l'API pour obtenir les données météo
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    displayWeather(data);
  });

// Fonction pour afficher la météo
function displayWeather(data) {
  let sunrise = new Date(data.city.sunrise * 1000);
  let sunset = new Date(data.city.sunset * 1000);
  
  document.querySelector('#interface').innerHTML = `
    <div class="meteo-app">
      <div class="meteo-card">
        <h1 class="titre">Cloudy<span class="simple">®</span></h1>
        <header class="header">
          <div class="image-card">
            <img id="weather-icon" class="image-fond" src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png" alt="Icône météo" />
          </div>
          <h2 id="city">${data.city.name}</h2>
        </header>
        <div class="meteo-actuel">
          <h4 class="date">${moment(data.list[0].dt_txt).locale('fr').format('LL')}</h4>
          <p class="heure">${moment(data.list[0].dt_txt).locale('fr').format('LT')}</p>
          <h3 class="temperature">${preciseWeather(data.list[0].main.temp)}°</h3>
          <h5 class="ressenti">Ressenti ${precise(data.list[0].main.feels_like)}°</h5>
          <p class="condition">${data.list[0].weather[0].description}</p>
          <p class="maximale-minimale">Min ${preciseWeather(data.list[0].main.temp_min)}° / Max ${preciseWeather(data.list[0].main.temp_max)}°</p>
        </div>
        <div class="prochains-jours" id="forecast"></div>
        <div class="ventleverhumidité">
          <h5>Lever : ${moment(sunrise).locale('fr').format('LT')}</h5>
          <h6>Coucher : ${moment(sunset).locale('fr').format('LT')}</h6>
          <h7>Vent : ${precise(data.list[0].wind.speed * 3.6)} km/h</h7>
          <h8>Humidité : ${data.list[0].main.humidity} %</h8>
        </div>
      </div>
    </div>
  `;
}

// Gestion de la barre de recherche
document.getElementById('btn').addEventListener('click', (e) => {
  e.preventDefault();

  let search = document.getElementById('search');
  let searchWidth = search.offsetWidth;

  if (searchWidth === 0) {
    search.style.width = '100%';
    setTimeout(() => search.style.height = '40px', 500);
  } else {
    search.style.height = '0';
    setTimeout(() => search.style.width = '0', 500);
  }
});
