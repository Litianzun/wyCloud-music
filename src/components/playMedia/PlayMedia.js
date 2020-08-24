import * as React from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Popover, List } from "antd";
import "./PlayMedia.less";
import Color from "../../widget/Color";
import { string, array, object } from "prop-types";
import { reducerConnect } from "../../reducer/Reducer";
import { getSong } from "../../utils/getSong";

const PlayMedia = (props) => {
  const [hiddenFlag, setflag] = React.useState(false);
  let timer = null;
  function toHide() {
    //鼠标移开三秒之后，向下收起
    timer = setTimeout(() => {
      setflag(true);
    }, 3000);
  }
  function toShow() {
    setflag(false);
    clearTimeout(timer);
  }

  function renderPlaylist() {
    const list = localStorage.getItem("playlist");
    return (
      <List
        dataSource={JSON.parse(list)}
        renderItem={renderPlaylistItem}
        itemLayout="vertical"
      />
    );
  }

  function renderPlaylistItem(item) {
    return (
      <List.Item
        onDoubleClick={async () => {
          await getSong(item);
        }}
        extra={creatorFormat(item.ar)}
        style={{ backgroundColor: item.id === props.id ? "#eee" : "#fff" }}
      >
        {item.name}
      </List.Item>
    );
  }
  React.useEffect(() => {
    toShow();
    toHide();
    //存储到播放列表
    let playlist = localStorage.getItem("playlist");
    let newList = playlist ? JSON.parse(playlist) : [];
    let filterIndex = newList.findIndex((item2) => item2.id === props.id);
    if (filterIndex == -1 && props.id) {
      newList.push(props);
    }
    localStorage.setItem("playlist", JSON.stringify(newList));
  }, [props]);
  return (
    <div
      className="player"
      style={{
        backgroundColor: Color.defaultColor,
        transform: hiddenFlag ? `translateY(120px)` : `translateY(0px)`,
      }}
      onMouseLeave={toHide}
      onMouseEnter={toShow}
    >
      <div>
        <h2>{props.name}</h2>
        <span>{props.ar && creatorFormat(props.ar)}</span>
      </div>
      <div
        className="player-ico"
        style={{ backgroundImage: `url(${props.al && props.al.picUrl})` }}
      />
      <audio src={props.url} autoPlay controls className="systemplayer">
        您的浏览器不支持audio标签
      </audio>
      <div className="player-toolBox">
        {/* 播放列表 */}
        <Popover content={renderPlaylist()} title="播放列表">
          <UnorderedListOutlined style={{ fontSize: "15px" }} />
        </Popover>
      </div>
    </div>
  );
};

export default reducerConnect(PlayMedia);

function creatorFormat(e) {
  const arr = e.map((item) => item.name);
  return arr.join("/");
}

PlayMedia.propTypes = {
  name: string,
  ar: array,
  url: string,
  al: object,
};
