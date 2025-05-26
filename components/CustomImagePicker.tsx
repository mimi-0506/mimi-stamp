import { isImageFormat } from "@/utils/formatUtils";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Dispatch, SetStateAction, useState } from "react";
import { Pressable, Text, View } from "react-native";
import tw from "twrnc";

const ImageSelector = ({ BG }: { BG: string }) => {
  return isImageFormat(BG) ? (
    <Image source={{ uri: BG }} style={tw`w-32 h-32 rounded-lg`} />
  ) : (
    <Text style={tw`text-center text-gray-400`}>이미지를 선택하세요</Text>
  );
};

export default function CustomImagePicker() {
  const [fillBG, setFillBG] = useState<string>("");
  const [emptyBG, setEmptyBG] = useState<string>("");

  const selectImage = async (setBG: Dispatch<SetStateAction<string>>) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) console.log(result.assets[0].uri);

    if (result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0].uri;
      setBG(selectedImage);
    }
  };

  return (
    <View style={tw`mb-4`}>
      <Text style={tw`mb-2 font-medium`}>도장 이미지</Text>

      <View>
        <Text>도장 찍기 전</Text>
        <Pressable
          onPress={() => {
            selectImage(setEmptyBG);
          }}
        >
          <ImageSelector BG={emptyBG} />
        </Pressable>
      </View>

      <View>
        <Text>도장 찍은 후</Text>
        <Pressable
          onPress={() => {
            selectImage(setFillBG);
          }}
        >
          <ImageSelector BG={fillBG} />
        </Pressable>
      </View>
    </View>
  );
}
