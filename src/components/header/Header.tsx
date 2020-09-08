import * as React from "react";
import { Menu, Input, Dropdown, Badge } from "antd";
import { withRouter, Link } from "react-router-dom";
import {
  SettingOutlined,
  UserOutlined,
  MessageOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { dispatch } from "../../router/router";
import "./Header.less";
import list from "../../router/requestList";
import { reducerConnect } from "../../reducer/Reducer";
import { getCookie, delCookie } from "../../utils/getCookie";

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
  const menu = (
    <Menu theme="dark">
      <Menu.Item icon={<UserOutlined />}>
        <Link to={`/user/home/${getCookie("userId")}`}>我的主页</Link>
      </Menu.Item>
      <Menu.Item icon={<MessageOutlined />}>
        <Badge count={5} size='small'>
        <Link to="/msg/m/private">我的消息</Link>
        </Badge>
      </Menu.Item>
      <Menu.Item icon={<SettingOutlined />}>
        <Link to="/user/update">个人设置</Link>
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />}>
        <a
          onClick={() => {
            delCookie("userId");
            delCookie("_remember_me");
            delCookie("_csrf");
            delCookie("MUSIC_U");
            dispatch({
              type: "setAccount",
              payload: {
                profile: null,
              },
            });
          }}
        >
          退出
        </a>
      </Menu.Item>
    </Menu>
  );
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
          const externalLinks = ["mall", "musician"];
          if (!externalLinks.includes(e.key)) {
            props.history.push(`/${e.key}`);
          } else if (e.key === "mall") {
            window.open("https://music.163.com/store/product");
          } else if (e.key === "musician") {
            window.open("https://music.163.com/nmusician/web/index#/");
          }
        }}
        className="menuBox"
      >
        <Menu.Item key="home" className="menuBox-item">
          <div className="menuBox-item-div">首页</div>
        </Menu.Item>
        <Menu.Item key="my" className="menuBox-item">
          <div className="menuBox-item-div">我的音乐</div>
        </Menu.Item>
        <Menu.Item key="friends" className="menuBox-item">
          <div className="menuBox-item-div">朋友</div>
        </Menu.Item>
        <Menu.Item key="mall" className="menuBox-item">
          <div className="menuBox-item-div">商城</div>
        </Menu.Item>
        <Menu.Item key="musician" className="menuBox-item">
          <div className="menuBox-item-div">音乐人</div>
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
          <Dropdown overlay={menu} placement="bottomCenter">
            <img src={profile.avatarUrl} alt="avatar" className="user-avatar" />
          </Dropdown>
        )}
      </div>
    </nav>
  );
};

export default reducerConnect(withRouter(Header));
