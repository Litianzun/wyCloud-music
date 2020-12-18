import React from "react";
import { Row, Tag } from "antd";
import AlbumTools from "../albumTools/AlbumTools";
import SongsTable, { Songs } from "../songsTable/SongsTable";
import Comment from "../comment/Comment";
import { reducerConnect } from "../../reducer/Reducer";
import day from "dayjs";
import "./PlaylistMain.less";

type Icreator = {
  avatarUrl: string;
  nickname: string;
  birthday?: Date;
};
interface playlistMainProps {
  tracks: Songs[];
  coverImgUrl: string;
  name: string;
  creator: Icreator;
  dispatch: any;
  id: string | number;
  commentCount: number;
  history: any
}
const PlaylistMain = (props: playlistMainProps) => {
  return (
    <>
      <div className="my-right-playlist">
        <img src={props.coverImgUrl} alt="playlist-cover" />
        <div className="my-right-playlist-main">
          <Row>
            <Tag color="red">歌单</Tag>
            <span className="my-right-playlist-main-title">{props.name}</span>
          </Row>
          {props.creator && (
            <Row style={{ marginTop: "13px" }} align="middle">
              <img src={props.creator.avatarUrl} />
              <a style={{ marginLeft: "12px" }}>
                {props.creator && props.creator.nickname}
              </a>
              <small style={{ marginLeft: "12px", marginTop: "4px" }}>
                {day(props.creator.birthday).format("YYYY-MM-DD")}创建
              </small>
            </Row>
          )}
          <AlbumTools
            style={{ marginTop: "13px", width: "400px" }}
            {...props}
            songs={props.tracks || []}
          />
        </div>
      </div>
      <SongsTable songs={props.tracks || []} dispatch={props.dispatch} history={props.history} />
      <Comment type="playlist" info={props} />
    </>
  );
};

export default reducerConnect(PlaylistMain);
