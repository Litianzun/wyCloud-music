import React, { Component } from "react";
import ReactDOM from "react-dom";
import Router from "./router/router";
import Footer from "./components/footer/Footer";
import "./pages/welcome/Welcome.less";

class App extends Component {
  render() {
    return (
      <div>
        <Router />
        <Footer />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
