import { StyleSheet, Platform } from "react-native";

const isWeb = Platform.OS === "web";

const registrFormStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#999",
    alignItems: "center",
  },
  positioner: {
    height: "90%",
    width: isWeb ? 450 : "100%",
    display: "flex",
    alignItems: "center",
  },
  formHeader: {
    fontWeight: "bold",
    fontSize: "30px",
    marginBottom: isWeb ? 20 : 10,
  },
  formBox: {
    flex: 1,
    paddingHorizontal: isWeb ? 30 : 10,
    paddingVertical: isWeb ? 30 : 20,
    marginHorizontal: isWeb ? 0 : 5,
    backgroundColor: "#fff",
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
    paddingVertical: isWeb ? 10 : 6,
    paddingHorizontal: isWeb ? 15 : 8,
    marginBottom: isWeb ? 15 : 8,
    fontWeight: 16,
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 8,
    outline: "none",
  },

  alreadyAccount: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default registrFormStyles;
