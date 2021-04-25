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
        temp.innerHTML = `Temp: ${Math.round(response.main.temp)} <span>&deg Celcius</span>`;
    }
}

function dateFunction (d){
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 
                'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${month}, ${date}, ${year}`;
}

function timeFunction (d) {
    let minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes();
    let hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours();
    let ampm = d.getHours() >= 12 ? 'pm' : 'am';

    return `${hours}:${minutes} ${ampm}`;
}
   
