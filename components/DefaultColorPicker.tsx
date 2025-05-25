import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import ColorPicker, { Panel5 } from "reanimated-color-picker";
import tw from "twrnc";

interface Props {
  fillBG: string;
  emptyBG: string;
  setFillBG: (color: string) => void;
  setEmptyBG: (color: string) => void;
}

export default function DefaultColorPicker() {
  const [fillBG, setFillBG] = useState<string>("black");
  const [emptyBG, setEmptyBG] = useState<string>("white");

  const [pickerVisible, setPickerVisible] = useState(false);

  return (
    <View>
      <Text style={tw`mb-2 mt-4`}>도장 찍기 전</Text>
      <View style={tw`relative`}>
        <Pressable
          onPress={() => setPickerVisible((x) => !x)}
          style={[tw`w-10 h-10 border`, { backgroundColor: emptyBG }]}
        />

        {pickerVisible && (
          <View
            style={tw`absolute top-12 left-0 z-50 bg-white p-2 rounded-xl shadow-lg w-60`}
          >
            <ColorPicker
              onComplete={({ hex }) => {
                console.log(hex);
              }}
            >
              <Panel5 />
            </ColorPicker>
          </View>
        )}
      </View>

      <Text style={tw`mb-2 mt-4`}>도장 찍은 후</Text>
    </View>
  );
}
