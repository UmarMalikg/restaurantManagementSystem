import { View } from "react-native";
import React from "react";
import adminStyles from "../../styles/adminStyles";
import SideBarLinks from "./elements/SideBarLinks";
import {
  AntDesign,
  FontAwesome,
  FontAwesome6,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const SideBar = () => {
  return (
    <View style={adminStyles.sideBar}>
      <SideBarLinks
        text={`Dashboard`}
        link={`Dashboard`}
        icon={<AntDesign name="dashboard" size={24} color="black" />}
      />
      <SideBarLinks
        text={`Employees`}
        link={`Employees`}
        icon={<FontAwesome6 name="users" size={24} color="black" />}
      />
      <SideBarLinks
        text={`Products`}
        link={`Products`}
        icon={<MaterialIcons name="fastfood" size={24} color="black" />}
      />
      <SideBarLinks
        text={`Orders List`}
        link={`OrderLists`}
        icon={<FontAwesome name="list-alt" size={24} color="black" />}
      />
      <SideBarLinks
        text={`Categories`}
        link={`Categories`}
        icon={<MaterialIcons name="category" size={24} color="black" />}
      />
      <SideBarLinks
        text={`Tables`}
        link={`Tables`}
        icon={
          <MaterialCommunityIcons name="table-chair" size={24} color="black" />
        }
      />
    </View>
  );
};

export default SideBar;
