import React, { Component } from "react";
import { Button, Typography, Collapse } from "antd";
import "./Welcome.less";

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
            本demo主要目的为实操一下webpack
          </Text>
          <Paragraph style={{ marginTop: "10px" }}>
            <Title level={3} type="warning">
              记录一下遇到的两个问题：
            </Title>
            <Collapse bordered={false} style={{width: '50%',margin: '0 auto',backgroundColor: 'inherit'}}>
              <Panel header="1">
                <Text underline>
                  1.本来是想集成一下typescript，结果发现antd目前只支持create-react-app脚手架的ts环境搭配，webpack自行配置的暂没有方案~
                </Text>
              </Panel>
              <Panel header="2">
                <Text underline>
                  2.目前来说，打出来的包体积还是很大，分析过后很大一部分是由于antd的icons及moment占了很大一部分，issues上也有人提过这个问题，官方暂时还未修复!
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
