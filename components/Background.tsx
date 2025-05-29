import { useBoardStore } from "@/stores/useBoardStore";
import { isImageFormat } from "@/utils/formatUtils";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "twrnc";

export default function Background() {
  const insets = useSafeAreaInsets();
  const nowBoardTitle = useBoardStore((state) => state.nowBoard);
  const nowBoard = useBoardStore((state) => state.boards[nowBoardTitle]);

  useEffect(() => {
    console.log("nowBoard:", nowBoard);
  }, []);

  return (
    <View
      style={tw`absolute top-0 left-0 right-0 bottom-0 bg-white z-[-1]`}
      pointerEvents="none"
    >
      {isImageFormat(nowBoard?.background) && (
        <Image
          style={tw`absolute top-0 left-0 right-0 bottom-0 w-full h-full`}
          source={nowBoard.background}
          contentFit="cover"
          cachePolicy="disk"
          transition={100}
        />
      )}
      <LinearGradient
        colors={["rgba(0,0,0,0.4)", "transparent"]}
        style={[tw`absolute top-0 left-0 right-0`, { height: insets.top }]}
        pointerEvents="none"
      />

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.5)"]}
        style={[
          tw`absolute left-0 right-0 bottom-0`,
          { height: insets.bottom },
        ]}
        pointerEvents="none"
      />
    </View>
  );
}
