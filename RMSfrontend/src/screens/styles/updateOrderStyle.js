import { StyleSheet } from "react-native";
import {
  isWeb,
  navBarHeight,
  darkGreen,
  adminLeftSidebarWidth,
  fullDarkBlue,
  lightBlue,
  fullLightGreen,
  addModelWidth,
  addModelHeight,
  dashboardIconsHeight,
  dashboardIconsWidth,
  chartBoxHeight,
  chartBoxWidth,
  lightGreen,
} from "../../constants/stylesConstants";
import defaultStyles from "../../defaultStyles";

const updateOrderPlacementWidth = 400;

const updateOrderStyle = StyleSheet.create({
  page: {
    position: "absolute",
    top: navBarHeight + 10,
    bottom: 10,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  backButtonPosition: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1000000,
  },
  orderPlacment: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: updateOrderPlacementWidth,
    // backgroundColor: "#0f0",
  },
  updateProductCategoryPosition: {
    position: "absolute",
    left: 0,
    right: updateOrderPlacementWidth,
    top: 0,
    bottom: 0,
    // backgroundColor: "#ff0",
  },
});

export default updateOrderStyle;
