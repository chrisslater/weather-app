import {
  FETCH_FORECAST_LOADING,
  FETCH_FORECAST_SUCCEEDED,
} from './constants';

const defaultState = {
  isLoading: false,
};

function reducer(state = defaultState, { type, payload }) {
  switch (type) {
    case FETCH_FORECAST_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case FETCH_FORECAST_SUCCEEDED:
      return Object.assign({}, state, payload, {
        isLoading: false,
      });
    default:
      return state;
  }
}

export default reducer;
