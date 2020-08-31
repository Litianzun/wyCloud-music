import React from "react";
import { store, dispatch, reducerCtx } from "../router/router";

export const initialState = {
  playSwitch: false,
  song: {},
  loginFlag: false,
  profile: 0,
};
export function reducer(state = initialState, action) {
  switch (action.type) {
    case "changeSwitch":
      return Object.assign({}, state, action.payload);
    case "setSong":
      return Object.assign({}, state, action.payload);
    case "login":
      return Object.assign({}, state, action.payload);
    case "setAccount":
      return Object.assign({}, state, action.payload);
    default:
      throw new Error("error");
  }
}

export function reducerConnect(WrappedComponent) {
  class Component extends React.PureComponent {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <reducerCtx.Provider value={{ store, dispatch: dispatch }}>
          <WrappedComponent dispatch={dispatch} {...this.props} {...store} />
        </reducerCtx.Provider>
      );
    }
  }
  return Component;
}


