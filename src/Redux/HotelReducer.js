const initialState = {
  hotels: [],
};

const HotelReducer = (state = initialState, action) => {
  if (action.type === "GET_HOTELS_FROM_DB") {
    return { hotels: [...action.data] };
  }

  return state;
};

export default HotelReducer;
