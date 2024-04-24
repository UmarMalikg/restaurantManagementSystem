import { View, Image } from "react-native";
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
import defaultStyles from "../../../defaultStyles";

const SideBar = () => {
  return (
    <View style={adminStyles.sideBar}>
      <SideBarLinks
        text={`Dashboard`}
        link={`Dashboard`}
        icon={<AntDesign name="dashboard" size={24} color="#fff" />}
      />
      <SideBarLinks
        text={`Employees`}
        link={`Employees`}
        icon={<FontAwesome6 name="users" size={24} color="#fff" />}
      />
      <SideBarLinks
        text={`Products`}
        link={`Products`}
        icon={<MaterialIcons name="fastfood" size={24} color="#fff" />}
      />
      <SideBarLinks
        text={`Orders List`}
        link={`OrderLists`}
        icon={<FontAwesome name="list-alt" size={24} color="#fff" />}
      />
      <SideBarLinks
        text={`Categories`}
        link={`Categories`}
        icon={<MaterialIcons name="category" size={24} color="#fff" />}
      />
      <SideBarLinks
        text={`Tables`}
        link={`Tables`}
        icon={
          <MaterialCommunityIcons name="table-chair" size={24} color="#fff" />
        }
      />
    </View>
  );
};

export default SideBar;
