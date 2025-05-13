const translations = {
      en: {
        title: "🌤️ Zino Weather Forecast",
        checkWeather: "Check Weather",
        loading: "Loading...",
        highlights: "🌟 Today's Highlights",
        offline: "You're offline. Please check your connection.",
        rainHigh: "🌧️ High chance of rain today!",
        rainLow: "☀️ No rain expected today.",
        pressure: "Pressure",
        wind: "Wind",
        seaLevel: "Sea Level",
         days: {
      Wed: 'Wed',
      Thu: 'Thu',
      Fri: 'Fri',
      Sat: 'Sat',
      Sun: 'Sun',
    },
    weather: {
      Clouds: 'Clouds',
      Rain: 'Rain',
    },
      },
      fr: {
        title: "🌤️ Prévisions Météo Zino",
        checkWeather: "Vérifier la météo",
        loading: "Chargement...",
        highlights: "🌟 Points forts d'aujourd'hui",
        offline: "Vous n'êtes pas connecté à Internet. Veuillez vérifier votre connexion.",
        rainHigh: "🌧️ Forte probabilité de pluie aujourd'hui!",
        rainLow: "☀️ Aucune pluie prévue aujourd'hui.",
        pressure: "Pression",
        wind: "Vent",
        seaLevel: "Niveau de la mer",
          days: {
      Wed: 'Mer',
      Thu: 'Jeu',
      Fri: 'Ven',
      Sat: 'Sam',
      Sun: 'Dim',
    },
    weather: {
      Clouds: 'Nuages',
      Rain: 'Pluie',
    },
      },
      ig: {
        title: "🌤️ Ncheta Ihu Igwe Zino",
        checkWeather: "Lelee Ihu Igwe",
        loading: "Na-ebufe...",
        highlights: "🌟 Ihe ngosi kachasị taa",
        offline: "Ị nweghị njikọ Ịntanetị. Biko lelee njikọ gị.",
        rainHigh: "🌧️ Enwere nnukwu ohere nke mmiri ozuzo taa!",
        rainLow: "☀️ Enweghị mmiri ozuzo a tụrụ anya taa.",
        pressure: "Mmanụ",
        wind: "Ifufe",
        seaLevel: "Ọnọdụ Oké Osimiri"
      },
      yo: {
        title: "🌤️ Iṣiro Afẹfẹ Zino",
        checkWeather: "Ṣayẹwo Afẹfẹ",
        loading: "Ìkó...",
        highlights: "🌟 Awọn ifojusi pataki oni",
        offline: "O nìkan ko ni asopọ ayelujara. Jọwọ ṣayẹwo asopọ rẹ.",
        rainHigh: "🌧️ Iseese giga ti ojo loni!",
        rainLow: "☀️ Ko si ojo ti a reti loni.",
        pressure: "Ẹdọfu",
        wind: "Afẹfẹ",
        seaLevel: "Ipele Omi",
      },
      ha: {
        title: "🌤️ Hasashen Yanayi Zino",
        checkWeather: "Duba Yanayi",
        loading: "Ana lodin...",
        highlights: "🌟 Abubuwan da suka fi fice a yau",
        offline: "Ba ka haɗa yanar gizo. Da fatan za a duba haɗin ka.",
        rainHigh: "🌧️ Babban yiwuwar ruwan sama yau!",
        rainLow: "☀️ Babu ruwan sama da ake tsammani yau.",
        pressure: "Matsin Lamba",
        wind: "Iska",
        seaLevel: "Matakin Teku"
      },
      ik: {
        title: "🌤️ Zino Ihina Tọrọ Miri",
        checkWeather: "Nkọwa Ihina Tọrọ Miri",
        loading: "Ịdọgharia...",
        highlights: "🌟 Nsoromá taa",
        offline: "Ị nweghị njikọ Ịntanetị. Biko lelee njikọ gị.",
        rainHigh: "🌧️ Enwe chioma miri taa!",
        rainLow: "☀️ Enwe miri a tụrụ anya taa.",
        pressure: "Mmanụ",
        wind: "Ifufe",
        seaLevel: "Ọnọdụ Oké Osimiri"
      }
    };



    let currentLang = "en";

    function changeLanguage() {
      currentLang = document.getElementById("languageSelect").value;
      updateLanguage();
    }

   function updateLanguage() {
  const t = translations[currentLang];
  document.getElementById("title").textContent = t.title;
  document.getElementById("checkWeather").textContent = t.checkWeather;
  document.getElementById("loadingText").textContent = t.loading;
  document.getElementById("highlights").querySelector("h2").textContent = t.highlights;
  document.getElementById("offline").textContent = t.offline;

  // Ensure the correct translations for the dates as well
  const forecastItems = document.querySelectorAll(".forecast");
  forecastItems.forEach(item => {
    const dateElement = item.querySelector(".forecast-date");
    const date = new Date(dateElement.textContent);
    dateElement.textContent = formatDate(date, currentLang); // Use the formatDate function
  });
}

