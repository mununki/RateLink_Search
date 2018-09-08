import React, { Component } from "react";
import { CoreContext } from "./Context";
import Header from "./components/Header";
import Main from "./components/Main";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/ko";
import Sticky from "react-stickynode";

// const API_URL = "https://www.rate-link.com/api";
const API_URL = "http://localhost:8000/api";

const initialSF = moment()
  .subtract(1, "months")
  .startOf("month")
  .format("YYYY-MM-DD");
const initialST = moment()
  .add(1, "months")
  .endOf("month")
  .format("YYYY-MM-DD");

const MarginTop = styled.div`
  width: 100%;
  height: 90px;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: { LIGHT: "#6dbad8", DARK: "#053F5C" },
      API_URL: API_URL,
      CSRF_TOKEN: this.props.CSRF_TOKEN,
      USER_ID: this.props.USER_ID,
      USER_PROFILE_NAME: this.props.USER_PROFILE_NAME,
      queryParams: "search_from=" + initialSF + "&search_to=" + initialST,
      _setGlobalValue: this._setGlobalValue
    };
    this._setGlobalValue = this._setGlobalValue.bind(this);
  }
  render() {
    return (
      <CoreContext.Provider value={this.state}>
        <MarginTop />
        <Sticky enabled={true} top={52} bottomBoundary={1200}>
          <Header />
        </Sticky>
        <Main />
      </CoreContext.Provider>
    );
  }
  _setGlobalValue = value => {
    this.setState(value);
  };
}

export default App;
