const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https')

app.use(express.static("folder"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));



app.get('/', function (req, res) {
    
    res.sendFile(`${__dirname}/index.html`)
});

app.post('/', function (req, res) {
    const cityName = req.body.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b9febfd50d4df2c65681aeeb846a1624&units=metric`

    https.get(url, function (response) {
        response.on('data',function (data) {
          const weatherData = JSON.parse(data);
          const temperature = weatherData.main.temp
          const main = weatherData.weather[0].main
          const description = weatherData.weather[0].description
          const imgIcon = weatherData.weather[0].icon
          const imgUrl = `https://openweathermap.org/img/wn/${imgIcon}@2x.png`
          res.render("weather", {cityName: cityName, imgUrl: imgUrl, main:main, temperature:temperature, description:description})
          
        } )
    })

})

app.listen(3000, function () {
    
});
