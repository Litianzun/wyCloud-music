import * as React from "react";
import { Tag } from "antd";
import { PlayCircleFilled } from "@ant-design/icons";
import { getSong } from "./getSong";
import { dispatch } from "@/router/router";
import list from "@/router/requestList";

/**
 * 该函数用来转换用户动态传过来的json
 */
export default function transformJson(item, index, rests) {
  if (!item.json) {
    return null;
  } else {
    const text = JSON.parse(item.json);
    const msg = text.msg || "",
      song = text.song,
      img = item.pics,
      video = text.video;
    //1.#xx#替换<a>标签
    const startIndex = msg.indexOf("#");
    const endIndex = msg.indexOf("#", startIndex + 1);
    const targetStr = msg.substring(startIndex, endIndex + 1);
    return targetStr ? (
      <>
        {transformLink(msg.substring(0, startIndex))}
        <a href={`https://music.163.com/#/activity?id=${item.actId}`}>
          {targetStr}
        </a>
        {transformLink(msg.substring(endIndex + 1))}
        {renderOthers(song, img, video, index, rests)}
      </>
    ) : (
      <>
        {msg}
        {renderOthers(song, img, video, index, rests)}
      </>
    );
  }
}

function transformLink(str) {
  //2.链接url统一改为【网页链接】按钮
  const urlStartIndex =
    str.indexOf("https") === -1 ? str.indexOf("http") : str.indexOf("https");
  const urlEndIndex =
    urlStartIndex > -1 ? str.indexOf("\n", urlStartIndex + 1) : -1;
  const targetStr = str.substring(urlStartIndex, urlEndIndex + 1);
  //   console.log(urlStartIndex, urlEndIndex, targetStr);
  return targetStr ? (
    <pre>
      {str.substring(0, urlStartIndex)}
      <Tag onClick={() => (window.location.href = targetStr)}>网页链接</Tag>
      {str.substring(urlEndIndex + 1)}
    </pre>
  ) : (
    str
  );
}

const renderOthers = (song = null, img, video, index, rests) => {
  return (
    <>
      {song && (
        <div style={styles.songBox}>
          <div
            style={{ ...styles.img, backgroundImage: `url(${song.img80x80})` }}
          >
            <PlayCircleFilled
              style={{ color: "#dcdcdc", fontSize: "17px" }}
              className="playCicle"
              onClick={async () => {
                dispatch({
                  type: "changeSwitch",
                  payload: { playSwitch: true },
                });
                await getSong(Object.assign(song, { al: song.album }));
              }}
            />
          </div>
          <div style={styles.mainInfo}>
            <span>{song.name}</span>
            <small>{formatArtist(song.artists)}</small>
          </div>
        </div>
      )}
      {img &&
        img.map((item, index) => (
          <img
            src={item.originUrl}
            key={index}
            style={{
              width: item.width / 5,
              height: item.height / 5,
              marginTop: "8px",
              display: "block",
            }}
          />
        ))}
      {video &&
        (rests.videoActiveIndex === index ? (
          <video
            src={rests.videoUrl}
            style={{ width: "300px", display: "block" }}
            autoPlay
            controls
          >
            您的浏览器不支持video
          </video>
        ) : (
          <div
            src={video.coverUrl}
            style={{
              width: "200px",
              height: "150px",
              marginTop: "8px",
              backgroundImage: `url(${video.coverUrl})`,
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PlayCircleFilled
              style={{ color: "#dcdcdc", fontSize: "20px" }}
              onClick={async () => {
                rests.setVideoIndex(index);
                const res = await list.getVideo({ id: video.videoId });
                if (res.code === 200) {
                  rests.setVideoUrl(res.urls[0].url);
                }
              }}
              className="playCicle"
            />
          </div>
        ))}
    </>
  );
};

const styles = {
  songBox: {
    width: "100%",
    height: "60px",
    backgroundColor: "#eee",
    display: "flex",
    alignItems: "center",
    paddingLeft: "8px",
    paddingRight: "8px",
    marginTop: "6px",
  },
  img: {
    width: "42px",
    height: "42px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "42px",
    justifyContent: "space-between",
    marginLeft: "10px",
  },
};

function formatArtist(text) {
  const names = text.map((item) => item.name);
  return names.join(",");
}
