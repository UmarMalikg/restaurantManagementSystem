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
});

export default cachierStyles;
