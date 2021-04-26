const api = {
    key: '21a0eec68381afd693567988fa025c15',
    base: 'https:/api.openweathermap.org/data/2.5/'
}

const search = document.querySelector('.search');
const btn = document.querySelector('.btn');
btn.addEventListener('click', getInput);

function getInput (event) {
    event.preventDefault();
    if (event.type == 'click') {
        getData(search.value);
        console.log(search.value);
    }
}

function getData () {
    fetch(`${api.base}weather?q=${search.value}&units=imperial&appid=${api.key}`)
    .then(response => {
        return response.json();
    }).then(displayData)
}

function displayData (response) {
    console.log(response);
    if (response.cod === "404") {
        const error = document.querySelector('.error');
        error.textContent = "Please enter a valid location";
        search.value = '';
    } else {
        const city = document.querySelector('.city');
        city.innerText = `${response.name}, ${response.sys.country}`;
 
        const today = new Date();
        const date = document.querySelector('.date');
        date.innerText = dateFunction(today);
 
        const time = document.querySelector('.time');
        time.innerText = timeFunction(today); 
      
        const temp = document.querySelector('.temp');
        temp.innerHTML = `Temp: ${Math.round(response.main.temp)}<span>°F</span>`;
 
        const weather = document.querySelector('.weather');
        weather.innerText = `Weather: ${response.weather[0].main}`;
 
        const tempRange = document.querySelector('.temp-range');
        tempRange.innerText = `Temp Range: ${Math.round(response.main.temp_min)}°F / ${Math.round(response.main.temp_max)}°F`;
 
        const weatherIcon = document.querySelector('.weather-icon');;
        weatherIcon.src = 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png';
    }

    setWeatherBackground();
}

function dateFunction(d) {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${month} ${date}, ${year}`
}

function timeFunction (d) {
    let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

    let day = days[d.getDay()];
    let hours = d.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = d.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}`
}

function setweatherFunction() {

    switch (){
        case 'Clear':
            document.body.main.style.backgroundImage = 'url("/Images/hellokittybeach.jpg")';
            break;

        case 'Rain':
        case 'Drizzle':
        case 'Mist':
        case 'Thunderstorm':
            document.body.main.style.backgroundImage = 'url("/Images/hellokittyrain.png")';
            break;

        case 'Snow':
            document.body.main.style.backgroundImage = 'url("/Images/hellokittysnow.jpg")';
            break;
        
        default:
            break;
    }

}