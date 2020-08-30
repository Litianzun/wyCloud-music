import React, { useState, useEffect } from "react";
import { Tag, Row, Divider, List, Typography, Space } from "antd";
import "./SingleSong.less";
import list from "../../router/requestList";
import day from "dayjs";
import Color from "../../widget/Color";
import AlbumTools from "../../components/albumTools/AlbumTools";
import Comment from "../../components/comment/Comment";
import { object } from "prop-types";
import { reducerConnect } from "../../reducer/Reducer";
import { PlayCircleOutlined } from "@ant-design/icons";
import { getSong } from "../../utils/getSong";

function SingleSong(props) {
  const targetId = props.match.params.id;
  const [relatedSongs, setRelatedSongs] = useState([]);
  const [expandFlag, setExpandFlag] = useState(true);
  const [songInfo, setSongInfo] = useState({});
  async function getSongDetail() {
    const detail = await list.getSongDetail({ ids: targetId });
    console.log(detail);
    if (detail.code === 200) {
      setSongInfo(detail.songs[0]);
    }
  }
  async function getOtherSongs() {
    const params = {
      id: targetId,
    };
    const res = await list.getSimiSongs(params);
    console.log(res);
    if (res.code === 200) {
      setRelatedSongs(res.songs);
    }
  }
  useEffect(() => {
    getSongDetail();
    getOtherSongs();
  }, [props.location.pathname]);

  function _renderItem(item) {
    return (
      <List.Item extra={formatArtist(item.artists)}>
        <Space>
          <PlayCircleOutlined
            onClick={async () => {
              props.dispatch({
                type: "changeSwitch",
                payload: { playSwitch: true },
              });
              const detail = await list.getSongDetail({ ids: item.id });
              await getSong(Object.assign(item, detail.songs[0]));
            }}
          />
          <a
            onClick={() => {
              props.history.push(`/song/${item.id}`);
            }}
          >
            {item.name}
          </a>
        </Space>
      </List.Item>
    );
  }
  return (
    // <reducerCtx.Provider value={{ store, dispatch: props.dispatch }}>
    <div style={{ backgroundColor: "#eee" }}>
      <div className="album-detail-wrapper">
        <section className="album-detail-wrapper-leftBox">
          <div className="album-content">
            <div className="album-content-main">
              {songInfo.al && (
                <img src={songInfo.al.picUrl} alt={songInfo.name} />
              )}
              <div className="album-content-main-rightBox">
                <Row align="middle">
                  <Tag color={Color.red}>单曲</Tag>
                  <h2 style={{ margin: 0 }}>{songInfo.name}</h2>
                </Row>
                <span>
                  歌手：
                  <a>{songInfo.ar ? formatArtist(songInfo.ar) : "-"}</a>
                </span>
                <span>
                  所属专辑：{songInfo.al && <a>{songInfo.al.name}</a>}
                </span>
                <AlbumTools style={{ marginTop: "10px", width: "400px" }} {...songInfo} songs={[songInfo]} />
              </div>
            </div>
          </div>
          <Comment info={songInfo} type="song" />
        </section>
        <section className="album-detail-wrapper-rightBox">
          <Divider orientation="left">相似歌曲</Divider>
          <List
            dataSource={relatedSongs}
            renderItem={_renderItem}
            itemLayout="vertical"
          />
        </section>
      </div>
    </div>
    // </reducerCtx.Provider>
  );
}

export default reducerConnect(SingleSong);

SingleSong.propTypes = {
  match: object,
  location: object,
  history: object,
};

function formatArtist(text) {
  const names = text.map((item) => item.name);
  return names.join(",");
}
