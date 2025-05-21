import { MODAL_KEYS } from "@/constants/modalkeys";
import { useModalStore } from "@/stores/useModalStore";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-pyeojin text-black">
        커스텀 폰트 적용됨!
      </Text>

      <Pressable
        onPress={() => {
          openModal(MODAL_KEYS.STAMPSTART_MODAL);
        }}
        className="bg-red-500 px-4 py-2 rounded"
      >
        <Text className="text-white text-center">생성 모달</Text>
      </Pressable>
    </View>
  );
}
