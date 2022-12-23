import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Video as ExpoVideo, ResizeMode } from "expo-av";
import { globalStyles } from "../styles/global-styles.config";
import * as ScreenOrientation from "expo-screen-orientation";
import { Ionicons, Entypo, Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Loader from "../components/loader";
import { getMinutesSecondsFromMilliseconds } from "../utils/getMinutesSecondsFromMilliseconds";

const VideoPlayer = ({ route }) => {
  const { src } = route.params;
  const navigation = useNavigation();
  const [status, setStatus] = React.useState<any>();
  const [videoStatus, setVideoStatus] = React.useState<any>({});
  const [showControls, setShowControls] = React.useState<boolean>(
    status?.isPlaying
  );
  const video = React.useRef(null);

  async function changeScreenOrientation(type: string) {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock[type]);
  }

  React.useEffect(() => {
    changeScreenOrientation("LANDSCAPE");
  }, []);

  React.useEffect(() => {
    status?.isPlaying && setShowControls(true);
    const timeout = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [status?.isPlaying]);

  React.useEffect(() => {
    setVideoStatus({
      duration: getMinutesSecondsFromMilliseconds(status?.durationMillis),
      position: getMinutesSecondsFromMilliseconds(status?.positionMillis),
      width: `${
        (Number(status?.positionMillis) / Number(status?.durationMillis)) * 90
      }%`,
    });
  }, [status]);

  return (
    <Pressable
      style={styles.container}
      onPress={() => setShowControls(!showControls)}
    >
      <TouchableOpacity
        style={styles.back}
        onPress={() => {
          changeScreenOrientation("PORTRAIT_UP");
          navigation.goBack();
        }}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <ExpoVideo
        ref={video}
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
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      {showControls && (
        <>
          <TouchableOpacity
            onPress={() =>
              status?.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
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
            {status?.isPlaying ? (
              <Foundation name="pause" size={50} color="white" />
            ) : (
              <Entypo name="controller-play" size={50} color="white" />
            )}
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              width: "90%",
              justifyContent: "space-between",
              position: "absolute",
              top: "80%",
              left: "5%",
              right: 0,
              bottom: 0,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white" }}>{videoStatus.position}</Text>
            <View
              style={{
                width: "90%",
                height: 3,
                backgroundColor: "white",
                opacity: 0.5,
              }}
            />
            <View
              style={{
                height: 3,
                backgroundColor: "white",
                width: videoStatus.width,
                position: "absolute",
                left: "5%",
              }}
            />
            <Text style={{ color: "white" }}>{videoStatus.duration}</Text>
          </View>
        </>
      )}
    </Pressable>
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
