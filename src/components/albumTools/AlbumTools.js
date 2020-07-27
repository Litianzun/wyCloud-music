import React from "react";
import { Button } from "antd";
import { PlayCircleOutlined, DownloadOutlined, FolderAddOutlined, MessageOutlined, ShareAltOutlined } from "@ant-design/icons";
import './AlbumTools.less'
import { object } from "prop-types";

const AlbumTools = (props) => {
  return (
    <div className="albumTools-wrapper" style={props.style}>
      <Button size="small" icon={<PlayCircleOutlined />} type="primary">
        播放
      </Button>
      <Button size="small" icon={<FolderAddOutlined />}>
        收藏
      </Button>
      <Button size="small" icon={<ShareAltOutlined />}>
        999+
      </Button>
      <Button size="small" icon={<DownloadOutlined />}>
        下载
      </Button>
      <Button size="small" icon={<MessageOutlined />}>
        8338
      </Button>
    </div>
  );
};

export default AlbumTools

AlbumTools.propTypes = {
  style: object
}
