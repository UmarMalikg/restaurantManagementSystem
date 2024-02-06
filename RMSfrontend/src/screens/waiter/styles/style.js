import { StyleSheet } from "react-native";

const waiterStyles = StyleSheet.create({
  // styles for sideBar
  container: {
    flex: 1,
  },
  // styles for Header
  header: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 67,
    backgroundColor: "#fff",
    zIndex: 10000,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
  },

  headerEmployeeAction: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  headerEmployeeInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  headerEmployeeImgBox: {
    height: 50,
    width: 50,
    marginHorizontal: 12,
  },
  headerEmployeeImg: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  headerEmployeeNameAndRole: {
    display: "flex",
    justifyContent: "center",
  },
  headerEmployeeName: {
    // marginBottom: 10,
  },
  headerEmployeeNameText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerEmployeeRole: {
    // marginTop: 10,
  },
  headerEmployeeRoleText: {
    fontSize: 16,
  },

  // styles for sideBar
  sideBar: {
    position: "absolute",
    left: 0,
    top: 70,
    bottom: 0,
    width: 200,
    backgroundColor: "#777",
  },
  sideSearchEngine: {
    borderRadius: 20,
    backgroundColor: "#fff",
    margin: 7,
    border: 0,
    fontSize: 10,
  },
  sideSearchInputEngine: {
    backgroundColor: "#fff",
    height: 10,
  },
  sideBarTables: {
    flex: 1 / 2,
    backgroundColor: "#ddd",
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 3,
  },

  // styles for sideBar
  orderPlacement: {
    position: "absolute",
    top: 70,
    bottom: 0,
    right: 20,
    width: 350,
    backgroundColor: "#777",
    borderRadius: 20,
  },
  orderCalculationsBox: {
    // position: "absolute",
    // left: 0,
    // right: 0,
    // bottom: 10,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    // backgroundColor: "#d00",
  },
  orderActionButtons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
  },
  orderButtons: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  orderButtonsText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  orderPlaceButton: {
    backgroundColor: "#0f0",
  },
  orderCancelButton: {
    backgroundColor: "#f00",
  },
  orderDraftButton: {
    backgroundColor: "#ff0",
  },

  orderTotal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 10,
    marginBottom: 15,
    borderTopWidth: 1,
    paddingTop: 7,
  },
  orderTotalDesText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  orderTotalPriceText: {
    fontSize: 14,
    fontWeight: "bold",
  },

  orderCharges: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderTopWidth: 1,
    paddingTop: 12.5,
    borderStyle: "dashed",
    // borderColor: "#fff",
  },
  singleOrderCharge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  orderChargesDesText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  orderChargesPriceText: {
    fontWeight: "bold",
    fontSize: 13,
  },

  orderLeftCircle: {
    position: "absolute",
    left: -12.5,
    top: -3,
    height: 25,
    width: 25,
    backgroundColor: "#fff",
    borderRadius: 25,
  },
  orderRightCircle: {
    position: "absolute",
    right: -12.5,
    top: -3,
    height: 25,
    width: 25,
    backgroundColor: "#fff",
    borderRadius: 25,
  },

  // styling for order menu
  orderMenuBox: {
    marginHorizontal: 15,
    // borderTopWidth: 1,
    // paddingTop: 10,
  },
  singleOrderMenuBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  orderMenuImgBox: {
    height: 50,
    width: 50,
  },
  orderMenuImg: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  orderMenuDetailsAndActionsBox: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  orderMenuDesBox: {
    marginLeft: 20,
  },
  orderMenuName: {},
  orderMenuNameText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  orderMenuPrice: {},
  orderMenuPriceText: {
    fontSize: 15,
  },
  orderMenuQty: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  orderMenuQtyActionBox: {
    backgroundColor: "#f00",
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  orderMenuQtyActionText: { fontSize: 18, fontWeight: "bold" },
  orderMenuQtyTextBox: { marginHorizontal: 20 },
  orderMenuQtyText: {},
  orderMenuActionBox: {},

  // styling for table selection

  orderSelectTableBox: { margin: 10, borderBottomWidth: 1, paddingBottom: 20 },
  orderSelectTable: {
    textAlign: "center",
    paddingVertical: 5,
    borderRadius: 30,
    backgroundColor: "#0a0",
  },
  orderSelectTableText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  // styles for HomeSection
  homeSection: {
    position: "absolute",
    top: 70,
    left: 20,
    bottom: 0,
    right: 370,
    backgroundColor: "#f2f2f2",
  },
  //catagories buttons styling
  category: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  categoryButtons: {
    borderRadius: 20,
    margin: 10,
    backgroundColor: "#777",
    fontWeight: "bold",
    paddingVertical: 7,
    paddingHorizontal: 15,
    fontSize: 16,
  },

  selectedCategoryButtons: {
    backgroundColor: "#0f0",
    borderColor: "#0f0",
    borderWidth: 2,
  },

  products: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
  },
  product: {
    flex: 1, // Use flex: 1 to distribute width evenly
    aspectRatio: "auto", // To maintain a square aspect ratio
    // alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    marginVertical: 15,
    marginHorizontal: 15,
    backgroundColor: "white", // Example background color
    shadowColor: "rgba(d, d, d, 0.5)", // Shadow color and opacity
    shadowOffset: {
      width: 5, // Horizontal offset
      height: 5, // Vertical offset
    },
    shadowRadius: 5,
    elevation: 2,
    borderRadius: 10,
  },
  productImage: {
    width: "90%",
  },
  productDetail: {},
  productDetail: {},

  productName: {
    fontWeight: "bold",
    fontSize: 18,
  },

  productDetailItem: {
    flex: 1,
    margin: 5,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  productCartButton: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    borderRadius: 15,
  },
  colorWhite: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
});

export default waiterStyles;
