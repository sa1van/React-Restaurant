import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  bodyCuisine: {
    marginLeft: 50,
    marginTop: 40,
    width: 500,
    height: 400,
    overflow: "auto",
    backgroundColor: "#ededed",
    borderRadius: 1,
  },
}));

function CreateChips({
  cuisineList,
  cities,
  chipsToShow,
  onClickDeleteChip,
  onClickChip,
}) {
  const classes = useStyles();

  return (
    <div>
      {chipsToShow !== "" ? (
        <div className={classes.bodyCuisine}>
          {chipsToShow === "cuisine" ? (
            <>
              <Typography variant="h5" style={{ textAlign: "center" }}>
                Cuisine List
              </Typography>

              {cuisineList.map((item) => (
                <React.Fragment key={item}>
                  <Chip
                    style={{ margin: 5 }}
                    label={item}
                    clickable
                    color="primary"
                    onDelete={() => {
                      let cL = cuisineList.filter((c) => c !== item);
                      onClickDeleteChip(cL);
                    }}
                  />
                </React.Fragment>
              ))}

            </>
          ) : (
            <>
              <Typography variant="h5" style={{ textAlign: "center" }}>
                Suggested Cities
              </Typography>

              {cities.map((item) => (
                <React.Fragment key={item.cityName}>
                  <Chip
                    style={{ margin: 5 }}
                    label={item.cityName}
                    clickable
                    color="primary"
                    onClick={() => onClickChip(item.cityName)}
                  />
                </React.Fragment>
              ))}
              
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default CreateChips;
