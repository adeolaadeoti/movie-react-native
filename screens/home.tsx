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
  Platform,
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
    video:
      "https://imdb-video.media-imdb.com/vi531759385/1401497881123-xszl4z-1427841074439.mp4?Expires=1671882426&Signature=oFLCYjImceTMBplp2mBaM6wqau9T98m~GNEz3psZYU8wRfSp~lP47dUgOsE~DTkHQnDv-dMrQKUHnhtKnfPFYAtzSPGxDbW1TFmwUQiAcNujc-qN7NSaUWBBErz4cmI2yEwCI7r0gHixGIBjr6r4I3OmbBa0hoyqlcfNoLSiqdl6225i4MBFUdpTdr8lsFPYd6dAgqPQ9l23uZKD9eL4vbjP-PoLgDh6CA-icyw59Voq5DdXsHFYHWSxjtaZGrAZ~pllwZ7aP-iT-iR5uXE-s2tCWXYLCr6q-Y-DJ3EjYB8D1xAzXOe-gOGcr15CTsvVWONuuUohqaaRp4jdaz1GVA__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA",
  },
  {
    id: 2,
    image: require("../assets/images/video-thumbnail-2.png"),
    title: require("../assets/images/video-title-2.png"),
    video:
      "https://imdb-video.media-imdb.com/vi853656345/1434659607842-pgv4ql-1636689437677.mp4?Expires=1671883605&Signature=gfGNes~cyA~dTRf79aUn48TWEmcyLxBfy3~a287GLlWJtvzbeN0FvO9tgh7o4Kl9gf76E0QJxppZ4LryphvO8pWzayxzVx78tNoEXaplCDWyFbuksS9np6SAuzU656xEHdtufyg35M-VmxMh~2wUdFJ0oshXStbbmoCC1s37wlipYfhaaK8rYUOpUe4Ffjb289RxLyAKWLFJyELbDDu18Y-RoODafvuPMSHexwIIb~KWE2mvndVJ6wq3Sul~PngkU0JldSDwt6NPP9usuXIe4DmVEgDBdeUbv6-tN-TK7e~gLSAfz-TccTX2fqBTdVpOx22G91j0M5EXrSsdM8K0iw__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA",
  },
  {
    id: 3,
    image: require("../assets/images/video-thumbnail-3.png"),
    title: require("../assets/images/video-title-3.png"),
    video:
      "https://imdb-video.media-imdb.com/vi3565864217/1434659607842-pgv4ql-1669124569701.mp4?Expires=1671882845&Signature=H53kso661HiYLVaDY12fLqKNzTteGhEsTyXIe~Tp-P1XCSxdpZiwQtKkXe-7MRA7QrNYfRdXrZ65VGHEEOjWlRhEB0UG7iuw9qialnlmkelcf77bgIKOscJBvY9wSV9tTol19C7O7IQ9y8IxkwZGo6AeL9sk1DpnMSwzkH9vpZx2QWeyriaw7Dw6UP~x7mCOlz2uiCorXcOh9q8bB0X2XUfb5mViurPJ37Ol20mxB-zRpNXSmOVoeWdU6NQL9jw3l4Yo7cq214qPbPvI3iQE8mOcVxlbKei4fG8bJOilvy1GaHMka7ou0lV5II1qd3btTK-Lzg09tQOhijkZVGroYQ__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA",
  },
  {
    id: 4,
    image: require("../assets/images/video-thumbnail-4.png"),
    title: require("../assets/images/video-title-4.png"),
    video:
      "https://imdb-video.media-imdb.com/vi126265113/1434659607842-pgv4ql-1616202383426.mp4?Expires=1671883699&Signature=g~byP1Dx5W54~HJca5cq12z0NRg76TTCdlVfEDMTXP3d0A94FF8FUi7euHliB37hPWr8WfYFYkAO7h1~e~ai2MaWumzgRaw0-j0-ILEwpzKs~9WlNQNAgKXLMEx~SR6MEaVF~-mSw3cmTpeTibJFoYsrNx0Vki9I4tvPEyfbcgmJ0EfDuR67ziCmXXuLkTp6TMJuraeQvfsDysluExP3ynYoXezYaH8SZNFG~zYYXlvfVV~Db6oHQwrYfrU2aDD05Y~fxCd~5zMn1-x7TVGt18ne5nUeilyRjVfm6VgPH98YFXPfc3AaqbAbHrX7v5JjEGWTk5iPMsg0WRmAvN8RLQ__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA",
  },
];

