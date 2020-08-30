import React, { Component } from "react";
import ReactDOM from "react-dom";
import Router from "./router/router";
import Footer from "./components/footer/Footer";
import "./pages/welcome/Welcome.less";
import "babel-polyfill";
import { HashRouter } from "react-router-dom";

if (process.env.NODE_ENV !== "production") {
  console.log("当前运行环境为dev");
}

class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Router />
          <Footer />
        </HashRouter>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
