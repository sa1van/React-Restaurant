import { createTheme, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { purple } from "@material-ui/core/colors";
import Create from "./Components/Create";
import "./App.css";
import WrongUrl from "./Components/WrongUrl";
import Navbar from "./Components/Navbar";
import View from "./Components/View";
import ImageVideo from "./Components/ImageVideo";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fefefe",
    },
    secondary: purple,
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Navbar />
          </Route>
          <Route exact path="/add">
            <Navbar />
            <Create />
          </Route>
          <Route exact path="/view">
            <Navbar />
            <View />
          </Route>
          <Route exact path="/upload">
            <ImageVideo />
          </Route>
          <Route path="*">
            <WrongUrl />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
