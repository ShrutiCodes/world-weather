const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

const apiKey = '3cbf3bd40d02523115b3bfe6bdeb1ad3';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res){
    res.render('index', {weather: null, error: null});
})

app.post('/', function(req, res){
    let city = req.body.city;
    let url = 'http://api.openweathermap.org/data/2.5/weather?q='+ city +'&units=metric&appid=3cbf3bd40d02523115b3bfe6bdeb1ad3';

    request(url, function(err, response, body){
        if(err){
            res.render('index', {weather: null, error: 'Error, please try again'});
        }
        else{
            let weather = JSON.parse(body);
            console.log(weather);
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Could not get weather, please try again'});
            }
            else{
                let weatherText = 'Its '+weather.main.temp+' degrees with '+weather.weather[0].main+' in '+weather.name;
                res.render('index', {weather: weatherText, error: null});
                console.log("body: ", body);
            }
        }
    });
});

app.listen(3000, function(){
    console.log('World Weather App listening on port 3000');
})