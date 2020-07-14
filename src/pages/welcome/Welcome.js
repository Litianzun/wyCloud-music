import React, { Component } from "react";
import { Button, Typography, Collapse } from "antd";
import "./Welcome.less";
import { object } from "prop-types";

const { Text, Paragraph, Title } = Typography;
const { Panel } = Collapse;

class Welcome extends Component {
  render() {
    return (
      <div className="welcomeWrapper">
        <h1>webpack4x + react</h1>
        <Typography className="content">
          <Title level={2}>本Demo使用技术栈:</Title>
          <Paragraph mark>前端工程化：webpack4x</Paragraph>
          <Paragraph>js框架：react</Paragraph>
          <Paragraph>路由：react-router-dom</Paragraph>
          <Paragraph>UI框架：antd</Paragraph>
          <Paragraph>字体：阿里巴巴普惠体Heavy！</Paragraph>
          <Text strong type="secondary">
            本demo为仿网易云音乐，技术锻炼为目的，无其他任何商业用途
          </Text>
          <Paragraph style={{ marginTop: "10px" }}>
            <Title level={3} type="warning">
              记录一下遇到的两个问题：
            </Title>
            <Collapse bordered={false} style={{width: '50%',margin: '0 auto',backgroundColor: 'inherit'}}>
              <Panel header="1">
                <Text underline>
                  1.useContext+useReducer代替redux的方式，发现不用useContext都可以，用context的目的是为了后期方便reducer拆分
                </Text>
              </Panel>
              <Panel header="2">
                <Text underline>
                  2.目前来说，打出来的包体积还是很大，还是可以优化，尤其首页
                </Text>
              </Panel>
            </Collapse>
          </Paragraph>
        </Typography>
        <Button
          type="primary"
          onClick={() => {
            this.props.history.push("/home");
          }}
        >
          开始探索
        </Button>
      </div>
    );
  }
}

export default Welcome;

Welcome.propTypes = {
  history: object
}
