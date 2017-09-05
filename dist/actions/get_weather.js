'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _weather = require('../services/weather');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function formatWeather(rawWeather) {
  let result = [];
  for (let weather of rawWeather.weather) {
    result.push(weather.description);
  }
  return result.join(' and ');
}

exports.default = (() => {
  var _ref = _asyncToGenerator(function* ({ context, entities }) {
    const suggestedLocation = entities.location.find(function (location) {
      return location;
    });

    delete context.missingLocation;
    let weather;
    console.log('suggesed location ------------', suggestedLocation);
    if (suggestedLocation) {
      const rawWeather = yield (0, _weather.fetchWeather)(suggestedLocation.value);
      weather = formatWeather(rawWeather);
    } else {
      context.missingLocation = true;
      //delete context.forecastResult;
    }

    return Object.assign({
      weather
    }, context);
  });

  function getWeather(_x) {
    return _ref.apply(this, arguments);
  }

  return getWeather;
})();