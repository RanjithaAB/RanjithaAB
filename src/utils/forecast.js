const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e5c29ac15a53420a576f10ca26c1cd0a&query=' + latitude + ',' + longitude

    // request({url,json:true},(error,response)=>{
    request({url,json:true},(error,{ body})=>{

        if (error) {
            callback('Unable to connect to weather service!', undefined)
        }
         else if(body.error){
                callback('Unable to find location', undefined)
        } else {
            callback(undefined,{
                Anouncement:body.current.weather_descriptions[0]+' It is currently ' +body.current.temperature +" degrees out. There is a "+ body.current.precip + '% chance of rain.',
                latitude:body.location.lat,
                longitude:body.location.lon,
                location:body.location.country,
                name:body.location.name,
                observationtime:body.current.observation_time
            })
        }
    })
}

module.exports = forecast