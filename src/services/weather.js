import request from 'request';

const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

function getWeatherQueryUrl(cityName) {
  return `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${OPEN_WEATHER_API_KEY}`;
}

export function fetchWeather(cityName) {
  return new Promise((resolve, reject) => {
    const queryUrl = getWeatherQueryUrl(cityName);
    request(queryUrl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(`Weather response for ${cityName}: ${body}`);
        resolve(JSON.parse(body));
      } else {
        let errorResult = {
          description: 'Unable to get weather'
        };
        if (error) {
          errorResult = {
            error,
            ...errorResult
          };
        } else {
          errorResult = {
            statusCode: response.statusCode,
            body,
            ...errorResult
          };
        }
        reject(errorResult);
      }
    });
  });
}
