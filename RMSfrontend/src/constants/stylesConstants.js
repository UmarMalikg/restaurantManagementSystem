import { StyleSheet, Platform } from "react-native";
export const isWeb = Platform.OS === "web";

// widths and heights
export const navBarWidth = 70;

// colors
export const fullLightGreen = "#dfffdf";
export const lightGreen = "#cdffcd";
export const fullDarkgreen = "#436850";
export const darkGreen = "#729b79";

export const fullDarkBlue = "#4b49ac";
export const skyBlue = "#98bdff";
export const lightBlue = "#7978e9";

export const lightOrange = "#f3797e";

const defaultStyles = StyleSheet.create({
  //    flexes
  rowFlex: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  rowCenteredFlex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  rowSpacingFlex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  rowSpacingAroundFlex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },

  colFlex: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  colCenteredFlex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  colSpacingFlex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  colSpacingAroundFlex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
});
