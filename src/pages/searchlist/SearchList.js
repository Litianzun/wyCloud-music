import React, { useState, useEffect, useReducer, useContext } from "react";
import { Table } from "antd";
import { PlayCircleOutlined, PlaySquareOutlined } from "@ant-design/icons";
import "./SearchList.less";
import list from "../../router/requestList";
import { reducerCtx, dispatch, store } from "../../router/router";
import { getSong } from "../../utils/getSong";
import { object } from "prop-types";

let offset = 0;
const SearchList = (props) => {
  const columns = [
    {
      title: "曲名",
      dataIndex: "name",
      key: "name",
      /*eslint-disable */
      render: (text, record, index) => (
        <div
          className="searchCell-name"
          onMouseOver={() => {
            let newData = data;
            newData[index].isActive = true;
            setData(newData);
            forceUpdate();
          }}
          onMouseLeave={() => {
            let newData = data;
            newData[index].isActive = false;
            setData(newData);
            forceUpdate();
          }}
        >
          <span>{text}</span>
          {record.isActive && (
            <PlayCircleOutlined
              className="searchCell-name-playIcon"
              onClick={async () => {
                const album = await list.getAlbum({ id: record.album.id });
                dispatch({
                  type: "changeSwitch",
                  payload: { playSwitch: true },
                });
                await getSong(
                  album.songs.filter((item) => item.name === record.name)[0],
                  Object.assign(ctx, { dispatch, store })
                );
              }}
            />
          )}
        </div>
      ),
      /*eslint-enable */
    },
    {
      title: "歌手",
      dataIndex: "artists",
      key: "artist",
      render: (text) => <a>{text.map((item) => item.name).join("/")}</a>, //eslint-disable-line
    },
    {
      title: "专辑",
      dataIndex: ["album", "name"],
      key: "album",
      render: (text) => <span>{"《" + text + "》"}</span>, //eslint-disable-line
    },
    {
      title: "视频",
      dataIndex: "mvid",
      /*eslint-disable */
      render: (text) => {
        return text ? (
          <PlaySquareOutlined
            className="searchCell-name-playIcon"
            onClick={() => {
              props.history.push(`/mv/${text}`);
            }}
          />
        ) : null;
      },
      /*eslint-enable */
    },
  ];
  const [data, setData] = useState([]);
  const [songCount, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ctx = useContext(reducerCtx);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0); //eslint-disable-line
  let query = props.location.search.substring(3);
  async function handleSearch() {
    const urlPar = {
      keywords: decodeURIComponent(query),
      limit: 20,
      offset: offset,
    };
    const res = await list.search(urlPar);
    console.log(res);
    if (res.code === 200) {
      setData(res.result.songs);
      setCount(res.result.songCount);
    } else {
      throw { error: "搜索出错了" };
    }
  }
  useEffect(() => {
    handleSearch(query);
  }, [props.location.pathname]);
  return (
    <reducerCtx.Provider value={{ store, dispatch }}>
      <div className="searchlistWrapper">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          size="middle"
          style={{ width: "80%", margin: "0 auto" }}
          pagination={{
            pageSize: 20,
            total: songCount,
            current: currentPage,
            defaultCurrent: 1,
            showSizeChanger: false,
            showQuickJumper: true,
            onChange: (page, pageSize) => {
              offset = (page - 1) * pageSize;
              setCurrentPage(page);
              handleSearch();
            },
          }}
        />
      </div>
    </reducerCtx.Provider>
  );
};

export default SearchList;

SearchList.propTypes = {
  history: object,
  location: object,
};
