import { MODAL_KEYS } from "@/constants/keys";
import { useBoardStore } from "@/stores/useBoardStore";
import { useModalStore } from "@/stores/useModalStore";
import { useRef } from "react";
import { Animated, Keyboard, Modal, Pressable, Text, View } from "react-native";
import tw from "twrnc";

export default function ResetModal() {
  const visible = useModalStore((state) => state.modals.resetModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const resetBoards = useBoardStore((state) => state.resetBoards);

  const bgOpacity = useRef(new Animated.Value(0)).current;

  const resetAll = () => {
    resetBoards();
    closeModal(MODAL_KEYS.RESET_MODAL);
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={() => closeModal(MODAL_KEYS.STAMPSTART_MODAL)}
    >
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
        }}
        style={tw`flex-1`}
      >
        <Animated.View
          style={[
            tw`flex-1 justify-center items-center`,
            {
              backgroundColor: bgOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: ["transparent", "rgba(0, 0, 0, 0.5)"],
              }),
            },
          ]}
        >
          <View style={tw`bg-white p-6 rounded-2xl w-3/4 shadow-lg`}>
            <Text style={tw`text-lg font-bold mb-4 text-center`}>
              reset all?
            </Text>
            <Pressable
              onPress={resetAll}
              style={tw`bg-blue-500 px-4 py-2 rounded`}
            >
              <Text style={tw`text-white text-center`}>yes</Text>
            </Pressable>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
