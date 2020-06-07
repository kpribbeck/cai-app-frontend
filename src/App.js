import React, { Fragment } from "react";
import './App.css';
import Navbar from "./components/layout/Navbar";
import Routes from "./components/routing/Routes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {

  return (
    <Router>
      <Fragment>
        {/* <Navbar/> */}

        <Switch>
          <Route component={Routes} />
        </Switch>

      </Fragment>
    </Router>
  );
}

export default App;
