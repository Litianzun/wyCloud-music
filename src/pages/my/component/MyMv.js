import React from "react";
import { Tag, Row } from "antd";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import day from "dayjs";
import { object, array } from "prop-types";

const MyMv = (props) => {
  function _renderItem(item) {
    return (
      <div
        className="myMv-item"
        key={item.vid}
        onClick={() => {
          props.history.push(`/mv/${item.vid}`);
        }}
      >
        <img src={item.coverUrl} alt="my-mv" />
        <Row className="myMv-item-titleBox" align="middle">
          <Tag color="red">MV</Tag>
          <span className="myMv-item-title">{item.title}</span>
        </Row>
        <i>{creatorFormat(item.creator)}</i>
        <small>{day(item.durationms).format("mm:ss")}</small>
      </div>
    );
  }
  return (
    <>
      <SectionTitle
        title={`我的视频(${props.data.length})`}
        style={{ padding: 0, width: "870px" }}
      />
      <div className="myMv-wrapper">
        {props.data && props.data.map((item) => _renderItem(item))}
      </div>
    </>
  );
};

export default MyMv;

function creatorFormat(e) {
  const arr = e.map((item) => item.userName);
  return arr.join("/");
}

MyMv.propTypes = {
  history: object,
  data: array
}
