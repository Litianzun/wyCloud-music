import React from "react";
import {
  Route,
  Switch,
  Redirect,
  HashRouter,
  BrowserRouter,
} from "react-router-dom";
import Header from "../components/header/Header";
import Welcome from "../pages/welcome/Welcome";
import Home from "../pages/home/Home";
import ListPage from '../pages/list/List'

const Router = () => {
  return (
    <div className="web-font" style={{ marginTop: "50px" }}>
      <HashRouter>
        <Header />
        <Switch>
          <Route path="/" component={Welcome} exact />
          <Route path="/home" component={Home} />
          <Route path='/list' component={ListPage} />
        </Switch>
      </HashRouter>
    </div>
  );
};

export default Router;
