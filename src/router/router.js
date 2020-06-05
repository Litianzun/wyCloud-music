import React, { useReducer, useContext, createContext } from "react";
import { Route, Switch, Redirect, HashRouter, BrowserRouter } from "react-router-dom";
import Header from "../components/header/Header";
import Welcome from "../pages/welcome/Welcome";
import Home from "../pages/home/Home";
import ListPage from "../pages/list/List";
import PlayMedia from "../components/playMedia/PlayMedia";
import SearchList from "../pages/searchlist/SearchList";
import Mv from "../pages/mv/Mv";

export const reducerCtx = createContext({ playSwitch: false });
const initialState = {
  playSwitch: false,
  song: {}
};
export function reducer(state = initialState, action) {
  switch (action.type) {
    case "changeSwitch":
      return Object.assign({}, state, action.payload);
    case 'setSong':
      return Object.assign({}, state, action.payload)
    default:
      throw new Error("error");
  }
}
export let store, dispatch;
const Router = () => {
  [store, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="web-font">
      <HashRouter>
        <Header />
        <Switch>
          <Route path="/" component={Welcome} exact />
          <Route path="/home" component={Home} />
          <Route path="/list" component={ListPage} />
          <Route path='/searchlist' component={SearchList} />
          <Route path='/mv/:id' component={Mv} />
        </Switch>
      </HashRouter>
      {store.playSwitch && <PlayMedia {...store.song} />}
    </div>
  );
};

export default Router;
