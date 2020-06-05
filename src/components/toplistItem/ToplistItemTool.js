import * as React from "react";
import "./ToplistItem.less";
import { reducerCtx } from "../../router/router";
import { getSong } from "../../utils/getSong";

const ToplistItemTool = ({ isActive, songInfo }) => {
  function getValue(active) {
    return active;
  }
  const ctx = React.useContext(reducerCtx);
  const memoizedActive = React.useMemo(() => getValue(isActive), [isActive]);
  return (
    <div className="toolWrapper">
      <img
        src={require("../../images/play.png")}
        alt="play-icon"
        hidden={!memoizedActive}
        onClick={async () => {
          ctx.dispatch({ type: "changeSwitch", payload: { playSwitch: true } });
          await getSong(songInfo,ctx);
        }}
      />
    </div>
  );
};

export default ToplistItemTool;
