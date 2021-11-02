import { takeLatest, all } from "redux-saga/effects";
import { HotelSaga } from "./HotelSaga";
import { CitySaga } from "./CitySaga";

export function* watcherSaga() {
  yield all([HotelSaga(), CitySaga()]);
}
