import { takeLatest } from "redux-saga/effects";
import { call, put } from "redux-saga/effects";
import { getApi } from "./../Api/getApi";
import { getCitiesAction } from "./actions";

function* getCities(action) {
  try {
    const data = yield getApi(action.endpoint);
    yield put(getCitiesAction(data));
  } catch (err) {
    console.log(err);
    console.log("catch of citySaga");
  }
}

export function* CitySaga() {
  yield takeLatest("GET_CITIES", getCities);
}
