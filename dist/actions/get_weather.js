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

const firstEntityValue = (entities, entity) => {
  console.log('-----entities  ------------', entities);
  const val = entities && entities[entity] && Array.isArray(entities[entity]) && entities[entity].length > 0 && entities[entity][0].value;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

exports.default = (() => {
  var _ref = _asyncToGenerator(function* ({ context, entities }) {

    var location = firstEntityValue(entities, 'location');
    console.log('suggesed location ------------', location);
    //if no location found from the input, then take it from conversation context
    if (location === null) {
      location = context.location;
    } else {
      context.location = location;
    }

    if (location) {
      const rawWeather = yield (0, _weather.fetchWeather)(location);
      const weather = formatWeather(rawWeather);
      context.weather = weather;
      delete context.missingLocation;
    } else {
      context.missingLocation = true;
      delete context.weather;
    }

    /*delete context.missingLocation;
    delete context.weather;
    let weather;
    if (!entities.location) {
      const suggestedLocation = entities.location.find(location => location.suggested);
      const rawWeather = await fetchWeather(suggestedLocation.value);
      weather = formatWeather(rawWeather);
      context.weather = weather;
    } else {
      context.missingLocation = true;
      //delete context.forecastResult;
    } */

    return Object.assign({}, context);
  });

  function getWeather(_x) {
    return _ref.apply(this, arguments);
  }

  return getWeather;
})();