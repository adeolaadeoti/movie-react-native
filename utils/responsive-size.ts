import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

export default function responsiveSize(size: number) {
  return (screenWidth / 50) * ((size / 100) * 10);
}
