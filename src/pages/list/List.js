import React from "react";
import { List } from "antd";
import "./List.less";

const mockData = [
  "权利的游戏第八季",
  "绝命毒师第五季",
  "汉尼拔第三季",
  "凡人修仙传大电影",
  "复仇者联盟第四季"
];

const ListPage = () => {
  return (
    <div style={{minHeight: '100vh'}}>
    <List
      dataSource={mockData}
      renderItem={item => <List.Item>{item}</List.Item>}
      size="large"
      bordered
    />
    </div>
  );
};

export default ListPage;
