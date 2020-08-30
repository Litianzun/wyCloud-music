import React, { useReducer, createContext } from "react";
import { Route, Switch } from "react-router-dom";
import { initialState, reducer } from "../reducer/Reducer";
import Welcome from "../pages/welcome/Welcome";
import Home from "../pages/home/Home";
import ListPage from "../pages/list/List";
import PlayMedia from "../components/playMedia/PlayMedia";
import SearchList from "../pages/searchlist/SearchList";
import Mv from "../pages/mv/Mv";
import Login from "../components/login/Login";
import AlbumDetail from "../pages/albumDetail/AlbumDetail";
import My from "../pages/my/My";
import Playlist from "../pages/playlist/Playlist";
import SingleSong from "../pages/singleSong/SingleSong";
import Header from "../components/header/Header";

export const reducerCtx = createContext({});

export let store, dispatch;
const Router = () => {
  [store, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="web-font">
      <Header store={store} />
      <Switch>
        <Route path="/" component={Welcome} exact />
        <Route path="/home" component={Home} />
        <Route path="/list" component={ListPage} />
        <Route path="/searchlist" component={SearchList} />
        <Route path="/mv/:id" component={Mv} />
        <Route path="/album/:id" component={AlbumDetail} />
        <Route path="/my" component={My} />
        <Route path="/playlist/:id" component={Playlist} />
        <Route path="/song/:id" component={SingleSong} />
      </Switch>
      {store.playSwitch && <PlayMedia {...store.song} />}
      {<Login visible={store.loginFlag} />}
    </div>
  );
};

export default Router;
