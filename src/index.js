import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <App
    USRE_ID={window.USER_ID}
    USER_PROFILE_NAME={window.USER_PROFILE_NAME}
    CSRF_TOKEN={window.CSRF_TOKEN}
  />,
  document.getElementById("search_react")
);
