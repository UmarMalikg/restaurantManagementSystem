import { View } from "react-native";
import React from "react";
import adminStyles from "../styles/style";
import SideBarLinks from "./elements/SideBarLinks";

const SideBar = () => {
  return (
    <View style={adminStyles.sideBar}>
      <SideBarLinks
        text={`Dashboard`}
        link={`Dashboard`}
        icon={require(`../../../../assets/images/Admin/dummy.jpg`)}
      />
      <SideBarLinks text={`Employees`} link={`Employees`} />
      <SideBarLinks text={`Products`} link={`Products`} />
      <SideBarLinks text={`Order Lists`} link={`OrderLists`} />
    </View>
  );
};

export default SideBar;
