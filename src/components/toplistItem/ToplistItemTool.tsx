import * as React from "react";
import "./ToplistItem.less";
import { reducerConnect } from "../../reducer/Reducer";
import { getSong } from "../../utils/getSong";
import { bool, object } from "prop-types";

interface toolProps {
  isActive: boolean;
  songInfo: object;
  dispatch: any
}
const ToplistItemTool: React.FC<toolProps> = ({
  isActive,
  songInfo,
  ...rests
}) => {
  function getValue(active: boolean) {
    return active;
  }
  // const ctx = React.useContext(reducerCtx);
  const memoizedActive = React.useMemo(() => getValue(isActive), [isActive]);
  return (
    <div className="toolWrapper">
      <img
        src={require("../../images/play.png")}
        alt="play-icon"
        hidden={!memoizedActive}
        onClick={async () => {
          rests.dispatch({
            type: "changeSwitch",
            payload: { playSwitch: true },
          });
          await getSong(songInfo);
        }}
      />
    </div>
  );
};

export default reducerConnect(ToplistItemTool);

ToplistItemTool.propTypes = {
  isActive: bool,
  songInfo: object,
};
