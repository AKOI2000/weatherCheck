import express, { response } from "express";
const app = express();
import bodyParser from "body-parser";
import https from "https";
import axios from "axios";
import { log } from "console";

app.use(express.static("folder"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));



app.get('/', (req, res) => {
    res.render('weather.ejs');
});



app.post('/', async (req, res) => {
    const cityName = req.body.city;
    const apiKey = "b9febfd50d4df2c65681aeeb846a1624"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`

    try {
        const result = await axios.get(url);
        const response = result.data
        res.render("weather.ejs", {
            cityName: cityName,
            imgUrl: `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`,
            temperature: response.main.temp,
            description: response.weather[0].description

        })
    } catch (error) {
        res.render("weather.ejs", {
            error: error.response.data.message
        })
    }
})

app.listen(3000, function () {
    
});
