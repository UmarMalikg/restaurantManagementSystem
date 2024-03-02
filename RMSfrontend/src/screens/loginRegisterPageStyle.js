import { StyleSheet } from "react-native";

import { isWeb } from "../constants/stylesConstants";
import defaultStyles from "../defaultStyles";

const loginRegisterFormStyles = StyleSheet.create({
  // both
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  formHeader: [defaultStyles.rowCenteredFlex, defaultStyles.mrg10],
  quote: [defaultStyles.rowCenteredFlex, defaultStyles.mrgB30],
  TitleText: {
    fontWeight: "bold",
    fontSize: 25,
    paddingBottom: 10,
    borderBottomWidth: 3,
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
  loginRegisterButton: {
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
  loginRegisterButtonText: {
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

  //   login
  loginBox: {
    width: isWeb ? 400 : "100%",
    height: isWeb ? 500 : "100%",
    padding: isWeb ? 15 : 10,
    backgroundColor: "rgba(200, 200, 200, 0.8)",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fff",
  },

  //   register
  positioner: {
    height: isWeb ? 500 : "99%",
    width: isWeb ? 400 : "100%",
    display: "flex",
    alignItems: "center",
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
  //   login

  // login

  //   remainning from the register
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
});

export default loginRegisterFormStyles;
