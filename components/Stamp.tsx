import { stampSizeBig, stampSizeSmall } from "@/constants/widths";
import { isImageFormat, isValidColor } from "@/utils/formatUtils";
import { Image } from "expo-image";
import { memo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import tw from "twrnc";

export default memo(function Stamp({
  filled,
  fillBG,
  emptyBG,
  onPress,
  handleImageComplete,
  size,
  numberView,
  index,
}: {
  filled: boolean;
  fillBG: string;
  emptyBG: string;
  onPress: () => void;
  handleImageComplete: () => void;
  size: boolean;
  numberView: boolean;
  index: number;
}) {
  const uri = filled ? fillBG : emptyBG;
  const [hasError, setHasError] = useState(false);

  const dynamicSize = { width: size ? stampSizeBig : stampSizeSmall };

  const baseStyle = [
    tw`aspect-square justify-center items-center `,
    dynamicSize,
  ];

  return (
    <Pressable onPress={onPress} style={tw`m-0.5`}>
      <View style={tw`relative`}>
        {isValidColor(uri) ? (
          <View
            style={[
              baseStyle,
              tw`border border-gray-300`,
              { backgroundColor: uri },
            ]}
            onLayout={handleImageComplete}
          />
        ) : isImageFormat(uri) ? (
          hasError ? (
            <View
              style={[
                baseStyle,
                { backgroundColor: filled ? "rgba(0,0,0,0.5)" : "white" },
              ]}
            />
          ) : (
            <Image
              source={{ uri }}
              style={baseStyle}
              contentFit="cover"
              onError={() => setHasError(true)}
              onLoadEnd={handleImageComplete}
              cachePolicy="disk"
              transition={100}
            />
          )
        ) : (
          <View style={[baseStyle, tw`bg-gray-300`]} />
        )}

        {numberView && (
          <View
            style={[
              tw`absolute justify-center items-center`,
              {
                width: size ? stampSizeBig : stampSizeSmall,
                height: size ? stampSizeBig : stampSizeSmall,
                top: 0,
                left: 0,
              },
            ]}
          >
            <Text style={tw`text-gray-400`}>{index}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
});
