// require the express package then create instance app
const express = require('express')
const bodyParser = require('body-parser'); //for Middleware: functions that have access to the req and res bodies
const request = require('request');
const app = express()


const apiKey = 'caf33fc604cfce6cde063974cae49ec4';

app.use(express.static('public')); //access to public folder
app.use(bodyParser.urlencoded({ extended: true }));
////EJS: embedded javascript => interact with variables and then dynamically create our HTML based on those variables
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

//run server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})