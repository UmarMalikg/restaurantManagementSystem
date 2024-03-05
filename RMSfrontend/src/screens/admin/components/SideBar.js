import { View } from "react-native";
import React from "react";
import adminStyles from "../../styles/adminStyles";
import SideBarLinks from "./elements/SideBarLinks";

const SideBar = () => {
  return (
    <View style={adminStyles.sideBar}>
      <SideBarLinks text={`Dashboard`} link={`Dashboard`} />
      <SideBarLinks text={`Employees`} link={`Employees`} />
      <SideBarLinks text={`Products`} link={`Products`} />
      <SideBarLinks text={`Orders List`} link={`OrderLists`} />
      <SideBarLinks text={`Categories`} link={`Categories`} />
      <SideBarLinks text={`Tables`} link={`Tables`} />
    </View>
  );
};

export default SideBar;
