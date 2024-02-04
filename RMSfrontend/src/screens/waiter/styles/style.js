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
  tablesDetail: {
    position: "absolute",
    top: 70,
    bottom: 0,
    right: 0,
    width: 250,
    backgroundColor: "#777",
  },

  borderDetailText: {
    borderWidth: 2,
    borderColor: "black",
    width: "100%",
    borderRadius: 20,
    margin: 3,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },

  // styles for HomeSection
  homeSection: {
    position: "absolute",
    top: 70,
    left: 200,
    bottom: 0,
    right: 250,
    backgroundColor: "#ddd",
  },
  //catagories buttons styling
  category: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
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
    left: 20,
    right: 20,
    bottom: 0,
  },
  product: {
    flex: 1, // Use flex: 1 to distribute width evenly
    aspectRatio: 0.85, // To maintain a square aspect ratio
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    marginVertical: 60,
    marginHorizontal: 30,
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
    position: "absolute",
    top: -60,
    flex: 1,
    height: 120,
    width: 120,
    borderRadius: 500,
  },
  productDetail: {
    position: "absolute",
    top: 85,
    left: 0,
    flex: 1,
    justifyContent: "flex-start",
  },
  productDetail: {
    position: "absolute",
    top: 85,
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: "flex-start",
  },

  productName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  productDetailItem: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },

  productCartButton: {
    position: "absolute",
    bottom: 2,
    left: 10,
    right: 10,
    padding: 15,
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
