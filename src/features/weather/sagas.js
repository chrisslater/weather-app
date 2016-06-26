import moment from 'moment';
import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import {
  FETCH_FORECAST,
  FETCH_FORECAST_LOADING,
  FETCH_FORECAST_SUCCEEDED,
} from './constants';
import { fetchForecast as fetch } from './api';

class Weather {
  constructor(icon, main, description, time) {
    this.icon = icon;
    this.main = main;
    this.description = description;
    this.time = time;
  }
}

function mapForecast(list) {
  const forecast = Object.create(null);

  list.forEach(({ dt_txt: dt, weather }) => {
    const dateTime = moment(dt);
    const date = dateTime.format('YYYY-MM-DD');
    const time = dateTime.format('HH:MM');

    if (!Array.isArray(forecast[date])) {
      forecast[date] = [];
    }

    const { icon, main, description } = weather[0];
    forecast[date].push(new Weather(icon, main, description, time));
  });

  return forecast;
}

function* fetchForecast() {
  yield put({ type: FETCH_FORECAST_LOADING });

  try {
    const res = yield call(fetch);
    const { body: { list } } = res;
    const payload = {
      placename: 'London',
      items: mapForecast(list),
    };

    yield put({ type: FETCH_FORECAST_SUCCEEDED, payload });
  } catch (e) {
    console.log('error');
  }
}

export function* weatherSaga() {
  yield* takeLatest(FETCH_FORECAST, fetchForecast);
}
