import React, { useState, useEffect } from "react";
import PlaylistMain from "../../components/playlistMain/PlaylistMain";
import { List, Divider } from "antd";
import list from "../../router/requestList";
import "./Playlist.less";
import { object } from "prop-types";

function Playlist(props) {
  const [playlistDetail, setPlaylistDetail] = useState(null);
  const [hotPlaylist, setHotPlaylist] = useState([]);
  async function getPlaylist() {
    const urlPar = {
      id: props.match.params.id,
    };
    const res = await list.getPlayListDetail(urlPar);
    console.log(res);
    if (res.code === 200) {
      setPlaylistDetail(res.playlist);
    }
  }
  async function getHotPlaylist() {
    const urlPar = {
      limit: 5,
      offset: 0,
    };
    const res = await list.getHotPlaylist(urlPar);
    console.log(res);
    if (res.code === 200) {
      setHotPlaylist(res.playlists);
    }
  }
  useEffect(() => {
    getPlaylist();
    getHotPlaylist();
  }, [props.location.pathname]);
  return (
    <div style={{ backgroundColor: "#eee" }}>
      <div className="mvWrapper">
        <section className="mv-left" style={{ padding: "20px" }}>
          <PlaylistMain {...playlistDetail} {...props} />
        </section>
        <section className="mv-right">
          <div className="relevant">
            <Divider orientation="left">热门歌单</Divider>
            <List
              dataSource={hotPlaylist}
              renderItem={(item) => (
                <List.Item
                  className="relevant-wrapper"
                  onClick={() => {
                    props.history.push(`/playlist/${item.id}`);
                  }}
                  key={item.id}
                >
                  <img
                    src={item.coverImgUrl}
                    alt={item.alg}
                    style={{ width: "64px", height: "64px" }}
                  />
                  <div className="relevant-wrapper-content">
                    <div className="relevant-wrapper-content-titleBox">
                      <span
                        className="relevant-wrapper-content-title"
                        style={{ width: "201.5px" }}
                      >
                        {item.name}
                      </span>
                    </div>
                    <small>{item.creator.nickname}</small>
                  </div>
                </List.Item>
              )}
              split={false}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Playlist;

Playlist.propTypes = {
  match: object,
  location: object,
  history: object
}
