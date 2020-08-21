const axios = require('axios')

//Geocoding
// Address -> Long/Lat -> weather

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFybG8tLSIsImEiOiJja2R5NDhnNG8weDQxMzBxaWx4NDYyb2xxIn0.8guUPgk2SyU1UaQBJVgLzQ&limit=1'

    axios.get(url).then(({data}) => {
        if(data.features.length === 0) throw('no features')

        callback(undefined, {
            latitude: data.features[0].center[1], 
            longitude: data.features[0].center[0],
            location: data.features[0].place_name
        })

    }).catch((error) =>{
        if(error == 'no features' || (error.response && error.response.status)){
            callback('Unable to find location. Try another search.')
        } else{
            callback('Unable to connect to location service.')
        }
    })
}

module.exports = geocode