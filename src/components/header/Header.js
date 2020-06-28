import * as React from "react";
import { Menu, Icon, Input } from "antd";
import { withRouter } from "react-router-dom";
import "./Header.less";

const { Search } = Input;
const Header = withRouter(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        current: "home",
      };
      this.handleSearch = this.handleSearch.bind(this);
    }
    async handleSearch(v) {
      this.props.history.push({ pathname: `/searchlist?s=${v}` });
    }
    render() {
      let path = this.props.location.pathname;
      let current = path.substring(1);
      return (
        <nav className="headerWrapper">
          <div className="headerLeft">
            <img
              src={require("../../images/lemon.png")}
              onClick={() => this.props.history.push("/")}
              alt="logo"
            />
            <strong className="headerTitle">网易云音乐</strong>
          </div>
          <Menu
            selectedKeys={[current]}
            mode="horizontal"
            onClick={(e) => {
              this.setState({ current: e.key });
              this.props.history.push(`/${e.key}`);
            }}
            className="menuBox"
          >
            <Menu.Item key="home" className="menuBox-item">
              <div className="menuBox-item-div">首页</div>
            </Menu.Item>
            <Menu.Item key="list" className="menuBox-item">
              <div className="menuBox-item-div">分类</div>
            </Menu.Item>
            <Menu.Item key="other" className="menuBox-item">
              <div className="menuBox-item-div">其他</div>
            </Menu.Item>
            <Menu.Item key="contact" className="menuBox-item">
              <Icon type="contacts" theme="twoTone" />
              <div className="menuBox-item-div">联系我们</div>
            </Menu.Item>
          </Menu>
          <div className="headerRight">
            <Search
              placeholder="音乐/视频/电台/用户"
              style={{ width: "200px" }}
              onSearch={this.handleSearch}
            />
            <em style={{ marginLeft: "10px" }}>登录</em>
          </div>
        </nav>
      );
    }
  }
);

export default Header;
