import { Dimensions } from "react-native";

export const { width } = Dimensions.get("window");
export const stampSizeSmall = Math.floor(width / 7);
export const stampSizeBig = Math.floor(width / 5);
