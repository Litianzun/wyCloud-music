import * as React from "react";
import { List, Avatar } from "antd";
import "./Friends.less";
import { getCookie } from "../../utils/getCookie";
import list from "../../router/requestList";
import EmptyLogin from "@/components/emptyLogin/EmptyLogin";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import day from "dayjs";
import Color from "../../widget/Color";
import {transformJson,transformAdvertising} from "../../utils/transformJson";
import { reducerConnect } from "@/reducer/Reducer";
import { string } from "prop-types";

function Friends(props) {
  const [data, setData] = React.useState([]);
  const [videoActiveIndex, setVideoIndex] = React.useState(-1);
  const [videoUrl, setVideoUrl] = React.useState([]);
  async function getData() {
    const params = {
      pageSize: 20,
      cookie: document.cookie
    };
    const res = await list.getEvent(params);
    console.log(res);
    if (res.code === 200) {
      setData(res.event);
    }
  }
  React.useEffect(() => {
    getData();
  }, []);
  function _renderItem(item, index) {
    if(item.type === 33) {
      return transformAdvertising(item)
    } else {
      return (
        <List.Item key={item.id} className="friends-itemBox">
          <div className="friends-itemBox-top">
            <Avatar src={item.user.avatarUrl} />
            <div className="friends-itemBox-info">
              <a style={{ color: Color.blue }}>{item.user.nickname}</a>
              <small style={{ color: "#888" }}>
                {day(item.eventTime).format("MM月DD日 HH:mm:ss")}
              </small>
            </div>
          </div>
          <pre>
            {transformJson(item, index, {
              videoActiveIndex,
              setVideoIndex,
              videoUrl,
              setVideoUrl,
            })}
          </pre>
        </List.Item>
      );
    }
  }
  
  return (
    <div style={{ backgroundColor: "#eee" }}>
      {getCookie("userId") ? (
        <div className="friendsWrapper">
          <section className="friends-left">
            <SectionTitle title="动态" />
            <div className="friends-left-main">
              <List dataSource={data} renderItem={_renderItem} />
            </div>
          </section>
          <section className="friends-right">
            <div className="accountBox">
              <div className='myInfo'>
                <img src={props.profile && props.profile.avatarUrl} />
                <strong>{props.profile ? props.profile.nickname : '-'}</strong>
              </div>
              <div className="accountBox-data">
                <div className="accountBox-data-item">
                  <span>{0}</span>
                  <small>动态</small>
                </div>
                <div className="accountBox-data-item">
                  <span>{6}</span>
                  <small>关注</small>
                </div>
                <div className="accountBox-data-item">
                  <span>{2}</span>
                  <small>粉丝</small>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <EmptyLogin />
      )}
    </div>
  );
}

export default reducerConnect(Friends);

Friends.propTypes = {
  profile: {
    avatarUrl: string,
    nickname: string
  }
}
