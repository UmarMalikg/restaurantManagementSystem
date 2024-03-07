import { StyleSheet } from "react-native";
import { fullLightGreen, navBarHeight } from "../../constants/stylesConstants";

const cachierStyles = StyleSheet.create({
  screen: {
    position: "absolute",
    left: 0,
    bottom: 0,
    top: navBarHeight,
    right: 0,
    backgroundColor: fullLightGreen,
  },

  //   print stlip design
  print: {
    position: "absolute",
    right: 30,
    top: navBarHeight + 20,
    bottom: 20,
    width: 400,
  },
  printHeader: {},
  printOrderDetail: {
    borderWidth: 2,
    borderBottomWidth: 0,
  },
  singleLine: {
    borderBottomWidth: 2,
  },
});

export default cachierStyles;
