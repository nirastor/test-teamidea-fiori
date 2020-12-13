const MOSCOW_LAT = 55.75583333;
const MOSCOW_LON = 37.61777778;
const EXCLUDE = 'minutely,hourly,alerts';
const UNITS = 'metric';
const KEY = '6e0e8de020e707f798793785d97d9a70';

function createUrl(lat, lon, units, exclude, key) {
  const url = 'https://api.openweathermap.org/data/2.5/onecall';
  const params = [
    `lat=${lat}`,
    `lon=${lon}`,
    `units=${units}`,
    `exclude=${exclude}`,
    `appid=${key}`,
  ] 
  return url + '?' + params.join('&');
}

function getData(weather, numOfNextDays, includeToday, param) {
  const start = includeToday ? 1 : 0;
  const allData = [];
  for (let i = start; i < numOfNextDays + 2; i += 1) {
    if (param === 'eveFeelTemp') {
      allData.push(weather.daily[i].feels_like.eve);
    } else if (param === 'pressure') {
      allData.push(weather.daily[i].pressure);
    }
  }
  return (allData);
}

function min(arr) {
  const incArr = arr.slice();
  incArr.sort((a,b) => a - b);
  return incArr[0];
}

function average(arr) {
  if (!arr.length) {
    return false;
  }
  const sum = arr.reduce((sum, item) => sum + item, 0);
  return sum / arr.length;
}

fetch(createUrl(MOSCOW_LAT, MOSCOW_LON, UNITS, EXCLUDE, KEY))
  .then((res) => res.json())
  .then((weather) => {
    console.log('Ср. t вечером в ближайшие 5дней', average(getData(weather, 5, true, 'eveFeelTemp')));
    console.log('Мин. давл. в ближайшие 5дней', min(getData(weather, 5, true, 'pressure')));
});
