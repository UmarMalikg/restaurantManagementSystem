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
} from "../../../constants/stylesConstants";

const adminStyles = StyleSheet.create({
  // styles for sideBar
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navBar: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: navBarHeight,
    backgroundColor: darkGreen,
    zIndex: 1000,
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 25,
  },
  // styles for sideBar
  sideBar: {
    zIndex: 2,
    position: "absolute",
    left: 0,
    width: adminLeftSidebarWidth,
    bottom: 0,
    top: navBarHeight,
    backgroundColor: darkGreen,
    paddingTop: 10,
    paddingLeft: 20,
  },
  sideBarLinks: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    flexDirection: "row",
    padding: 8,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: -50,
    borderBottomRightRadius: -50,
  },
  activeSideBarLinks: {
    backgroundColor: fullDarkBlue,
    color: "#fff",
  },
  hoverSideBarLinks: {
    backgroundColor: lightBlue,
    color: "#fff",
  },
  sideBarLinkIcon: {
    height: 20,
    width: 20,
    marginHorizontal: 15,
  },
  sideBarLinkText: {
    fontWeight: "bold",
    fontSize: 18,
  },

  // styles for all the screens
  theScreen: {
    position: "absolute",
    left: adminLeftSidebarWidth,
    bottom: 0,
    top: navBarHeight,
    right: 0,
    backgroundColor: fullLightGreen,
  },
  // styles for table Page
  tablePosition: {
    margin: 30,
  },
  dataViewerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 30,
    marginTop: 20,
  },
  goToModelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: fullDarkBlue,
  },
  goToModelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 18,
  },
  dataTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  dataSearcher: {
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 10,
    marginHorizontal: 30,
    marginTop: 20,
    fontSize: 18,
    outlineColor: fullDarkBlue,
    borderRadius: 20,
  },
  // styles for tables
  tableHead: { height: 40, backgroundColor: fullDarkBlue },
  tableBorderStyle: { borderWidth: 2, borderColor: fullDarkBlue },
  tableHeadText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
  tableDataText: {
    margin: 6,
  },
  evenRow: {
    backgroundColor: "#fff", // Set background color for even rows
  },
  oddRow: {
    backgroundColor: "#f2f2f2", // Set background color for odd rows
  },
  // Models styling
  model: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: [
      { translateX: -350 + 112 }, // Adjust this value based on half of the modal width
      { translateY: -200 + 35 }, // Adjust this value based on half of the modal height
    ],
    width: addModelWidth,
    height: addModelHeight,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
  },
  modelHeader: {
    fontWeight: "bold",
    fontSize: 18,
  },
  modelCloser: {
    position: "absolute",
    right: 10,
    top: 10,
    // width: 40,
    // height: 40,
    borderRadius: 100,
    backgroundColor: "#ccc",
    ...(isWeb && {
      cursor: "pointer",
    }),
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  modelCloserText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
  scroller: {
    marginTop: 30,
  },
  modelLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  requiredStar: { color: "#f00" },
  modelInput: {
    padding: 10,
    borderRadius: 10,
    fontSize: 17,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    outlineColor: fullDarkBlue,
  },
  modelButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: fullDarkBlue,
  },
  modelButtonText: {
    fontWeight: "bold",
    fontSize: 20,

    color: "#fff",
  },

  // dashboard styling

  //record Overview
  recordOverview: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  recordOverviewBox: {
    height: 125,
    borderRadius: 15,
    margin: 20,
    width: 200,
    ...(isWeb && {
      cursor: "pointer",
    }),
  },
  recordDetail: {
    marginTop: 10,
    marginLeft: 10,
  },
  recordName: {
    fontSize: "18px",
    fontFamily: "Sans-Serif",
  },
  recordNums: {
    fontSize: "25px",
    marginTop: 10,
    fontFamily: "Sans-Serif",
  },
  recordIconPos: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "transparent",
  },
  recordIcon: {
    height: dashboardIconsHeight,
    width: dashboardIconsWidth,
  },

  // Sales Detail
  charts: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  chartBoxes: {
    height: chartBoxHeight,
    width: chartBoxWidth,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 15,
    padding: 7,
  },

  //styles for orders list page
  orderFilter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 30,
    marginVertical: 20,
  },
  orderTypeFilter: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
  },
  filterButtons: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
  activeFilterButton: {
    backgroundColor: "#0f0",
  },
  allOrders: {
    marginBottom: 30,
    marginHorizontal: 30,
  },
  singleOrder: { marginVertical: 20 },
  orderHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: fullDarkBlue,
    padding: 10,
  },
  orderHeaderBorder: {
    borderWidth: 1,
    borderColor: lightBlue,
  },
  //
  orderHeaderText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
  orderData: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  orderTableNo: {
    // flex: 1,
  },
  orderTakerName: {
    // flex: 1,
  },
  orderMenuDetails: {
    // flex: 5,
  },
  orderSingleMenuStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    flex: 1,
  },
  orderTypeStyle: {
    // flex: 1,
  },
  orderTotalAndRecieptAction: {
    // flex: 3,
    paddingHorizontal: 8,
  },
  orderTotalPriceStyling: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  orderTotalPriceTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  orderTotalPriceValue: {
    fontWeight: "bold",
    fontSize: 16,
  },
  orderRecieptPositionStyling: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  orderRecieptButtonStyling: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 30,
    backgroundColor: "#0f0",
  },
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 15,
  },
  paginationButtons: {
    marginHorizontal: 20,
    backgroundColor: "#00f",
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 30,
  },
  rowCentered: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  catTabPosition: {
    margin: 30,
    ...(isWeb && {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
      gridColumnGap: 16,
      gridRowGap: 16,
    }),
  },
  catTabBox: {
    height: 50,
    padding: 20,
    borderRadius: 15,
  },
  catTabNameText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  catProductNumText: {
    fontSize: 23,
  },
});

export default adminStyles;
