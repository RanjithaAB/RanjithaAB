const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e5c29ac15a53420a576f10ca26c1cd0a&query=11.059821,' +encodeURIComponent(address)

    request({url,json:true},(error,{body})=>{
        if (error) {
            callback('Unable to connect to location services!', undefined)
        }
        else if(body.error){
            callback('Unable to find location. Try another search.', undefined)
        } 
        else {
            callback(undefined, {
                latitude:body.location.lat,
                longitude:body.location.lon,
                location: body.location.country
            })
        }
    })
}

module.exports = geocode