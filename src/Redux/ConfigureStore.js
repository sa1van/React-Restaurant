import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import HotelReducer from "./HotelReducer";
import CityReducer from "./CityReducer";
import { watcherSaga } from "./rootSaga";

const reducer = combineReducers({
  cities: CityReducer,
  hotels: HotelReducer,
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(reducer, {}, applyMiddleware(...middleware));

sagaMiddleware.run(watcherSaga);

export default store;
