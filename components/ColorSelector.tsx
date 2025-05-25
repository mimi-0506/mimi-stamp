import { throttle } from "lodash";
import { useCallback } from "react";
import { View } from "react-native";
import ColorPicker, { OpacitySlider, Panel5 } from "reanimated-color-picker";
import tw from "twrnc";

interface ColorSelectorProps {
  bg: string;
  setBG: (color: string) => void;
}

export default function ColorSelector({ bg, setBG }: ColorSelectorProps) {
  const handleColorChange = useCallback(
    throttle(({ hex }: { hex: string }) => {
      setBG(hex);
    }, 500),
    []
  );

  return (
    <View
      style={tw`absolute top-20  z-50 bg-white p-2 rounded-xl shadow-lg w-60`}
      onStartShouldSetResponder={() => true}
    >
      <ColorPicker value={bg} onChangeJS={handleColorChange}>
        <Panel5 />
        <OpacitySlider />
      </ColorPicker>
    </View>
  );
}
