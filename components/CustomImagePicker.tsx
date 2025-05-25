import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import {
  ImagePickerResponse,
  launchImageLibrary,
  MediaType,
} from "react-native-image-picker";
import tw from "twrnc";

const ImagePreview = ({
  uri,
  onPress,
  title,
}: {
  uri: string;
  onPress: () => void;
  title: string;
}) => (
  <View>
    <Text style={tw`mb-1 text-sm text-gray-600`}>{title}</Text>
    <Pressable
      onPress={onPress}
      style={tw`border border-gray-300 rounded p-3 items-center`}
    >
      {uri ? (
        <View style={tw`items-center`}>
          <Image
            source={{ uri }}
            style={tw`w-20 h-20 rounded mb-2`}
            resizeMode="cover"
          />
          <Text style={tw`text-xs text-gray-500`}>탭하여 변경</Text>
        </View>
      ) : (
        <View style={tw`items-center py-4`}>
          <Text style={tw`text-gray-400 text-4xl mb-2`}>📷</Text>
          <Text style={tw`text-gray-500`}>이미지 선택</Text>
        </View>
      )}
    </Pressable>
  </View>
);

export default function CustomImagePicker() {
  const [fillBG, setFillBG] = useState<string>("");
  const [emptyBG, setEmptyBG] = useState<string>("");

  const selectImage = (setter: (uri: string) => void, title: string) => {
    const options = {
      mediaType: "photo" as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorMessage) return;

      if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        if (imageUri) setter(imageUri);
      }
    });
  };

  return (
    <View style={tw`mb-4`}>
      <Text style={tw`mb-2 font-medium`}>도장 이미지</Text>

      <View style={tw`space-y-3`}>
        <ImagePreview
          uri={fillBG}
          onPress={() => selectImage(setFillBG, "채워진 도장 이미지")}
          title="채워진 도장 이미지"
        />

        <ImagePreview
          uri={emptyBG}
          onPress={() => selectImage(setEmptyBG, "비어있는 도장 이미지")}
          title="비어있는 도장 이미지"
        />
      </View>

      <Text style={tw`text-xs text-gray-500 mt-2`}>
        💡 팁: 도장이 찍힌 상태와 빈 상태의 이미지를 각각 선택해주세요
      </Text>
    </View>
  );
}
