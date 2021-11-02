import { takeLatest } from "redux-saga/effects";
import { call, put } from "redux-saga/effects";
import { deleteApi } from "../Api/deleteApi";
import { getApi } from "../Api/getApi";
import { postApi } from "./../Api/PostApi";
import { getHotelsAction } from "./actions";

function* saveHotel(action) {
  try {
    const data = yield postApi(action.payload, action.endpoint );
    if (data)
      yield put({
        type: "GET_CITIES",
        endpoint: "http://localhost:8082/city/",
      });
  } catch (err) {
    console.log(err);
    console.log("catch of hotelSaga");
  }
}

function* getHotels(action) {
  try {
    const data = yield getApi(action.endpoint);
    yield put(getHotelsAction(data));
  } catch (err) {
    console.log(err);
    console.log("catch of hotelSaga");
  }
}

function* deleteHotel(action) {
  try {
    const data = yield deleteApi(action.endpoint);
    if (data)
      yield put({
        type: "GET_HOTELS",
        endpoint: "http://localhost:8082/hotel/",
      });
  } catch (err) {
    console.log(err);
    console.log("catch of hotelSaga");
  }
}

export function* HotelSaga() {
  yield takeLatest("SAVE_HOTEL", saveHotel);
  yield takeLatest("GET_HOTELS", getHotels);
  yield takeLatest("DELETE_HOTEL", deleteHotel);
}
