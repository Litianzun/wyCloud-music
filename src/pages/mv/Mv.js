import React, { useEffect, useState } from "react";
import { Space, Tag } from "antd";
import "./Mv.less";
import Color from "../../widget/Color";
import list from "../../router/requestList";

const Mv = (props) => {
  let mvid = props.match.params.id;
  const [mvInfo, setMv] = useState([]);
  async function getMv() {
    const info = await list.getMv({ mvid });
    const url = await list.getMvUrl({ id: mvid });
    if (info.code == 200 && url.code == 200) {
      setMv(Object.assign({}, info.data, { url: url.data.url }));
    } else {
      throw { error: "获取视频失败!" };
    }
  }
  console.log(mvInfo);
  useEffect(() => {
    getMv();
  }, []);
  return (
    <div style={{ backgroundColor: "#eee" }}>
      <div className="mvWrapper">
        <Space direction="vertical">
          <Space align="end" style={{ marginTop: "8px" }}>
            <Tag color="red">MV</Tag>
            <strong style={{ fontSize: "26px", lineHeight: "26px" }}>{mvInfo.name}</strong>
            <a style={{ fontSize: "13px", color: Color.red }}>{mvInfo.artistName}</a>
          </Space>
          <video src={mvInfo.url} autoPlay controls height={400} className="video" />
        </Space>
      </div>
    </div>
  );
};

export default Mv;
