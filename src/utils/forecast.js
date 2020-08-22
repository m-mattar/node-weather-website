const axios = require('axios')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=minutely,hourly,daily&units=metric&appid=d8c0a472f5fbd05ebc7f4290569fa8ab'

    axios.get(url).then(( { data }) =>{
        
        const result = data.current.weather[0].description + '. The current temperature is ' + data.current.temp + ' degrees out.' +
                        ' The Wind Speed is ' + data.current.wind_speed + ' KT.'
        callback(undefined, result)
        
    }).catch((error) => {
        if(error.response && error.response.status){
            callback('Unable to find location')
        }else{
            callback('Unable to connect to weather service.')
        }
    })
}

module.exports = forecast