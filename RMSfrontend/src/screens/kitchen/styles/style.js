import { navBarHeight } from "../../../constants/stylesConstants";
import { StyleSheet } from "react-native";
let totalHeight = `100%-${navBarHeight}`;

const kitchenStyles = StyleSheet.create({
  ordersPosition: {
    position: "absolute",
    left: 0,
    right: 0,
    top: navBarHeight,
    bottom: 0,
    height: "100%",
    width: "100%",
  },
});

export default kitchenStyles;
