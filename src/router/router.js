import React, { useReducer, createContext } from "react";
import { Route, Switch } from "react-router-dom";
import Welcome from "../pages/welcome/Welcome";
import Home from "../pages/home/Home";
import ListPage from "../pages/list/List";
import PlayMedia from "../components/playMedia/PlayMedia";
import SearchList from "../pages/searchlist/SearchList";
import Mv from "../pages/mv/Mv";
import Login from "../components/login/Login";
import AlbumDetail from "../pages/albumDetail/AlbumDetail";

export const reducerCtx = createContext({});
const initialState = {
  playSwitch: false,
  song: {},
  loginFlag: false,
};
export function reducer(state = initialState, action) {
  switch (action.type) {
    case "changeSwitch":
      return Object.assign({}, state, action.payload);
    case "setSong":
      return Object.assign({}, state, action.payload);
    case "login":
      return Object.assign({}, state, action.payload);
    default:
      throw new Error("error");
  }
}
export let store, dispatch;
const Router = () => {
  [store, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="web-font">
      <Switch>
        <Route path="/" component={Welcome} exact />
        <Route path="/home" component={Home} />
        <Route path="/list" component={ListPage} />
        <Route path="/searchlist" component={SearchList} />
        <Route path="/mv/:id" component={Mv} />
        <Route path='/album/:id' component={AlbumDetail} />
      </Switch>
      {store.playSwitch && <PlayMedia {...store.song} />}
      {<Login visible={store.loginFlag} />}
    </div>
  );
};

export default Router;
