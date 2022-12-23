import { StyleSheet, View } from "react-native";
import React from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const Loader = () => {
  const rotate = useSharedValue("0deg");
  rotate.value = withRepeat(
    withTiming("360deg", { duration: 2000, easing: Easing.ease }),
    -1
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: rotate.value }],
  }));

  return (
    <View>
      <Animated.View style={[styles.spinner, animatedStyle]}></Animated.View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  spinner: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 3,
    borderTopColor: "gray",
    borderTopWidth: 3,
  },
});
