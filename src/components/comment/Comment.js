import React, { Fragment, useState, useEffect } from "react";
import { Divider, List } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import list from "../../router/requestList";
import Color from "../../widget/Color";
import "./Comment.less";
import day from "dayjs";
import { object, string } from "prop-types";

let offset = 0;
const Comment = ({ info, type }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hotComment, setHotComment] = useState([]);
  const [allComment, setComment] = useState([]);
  const [songTotal, setSongTotal] = useState(0)
  async function getComment() {
    let comment = null;
    switch (type) {
      case "mv": {
        comment = await list.getMvComment({
          id: info.id,
          limit: 20,
          offset,
        });
        break;
      }
      case "album": {
        comment = await list.getAlbumComment({
          id: info.id,
          limit: 20,
          offset,
        });
        break;
      }
      case "playlist": {
        comment = await list.getPlaylistComment({
          id: info.id,
          limit: 20,
          offset,
        });
        break;
      }
      case "song": {
        comment = await list.getSongComment({
          id: info.id,
          limit: 20,
          offset,
        });
        break;
      }
    }
    if (comment.code == 200) {
      if (comment.hotComments) {
        setHotComment(comment.hotComments);
      }
      setComment(comment.comments);
      if(type === 'song') {
        setSongTotal(comment.total)
      }
    }
  }
  useEffect(() => {
    if (info.id) {
      getComment();
    }
  }, [info]);
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
  return (
    <Fragment>
      <div className="mv-separator" id='commentPoint' name='commentPoint'>
        <b>评论</b>
        <span>共{type !== 'song' ? info.commentCount : songTotal}条评论</span>
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
            total: type !== 'song' ? info.commentCount : songTotal,
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
    </Fragment>
  );
};

export default Comment;

Comment.propTypes = {
  info: object,
  type: string,
};
