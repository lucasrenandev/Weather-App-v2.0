// Modo estrito
'use strict';

// Elementos
const container = document.querySelector(".container");
const startBtn = document.querySelector(".start-btn");
const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const invalid = document.querySelector(".invalid");
const empty = document.querySelector(".empty");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const country = document.querySelector(".country");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weather = document.querySelector(".weather");
const icon = document.querySelector(".weather-icon");
const apiKey = "fdf86069973a81bc10932ae1a7dd10f5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Verificar clima
async function checkWeather(city, response, data) {
    response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    container.classList.add("sticky");

    if(response.status === 404) {
        invalid.style.display = "block"
        empty.style.display = "none";
        weather.style.transform = `scale(0)`
        container.classList.remove("sticky"); 
    }
    else if(response.status === 400) {
        invalid.style.display = "none";
        empty.style.display = "block";
        weather.style.transform = `scale(0)`;
        container.classList.remove("sticky");
    }
    else {
        responseData(response, data)
        invalid.style.display = "none";
        empty.style.display = "none";
        weather.style.transform = `scale(1)`;
        container.classList.add("sticky");
    }
    checkInputText();
}   

// Obter dados do clima
async function responseData(response, data) {
    data = await response.json();
    temp.textContent = Math.round(data.main.temp) + "°c";
    city.textContent = data.name + ",";
    country.textContent = data.sys.country;
    humidity.textContent = data.main.humidity + "%";
    wind.textContent = data.wind.speed + " km/h";

    if(data.weather[0].main === "Clouds") {
        icon.src = "assets/images/clouds.png";
    }
    else if(data.weather[0].main === "Clear") {
        icon.src = "assets/images/clear.png";
    }
    else if(data.weather[0].main === "Drizzle") {
        icon.src = "assets/images/drizzle.png";
    }
    else if(data.weather[0].main === "Mist") {
        icon.src = "assets/images/mist.png";
    }
    else if(data.weather[0].main === "Rain") {
        icon.src = "assets/images/rain.png";
    }
}

// Verificar texto de entrada
function checkInputText() {
    const validText = /[a-zA-Z]/.test(searchBox.value);
    const invalidText = /[0-9+]/.test(searchBox.value);
    if(!validText || invalidText) {
        invalid.style.display = "block";
        empty.style.display = "none";
        weather.style.transform = `scale(0)`;
        container.classList.remove("sticky");
    }
    if(searchBox.value === "") {
        empty.style.display = "block";
        invalid.style.display = "none";
        weather.style.transform = `scale(0)`;
        container.classList.remove("sticky");
    }
}

// Verificar clima pressionando a tecla ENTER
searchBox.addEventListener("keydown", async function(event) {
    if(event.code === "Enter") {
        await checkWeather(searchBox.value)
    }
});

// Verificar clima clicando no botão de pesquisar
searchBtn.addEventListener("click", async function() {
    await checkWeather(searchBox.value);
}); 

// Iniciar pesquisa
startBtn.addEventListener("click", function() {
    this.classList.add("close");
    container.classList.add("open");
}); 

// Quando a página for recarregada ou fechada
window.addEventListener("beforeunload", function() {
    container.classList.remove("open");
    startBtn.classList.remove("close");
});