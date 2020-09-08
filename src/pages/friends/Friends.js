import * as React from "react";
import { List, Avatar, Typography } from "antd";
import "./Friends.less";
import { getCookie } from "../../utils/getCookie";
import list from "../../router/requestList";
import EmptyLogin from "@/components/emptyLogin/EmptyLogin";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import day from "dayjs";
import Color from "../../widget/Color";
import transformJson from "../../utils/transformJson";

const { Title, Paragraph } = Typography;
function Friends(props) {
  const [data, setData] = React.useState([]);
  let [videoActiveIndex, setVideoIndex] = React.useState(-1);
  let [videoUrl,setVideoUrl] = React.useState([])
  async function getData() {
    const params = {
      pageSize: 20,
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
  function _renderItem(item,index) {
    return (
      <List.Item key={item.id} className='friends-itemBox'>
        <div className="friends-itemBox-top">
          <Avatar src={item.user.avatarUrl} />
          <div className="friends-itemBox-info">
            <a style={{ color: Color.blue }}>{item.user.nickname}</a>
            <small style={{ color: "#888" }}>
              {day(item.eventTime).format("MM月DD日 HH:mm:ss")}
            </small>
          </div>
        </div>
        <pre>{transformJson(item,index,{videoActiveIndex,setVideoIndex,videoUrl,setVideoUrl})}</pre>
      </List.Item>
    );
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
          <section className="friends-right"></section>
        </div>
      ) : (
        <EmptyLogin />
      )}
    </div>
  );
}

export default Friends;