const trendingVideosData = [
  {
    id: 1,
    image: require("../assets/images/video-thumbnail-5.png"),
    title: require("../assets/images/video-title-5.png"),
    video:
      "https://imdb-video.media-imdb.com/vi531759385/1401497881123-xszl4z-1427841074439.mp4?Expires=1671882426&Signature=oFLCYjImceTMBplp2mBaM6wqau9T98m~GNEz3psZYU8wRfSp~lP47dUgOsE~DTkHQnDv-dMrQKUHnhtKnfPFYAtzSPGxDbW1TFmwUQiAcNujc-qN7NSaUWBBErz4cmI2yEwCI7r0gHixGIBjr6r4I3OmbBa0hoyqlcfNoLSiqdl6225i4MBFUdpTdr8lsFPYd6dAgqPQ9l23uZKD9eL4vbjP-PoLgDh6CA-icyw59Voq5DdXsHFYHWSxjtaZGrAZ~pllwZ7aP-iT-iR5uXE-s2tCWXYLCr6q-Y-DJ3EjYB8D1xAzXOe-gOGcr15CTsvVWONuuUohqaaRp4jdaz1GVA__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA",
  },
  {
    id: 2,
    image: require("../assets/images/video-thumbnail-6.png"),
    title: require("../assets/images/video-title-6.png"),
    video:
      "https://imdb-video.media-imdb.com/vi3565864217/1434659607842-pgv4ql-1669124569701.mp4?Expires=1671882845&Signature=H53kso661HiYLVaDY12fLqKNzTteGhEsTyXIe~Tp-P1XCSxdpZiwQtKkXe-7MRA7QrNYfRdXrZ65VGHEEOjWlRhEB0UG7iuw9qialnlmkelcf77bgIKOscJBvY9wSV9tTol19C7O7IQ9y8IxkwZGo6AeL9sk1DpnMSwzkH9vpZx2QWeyriaw7Dw6UP~x7mCOlz2uiCorXcOh9q8bB0X2XUfb5mViurPJ37Ol20mxB-zRpNXSmOVoeWdU6NQL9jw3l4Yo7cq214qPbPvI3iQE8mOcVxlbKei4fG8bJOilvy1GaHMka7ou0lV5II1qd3btTK-Lzg09tQOhijkZVGroYQ__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA",
  },
  {
    id: 3,
    image: require("../assets/images/video-thumbnail-7.png"),
    title: require("../assets/images/video-title-7.png"),
    video:
      "https://imdb-video.media-imdb.com/vi126265113/1434659607842-pgv4ql-1616202383426.mp4?Expires=1671883699&Signature=g~byP1Dx5W54~HJca5cq12z0NRg76TTCdlVfEDMTXP3d0A94FF8FUi7euHliB37hPWr8WfYFYkAO7h1~e~ai2MaWumzgRaw0-j0-ILEwpzKs~9WlNQNAgKXLMEx~SR6MEaVF~-mSw3cmTpeTibJFoYsrNx0Vki9I4tvPEyfbcgmJ0EfDuR67ziCmXXuLkTp6TMJuraeQvfsDysluExP3ynYoXezYaH8SZNFG~zYYXlvfVV~Db6oHQwrYfrU2aDD05Y~fxCd~5zMn1-x7TVGt18ne5nUeilyRjVfm6VgPH98YFXPfc3AaqbAbHrX7v5JjEGWTk5iPMsg0WRmAvN8RLQ__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA",
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
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" && responsiveSize(40),
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
