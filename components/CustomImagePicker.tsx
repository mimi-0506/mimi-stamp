import { isImageFormat } from "@/utils/formatUtils";
import { selectImage } from "@/utils/imageUtils";
import { Image } from "expo-image";

import { Dispatch, SetStateAction } from "react";
import { Pressable, Text, View } from "react-native";
import tw from "twrnc";

const ImageSelector = ({ BG }: { BG: string }) => {
  return isImageFormat(BG) ? (
    <Image source={{ uri: BG }} style={tw`w-20 h-20 rounded-lg`} />
  ) : (
    <View
      style={tw`w-20 h-20 bg-gray-200 rounded-lg justify-center items-center`}
    >
      <Text style={tw`text-center text-gray-400`}>이미지를 선택하세요</Text>
    </View>
  );
};

export default function CustomImagePicker({
  fillBG,
  setFillBG,
  emptyBG,
  setEmptyBG,
}: {
  fillBG: string;
  setFillBG: Dispatch<SetStateAction<string>>;
  emptyBG: string;
  setEmptyBG: Dispatch<SetStateAction<string>>;
}) {
  return (
    <View>
      <Text style={tw`mb-2 font-medium`}>도장 이미지</Text>

      <View style={tw`flex-row justify-around items-center`}>
        <View style={tw`flex-col justify-center items-center`}>
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
    </View>
  );
}
