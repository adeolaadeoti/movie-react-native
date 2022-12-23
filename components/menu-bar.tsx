import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import responsiveSize from "../utils/responsive-size";
import { globalStyles } from "../styles/global-styles.config";
import { Entypo, Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

interface MenuBarProps {
  home?: boolean;
}

const MenuBar: React.FC<MenuBarProps> = ({ home }) => {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={["transparent", "rgba(0,0,0,0.5)", "rgba(0,0,0,1)"]}
      style={{
        ...styles.container,
      }}
    >
      <View
        style={{
          ...styles.border,
          ...(!home && {
            borderTopWidth: 0.5,
            borderTopColor: "rgba(217, 217, 217, 0.3)",
          }),
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Home" as never)}
          style={{
            ...styles.nav,
            backgroundColor:
              route.name === "Home" && "rgba(217, 217, 217, 0.1)",
          }}
        >
          <Entypo
            name="home"
            size={responsiveSize(30)}
            color={globalStyles.colors.white}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Curations" as never)}
          style={{
            ...styles.nav,
            backgroundColor:
              route.name === "Curations" && "rgba(217, 217, 217, 0.1)",
          }}
        >
          <Ionicons
            name="ios-folder-open"
            size={responsiveSize(30)}
            color={globalStyles.colors.white}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.nav,
            backgroundColor:
              route.name === "Search" && "rgba(217, 217, 217, 0.1)",
          }}
        >
          <FontAwesome
            name="search"
            size={responsiveSize(30)}
            color={globalStyles.colors.white}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default MenuBar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  border: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: responsiveSize(20),
    paddingHorizontal: responsiveSize(50),
    paddingBottom: responsiveSize(25),
  },
  nav: {
    padding: responsiveSize(15),
    borderRadius: responsiveSize(100),
    alignItems: "center",
    justifyContent: "center",
  },
});
