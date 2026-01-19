const apiKey = "adc5eaf941ac09dffe54ea190a26a6ce";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=burundi";

const url = "https://api.openweathermap.org/data/2.5/weather?q=";

const skyState = document.querySelector(".sky");
const temperature = document.querySelector(".temperature");
const cityel = document.querySelector(".details .city");
const windel = document.querySelector(".wind");
const humidityel = document.querySelector(".humidity");
const searchBtn = document.querySelector(".search button");
const hidden = document.querySelector(".details");
const error = document.querySelector(".error");

async function checkWeather(cityname) {
  const response = await fetch(
    url + cityname + `&appid=${apiKey}&units=metric`,
  );

  if (response.status === 404) {
    error.classList.remove("hidden");
    hidden.classList.add("hidden");
    return;
  } else {
    error.classList.add("hidden");
    const data = await response.json();

    console.log(data);
    cityel.innerHTML = data.name;
    temperature.innerHTML = Math.round(data.main.temp) + "&degC";
    humidityel.innerHTML = data.main.humidity + "%";
    windel.innerHTML = data.wind.speed + " km/h";

    switch (data.weather[0].main) {
      case "Clouds":
        skyState.src = "images/clouds.png";
        break;
      case "Clear":
        skyState.src = "images/clear.png";
        break;
      case "Drizzle":
        skyState.src = "images/drizzle.png";
        break;
      case "Mist":
        skyState.src = "images/mist.png";
        break;
      case "Rain":
        skyState.src = "images/rain.png";
        break;
      case "Snow":
        skyState.src = "images/snow.png";
        break;
      default:
        skyState.src = "images/clouds.png";
    }
  }

  hidden.classList.remove("hidden");
  hidden.classList.add("flex");
}
const searchBox = document.querySelector(".search input");
// const isUndefined = searchBox.value.trim();
searchBtn.addEventListener("click", () => {
  if (searchBox.value != "") {
    checkWeather(searchBox.value);
    searchBox.value = "";
  }
});

searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && searchBox.value != "") {
    checkWeather(searchBox.value.trim());
    searchBox.value = "";
  }
});
