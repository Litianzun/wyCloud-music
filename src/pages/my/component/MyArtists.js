import React from "react";
import { List } from "antd";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import { array } from "prop-types";

const MyArtists = (props) => {
  function _renderItem(item) {
    return (
      <List.Item className="myArtists-item">
        <img src={item.picUrl} alt="artist" />
        <div className="myArtists-item-main">
          <strong style={{ fontSize: "15px" }}>{item.name}</strong>
          <small>
            {item.albumSize}个专辑 &emsp; &nbsp; {item.mvSize}个MV
          </small>
        </div>
      </List.Item>
    );
  }
  return (
    <>
      <SectionTitle
        title={`我的歌手(${props.data.length})`}
        style={{ width: "870px", padding: 0 }}
      />
      <List dataSource={props.data} renderItem={_renderItem} />
    </>
  );
};

export default MyArtists;

MyArtists.propTypes = {
  data: array
}
