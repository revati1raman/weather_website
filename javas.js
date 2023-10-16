const inputE1=document.querySelector("#location");
inputE1.addEventListener("input", onInputChange);
getCityData();
let cityNames=[];
async function getCityData(){
    const cityRes = await fetch("https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json");
    const data = await cityRes.json();
    cityNames=data.map((country) =>{
        return country.name;
    });
}

function onInputChange(){

    removeAutoComplete();
    const value = inputE1.value.toLowerCase();
    
    if(value.length === 0) return;

    const filteredNames = [];
    
    cityNames.forEach((cityName) =>{
            if(cityName.substr(0,value.length).toLowerCase() === value)
                filteredNames.push(cityName);
    });
    console.log(filteredNames);
    createAutoComplete(filteredNames);
}

function createAutoComplete(list){
    const listEl = document.createElement("ul");
    listEl.id = "autocomplete-list";
    
    
    list.forEach((city) => {
        const listItem = document.createElement("li");
        const cityButton= document.createElement("button");
        cityButton.innerHTML=city;

        cityButton.addEventListener("click",onCityButtonClick);
        listItem.appendChild(cityButton);
        listEl.appendChild(listItem);
    });
    document.querySelector("#autocomplete-wrapper").appendChild(listEl);
}
function removeAutoComplete(){
    const listEl = document.querySelector("#autocomplete-list");
    if (listEl) listEl.remove();
}
function onCityButtonClick(e) {
const buttonEl = e.target;
const cityName = buttonEl.innerHTML;

// Set the selected city in the input field.
inputE1.value = cityName;

// Call the checkWeather function to update weather details for the selected city.
checkWeather(cityName);
removeAutoComplete();
}
const apikey="6b861efa39b3ed03ae3317375e6461ad";
const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox=document.querySelector(".search input");
const searchbtn=document.querySelector(".search .btn");

async function checkWeather(city){
    const response= await fetch(apiurl+city+`&appid=${apikey}`);

    if(response.status==404){
        document.querySelector(".error").style.display="block"; 
        document.querySelector(".weather").style.display="none"; 
    }
    else{
    var data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML=data.name;
    
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    const tempDisplay = document.querySelector(".temp");
    function updateTemperature() {
        const selectedRadioButton = document.querySelector('input[type="radio"]:checked');
        if (selectedRadioButton)
        {
            const selectedValue = selectedRadioButton.value;
            if (selectedValue === 'option1')
            tempDisplay.innerHTML = Math.round(data.main.temp) + "°C";
        else
            tempDisplay.innerHTML = Math.round((data.main.temp * 1.8) + 32) + "°F";
        }
    }
    radioButtons.forEach(radioButton => {                   // Add event listeners to radio buttons
        radioButton.addEventListener('change', updateTemperature);
    });
    updateTemperature();                                    // Initial temperature update

    document.querySelector(".humidity").innerHTML=data.main.humidity+" %" ;
    document.querySelector(".wind").innerHTML=data.wind.speed + " km/h";

    const weatherIcon=document.querySelector(".icon");
    if(data.weather[0].main == "Clouds")
         weatherIcon.src = "images/clouds.png";
    else if(data.weather[0].main == "Clear")
         weatherIcon.src = "images/clear.png";
    else if(data.weather[0].main == "Rain")
         weatherIcon.src = "images/rain.png";
    else if(data.weather[0].main == "Drizzle")
         weatherIcon.src = "images/drizzle.png";
    else if(data.weather[0].main == "Mist")
         weatherIcon.src = "images/mist.png";
    else if(data.weather[0].main == "Snow")
         weatherIcon.src = "images/snow.png";
    else if(data.weather[0].main == "Haze")
         weatherIcon.src = "images/haze.png";

    document.querySelector(".weather").style.display= "block";
    document.querySelector(".error").style.display="none";
    }
}

searchbtn.addEventListener("click",()=>{
    checkWeather(searchbox.value);
})