import React from "react";
import { Table, Row } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { getSong } from "../../utils/getSong";
import day from "dayjs";

function SongsTable({ songs, ...rests }) {
  const columns = [
    {
      title: "",
      key: "id",
      /*eslint-disable */
      render: (text, record, index) => (
        <Row align="middle" justify='space-between'>
          <small>{index + 1}</small>
          <PlayCircleOutlined
            className="album-columns-icon"
            onClick={async () => {
              rests.dispatch({
                type: "changeSwitch",
                payload: { playSwitch: true },
              });
              await getSong(
                songs.filter((item) => item.name === record.name)[0]
              );
            }}
          />
        </Row>
      ),
      /*eslint-enable */
    },
    {
      title: "歌曲标题",
      dataIndex: "name",
    },
    {
      title: "时长",
      dataIndex: "dt",
      render: (text) => <span>{day(text).format("mm:ss")}</span>, //eslint-disable-line
    },
    {
      title: "歌手",
      dataIndex: "ar",
      /*eslint-disable */
      render: (text) => {
        return <span>{formatArtist(text)}</span>;
        /*eslint-enable */
      },
    },
  ];
  return (
    <>
      <span style={{ marginTop: "22px", display: "block" }}>
        <b>包含歌曲列表</b>&emsp;{songs.length}首歌
      </span>
      <Table
        dataSource={songs}
        columns={columns}
        rowKey="id"
        style={{ marginTop: "10px" }}
      />
    </>
  );
}

export default SongsTable;

function formatArtist(text) {
  const names = text.map((item) => item.name);
  return names.join(",");
}
