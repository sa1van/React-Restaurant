export const getCitiesAction = (data) => {
  return {
    type: "GET_CITIES_FROM_DB",
    data: data,
  };
};

export const getHotelsAction = (data) => {
  return {
    type: "GET_HOTELS_FROM_DB",
    data: data,
  };
};
