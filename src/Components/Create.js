import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import CreateChips from "./CreateChips";

const useStyles = makeStyles((theme) => ({
  body: {
    marginTop: 40,
    marginLeft: 40,
    width: 400,
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
}));

function Create(props) {
  const classes = useStyles();

  const [hotelName, setHotelName] = useState("");
  const [hotelNameError, setHotelNameError] = useState(false);

  const [hotelDescription, setHotelDescription] = useState("");
  const [hotelDescriptionError, setHotelDescriptionError] = useState(false);

  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState(false);

  const [cuisine, setCuisine] = useState("");
  const [cuisineError, setCuisineError] = useState("");

  const [cuisineList, setCuisineList] = useState([]);

  const [chipsToShow, setChipsToShow] = useState("");

  useEffect(() => {
    props.getCities("http://localhost:8082/city/");
  }, []);

  const cuisineFormat = () => {
    let arr = [];
    cuisineList.forEach((element) => {
      arr.push({ cuisine: element });
    });
    return arr;
  };

  const handleSubmit = () => {
    setHotelNameError(false);
    setHotelDescriptionError(false);
    setCityError(false);

    let errorAny = 0;

    if (hotelName.length === 0) {
      errorAny++;
      setHotelNameError(true);
    }

    if (city.length === 0) {
      errorAny++;
      setCityError(true);
    }

    if (hotelDescription.length === 0) {
      errorAny++;
      setHotelDescriptionError(true);
    }

    if (errorAny !== 0) {
      return;
    } else {
      let sendObj = {};
      sendObj.hotelName = hotelName;
      sendObj.hotelDescription = hotelDescription;
      sendObj.city = {
        cityName: city,
      };
      sendObj.cuisines = cuisineFormat();

      props.saveHotel(sendObj, "http://localhost:8082/hotel/");
      setCity("");
      setCuisine("");
      setHotelName("");
      setHotelDescription("");
      setCuisineList([]);
    }
  };

  const handleKeyDown = (e) => {
    if (["Enter"].includes(e.key)) {
      setCuisineError("");
      let ind = cuisineList.includes(cuisine);
      if (cuisine.length !== 0 && ind === false) {
        setCuisineList([...cuisineList, cuisine]);
        setCuisine("");
      } else {
        if (cuisine.length === 0) setCuisineError("Cuisine can't be empty");
        else setCuisineError("Cuisine already there");
      }
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div className={classes.body}>
        <TextField
          className={classes.field}
          onChange={(e) => setHotelName(e.target.value.toUpperCase())}
          label="Hotel Name"
          variant="outlined"
          color="secondary"
          value={hotelName}
          required
          error={hotelNameError}
          disabled={false}
          helperText={
            hotelNameError === true ? "Please Enter Hotel Name" : null
          }
          onFocus={() => setChipsToShow("")}
        />

        <TextField
          className={classes.field}
          onChange={(e) => setHotelDescription(e.target.value.toUpperCase())}
          label="Hotel Description"
          variant="outlined"
          color="secondary"
          value={hotelDescription}
          required
          error={hotelDescriptionError}
          disabled={false}
          helperText={
            hotelDescriptionError === true
              ? "Please Enter Hotel Description"
              : null
          }
          fullWidth
          onFocus={() => setChipsToShow("")}
        />

        <TextField
          className={classes.field}
          onChange={(e) => setCuisine(e.target.value.toUpperCase())}
          label="Enter Cuisine and hit Enter"
          variant="outlined"
          color="secondary"
          value={cuisine}
          error={!!cuisineError.length}
          disabled={false}
          helperText={cuisineError.length !== 0 ? cuisineError : null}
          onKeyDown={handleKeyDown}
          fullWidth
          onFocus={() => setChipsToShow("cuisine")}
        />

        <TextField
          className={classes.field}
          onChange={(e) => setCity(e.target.value.toUpperCase())}
          label="Enter City"
          variant="outlined"
          color="secondary"
          value={city}
          error={cityError}
          disabled={false}
          helperText={cityError === true ? "City can't be empty" : null}
          required
          fullWidth
          onFocus={() => setChipsToShow("city")}
        />

        <Button
          className={classes.field}
          type="submit"
          color="secondary"
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>

      <CreateChips
        cuisineList={cuisineList}
        cities={props.cities}
        chipsToShow={chipsToShow}
        onClickDeleteChip={(cL) => {
          setCuisineList(cL);
        }}
        onClickChip={(city) => setCity(city)}
      />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    cities: state.cities.cities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveHotel: (sendObj, endpoint) =>
      dispatch({ type: "SAVE_HOTEL", payload: sendObj, endpoint: endpoint }),
    getCities: (endpoint) =>
      dispatch({ type: "GET_CITIES", endpoint: endpoint }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
