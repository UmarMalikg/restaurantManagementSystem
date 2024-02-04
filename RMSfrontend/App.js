import React from "react";
import { Provider } from "react-redux";
import { AppProvider } from "./src/context/States";
import store from "./src/redux/store/store";
import Navigation from "./Navigation";

const App = () => {
  return (
    <AppProvider>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </AppProvider>
  );
};

export default App;
