import { useEffect } from "react";
import { Dimensions, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import tw from "twrnc";

const { width, height } = Dimensions.get("window");

export default function Loading() {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });

    return () => {};
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      pointerEvents={"auto"}
      style={[
        tw`absolute z-20 justify-center items-center bg-black bg-opacity-50`,
        { width, height },
        animatedStyle,
      ]}
    >
      <View>
        <Text style={tw`text-lg font-bold mb-3 text-center text-white`}>
          로딩 중...
        </Text>
      </View>
    </Animated.View>
  );
}
