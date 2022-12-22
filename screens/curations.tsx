import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import CurationThumbnail from "../components/curation-thumbnail";
import MenuBar from "../components/menu-bar";
import { StatusBar } from "expo-status-bar";

const data = [
  {
    id: "1",
    title: require("../assets/images/curation-title-1.png"),
    image: require("../assets/images/curation-thumbnail-1.png"),
  },
  {
    id: "2",
    title: require("../assets/images/curation-title-2.png"),
    image: require("../assets/images/curation-thumbnail-2.png"),
  },
  {
    id: "3",
    title: require("../assets/images/curation-title-3.png"),
    image: require("../assets/images/curation-thumbnail-3.png"),
  },
];

const Curations = () => {
  return (
    <View>
      <StatusBar style="light" />
      <FlatList
        pagingEnabled
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={40}
        contentContainerStyle={styles.thumbnails}
        data={data}
        renderItem={({ item }) => <CurationThumbnail {...item} />}
        keyExtractor={(item) => item.id}
      />
      <MenuBar />
    </View>
  );
};

export default Curations;

const styles = StyleSheet.create({
  thumbnails: {},
});
