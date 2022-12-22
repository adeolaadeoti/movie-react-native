import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../styles/global-styles.config";
import responsiveSize from "../utils/responsive-size";
import VideoThumbnail from "../components/video-thumbnail";
import MenuBar from "../components/menu-bar";

enum Category {
  FOR_YOU,
  TRENDING,
}

const forYouVideosData = [
  {
    id: 1,
    image: require("../assets/images/video-thumbnail-1.png"),
    title: require("../assets/images/video-title-1.png"),
  },
  {
    id: 2,
    image: require("../assets/images/video-thumbnail-2.png"),
    title: require("../assets/images/video-title-2.png"),
  },
  {
    id: 3,
    image: require("../assets/images/video-thumbnail-3.png"),
    title: require("../assets/images/video-title-3.png"),
  },
  {
    id: 4,
    image: require("../assets/images/video-thumbnail-4.png"),
    title: require("../assets/images/video-title-4.png"),
  },
];

const trendingVideosData = [
  {
    id: 1,
    image: require("../assets/images/video-thumbnail-5.png"),
    title: require("../assets/images/video-title-5.png"),
  },
  {
    id: 2,
    image: require("../assets/images/video-thumbnail-6.png"),
    title: require("../assets/images/video-title-6.png"),
  },
  {
    id: 3,
    image: require("../assets/images/video-thumbnail-7.png"),
    title: require("../assets/images/video-title-7.png"),
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = React.useState(Category.FOR_YOU);
  const [data, setData] = React.useState(forYouVideosData);
  React.useEffect(() => {
    if (activeCategory === Category.FOR_YOU) {
      setData(forYouVideosData);
      return;
    }
    setData(trendingVideosData);
  }, [activeCategory]);

  return (
    <ImageBackground
      source={require("../assets/images/gradient.png")}
      style={styles.image}
    >
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        <View style={styles.top}>
          <Image
            source={require("../assets/images/avatar.png")}
            style={styles.avatar}
          />
          <Ionicons
            name="md-notifications-outline"
            size={responsiveSize(35)}
            color={globalStyles.colors.white}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: responsiveSize(35),
            marginTop: responsiveSize(25),
          }}
        >
          <TouchableOpacity onPress={() => setActiveCategory(Category.FOR_YOU)}>
            <Text
              style={[
                styles.title,
                activeCategory === Category.FOR_YOU && {
                  fontFamily: "unbounded-bold",
                },
              ]}
            >
              for you
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveCategory(Category.TRENDING)}
          >
            <Text
              style={[
                styles.title,
                activeCategory === Category.TRENDING && {
                  fontFamily: "unbounded-bold",
                },
              ]}
            >
              trending
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={40}
          contentContainerStyle={{
            ...styles.thumbnails,
            width: data.length * Dimensions.get("window").width,
          }}
          data={data}
          renderItem={({ item }) => <VideoThumbnail {...item} />}
          keyExtractor={(item) => String(item.id)}
        />
      </SafeAreaView>
      <MenuBar home />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
  },
  top: {
    marginTop: responsiveSize(15),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: responsiveSize(35),
  },
  avatar: {
    width: responsiveSize(50),
    height: responsiveSize(50),
    borderRadius: 50,
  },
  title: {
    fontFamily: "unbounded-light",
    color: globalStyles.colors.white,
    fontSize: responsiveSize(45),
    letterSpacing: responsiveSize(-1.5),
    marginBottom: responsiveSize(25),
  },
  thumbnails: {
    justifyContent: "space-between",
    paddingRight: responsiveSize(50),
  },
});
