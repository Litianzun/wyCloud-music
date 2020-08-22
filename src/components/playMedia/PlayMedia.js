import * as React from "react";
import "./PlayMedia.less";
import Color from "../../widget/Color";
import { string, array, object } from "prop-types";

const PlayMedia = (props) => {
  const [hiddenFlag, setflag] = React.useState(false);
  let timer = null;
  function toHide() {
    //鼠标移开三秒之后，向下收起
    timer = setTimeout(() => {
      setflag(true);
    }, 3000);
  }
  function toShow() {
    setflag(false);
    clearTimeout(timer);
  }
  React.useEffect(() => {
    toShow();
    toHide();
  }, [props]);
  return (
    <div
      className="player"
      style={{ backgroundColor: Color.defaultColor, transform: hiddenFlag ? `translateY(120px)` : `translateY(0px)` }}
      onMouseLeave={toHide}
      onMouseEnter={toShow}
    >
      <div>
        <h2>{props.name}</h2>
        <span>{props.ar && props.ar[0].name}</span>
      </div>
      <div className="player-ico" style={{ backgroundImage: `url(${props.al && props.al.picUrl})` }} />
      <audio src={props.url} autoPlay controls className="systemplayer">
        您的浏览器不支持audio标签
      </audio>
    </div>
  );
};

export default PlayMedia;

PlayMedia.propTypes = {
  name: string,
  ar: array,
  url: string,
  al: object
}
