import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { globalStyles } from "../styles/global-styles.config";
import responsiveSize from "../utils/responsive-size";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";

const CurationThumbnail = ({ id, title, image, video, inViewVideoId }) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const [isAddedToList, setIsAddedToList] = React.useState(false);
  const shouldPlay = inViewVideoId === id;
  return (
    <View style={{ flex: 1 }}>
      <Video
        style={styles.video}
        usePoster
        posterSource={image}
        source={{
          uri: video,
        }}
        posterStyle={styles.image}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay={shouldPlay}
      />
      <View style={styles.description}>
        <View style={styles.left}>
          <Image source={title} style={styles.title} />
        </View>
        <View style={styles.right}>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => setIsLiked(!isLiked)}
          >
            <AntDesign
              name="heart"
              size={18}
              color={isLiked ? "red" : "white"}
            />
            <Text style={styles.text}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => setIsAddedToList(!isAddedToList)}
          >
            {!isAddedToList && <Entypo name="plus" size={24} color="white" />}
            {isAddedToList && (
              <FontAwesome name="check" size={20} color="white" />
            )}
            <Text style={styles.text}>My list</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Entypo name="controller-play" size={24} color="white" />
            <Text style={styles.text}>Play</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CurationThumbnail;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    backgroundColor: globalStyles.colors.black,
    resizeMode: "contain",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    justifyContent: "flex-end",
  },
  video: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  description: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    paddingHorizontal: responsiveSize(35),
    marginBottom: responsiveSize(140),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {},
  title: {
    height: responsiveSize(200),
    width: responsiveSize(190),
    resizeMode: "contain",
  },
  right: {
    justifyContent: "space-between",
  },
  text: {
    color: globalStyles.colors.white,
    fontSize: responsiveSize(14),
    marginTop: responsiveSize(5),
  },
});
