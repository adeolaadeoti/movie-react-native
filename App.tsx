import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/home";
import { useFonts } from "expo-font";
import Curations from "./screens/curations";
import VideoPlayer from "./screens/video-player";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "unbounded-bold": require("./assets/fonts/unbounded-bold.ttf"),
    "unbounded-light": require("./assets/fonts/unbounded-light.ttf"),
    worksans: require("./assets/fonts/workSans-semiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Curations"
          component={Curations}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Video"
          component={VideoPlayer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// To-DO:
// 1. fade out the description on scroll
// 2. animate title
// 3. animate home screen
