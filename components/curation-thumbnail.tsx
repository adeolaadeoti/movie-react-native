import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import { globalStyles } from "../styles/global-styles.config";
import responsiveSize from "../utils/responsive-size";

const CurationThumbnail = ({ title, image }) => {
  return (
    <ImageBackground source={image} style={styles.image}>
      <View style={styles.description}>
        <View style={styles.left}>
          <Image source={title} style={styles.title} />
        </View>
        <View style={styles.right}></View>
      </View>
    </ImageBackground>
  );
};

export default CurationThumbnail;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    backgroundColor: globalStyles.colors.black,
    resizeMode: "cover",
    height: Dimensions.get("window").height,
    justifyContent: "flex-end",
  },
  description: {
    paddingHorizontal: responsiveSize(50),
    marginBottom: responsiveSize(140),
  },
  left: {},
  title: {
    height: responsiveSize(200),
    width: responsiveSize(190),
    resizeMode: "contain",
  },
  right: {},
});
