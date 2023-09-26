let weather = {
    "apiKey" : "960ea23cd3ddcf1d105f5692aab9689f",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather;
        const {temp, humidity} = data.main;
        const { speed } = data.wind; 
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = (temp-273.15).toFixed(0)+"°C";
        document.querySelector(".humidity").innerText = "Humidity: "+ humidity+ "%";
        document.querySelector(".wind").innerText = "Wind Speed: "+ speed+ "km/h";
        document.querySelector(".weather").classList.remove("loading");

    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};
document
    .querySelector(".search button")
    .addEventListener("click", function()  {
    weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Denver");