import * as React from "react";
import { MobileOutlined, MailOutlined } from "@ant-design/icons";
import "./Footer.less";
import { version } from "../../../package.json";

const Footer = () => {
  return (
    <div className="footerWrapper">
      <span>当前版本号：{version}</span>
      <small>
        特此声明：本网站仅供个人开发及学习用，不做任何商业用途，如侵犯到网易云音乐官方利益，请即时联系我
      </small>
      <div>
        联系方式：
        <MobileOutlined />
        &ensp;18795875073 &emsp;
        <MailOutlined />
        &ensp;lidongssjob@126.com
      </div>
    </div>
  );
};

export default Footer;
