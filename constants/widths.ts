import { Dimensions } from "react-native";

export const { width } = Dimensions.get("window");
const stampSize = Math.floor(width / 7);
export const sizeStyle = {
  width: stampSize,
  height: stampSize,
};
