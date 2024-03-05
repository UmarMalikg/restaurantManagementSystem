import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import React from "react";
import adminStyles from "../styles/adminStyles";

const Categories = () => {
  return (
    <View style={adminStyles.theScreen}>
      <View style={adminStyles.dataViewerHeader}>
        <View>
          <Text style={adminStyles.dataTitle}>All Categories</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("Add Category")}
          style={adminStyles.goToModelButton}
        >
          <Text style={adminStyles.goToModelButtonText}>Add Categories</Text>
        </Pressable>
      </View>
      <View>
        <TextInput
          style={adminStyles.dataSearcher}
          placeholder="Search..."
          onChangeText={(text) => setSearchText(text)}
        ></TextInput>
      </View>
      <ScrollView>
        <View>
          <View>
            <View>name</View>
            <View>
              <View>110</View>
              <View>actions</View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Categories;
