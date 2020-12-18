import React, { useState, FC } from "react";
import { Modal, Input, Button, Checkbox, Row, message } from "antd";
import { dispatch } from "../../router/router";
import { reducerConnect } from "../../reducer/Reducer";
import "./Login.less";
import list from "../../router/requestList";
import { bool } from "prop-types";
import { setCookie } from "../../utils/getCookie";

interface LoginProps {
  visible: boolean;
}
const Login: FC<LoginProps> = (props) => {
  const [loginType, setLoginType] = useState("default"); //登录方式
  const [termsFlag, setTermsFlag] = useState(false); //服务条款
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function getUserDetail(id: string | number) {
    const loginRes = await list.getUserDetail({ uid: id });
    console.log(loginRes);
    if (loginRes.code === 200) {
      dispatch({
        type: "setAccount",
        payload: { profile: loginRes.profile },
      });
    }
  }
  async function loginForPhone() {
    const params = {
      phone,
      password,
    };
    const res = await list.loginInPhone(params);
    console.log(res);
    if (res.code == 200) {
      cacheLoginInfo(res);
    } else {
      message.error(res.msg)
    }
  }
  async function loginForEmail() {
    const params = {
      email,
      password,
    };
    const res = await list.loginInEmail(params);
    console.log(res);
    if (res.code == 200) {
      cacheLoginInfo(res);
    } else {
      message.error(res.msg)
    }
  }

  async function cacheLoginInfo(res: {
    cookie: string;
    profile: { userId: string | number };
  }) {
    //存储cookie及账号信息
    document.cookie = res.cookie;
    setCookie("userId", res.profile.userId, 15);
    console.log(document.cookie);
    // localStorage.setItem("profile", JSON.stringify(res.profile));
    setPassword("");
    dispatch({
      type: "login",
      payload: {
        loginFlag: false,
      },
    });
    getUserDetail(res.profile.userId);
  }
  const renderDefault = () => (
    <div className="login-left">
      <img src={require("../../images/panda.jpeg")} alt="login_banner" />
      <Button
        onClick={() => {
          if (!termsFlag) {
            message.info(
              "请先勾选同意《服务条款》《隐私政策》《儿童隐私政策》",
              2
            );
            return;
          }
          setLoginType("phone");
        }}
        type="primary"
      >
        手机号登录
      </Button>
      <Button
        onClick={() => {
          if (!termsFlag) {
            message.info(
              "请先勾选同意《服务条款》《隐私政策》《儿童隐私政策》",
              2
            );
            return;
          }
          setLoginType("email");
        }}
        type="primary"
      >
        邮箱登录
      </Button>
      <Button type="ghost">注册</Button>
      <Row align="middle">
        <Checkbox
          onChange={(e: any) => setTermsFlag(e.target.checked)}
          checked={termsFlag}
        />
        <small style={{ marginLeft: "5px" }}>
          同意
          <a
            href="https://st.music.163.com/official-terms/service"
            target="blank"
          >
            《服务条款》
          </a>
          <a
            href="https://st.music.163.com/official-terms/privacy"
            target="blank"
          >
            《隐私政策》
          </a>
          <a
            href="https://st.music.163.com/official-terms/children"
            target="blank"
          >
            《儿童隐私政策》
          </a>
        </small>
      </Row>
    </div>
  );
  const renderPhone = () => (
    <div className="login-inputBox">
      <Row className="login-row">
        <Input
          type="tel"
          placeholder="请输入手机号"
          className="login-input"
          value={phone}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setPhone(e.target.value)
          }
        />
      </Row>
      <Row className="login-row">
        <Input.Password
          placeholder="请输入密码"
          className="login-input"
          value={password}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setPassword(e.target.value)
          }
        />
      </Row>
      <Row justify="space-between" className="login-row">
        <Checkbox>自动登录</Checkbox>
        <a>忘记密码？</a>
      </Row>
      <Button type="primary" onClick={loginForPhone}>
        登录
      </Button>
    </div>
  );

  const renderEmail = () => (
    <div className="login-inputBox">
      <Row className="login-row">
        <Input
          type="email"
          placeholder="请输入账号"
          className="login-input"
          value={email}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setEmail(e.target.value)
          }
        />
      </Row>
      <Row className="login-row">
        <Input.Password
          placeholder="请输入密码"
          className="login-input"
          value={password}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setPassword(e.target.value)
          }
        />
      </Row>
      <Row justify="space-between" className="login-row">
        <Checkbox>自动登录</Checkbox>
        <a>忘记密码？</a>
      </Row>
      <Button type="primary" onClick={loginForEmail}>
        登录
      </Button>
    </div>
  );

  const renderMain = (type: string) => {
    switch (type) {
      case "default":
        return renderDefault();
      case "phone":
        return renderPhone();
      case "email":
        return renderEmail();
      default:
        return null;
    }
  };
  return (
    <Modal
      visible={props.visible}
      maskClosable={false}
      footer={
        loginType === "default" ? null : (
          <div className="login-footer">
            <a
              onClick={() => {
                setLoginType("default");
              }}
            >
              &lt;&nbsp;其他登录方式
            </a>
          </div>
        )
      }
      mask={false}
      title={renderTitle(loginType)}
      centered
      onCancel={() => {
        dispatch({
          type: "login",
          payload: {
            loginFlag: false,
          },
        });
      }}
    >
      {renderMain(loginType)}
    </Modal>
  );
};

export default reducerConnect(Login);

Login.propTypes = {
  visible: bool,
};

function renderTitle(type: string) {
  switch (type) {
    case "default":
      return "登录";
    case "phone":
      return "手机号登录";
    case "email":
      return "邮箱登录";
  }
}
