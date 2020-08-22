import React from "react";
import { store, dispatch, reducerCtx } from "../router/router";

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
  //   function Component(props) {
  //     //创建两个核心
  //     [store, dispatch] = useReducer(reducer, initialState);
  //     console.log("store", store, props);
  //     return (
  //         <WrappedComponent
  //           dispatch={dispatch}
  //           {...props}
  //           {...store}
  //           ctx={reducerCtx}
  //         />
  //     );
  //   }
  return Component;
}
