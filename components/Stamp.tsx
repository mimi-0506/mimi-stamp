import { isImageFormat, isValidColor } from "@/utils/formatUtils";
import { Image } from "expo-image";
import { memo, useState } from "react";
import { Pressable, View } from "react-native";
import tw from "twrnc";

export default memo(function Stamp({
  filled,
  fillBG,
  emptyBG,
  onPress,
  handleImageComplete,
}: {
  filled: boolean;
  fillBG: string;
  emptyBG: string;
  onPress: () => void;
  handleImageComplete: () => void;
}) {
  const uri = filled ? fillBG : emptyBG;
  const [hasError, setHasError] = useState(false);
  const sizeStyle = tw`w-10 h-10 rounded`;

  return (
    <Pressable onPress={onPress} style={tw`m-0.5`}>
      {isValidColor(uri) ? (
        <View style={[sizeStyle, { backgroundColor: uri }]} />
      ) : isImageFormat(uri) ? (
        hasError ? (
          <View
            style={[
              sizeStyle,
              { backgroundColor: filled ? "rgba(0,0,0,0.5)" : "white" },
            ]}
          />
        ) : (
          <Image
            source={{ uri }}
            style={sizeStyle}
            contentFit="cover"
            onError={() => setHasError(true)}
            onLoadEnd={handleImageComplete}
            cachePolicy="disk"
            transition={100}
          />
        )
      ) : (
        <View style={[sizeStyle, { backgroundColor: "gray" }]} />
      )}
    </Pressable>
  );
});
