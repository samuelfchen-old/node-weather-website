const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=69c6fccdf0324fd71ef6589f288ac7f3&query="+latitude+","+longitude+"&units=m"

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error) {
            callback("Unable to find location. Try another.", undefined)
        } else {

            description = body.current.weather_descriptions[0]

            if (!description) {
                description = "Unknown forecast"
            }

            const temperature = body.current.temperature
            const feelslike = body.current.feelslike

            const forecast = description + ". It is currently " + temperature + " degrees out. It feels like " + feelslike + " degrees out."

            callback(undefined, forecast)
        }
    })
}

module.exports = forecast