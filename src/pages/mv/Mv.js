import React, { useEffect, useState, Fragment } from "react";
import { Space, Tag, Divider, List } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import "./Mv.less";
import Color from "../../widget/Color";
import list from "../../router/requestList";
import day from "dayjs";
import SizeContext from "antd/lib/config-provider/SizeContext";
import { off } from "process";

let offset = 0;
const Mv = (props) => {
  let mvid = props.match.params.id;
  const [mvInfo, setMv] = useState([]);
  const [relatedMv, setRelated] = useState([]);
  const [hotComment, setHotComment] = useState([]);
  const [allComment, setComment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  async function getMv() {
    const info = await list.getMv({ mvid });
    const url = await list.getMvUrl({ id: mvid });
    if (info.code == 200 && url.code == 200) {
      setMv(Object.assign({}, info.data, { url: url.data.url }));
      //获取相关视频
      const relatedMv = await list.getRelatedVideo({ id: info.data.id });
      //获取mv评论
      const mvComment = await list.getMvComment({
        id: info.data.id,
        limit: 20,
      });
      console.log(mvComment);
      if (relatedMv.code == 200) {
        setRelated(relatedMv.data);
      }
      if (mvComment.code == 200) {
        setHotComment(mvComment.hotComments);
        setComment(mvComment.comments);
      }
    } else {
      throw { error: "获取视频失败!" };
    }
  }

  async function getComment() {
    const mvComment = await list.getMvComment({
      id: mvInfo.id,
      limit: 20,
      offset,
    });
    if (mvComment.code == 200) {
      setComment(mvComment.comments);
    }
  }
  function _renderItem(item) {
    return (
      <List.Item className="commentBox">
        <img src={item.user.avatarUrl} alt="comment" />
        <div className="commentBox-content">
          <div>
            <span style={{ color: Color.blue }}>{item.user.nickname}：</span>
            <span>{item.content}</span>
          </div>
          <div className="commentBox-content-toolBox">
            <small>{day(item.time).format("YYYY年MM月DD日")}</small>
            <div>
              <LikeOutlined style={{ color: Color.blue }} />
              <span style={{ fontSize: "12px" }}>
                &nbsp;({item.likedCount})
              </span>
              <Divider type="vertical" />
              <a>回复</a>
            </div>
          </div>
        </div>
      </List.Item>
    );
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
            <div className="mv-separator">
              <b>评论</b>
              <span>共{mvInfo.commentCount}条评论</span>
            </div>
            <section className="mv-comment">
              {hotComment.length > 0 && (
                <Fragment>
                  <Divider orientation="left">精彩评论</Divider>
                  <List
                    dataSource={hotComment}
                    renderItem={_renderItem}
                    style={{ width: "890px" }}
                  />
                </Fragment>
              )}
              <Divider orientation="left">最新评论</Divider>
              <List
                dataSource={allComment}
                renderItem={_renderItem}
                style={{ width: "890px" }}
                pagination={{
                  pageSize: 20,
                  total: mvInfo.commentCount,
                  current: currentPage,
                  defaultCurrent: 1,
                  showSizeChanger: false,
                  showQuickJumper: true,
                  onChange: (page, pageSize) => {
                    offset = (page - 1) * pageSize;
                    setCurrentPage(page);
                    getComment();
                  },
                }}
              />
            </section>
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
  let arr = e.map((item) => item.userName);
  return arr.join("/");
}
