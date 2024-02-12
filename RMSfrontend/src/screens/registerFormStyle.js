import { StyleSheet, Platform } from "react-native";

const isWeb = Platform.OS === "web";

const registrFormStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  positioner: {
    height: isWeb ? "90%" : "99%",
    width: isWeb ? 450 : "100%",
    display: "flex",
    alignItems: "center",
  },
  formHeader: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    margin: 10,
  },
  formHeaderTitle: {
    fontWeight: "bold",
    fontSize: 25,
    paddingBottom: 10,
    borderBottomWidth: 3,
  },
  formBox: {
    flex: 1,
    paddingHorizontal: isWeb ? 30 : 10,
    paddingVertical: isWeb ? 30 : 20,
    marginHorizontal: isWeb ? 0 : 5,
    backgroundColor: "rgba(200, 200, 200, 0.8)",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fff",
    width: "100%",
    height: "auto",
  },
  fieldName: {
    color: "#444",
    fontWeight: 22,
    fontWeight: "bold",
  },
  requiredField: {
    fontWeight: 22,
    color: "#f00",
    fontWeight: "bold",
  },
  inputfield: {
    borderBottomWidth: 1,
    borderColor: "#666",
    marginHorizontal: isWeb ? 15 : 10,
    paddingVertical: isWeb ? 8 : 6,
    paddingHorizontal: 3,
    backgroundColor: "transparent",
    marginTop: 20,
    marginBottom: 30,
    fontSize: 18,
  },

  registerButton: {
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
  registerButtonText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 22,
  },

  alreadyAccount: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default registrFormStyles;
