import React, { useState, useEffect } from "react";
import { Tag, Row, Divider, List, Typography } from "antd";
import "./AlbumDetail.less";
import list from "../../router/requestList";
import day from "dayjs";
import Color from "../../widget/Color";
import AlbumTools from "../../components/albumTools/AlbumTools";
import Comment from "../../components/comment/Comment";
import { object, any } from "prop-types";
import { reducerConnect } from "../../reducer/Reducer";
import SongsTable from '../../components/songsTable/SongsTable'

function AlbumDetail(props) {
  const albumId = props.match.params.id;
  const [albumInfo, setAlbumInfo] = useState({});
  const [songs, setSongs] = useState([]);
  const [otherAlbums, setOtherAlbums] = useState([]);
  const [expandFlag, setExpandFlag] = useState(true);
  async function getAlbumInfo() {
    const info = await list.getAlbum({ id: albumId, limit: 30 });
    console.log(info);
    if (info.code === 200) {
      setAlbumInfo(info.album);
      setSongs(info.songs);
      getOtherAlbum(info.album.artist);
    }
  }
  async function getOtherAlbum(artist) {
    const params = {
      id: artist.id,
      offset: 0,
      limit: 5,
    };
    const res = await list.getArtistAlbum(params);
    console.log(res);
    if (res.code === 200) {
      setOtherAlbums(res.hotAlbums);
    }
  }
  useEffect(() => {
    getAlbumInfo();
  }, [props.location.pathname]);

  function _renderItem(item) {
    return (
      <List.Item
        className="album-listItem"
        onClick={() => {
          props.history.push(`/album/${item.id}`);
        }}
      >
        <img src={item.picUrl} alt="album-listItem" />
        <div className="album-listItem-content">
          <span>{item.name}</span>
          <small>{day(item.publishTime).format("YYYY-MM-DD")}</small>
        </div>
      </List.Item>
    );
  }
  return (
      <div style={{ backgroundColor: "#eee" }}>
        <div className="album-detail-wrapper">
          <section className="album-detail-wrapper-leftBox">
            <div className="album-content">
              <div className="album-content-main">
                <img src={albumInfo.picUrl} alt={albumInfo.name} />
                <div className="album-content-main-rightBox">
                  <Row align="middle">
                    <Tag color={Color.red}>专辑</Tag>
                    <h2 style={{ margin: 0 }}>{albumInfo.name}</h2>
                  </Row>
                  <span>
                    歌手：
                    <a>
                      {albumInfo.artists
                        ? formatArtist(albumInfo.artists)
                        : "-"}
                    </a>
                  </span>
                  <span>
                    发行时间：{day(albumInfo.publishTime).format("YYYY-MM-DD")}
                  </span>
                  <span>发行公司：{albumInfo.company}</span>
                  <AlbumTools style={{ marginTop: "10px", width: "400px" }} {...albumInfo.info} songs={songs} />
                </div>
              </div>
              <div className="album-content-description">
                <h4>专辑介绍：</h4>
                <Typography.Paragraph
                  ellipsis={{
                    rows: 3,
                    expandable: true,
                    symbol: "展开",
                    onExpand: (e) => {
                      console.log(e);
                      setExpandFlag(!expandFlag);
                    },
                  }}
                >
                  {albumInfo.description}
                </Typography.Paragraph>
              </div>
              <SongsTable songs={songs} dispatch={props.dispatch} />
            </div>
            <Comment
              info={Object.assign(albumInfo, albumInfo.info)}
              type="album"
            />
          </section>
          <section className="album-detail-wrapper-rightBox">
            <Divider orientation="left">Ta的其他热门专辑</Divider>
            <List dataSource={otherAlbums} renderItem={_renderItem} />
          </section>
        </div>
      </div>
  );
}

export default reducerConnect(AlbumDetail);

AlbumDetail.propTypes = {
  match: object,
  location: object,
  history: object,
  dispatch: any
};

function formatArtist(text) {
  const names = text.map((item) => item.name);
  return names.join(",");
}
