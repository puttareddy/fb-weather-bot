import { fetchWeather } from '../services/weather';

function formatWeather(rawWeather) {
  let result = [];
  for (let weather of rawWeather.weather) {
    result.push(weather.description);
  }
  return result.join(' and ');
}

export default async function getWeather({ context, entities }) {
  const suggestedLocation = entities.location.find(location => location);

  delete context.missingLocation;
  let weather;
  console.log('suggesed location ------------', suggestedLocation)
  if (suggestedLocation) {
    const rawWeather = await fetchWeather(suggestedLocation.value);
    weather = formatWeather(rawWeather);
  }else{
     context.missingLocation = true;
     //delete context.forecastResult;
  }

  return {
    weather,
    ...context
  };
}
