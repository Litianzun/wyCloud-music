import * as React from "react";
import { Menu, Input } from "antd";
import { withRouter } from "react-router-dom";
import { dispatch } from "../../router/router";
import "./Header.less";
import list from "../../router/requestList";
import { reducerConnect } from "../../reducer/Reducer";
import { getCookie } from "../../utils/getCookie";

const { Search } = Input;
/*eslint-disable */

type Iprofile = {
  avatarUrl: string;
};
interface HeaderProps {
  profile?: Iprofile;
  location: any;
  history: any;
}
const Header: React.FC<HeaderProps> = (props) => {
  async function handleSearch(v: string) {
    window.location.href = `/#/searchlist?s=${v}`;
  }
  let path = props.location.pathname;
  let _current = path.substring(1);
  const { profile } = props;
  React.useEffect(() => {
    const userId = getCookie("userId");
    if (!profile && userId) {
      getUserDetail(userId);
    }
  }, []);
  async function getUserDetail(id: string | number) {
    const loginRes = await list.getUserDetail({ uid: id });
    if (loginRes.code === 200) {
      dispatch({
        type: "setAccount",
        payload: {
          profile: loginRes.profile,
        },
      });
    }
  }
  return (
    <nav className="headerWrapper">
      <div className="headerLeft">
        <img
          src={require("../../images/lemon.png")}
          onClick={() => props.history.push("/")}
          alt="logo"
        />
        <strong className="headerTitle">网易云音乐</strong>
      </div>
      <Menu
        selectedKeys={[_current]}
        mode="horizontal"
        onClick={(e: any) => {
          props.history.push(`/${e.key}`);
        }}
        className="menuBox"
      >
        <Menu.Item key="home" className="menuBox-item">
          <div className="menuBox-item-div">首页</div>
        </Menu.Item>
        <Menu.Item key="my" className="menuBox-item">
          <div className="menuBox-item-div">我的音乐</div>
        </Menu.Item>
        <Menu.Item key="other" className="menuBox-item">
          <div className="menuBox-item-div">朋友</div>
        </Menu.Item>
        <Menu.Item key="contact" className="menuBox-item">
          {/* <Icon type="contacts" theme="twoTone" /> */}
          <div className="menuBox-item-div">联系我们</div>
        </Menu.Item>
      </Menu>
      <div className="headerRight">
        <Search
          placeholder="音乐/视频/电台/用户"
          style={{ width: "200px" }}
          onSearch={handleSearch}
        />
        {!profile ? (
          <a
            style={{ marginLeft: "10px", color: "#fff" }}
            onClick={() => {
              dispatch({
                type: "login",
                payload: {
                  loginFlag: true,
                },
              });
            }}
          >
            登录
          </a>
        ) : (
          <img src={profile.avatarUrl} alt="avatar" className="user-avatar" />
        )}
      </div>
    </nav>
  );
};

export default reducerConnect(withRouter(Header));
