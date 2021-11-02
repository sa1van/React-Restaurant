import React from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import {
  Chip,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
  },
  list: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 40,
    width: 400,
    height: 400,
    overflow: "auto",
  },
  content: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 40,
    width: 600,
    height: 400,
    overflow: "auto",
    backgroundColor: "#ededed",
    borderRadius: 1,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
}));

function View(props) {
  const classes = useStyles();

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedHotel, setSelectedHotel] = useState({});

  useEffect(() => {
    props.getHotels("http://localhost:8082/hotel/");
    props.getCities("http://localhost:8082/city/");
  }, []);

  return (
    <div className={classes.main}>
      <div className={classes.list}>
        <TextField
          className={classes.field}
          onChange={(e) => {
            setSelectedHotel({});
            setSelectedCity(e.target.value.toUpperCase());
          }}
          label="Enter City"
          variant="outlined"
          color="secondary"
          value={selectedCity}
          disabled={false}
          fullWidth
        />

        <div style={{ textAlign: "center" }}>
          <Typography variant="h6">Hotels</Typography>
        </div>

        <div className={classes.demo}>
          <List>
            {props &&
              props.hotels &&
              props.hotels.map((item) =>
                item.city.cityName === selectedCity ? (
                  <ListItem
                    selected={item.id === selectedHotel.id}
                    button
                    onClick={() => setSelectedHotel(item)}
                    key={item.id}
                  >
                    <ListItemText primary={item.hotelName} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          setSelectedHotel({});
                          props.deleteHotel(
                            "http://localhost:8082/hotel/" + item.id
                          );
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ) : null
              )}
          </List>
        </div>
      </div>

      <div className={classes.content}>
        {selectedHotel && Object.keys(selectedHotel).length === 0 && (
          <>
            <Typography variant="h5" style={{ textAlign: "center" }}>
              Suggested Cities
            </Typography>

            {props &&
              props.cities &&
              props.cities.map((item) => (
                <React.Fragment key={item.cityName}>
                  <Chip
                    style={{ margin: 5 }}
                    label={item.cityName}
                    clickable
                    color="primary"
                    onClick={() => {
                      setSelectedHotel({});
                      setSelectedCity(item.cityName);
                    }}
                  />
                </React.Fragment>
              ))}
          </>
        )}

        {selectedHotel && Object.keys(selectedHotel).length !== 0 && (
          <>
            <div style={{ marginLeft: 20, marginTop: 10 }}>
              <Typography variant="h6">Hotel Name</Typography>

              <Typography variant="body1" style={{ marginTop: 10 }}>
                {selectedHotel.hotelName}
              </Typography>

              <Typography variant="h6" style={{ marginTop: 30 }}>
                Hotel Description
              </Typography>

              <Typography variant="body1" style={{ marginTop: 10 }}>
                {selectedHotel.hotelDescription}
              </Typography>

              <Typography variant="h6" style={{ marginTop: 30 }}>
                Cuisine
              </Typography>

              <div style={{ marginTop: 10 }}>
                {selectedHotel &&
                  selectedHotel.cuisines &&
                  selectedHotel.cuisines.map((item) => (
                    <React.Fragment key={item.cuisine}>
                      <Chip
                        style={{ margin: 5 }}
                        label={item.cuisine}
                        clickable
                        color="primary"
                      />
                    </React.Fragment>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    hotels: state.hotels.hotels,
    cities: state.cities.cities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHotels: (endpoint) =>
      dispatch({ type: "GET_HOTELS", endpoint: endpoint }),
    getCities: (endpoint) =>
      dispatch({ type: "GET_CITIES", endpoint: endpoint }),
    deleteHotel: (endpoint) =>
      dispatch({ type: "DELETE_HOTEL", endpoint: endpoint }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
