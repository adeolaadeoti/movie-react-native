import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Video as ExpoVideo, ResizeMode } from "expo-av";
import { globalStyles } from "../styles/global-styles.config";
import * as ScreenOrientation from "expo-screen-orientation";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Loader from "../components/loader";

const VideoPlayer = ({ route }) => {
  const { src } = route.params;
  const navigation = useNavigation();

  async function changeScreenOrientation(type: string) {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock[type]);
  }

  React.useEffect(() => {
    changeScreenOrientation("LANDSCAPE");
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => {
          changeScreenOrientation("PORTRAIT_UP");
          navigation.navigate("Curations" as never);
        }}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <ExpoVideo
        usePoster
        PosterComponent={() => (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader />
          </View>
        )}
        style={styles.video}
        source={{
          uri: src,
        }}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        shouldPlay
      />
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.colors.black,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  video: {
    width: "100%",
    height: "90%",
  },
  back: {
    position: "absolute",
    top: 30,
    left: 30,
    zIndex: 1,
  },
});
