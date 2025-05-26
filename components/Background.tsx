import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "twrnc";

export default function Background() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={tw`absolute top-0 left-0 right-0 bottom-0 bg-white z-[-1]`}
      pointerEvents="none"
    >
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
