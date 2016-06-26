import client from 'superagent';

const api = 'http://api.openweathermap.org/data/2.5/forecast?q=London&APPID=ddf2d5c67972f4759b7e6c3a3fe3193c';

export const fetchForecast = () => client.get(api);
