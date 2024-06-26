import { StyleSheet } from "react-native";
import {
  isWeb,
  navBarHeight,
  fullLightGreen,
} from "./constants/stylesConstants";

const defaultStyles = StyleSheet.create({
  // container
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
  // navbar
  navBar: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: navBarHeight,
    zIndex: 1000,
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
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

  //   margins to 30
  mrg1: { margin: 1 },
  mrg2: { margin: 2 },
  mrg3: { margin: 3 },
  mrg4: { margin: 4 },
  mrg5: { margin: 5 },
  mrg6: { margin: 6 },
  mrg7: { margin: 7 },
  mrg8: { margin: 8 },
  mrg9: { margin: 9 },
  mrg10: { margin: 10 },
  mrg11: { margin: 11 },
  mrg12: { margin: 12 },
  mrg13: { margin: 13 },
  mrg14: { margin: 14 },
  mrg15: { margin: 15 },
  mrg16: { margin: 16 },
  mrg17: { margin: 17 },
  mrg18: { margin: 18 },
  mrg19: { margin: 19 },
  mrg20: { margin: 20 },
  mrg21: { margin: 21 },
  mrg22: { margin: 22 },
  mrg23: { margin: 23 },
  mrg24: { margin: 24 },
  mrg25: { margin: 25 },
  mrg26: { margin: 26 },
  mrg27: { margin: 27 },
  mrg28: { margin: 28 },
  mrg29: { margin: 29 },
  mrg30: { margin: 30 },

  //   margin horizontal to 30
  mrgH1: { marginHorizontal: 1 },
  mrgH2: { marginHorizontal: 2 },
  mrgH3: { marginHorizontal: 3 },
  mrgH4: { marginHorizontal: 4 },
  mrgH5: { marginHorizontal: 5 },
  mrgH6: { marginHorizontal: 6 },
  mrgH7: { marginHorizontal: 7 },
  mrgH8: { marginHorizontal: 8 },
  mrgH9: { marginHorizontal: 9 },
  mrgH10: { marginHorizontal: 10 },
  mrgH11: { marginHorizontal: 11 },
  mrgH12: { marginHorizontal: 12 },
  mrgH13: { marginHorizontal: 13 },
  mrgH14: { marginHorizontal: 14 },
  mrgH15: { marginHorizontal: 15 },
  mrgH16: { marginHorizontal: 16 },
  mrgH17: { marginHorizontal: 17 },
  mrgH18: { marginHorizontal: 18 },
  mrgH19: { marginHorizontal: 19 },
  mrgH20: { marginHorizontal: 20 },
  mrgH21: { marginHorizontal: 21 },
  mrgH22: { marginHorizontal: 22 },
  mrgH23: { marginHorizontal: 23 },
  mrgH24: { marginHorizontal: 24 },
  mrgH25: { marginHorizontal: 25 },
  mrgH26: { marginHorizontal: 26 },
  mrgH27: { marginHorizontal: 27 },
  mrgH28: { marginHorizontal: 28 },
  mrgH29: { marginHorizontal: 29 },
  mrgH30: { marginHorizontal: 30 },

  //   margin Vertical to 30
  mrgV1: { marginVertical: 1 },
  mrgV2: { marginVertical: 2 },
  mrgV3: { marginVertical: 3 },
  mrgV4: { marginVertical: 4 },
  mrgV5: { marginVertical: 5 },
  mrgV6: { marginVertical: 6 },
  mrgV7: { marginVertical: 7 },
  mrgV8: { marginVertical: 8 },
  mrgV9: { marginVertical: 9 },
  mrgV10: { marginVertical: 10 },
  mrgV11: { marginVertical: 11 },
  mrgV12: { marginVertical: 12 },
  mrgV13: { marginVertical: 13 },
  mrgV14: { marginVertical: 14 },
  mrgV15: { marginVertical: 15 },
  mrgV16: { marginVertical: 16 },
  mrgV17: { marginVertical: 17 },
  mrgV18: { marginVertical: 18 },
  mrgV19: { marginVertical: 19 },
  mrgV20: { marginVertical: 20 },
  mrgV21: { marginVertical: 21 },
  mrgV22: { marginVertical: 22 },
  mrgV23: { marginVertical: 23 },
  mrgV24: { marginVertical: 24 },
  mrgV25: { marginVertical: 25 },
  mrgV26: { marginVertical: 26 },
  mrgV27: { marginVertical: 27 },
  mrgV28: { marginVertical: 28 },
  mrgV29: { marginVertical: 29 },
  mrgV30: { marginVertical: 30 },

  // margin top to 30
  mrgT1: { marginTop: 1 },
  mrgT2: { marginTop: 2 },
  mrgT3: { marginTop: 3 },
  mrgT4: { marginTop: 4 },
  mrgT5: { marginTop: 5 },
  mrgT6: { marginTop: 6 },
  mrgT7: { marginTop: 7 },
  mrgT8: { marginTop: 8 },
  mrgT9: { marginTop: 9 },
  mrgT10: { marginTop: 10 },
  mrgT11: { marginTop: 11 },
  mrgT12: { marginTop: 12 },
  mrgT13: { marginTop: 13 },
  mrgT14: { marginTop: 14 },
  mrgT15: { marginTop: 15 },
  mrgT16: { marginTop: 16 },
  mrgT17: { marginTop: 17 },
  mrgT18: { marginTop: 18 },
  mrgT19: { marginTop: 19 },
  mrgT20: { marginTop: 20 },
  mrgT21: { marginTop: 21 },
  mrgT22: { marginTop: 22 },
  mrgT23: { marginTop: 23 },
  mrgT24: { marginTop: 24 },
  mrgT25: { marginTop: 25 },
  mrgT26: { marginTop: 26 },
  mrgT27: { marginTop: 27 },
  mrgT28: { marginTop: 28 },
  mrgT29: { marginTop: 29 },
  mrgT30: { marginTop: 30 },
  // margin Bottom to 30
  mrgB1: { marginBottom: 1 },
  mrgB2: { marginBottom: 2 },
  mrgB3: { marginBottom: 3 },
  mrgB4: { marginBottom: 4 },
  mrgB5: { marginBottom: 5 },
  mrgB6: { marginBottom: 6 },
  mrgB7: { marginBottom: 7 },
  mrgB8: { marginBottom: 8 },
  mrgB9: { marginBottom: 9 },
  mrgB10: { marginBottom: 10 },
  mrgB11: { marginBottom: 11 },
  mrgB12: { marginBottom: 12 },
  mrgB13: { marginBottom: 13 },
  mrgB14: { marginBottom: 14 },
  mrgB15: { marginBottom: 15 },
  mrgB16: { marginBottom: 16 },
  mrgB17: { marginBottom: 17 },
  mrgB18: { marginBottom: 18 },
  mrgB19: { marginBottom: 19 },
  mrgB20: { marginBottom: 20 },
  mrgB21: { marginBottom: 21 },
  mrgB22: { marginBottom: 22 },
  mrgB23: { marginBottom: 23 },
  mrgB24: { marginBottom: 24 },
  mrgB25: { marginBottom: 25 },
  mrgB26: { marginBottom: 26 },
  mrgB27: { marginBottom: 27 },
  mrgB28: { marginBottom: 28 },
  mrgB29: { marginBottom: 29 },
  mrgB30: { marginBottom: 30 },

  // margin Left to 30
  mrgL1: { marginLeft: 1 },
  mrgL2: { marginLeft: 2 },
  mrgL3: { marginLeft: 3 },
  mrgL4: { marginLeft: 4 },
  mrgL5: { marginLeft: 5 },
  mrgL6: { marginLeft: 6 },
  mrgL7: { marginLeft: 7 },
  mrgL8: { marginLeft: 8 },
  mrgL9: { marginLeft: 9 },
  mrgL10: { marginLeft: 10 },
  mrgL11: { marginLeft: 11 },
  mrgL12: { marginLeft: 12 },
  mrgL13: { marginLeft: 13 },
  mrgL14: { marginLeft: 14 },
  mrgL15: { marginLeft: 15 },
  mrgL16: { marginLeft: 16 },
  mrgL17: { marginLeft: 17 },
  mrgL18: { marginLeft: 18 },
  mrgL19: { marginLeft: 19 },
  mrgL20: { marginLeft: 20 },
  mrgL21: { marginLeft: 21 },
  mrgL22: { marginLeft: 22 },
  mrgL23: { marginLeft: 23 },
  mrgL24: { marginLeft: 24 },
  mrgL25: { marginLeft: 25 },
  mrgL26: { marginLeft: 26 },
  mrgL27: { marginLeft: 27 },
  mrgL28: { marginLeft: 28 },
  mrgL29: { marginLeft: 29 },
  mrgL30: { marginLeft: 30 },

  // margin right to 30
  mrgR1: { marginRight: 1 },
  mrgR2: { marginRight: 2 },
  mrgR3: { marginRight: 3 },
  mrgR4: { marginRight: 4 },
  mrgR5: { marginRight: 5 },
  mrgR6: { marginRight: 6 },
  mrgR7: { marginRight: 7 },
  mrgR8: { marginRight: 8 },
  mrgR9: { marginRight: 9 },
  mrgR10: { marginRight: 10 },
  mrgR11: { marginRight: 11 },
  mrgR12: { marginRight: 12 },
  mrgR13: { marginRight: 13 },
  mrgR14: { marginRight: 14 },
  mrgR15: { marginRight: 15 },
  mrgR16: { marginRight: 16 },
  mrgR17: { marginRight: 17 },
  mrgR18: { marginRight: 18 },
  mrgR19: { marginRight: 19 },
  mrgR20: { marginRight: 20 },
  mrgR21: { marginRight: 21 },
  mrgR22: { marginRight: 22 },
  mrgR23: { marginRight: 23 },
  mrgR24: { marginRight: 24 },
  mrgR25: { marginRight: 25 },
  mrgR26: { marginRight: 26 },
  mrgR27: { marginRight: 27 },
  mrgR28: { marginRight: 28 },
  mrgR29: { marginRight: 29 },
  mrgR30: { marginRight: 30 },

  // padding to 30
  pad1: { padding: 1 },
  pad2: { padding: 2 },
  pad3: { padding: 3 },
  pad4: { padding: 4 },
  pad5: { padding: 5 },
  pad6: { padding: 6 },
  pad7: { padding: 7 },
  pad8: { padding: 8 },
  pad9: { padding: 9 },
  pad10: { padding: 10 },
  pad11: { padding: 11 },
  pad12: { padding: 12 },
  pad13: { padding: 13 },
  pad14: { padding: 14 },
  pad15: { padding: 15 },
  pad16: { padding: 16 },
  pad17: { padding: 17 },
  pad18: { padding: 18 },
  pad19: { padding: 19 },
  pad20: { padding: 20 },
  pad21: { padding: 21 },
  pad22: { padding: 22 },
  pad23: { padding: 23 },
  pad24: { padding: 24 },
  pad25: { padding: 25 },
  pad26: { padding: 26 },
  pad27: { padding: 27 },
  pad28: { padding: 28 },
  pad29: { padding: 29 },
  pad30: { padding: 30 },

  // padding forizontal to 30
  padH1: { paddingHorizontal: 1 },
  padH2: { paddingHorizontal: 2 },
  padH3: { paddingHorizontal: 3 },
  padH4: { paddingHorizontal: 4 },
  padH5: { paddingHorizontal: 5 },
  padH6: { paddingHorizontal: 6 },
  padH7: { paddingHorizontal: 7 },
  padH8: { paddingHorizontal: 8 },
  padH9: { paddingHorizontal: 9 },
  padH10: { paddingHorizontal: 10 },
  padH11: { paddingHorizontal: 11 },
  padH12: { paddingHorizontal: 12 },
  padH13: { paddingHorizontal: 13 },
  padH14: { paddingHorizontal: 14 },
  padH15: { paddingHorizontal: 15 },
  padH16: { paddingHorizontal: 16 },
  padH17: { paddingHorizontal: 17 },
  padH18: { paddingHorizontal: 18 },
  padH19: { paddingHorizontal: 19 },
  padH20: { paddingHorizontal: 20 },
  padH21: { paddingHorizontal: 21 },
  padH22: { paddingHorizontal: 22 },
  padH23: { paddingHorizontal: 23 },
  padH24: { paddingHorizontal: 24 },
  padH25: { paddingHorizontal: 25 },
  padH26: { paddingHorizontal: 26 },
  padH27: { paddingHorizontal: 27 },
  padH28: { paddingHorizontal: 28 },
  padH29: { paddingHorizontal: 29 },
  padH30: { paddingHorizontal: 30 },

  // padding Vertical to 30
  padV1: { paddingVertical: 1 },
  padV2: { paddingVertical: 2 },
  padV3: { paddingVertical: 3 },
  padV4: { paddingVertical: 4 },
  padV5: { paddingVertical: 5 },
  padV6: { paddingVertical: 6 },
  padV7: { paddingVertical: 7 },
  padV8: { paddingVertical: 8 },
  padV9: { paddingVertical: 9 },
  padV10: { paddingVertical: 10 },
  padV11: { paddingVertical: 11 },
  padV12: { paddingVertical: 12 },
  padV13: { paddingVertical: 13 },
  padV14: { paddingVertical: 14 },
  padV15: { paddingVertical: 15 },
  padV16: { paddingVertical: 16 },
  padV17: { paddingVertical: 17 },
  padV18: { paddingVertical: 18 },
  padV19: { paddingVertical: 19 },
  padV20: { paddingVertical: 20 },
  padV21: { paddingVertical: 21 },
  padV22: { paddingVertical: 22 },
  padV23: { paddingVertical: 23 },
  padV24: { paddingVertical: 24 },
  padV25: { paddingVertical: 25 },
  padV26: { paddingVertical: 26 },
  padV27: { paddingVertical: 27 },
  padV28: { paddingVertical: 28 },
  padV29: { paddingVertical: 29 },
  padV30: { paddingVertical: 30 },

  // padding top to 30
  padT1: { paddingTop: 1 },
  padT2: { paddingTop: 2 },
  padT3: { paddingTop: 3 },
  padT4: { paddingTop: 4 },
  padT5: { paddingTop: 5 },
  padT6: { paddingTop: 6 },
  padT7: { paddingTop: 7 },
  padT8: { paddingTop: 8 },
  padT9: { paddingTop: 9 },
  padT10: { paddingTop: 10 },
  padT11: { paddingTop: 11 },
  padT12: { paddingTop: 12 },
  padT13: { paddingTop: 13 },
  padT14: { paddingTop: 14 },
  padT15: { paddingTop: 15 },
  padT16: { paddingTop: 16 },
  padT17: { paddingTop: 17 },
  padT18: { paddingTop: 18 },
  padT19: { paddingTop: 19 },
  padT20: { paddingTop: 20 },
  padT21: { paddingTop: 21 },
  padT22: { paddingTop: 22 },
  padT23: { paddingTop: 23 },
  padT24: { paddingTop: 24 },
  padT25: { paddingTop: 25 },
  padT26: { paddingTop: 26 },
  padT27: { paddingTop: 27 },
  padT28: { paddingTop: 28 },
  padT29: { paddingTop: 29 },
  padT30: { paddingTop: 30 },

  // padding Bottom to 30
  padB1: { paddingBottom: 1 },
  padB2: { paddingBottom: 2 },
  padB3: { paddingBottom: 3 },
  padB4: { paddingBottom: 4 },
  padB5: { paddingBottom: 5 },
  padB6: { paddingBottom: 6 },
  padB7: { paddingBottom: 7 },
  padB8: { paddingBottom: 8 },
  padB9: { paddingBottom: 9 },
  padB10: { paddingBottom: 10 },
  padB11: { paddingBottom: 11 },
  padB12: { paddingBottom: 12 },
  padB13: { paddingBottom: 13 },
  padB14: { paddingBottom: 14 },
  padB15: { paddingBottom: 15 },
  padB16: { paddingBottom: 16 },
  padB17: { paddingBottom: 17 },
  padB18: { paddingBottom: 18 },
  padB19: { paddingBottom: 19 },
  padB20: { paddingBottom: 20 },
  padB21: { paddingBottom: 21 },
  padB22: { paddingBottom: 22 },
  padB23: { paddingBottom: 23 },
  padB24: { paddingBottom: 24 },
  padB25: { paddingBottom: 25 },
  padB26: { paddingBottom: 26 },
  padB27: { paddingBottom: 27 },
  padB28: { paddingBottom: 28 },
  padB29: { paddingBottom: 29 },
  padB30: { paddingBottom: 30 },

  // padding left to 30
  padL1: { paddingLeft: 1 },
  padL2: { paddingLeft: 2 },
  padL3: { paddingLeft: 3 },
  padL4: { paddingLeft: 4 },
  padL5: { paddingLeft: 5 },
  padL6: { paddingLeft: 6 },
  padL7: { paddingLeft: 7 },
  padL8: { paddingLeft: 8 },
  padL9: { paddingLeft: 9 },
  padL10: { paddingLeft: 10 },
  padL11: { paddingLeft: 11 },
  padL12: { paddingLeft: 12 },
  padL13: { paddingLeft: 13 },
  padL14: { paddingLeft: 14 },
  padL15: { paddingLeft: 15 },
  padL16: { paddingLeft: 16 },
  padL17: { paddingLeft: 17 },
  padL18: { paddingLeft: 18 },
  padL19: { paddingLeft: 19 },
  padL20: { paddingLeft: 20 },
  padL21: { paddingLeft: 21 },
  padL22: { paddingLeft: 22 },
  padL23: { paddingLeft: 23 },
  padL24: { paddingLeft: 24 },
  padL25: { paddingLeft: 25 },
  padL26: { paddingLeft: 26 },
  padL27: { paddingLeft: 27 },
  padL28: { paddingLeft: 28 },
  padL29: { paddingLeft: 29 },
  padL30: { paddingLeft: 30 },

  // padding right to 30
  padR1: { paddingRight: 1 },
  padR2: { paddingRight: 2 },
  padR3: { paddingRight: 3 },
  padR4: { paddingRight: 4 },
  padR5: { paddingRight: 5 },
  padR6: { paddingRight: 6 },
  padR7: { paddingRight: 7 },
  padR8: { paddingRight: 8 },
  padR9: { paddingRight: 9 },
  padR10: { paddingRight: 10 },
  padR11: { paddingRight: 11 },
  padR12: { paddingRight: 12 },
  padR13: { paddingRight: 13 },
  padR14: { paddingRight: 14 },
  padR15: { paddingRight: 15 },
  padR16: { paddingRight: 16 },
  padR17: { paddingRight: 17 },
  padR18: { paddingRight: 18 },
  padR19: { paddingRight: 19 },
  padR20: { paddingRight: 20 },
  padR21: { paddingRight: 21 },
  padR22: { paddingRight: 22 },
  padR23: { paddingRight: 23 },
  padR24: { paddingRight: 24 },
  padR25: { paddingRight: 25 },
  padR26: { paddingRight: 26 },
  padR27: { paddingRight: 27 },
  padR28: { paddingRight: 28 },
  padR29: { paddingRight: 29 },
  padR30: { paddingRight: 30 },

  //   bold
  bold: { fontWeight: "bold" },

  // size from 10 to 40
  fs10: { fontSize: 10 },
  fs11: { fontSize: 11 },
  fs12: { fontSize: 12 },
  fs13: { fontSize: 13 },
  fs14: { fontSize: 14 },
  fs15: { fontSize: 15 },
  fs16: { fontSize: 16 },
  fs17: { fontSize: 17 },
  fs18: { fontSize: 18 },
  fs19: { fontSize: 19 },
  fs20: { fontSize: 20 },
  fs21: { fontSize: 21 },
  fs22: { fontSize: 22 },
  fs23: { fontSize: 23 },
  fs24: { fontSize: 24 },
  fs25: { fontSize: 25 },
  fs26: { fontSize: 26 },
  fs27: { fontSize: 27 },
  fs28: { fontSize: 28 },
  fs29: { fontSize: 29 },
  fs30: { fontSize: 30 },
  fs31: { fontSize: 31 },
  fs32: { fontSize: 32 },
  fs33: { fontSize: 33 },
  fs34: { fontSize: 34 },
  fs35: { fontSize: 35 },
  fs36: { fontSize: 36 },
  fs37: { fontSize: 37 },
  fs38: { fontSize: 38 },
  fs39: { fontSize: 39 },
  fs40: { fontSize: 40 },

  // fontWeight
  fWB: {
    fontWeight: "bold",
  },

  orderCircles: {
    position: "absolute",
    top: -3,
    height: 25,
    width: 25,
    backgroundColor: "#fff",
    borderRadius: 25,
  },
});

export default defaultStyles;
