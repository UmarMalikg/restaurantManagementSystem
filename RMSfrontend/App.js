import React from "react";
import { StatusBar, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { AppProvider } from "./src/context/States";
import store from "./src/redux/store/store";
import Navigation from "./Navigation";

const App = () => {
  return (
    <React.Fragment>
      <AppProvider>
        {Platform.OS !== "web" && (
          <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor="green" />
            <Provider store={store}>
              <Navigation />
            </Provider>
          </SafeAreaView>
        )}
        {Platform.OS === "web" && (
          <Provider store={store}>
            <StatusBar style={styles.webStatusBar} />
            <Navigation />
          </Provider>
        )}
      </AppProvider>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webStatusBar: {
    backgroundColor: "green",
  },
});

export default App;
