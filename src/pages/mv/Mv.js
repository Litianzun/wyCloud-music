import React, { useEffect, useState } from "react";
import { Space, Tag, Divider, List } from "antd";
import "./Mv.less";
import Color from "../../widget/Color";
import list from "../../router/requestList";
import day from "dayjs";
import Comment from '../../components/comment/Comment'
import { object } from "prop-types";

const Mv = (props) => {
  const mvid = props.match.params.id;
  const [mvInfo, setMv] = useState([]);
  const [relatedMv, setRelated] = useState([]);
  async function getMv() {
    const info = await list.getMv({ mvid });
    const url = await list.getMvUrl({ id: mvid });
    if (info.code == 200 && url.code == 200) {
      setMv(Object.assign({}, info.data, { url: url.data.url }));
      //获取相关视频
      const relatedMv = await list.getRelatedVideo({ id: info.data.id });
      if (relatedMv.code == 200) {
        setRelated(relatedMv.data);
      }
    } else {
      throw { error: "获取视频失败!" };
    }
  }
  console.log(mvInfo);
  useEffect(() => {
    getMv();
  }, [props.location.pathname]);
  return (
    <div style={{ backgroundColor: "#eee" }}>
      <div className="mvWrapper">
        <section className="mv-left">
          <Space direction="vertical">
            <Space align="end" style={{ marginTop: "8px" }}>
              <Tag color="red">MV</Tag>
              <strong style={{ fontSize: "26px", lineHeight: "26px" }}>
                {mvInfo.name}
              </strong>
              <a style={{ fontSize: "13px", color: Color.red }}>
                {mvInfo.artistName}
              </a>
            </Space>
            <div className="mv-video">
              <video
                src={mvInfo.url}
                autoPlay
                controls
                width="100%"
                height="100%"
              />
            </div>
            <Comment info={mvInfo} type='mv' />
          </Space>
        </section>
        <section className="mv-right">
          <div className="brief">
            <Divider orientation="left">mv简介</Divider>
            <span>发布时间：{mvInfo.publishTime}</span>
            <br />
            <span>播放次数：{mvInfo.playCount}</span>
          </div>
          <div className="relevant">
            <Divider orientation="left">相关推荐</Divider>
            <List
              dataSource={relatedMv}
              renderItem={(item) => (
                <List.Item
                  className="relevant-wrapper"
                  onClick={() => {
                    props.history.push(`/mv/${item.vid}`);
                  }}
                >
                  <img src={item.coverUrl} alt={item.alg} />
                  <div className="relevant-wrapper-content">
                    <div className="relevant-wrapper-content-titleBox">
                      <Tag color="red" style={{ fontSize: "12px" }}>
                        MV
                      </Tag>
                      <span className="relevant-wrapper-content-title">
                        {item.title}
                      </span>
                    </div>
                    <small>{day(item.durationms).format("mm:ss")}</small>
                    <small>{creatorFormat(item.creator)}</small>
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
};

export default Mv;

function creatorFormat(e) {
  const arr = e.map((item) => item.userName);
  return arr.join("/");
}

Mv.propTypes = {
  match: object,
  location: object,
  history: object
}
