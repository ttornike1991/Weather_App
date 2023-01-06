// Dynamic Body sizing because of position:absoluted elements

const div = document.querySelector('body');

let maxWidth = 0;
let maxHeight = 0;


const mediaQuery = window.matchMedia('(min-width: 970px)');

if (mediaQuery.matches) {
    for (const child of div.children) {
        maxWidth = Math.max(maxWidth, child.offsetWidth);
        maxHeight = Math.max(maxHeight, child.offsetHeight);
      }
      
      div.style.height = `${maxHeight}px`;
}  


/// END OF STAGE


// ##########################
//     Take data from API
//       and assing to element

// ########################

// Default ONE
let cityName = document.querySelector('.cityNAME').innerText.trim()

function getWeatherData(latValue, lonValue) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latValue}&lon=${lonValue}&appid=a15ea8dfd84147a3e97ccc213ae59b6d&units=metric`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const temp = document.querySelector('.fifteen');
      temp.innerText = Math.floor(data['main']['temp'])
        
      const feelsLike = document.querySelector('.feelsLike')
      feelsLike.innerText = data['main']['feels_like'].toFixed(2)
      const windLike = document.querySelector('.windLike')
      windLike.innerText = data['wind']['speed'].toFixed(2)
      const visibleLike = document.querySelector('.visibleLike')
      visibleLike.innerText = data['visibility'] 
      const mostlyClody = document.querySelector('.mostlyClody')
      mostlyClody.innerText = data['weather']['0']['description']
      const humidityLike = document.querySelector('.humidityLike')
      humidityLike.innerText = data['main']['humidity'] 
    });
     
}


fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=a15ea8dfd84147a3e97ccc213ae59b6d`)
  .then(response => response.json())
  .then(data => {
    const latValue = data['0']['lat'];
    const lonValue = data['0']['lon'];
    getWeatherData(latValue, lonValue);
  });



// Change City 

const roundDiv = document.querySelector('.roundDiv')

roundDiv.addEventListener('click', (e) => {
  e.preventDefault();
  const cityName = document.querySelector('.cityNAME');
  const x = prompt('Please Enter Country')
  cityName.innerText = x.trim();
  localStorage.setItem('city', x.trim());

  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName.innerText}&limit=1&appid=a15ea8dfd84147a3e97ccc213ae59b6d`)
    .then(response => response.json())
    .then(data => {
      const latValue = data['0']['lat'];
      const lonValue = data['0']['lon'];
      getWeatherData(latValue, lonValue);
    });
});
// Change City for mobile


roundDiv.addEventListener('touchstart', (e) => {
  e.preventDefault();
  const cityName = document.querySelector('.cityNAME');
  const x = prompt('Please Enter Country')
  cityName.innerText = x.trim();
  localStorage.setItem('city', x.trim());

  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName.innerText}&limit=1&appid=a15ea8dfd84147a3e97ccc213ae59b6d`)
    .then(response => response.json())
    .then(data => {
      const latValue = data['0']['lat'];
      const lonValue = data['0']['lon'];
      getWeatherData(latValue, lonValue);
    });
});


// persist changes 
document.addEventListener('DOMContentLoaded', () => {
  const cityName = document.querySelector('.cityNAME');
  const storedCity = localStorage.getItem('city');
  if (storedCity) {
    cityName.innerText = storedCity;
  }
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName.innerText}&limit=1&appid=a15ea8dfd84147a3e97ccc213ae59b6d`)
    .then(response => response.json())
    .then(data => {
      const latValue = data['0']['lat'];
      const lonValue = data['0']['lon'];
      getWeatherData(latValue, lonValue);
    });
})


// persist changes for mobile
document.addEventListener('deviceready', () => {
  const cityName = document.querySelector('.cityNAME');
  const storedCity = localStorage.getItem('city');
  if (storedCity) {
    cityName.innerText = storedCity;
  }
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName.innerText}&limit=1&appid=a15ea8dfd84147a3e97ccc213ae59b6d`)
    .then(response => response.json())
    .then(data => {
      const latValue = data['0']['lat'];
      const lonValue = data['0']['lon'];
      getWeatherData(latValue, lonValue);
    });
})
