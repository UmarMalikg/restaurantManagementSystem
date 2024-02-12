import { StyleSheet, Platform } from "react-native";

const isWeb = Platform.OS === "web";

const loginFormStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginBox: {
    width: isWeb ? 400 : "100%",
    height: isWeb ? 500 : "100%",
    padding: isWeb ? 15 : 10,
  },
  loginTitle: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    margin: 10,
  },
  loginTitleText: {
    fontWeight: "bold",
    fontSize: 25,
    paddingBottom: 10,
    borderBottomWidth: 3,
  },
  loginInput: {
    borderBottomWidth: 1,
    borderColor: "#666",
    marginHorizontal: isWeb ? 15 : 10,
    paddingVertical: isWeb ? 8 : 6,
    paddingHorizontal: 3,
    backgroundColor: "transparent",
    marginTop: 20,
    marginBottom: 30,
    fontSize: 18,
    ...(isWeb && {
      outline: "none",
    }),
  },
  loginButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#00f",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 22,
    marginTop: 30,
    marginHorizontal: 40,
    marginBottom: 20,
  },
});

export default loginFormStyles;
