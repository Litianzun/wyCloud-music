import React, { useEffect, useState } from "react";
import "./My.less";
import list from "../../router/requestList";
import { getCookie } from "../../utils/getCookie";
import PlaylistMain from "../../components/playlistMain/PlaylistMain";
import MyArtists from "./component/MyArtists";
import MyMv from "./component/MyMV";
import EmptyLogin from "@/components/emptyLogin/EmptyLogin";

function My(props) {
  const [myArtists, setMyArtists] = useState([]);
  const [myMv, setMyMv] = useState([]);
  const [myPlaylist, setMyPlaylist] = useState([]);
  const [playlistDetail, setPlaylistDetail] = useState(null);
  const [type, setType] = useState("playlist");
  //我的歌手
  async function getMyArtists() {
    const urlPar = {
      id: getCookie("userId"),
    };
    const res = await list.getMyArtists(urlPar);
    console.log(res);
    if (res.code === 200) {
      setMyArtists(res.data);
    }
  }
  //我的视频
  async function getMyMv() {
    const urlPar = {
      id: getCookie("userId"),
    };
    const res = await list.getMyMV(urlPar);
    console.log(res);
    if (res.code === 200) {
      setMyMv(res.data);
    }
  }
  //我的歌单
  async function getMyPlaylist() {
    const urlPar = {
      uid: getCookie("userId"),
    };
    const res = await list.getMyPlayList(urlPar);
    console.log(res);
    if (res.code === 200) {
      setMyPlaylist(res.playlist);
      getPlaylistDetail(res.playlist[0].id);
    }
  }
  //获取歌单详情
  async function getPlaylistDetail(id) {
    const urlPar = {
      id,
    };
    setType("playlist");
    const res = await list.getPlayListDetail(urlPar);
    console.log(res);
    if (res.code === 200) {
      setPlaylistDetail(res.playlist);
    }
  }
  function renderMain(type) {
    switch (type) {
      case "artist":
        return <MyArtists data={myArtists} />;
      case "mv":
        return <MyMv data={myMv} {...props} />;
      case "playlist":
        return <PlaylistMain {...playlistDetail} />;
    }
  }
  useEffect(() => {
    if (getCookie("userId")) {
      getMyArtists();
      getMyMv();
      getMyPlaylist();
    }
  }, [getCookie("userId")]);
  return (
    <div style={{ backgroundColor: "#eee" }}>
      {getCookie("userId") ? (
        <div className="myWrapper">
          <section className="my-left">
            <ul>
              <li onClick={() => setType("artist")}>
                我的歌手({myArtists.length || 0})
              </li>
              <li onClick={() => setType("mv")}>
                我的视频({myMv.length || 0})
              </li>
              <li>我的歌单({myPlaylist.length || 0})</li>
            </ul>
            {myPlaylist.map((item) => (
              <div
                className="render-playlist-item"
                key={item.id}
                onClick={() => getPlaylistDetail(item.id)}
              >
                <img src={item.coverImgUrl} alt="my-playlist" />
                <div className="render-playlist-item-main">
                  <span>{item.name}</span>
                  <small>{item.trackCount}首</small>
                </div>
              </div>
            ))}
          </section>
          <section className="my-right">{renderMain(type)}</section>
        </div>
      ) : (
        <EmptyLogin />
      )}
    </div>
  );
}

export default My;
