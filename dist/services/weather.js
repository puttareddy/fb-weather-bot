'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchWeather = fetchWeather;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

function getWeatherQueryUrl(cityName) {
  return `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${OPEN_WEATHER_API_KEY}`;
}

function fetchWeather(cityName) {
  return new Promise((resolve, reject) => {
    const queryUrl = getWeatherQueryUrl(cityName);
    (0, _request2.default)(queryUrl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(`Weather response for ${cityName}: ${body}`);
        resolve(JSON.parse(body));
      } else {
        let errorResult = {
          description: 'Unable to get weather'
        };
        if (error) {
          errorResult = Object.assign({
            error
          }, errorResult);
        } else {
          errorResult = Object.assign({
            statusCode: response.statusCode,
            body
          }, errorResult);
        }
        reject(errorResult);
      }
    });
  });
}