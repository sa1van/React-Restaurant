const initialState = {
  cities: [],
};

const CityReducer = (state = initialState, action) => {
  if (action.type === "GET_CITIES_FROM_DB") {
    return { cities: [...action.data] };
  }

  return state;
};

export default CityReducer;
