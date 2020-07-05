import * as React from "react";
import "./ToplistItem.less";
import { List, Typography } from "antd";
import list from "../../router/requestList";
import ToplistItemTool from "./ToplistItemTool";
import { number, oneOfType, string } from "prop-types";

const ToplistItem = (props) => {
  const [detail, setDetail] = React.useState([]);
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0); //eslint-disable-line
  React.useEffect(() => {
    async function getDetail() {
      let urlPar = {
        id: props.id,
      };
      const detail = await list.playlistDetail(urlPar);
      console.log(detail);
      if (detail.code == 200) {
        setDetail(detail.playlist.tracks.slice(0, 10));
      }
    }
    getDetail();
  }, []);
  function mouseOver(i) {
    let newdetail = detail;
    newdetail.forEach((item, index) => {
      item.isActive = false;
      if (index === i) {
        item.isActive = true;
      }
    });
    setDetail(newdetail);
    forceUpdate();
  }
  function mouseOut(i) {
    let newdetail = detail;
    newdetail[i].isActive = false;
    setDetail(newdetail);
    forceUpdate();
  }
  return (
    <List
      header={
        <div className="toplist-header">
          <img src={props.coverImgUrl} />
          <div className="toplist-header-rightBox">
            <h3>{props.name}</h3>
            <Typography.Paragraph ellipsis={{ rows: 4 }}>
              {props.description}
            </Typography.Paragraph>
          </div>
        </div>
      }
      dataSource={detail}
      renderItem={(item, index) => {
        return (
          <List.Item className="toplist-item">
            <a>
              {index + 1}&emsp;{item.name}
            </a>
            <div
              onMouseLeave={() => mouseOut(index)}
              onMouseEnter={() => mouseOver(index)}
            >
              <ToplistItemTool isActive={item.isActive} songInfo={item} />
            </div>
          </List.Item>
        );
      }}
      bordered
    />
  );
};

export default ToplistItem;

ToplistItem.propTypes = {
  id: oneOfType([string, number]),
  coverImgUrl: string,
  name: string,
  description: string,
};
