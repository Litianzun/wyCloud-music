import * as React from "react";
import { Menu, Icon } from "antd";
import { withRouter } from "react-router-dom";
import "./Header.less";

const Header = withRouter(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        current: "home"
      };
    }
    render() {
      console.log(this)
      let path = this.props.location.pathname
      let current = path.substring(1)
      return (
        <div className="headerWrapper">
          <img
            src={require("../../images/lemon.png")}
            onClick={() => this.props.history.push("/")}
            alt="logo"
          />
          <img
            src={require("../../images/banner.jpg")}
            style={{ flex: 1, height: 50 }}
            alt="banner"
          />
          <Menu
            selectedKeys={[current]}
            mode="horizontal"
            onClick={e => {
              this.setState({ current: e.key });
              this.props.history.push(`/${e.key}`);
            }}
            className="menuBox"
          >
            <Menu.Item key="home">
              <Icon type="home" theme="twoTone" />
              首页
            </Menu.Item>
            <Menu.Item key="list">
              <Icon type="database" theme="twoTone" />
              列表
            </Menu.Item>
            <Menu.Item key="other">
              <Icon type="smile" theme="twoTone" />
              其他
            </Menu.Item>
            <Menu.Item key="contact">
              <Icon type="contacts" theme="twoTone" />
              联系我们
            </Menu.Item>
          </Menu>
        </div>
      );
    }
  }
);

export default Header;