// Helper function to format dates in the correct language
function formatDate(date, lang) {
  return date.toLocaleDateString(lang, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

    const weatherApiKey = "f63476def2671bc2ae7f30359f374f6b"; // OpenWeatherMap API key
    const unsplashApiKey = "p-DfnNp43w6kvyt5doBncF_v-91HXESL63S4npGhhWY"; // Unsplash API key

    window.addEventListener("load", () => {
      if (!navigator.onLine) {
        document.getElementById("offline").classList.remove("hidden");
      }
    });

    function showLoading(show) {
      document.getElementById("loading").classList.toggle("hidden", !show);
    }

    async function getWeather() {
      const city = document.getElementById("citySelect").value;
      if (!city || city === "Select a city") return alert("Please select a city");
      displayWeather(city);
    }

    async function displayWeather(city) {
      try {
        showLoading(true);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city},NG&units=metric&appid=${weatherApiKey}`
        );
        const data = await res.json();

        const today = data.list[0];
        const rainToday = today.pop * 100;
        const t = translations[currentLang];
        const rainMessage = rainToday > 60 ? t.rainHigh : t.rainLow;

        document.getElementById("cityName").textContent = data.city.name;
        document.getElementById("temperature").textContent = `${today.main.temp}°C`;
        document.getElementById("description").textContent = today.weather[0].description;
        document.getElementById("pressure").textContent = `${t.pressure}: ${today.main.pressure} hPa`;
        document.getElementById("wind").textContent = `${t.wind}: ${today.wind.speed} m/s`;
        document.getElementById("seaLevel").textContent = `${t.seaLevel}: ${today.main.sea_level || '—'}`;
        document.getElementById("rainAlert").textContent = rainMessage;

        const iconUrl = `https://openweathermap.org/img/wn/${today.weather[0].icon}@4x.png`;
        document.getElementById("cityImage").src = iconUrl;

        getCityImage(city);

        let forecastHTML = "";
        const daily = data.list.filter((item, index) => index % 8 === 0);
        daily.forEach((item) => {
          const date = new Date(item.dt_txt);
          forecastHTML += `
            <div class="forecast">
              <h4>${date.toLocaleDateString(currentLang, { weekday: "short" })}</h4>
              <img 
                src="https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png" 
                alt="${item.weather[0].main}" 
                class="forecast-icon"
              />
              <p><strong>${item.main.temp_max}°C</strong> / ${item.main.temp_min}°C</p>
              <p>${item.weather[0].main}</p>
            </div>
          `;
        });
        
        document.getElementById("forecastContainer").innerHTML = forecastHTML;

        showLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Error fetching weather data. Please try again later.");
        showLoading(false);
      }
    }

    async function getCityImage(city) {
      try {
        const res = await fetch(
          `https://api.unsplash.com/photos/random?query=${city}&client_id=${unsplashApiKey}`
        );
        const data = await res.json();
        const imageUrl = data.urls.regular;
        document.getElementById("cityImage").src = imageUrl;
      } catch (error) {
        console.error("Error fetching city image:", error);
      }
    }

    const toggleButton = document.getElementById('toggle-theme');
const body = document.body;

// Load saved theme from localStorage
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  toggleButton.textContent = '🌞';
}

toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  // Save preference
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    toggleButton.textContent = '🌞';
  } else {
    localStorage.setItem('theme', 'light');
    toggleButton.textContent = '🌙';
  }
});
document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Optionally switch the icon
  const themeIcon = document.getElementById("toggle-theme");
  themeIcon.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});
  const toggleBtn = document.getElementById('toggle-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Load theme from localStorage or system preference
  if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark)) {
    document.body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️';
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    toggleBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
