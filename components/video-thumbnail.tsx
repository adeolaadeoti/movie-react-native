import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import responsiveSize from "../utils/responsive-size";
import { globalStyles } from "../styles/global-styles.config";
import { useNavigation } from "@react-navigation/native";

export default function VideoThumbnail({
  image,
  title,
  video,
}: {
  image: any;
  title: any;
  video: string;
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.description}>
          <Image source={title} style={styles.title} />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Video" as never, { src: video } as never)
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>Watch Now</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: globalStyles.colors.white,
    borderRadius: responsiveSize(35),
    borderWidth: 1.5,
    height: Dimensions.get("window").height / 1.5,
    width: Dimensions.get("window").width - responsiveSize(50 * 2),
    marginLeft: responsiveSize(50),
    padding: responsiveSize(7),
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    borderRadius: responsiveSize(25),
    overflow: "hidden",
  },
  description: {
    position: "absolute",
    bottom: "8%",
    alignItems: "center",
    left: "25%",
  },
  title: {
    width: "100%",
    height: responsiveSize(123),
    resizeMode: "contain",
  },
  button: {
    marginTop: responsiveSize(15),
    borderRadius: responsiveSize(25),
    alignItems: "center",
    backgroundColor: "#202021",
    padding: responsiveSize(20),
    paddingHorizontal: responsiveSize(40),
  },
  buttonText: {
    color: globalStyles.colors.white,
    fontSize: responsiveSize(20),
    fontFamily: "worksans",
  },
});
