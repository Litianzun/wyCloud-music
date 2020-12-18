import React from "react";
import { Table, Row } from "antd";
import { Link } from 'react-router-dom'
import { PlayCircleOutlined } from "@ant-design/icons";
import { getSong } from "../../utils/getSong";
import day from "dayjs";
import { ColumnsType } from "antd/es/table";

export interface Songs {
  key: number | string;
  name: string;
  dt: Date | number;
  ar: { name: string }[];
  id: number
}
function SongsTable({ songs, ...rests }: { songs: Songs[]; dispatch?: any; history?: { push: any} }) {
  const columns: ColumnsType<Songs> = [
    {
      title: "",
      key: "id",
      /*eslint-disable */
      render: (text: any, record: Songs, index: number) => (
        <Row align="middle" justify="space-between">
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
      render: (text, record) => (<Link to={`/song/${record.id}`}>{text}</Link>)
    },
    {
      title: "时长",
      dataIndex: "dt",
      render: (text: Songs["dt"]) => <span>{day(text).format("mm:ss")}</span>, //eslint-disable-line
    },
    {
      title: "歌手",
      dataIndex: "ar",
      /*eslint-disable */
      render: (text: Songs["ar"]) => {
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

function formatArtist(text: { name: string }[]) {
  const names = text.map((item) => item.name);
  return names.join(",");
}
