window.addEventListener('DOMContentLoaded', async function() {
    
  // Get a reference to the "get weather" button
    let getWeatherButton = document.querySelector(`.get-weather`)
  
    // When the "get weather" button is clicked:
    getWeatherButton.addEventListener(`click`, async function(event) {
      // - Ignore the default behavior of the button
      event.preventDefault()
  
      // - Get a reference to the element containing the user-entered location
      let locationInput = document.querySelector(`#location`)
  
      // - Get the user-entered location from the element's value
      let location = locationInput.value

      // - Get a reference to the element containing the user-entered number of days
      let daysInput = document.querySelector(`#days`)
      
      // - Get a reference to the element containing the user-entered number of days
      let days = daysInput.value

      // - Check to see if the user entered anything; if so:
      if (location.length > 0) {
        // - Construct a URL to call the WeatherAPI.com API
        let url = `https://api.weatherapi.com/v1/forecast.json?key=832706e15a6b49258db10304210605&q=${location}&days=${days}`
  
        // - Fetch the url, wait for a response, store the response in memory
        let response = await fetch(url)
  
        // - Ask for the json-formatted data from the response, wait for the data, store it in memory
        let json = await response.json()
  
        // - Write the json-formatted data to the JavaScript console
        console.log(json)
  
        // - Store the returned location, current weather conditions, the forecast as three separate variables
        let interpretedLocation = json.location
        let currentWeather = json.current
        let dailyForecast = json.forecast.forecastday
        let temperature = json.current.temp_f
        let currentCondition = json.current.condition.text
        let currentIcon = json.current.condition.icon 
        
  
        // Store a reference to the "current" element
        let currentElement = document.querySelector(`.current`)
       
        // Fill the current element with the location and current weather conditions
        currentElement.innerHTML = `
          <div class="text-center space-y-2">
            <div class="font-bold text-3xl">Current Weather for ${interpretedLocation.name}, ${interpretedLocation.region}</div>
            <div class="font-bold">
              <img src="https:${currentIcon}" class="inline-block">
              <span class="temperature">${temperature}</span>° 
              and
              <span class="conditions">${currentCondition}</span>
            </div>
          </div>
        `
      
        // Store reference to the "forecast" element 
        let forecastElement = document.querySelector(`.forecast`)

        forecastElement.innerHTML = `<div class="text-center space-y-8"> 
           <div class="font-bold text-3xl">${days} Day Forecast</div>
        </div>`


        //replace hard coded data with API forecast  
        //loop through the API data
        for (let i=0; i <dailyForecast.length; i++){
        let forecast = dailyForecast[i] 
        console.log(forecast)
  
        //define variables 
          let highForecast = forecast.day.maxtemp_f
          let lowForecast = forecast.day.mintemp_f
          let forecastCondition = forecast.day.condition.text
          let forecastIcon = forecast.day.condition.icon
          let forecastDate = forecast.date

        //Add variable HTML 
          forecastElement.insertAdjacentHTML(`beforeend`, `<div class="text-center space-y-8">
          <div>
            <img src="https:${forecastIcon}" class="mx-auto">
            <h1 class="text-2xl text-bold text-gray-500">${forecastDate}</h1>
            <h2 class="text-xl">High ${highForecast}° – Low ${lowForecast}°</h2>
            <p class="text-gray-500">${forecastCondition}</h1>
          </div>
        </div>`)


      }
    }
    })
  })