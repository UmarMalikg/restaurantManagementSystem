import React, { useEffect } from "react";
import { StatusBar, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { AppProvider } from "./src/context/States";
import store from "./src/redux/store/store";
import Navigation from "./Navigation";
import { SocketProvider } from "./src/context/socketContext";
import { api } from "./src/api/api";
import io from "socket.io-client";

const App = () => {
  useEffect(() => {
    const socket = io(`${api}`, { transports: ["websocket"] });

    // Cleanup function to close the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <React.Fragment>
      <AppProvider>
        <SocketProvider>
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
        </SocketProvider>
      </AppProvider>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  webStatusBar: {
    backgroundColor: "green",
  },
});

export default App;
