import { isValidColor } from "@/utils/formatUtils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import tw from "twrnc";
import ColorSelector from "./ColorSelector";

export default function DefaultColorPicker({
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
  const [fillBGPickerVisible, setFillBGPickerVisible] = useState(false);
  const [emptyBGPickerVisible, setEmptyBGPickerVisible] = useState(false);

  useEffect(() => {
    if (fillBGPickerVisible) setEmptyBGPickerVisible(false);
    if (emptyBGPickerVisible) setFillBGPickerVisible(false);
  }, [fillBGPickerVisible, emptyBGPickerVisible]);

  return (
    <View>
      <Pressable
        onPress={() => {
          setEmptyBGPickerVisible(false);
          setFillBGPickerVisible(false);
        }}
        onStartShouldSetResponder={() => true}
        style={tw`flex-row items-center justify-around`}
      >
        <View style={tw`relative flex-col items-center`}>
          <Text style={tw`mb-2 mt-4`}>도장 찍기 전</Text>
          <Pressable
            onPress={() => setEmptyBGPickerVisible((x) => !x)}
            style={[tw`w-10 h-10 border`, { backgroundColor: emptyBG }]}
          />
          {emptyBGPickerVisible && (
            <ColorSelector
              bg={isValidColor(emptyBG) ? emptyBG : "white"}
              setBG={setEmptyBG}
            />
          )}
        </View>

        <View style={tw`relative flex-col items-center`}>
          <Text style={tw`mb-2 mt-4`}>도장 찍은 후</Text>
          <Pressable
            onPress={() => setFillBGPickerVisible((x) => !x)}
            style={[tw`w-10 h-10 border`, { backgroundColor: fillBG }]}
          />
          {fillBGPickerVisible && (
            <ColorSelector
              bg={isValidColor(fillBG) ? fillBG : "black"}
              setBG={setFillBG}
            />
          )}
        </View>
      </Pressable>
    </View>
  );
}
