const apiKey= "1161e8221d9dfcd929ece58dc4b5e4d3";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const srchbox = document.querySelector(".search-box input");
const srchbtn = document.querySelector(".search-box button");
const weatherIcon= document.querySelector(".weather-icon");


async function checkWeather(cityName){
    const response =await fetch(apiUrl + cityName + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display ="block";
        document.querySelector(".ovrall").style.display ="none";
    }else{
         let data = await response.json();

    document.getElementById("cityName").innerHTML=data.name;
    document.getElementById("temperature").innerHTML= Math.round(data.main.temp)  + "°C";
    document.querySelector(".humidity").innerHTML=data.main.humidity + "%";
    document.querySelector(".wind").innerHTML=data.wind.speed + " km/h";

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
    }else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
    }else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    }else if(data.weather[0].main == "Snow"){
        weatherIcon.src = "images/snow.png";
    }else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".ovrall").style.display="block";
    document.querySelector(".error").style.display ="none";
    }
    
}
srchbtn.addEventListener("click", ()=>{
    checkWeather(srchbox.value);
})
