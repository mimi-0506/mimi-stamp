import StampStartModal from "@/components/StampStartModal";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useLayoutEffect } from "react";
import "react-native-reanimated";
import "../global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PyeojinGothic: require("../assets/fonts/default/PyeojinGothic-Medium.ttf"),
  });

  useLayoutEffect(() => {
    if (fontsLoaded) {
      // SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // 로딩 중
  }

  return (
    <>
      <Stack />
      <StampStartModal />
    </>
  );
}
