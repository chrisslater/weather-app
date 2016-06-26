import React from 'react';
import { render } from 'react-dom';

import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import Weather from 'features/weather/Weather';
import { weatherSaga } from 'features/weather/sagas';
import weatherReducer from 'features/weather/reducer';

const reducers = combineReducers({
  weather: weatherReducer,
});

if (module.hot) {
  module.hot.accept();
}

const sagaMiddleware = createSagaMiddleware();
const store = compose(
  applyMiddleware(sagaMiddleware)
)(createStore)(reducers, {});

sagaMiddleware.run(weatherSaga);

const markup = (
  <Provider
    key="provider"
    store={store}
  >
    <Weather />
  </Provider>
);


const dest = document.getElementById('app');
render(markup, dest);
