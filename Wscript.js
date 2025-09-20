const apiKey= "1161e8221d9dfcd929ece58dc4b5e4d3";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const srchbox = document.querySelector(".search-box input");
const srchbtn = document.querySelector(".search-box button");
const weatherIcon= document.querySelector(".weather-icon");
    
const weatherTimeline = gsap.timeline({
    paused: true
});
    
weatherTimeline
    .fromTo(".weather-info", { 
        opacity: 0, y: 20 
    },
    { 
        opacity: 1, y: 0, duration: 0.6, ease: "power2.out" 
    })
    .fromTo(".details",{
        opacity: 0, y: 20 
    },
    { 
        opacity: 1, y: 0, duration: 0.6, ease: "power2.out"
    },"-=0.3");

    async function checkWeather(cityName){
        const response =await fetch(apiUrl + cityName + `&appid=${apiKey}`);
        if(response.status == 404){
            document.querySelector(".error").style.display ="block";
            document.querySelector(".ovrall").style.display ="none";
        }else{
             let data = await response.json();

        document.getElementById("cityName").innerHTML=data.name;
        document.getElementById("temperature").innerHTML= Math.round(data.main.temp)+"°C";
        document.querySelector(".humidity").innerHTML=data.main.humidity +"%";
        document.querySelector(".wind").innerHTML=data.wind.speed +" km/h";

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
        
        weatherTimeline.restart();
        }
        
    }
    srchbtn.addEventListener("click", ()=>{
        checkWeather(srchbox.value);
    })
    srchbox.addEventListener("keypress", (e)=>{
        if(e.key === "Enter") {
            checkWeather(srchbox.value);
        }
    })
    gsap.from(".head-con h1",{
        y:120,
        opacity:0,
        duration:1.5
    })
    gsap.from(".weather-card",{
        y:90,
        opacity:0,
        delay:0.4,
        duration:1.5
    })