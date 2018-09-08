import React from "react";

const CoreContext = React.createContext();

function withGlobalValue(WrappedComponent) {
  return function RLContext(props) {
    return (
      <CoreContext.Consumer>
        {globalState => (
          <WrappedComponent globalState={globalState} {...props} />
        )}
      </CoreContext.Consumer>
    );
  };
}

export { CoreContext, withGlobalValue };
