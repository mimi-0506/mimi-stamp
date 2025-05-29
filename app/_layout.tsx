import Background from "@/components/Background";
import StampStartModal from "@/components/StampStartModal";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useLayoutEffect } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
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
      <Background />
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: "transparent" }}
      >
        <SafeAreaProvider>
          <SafeAreaView
            style={{
              flex: 1,
              paddingTop: Platform.OS === "android" ? 25 : 0,
              backgroundColor: "transparent",
            }}
          >
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "transparent" },
              }}
            />
            <StampStartModal />
          </SafeAreaView>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </>
  );
}
