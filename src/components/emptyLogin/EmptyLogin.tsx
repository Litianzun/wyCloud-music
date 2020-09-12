import * as React from "react";
import { Button, Empty } from "antd";
import "./EmptyLogin.less";
import { reducerConnect } from "../../reducer/Reducer";

interface EmptyLoginProps {
  dispatch: any;
}
const EmptyLogin = (props: EmptyLoginProps) => (
  <div className="emptyLoginWrapper">
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      style={{ height: "100%" }}
      imageStyle={{ height: "80%" }}
      description={false}
    >
      <Button
        style={{ width: "200px" }}
        size='large'
        type="primary"
        onClick={() => {
          props.dispatch({
            type: "login",
            payload: {
              loginFlag: true,
            },
          });
        }}
      >
        立即登录
      </Button>
    </Empty>
  </div>
);

export default reducerConnect(EmptyLogin);
