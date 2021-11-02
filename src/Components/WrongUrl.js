import { Button, Input, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function WrongUrl(props) {
  // http://localhost:3000/wrong/place/lost
  const location = useLocation(); // location.pathname gives -> wrong/place/lost

  //Example
  //http://localhost:3000/wrong?name=savan&surname=lalakiya
  const search = useLocation().search; // gives query param -> name=savan&surname=lalakiya
  const firstName = new URLSearchParams(search).get("name"); // savan
  const lastName = new URLSearchParams(search).get("surname"); // lalakiya

  // to loop
  const searchArray = new URLSearchParams(search);
  searchArray.forEach(function (value, key) {});

  const history = useHistory();

  let obj = {
    info: "Image and Video, _/\\_",
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h3" color="inherit">
        Wrong place :(
      </Typography>

      <Button
        variant="outlined"
        color="secondary"
        style={{ marginTop: 10 }}
        onClick={() => history.push(`/upload?page=${JSON.stringify(obj)}`)}
      >
        Timepass Stuff for you
      </Button>
    </div>
  );
}

export default WrongUrl;
