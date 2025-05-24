import { MODAL_KEYS } from "@/constants/modalkeys";
import { useBoardStore } from "@/stores/useBoardStore";
import { useModalStore } from "@/stores/useModalStore";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const openModal = useModalStore((state) => state.openModal);
  const boards = useBoardStore((state) => state.boards);
  const nowBoard = useBoardStore((state) => state.nowBoard);

  useEffect(() => {
    if (Object.keys(boards).length === 0)
      openModal(MODAL_KEYS.STAMPSTART_MODAL);

    console.log("Boards updated:", boards);
  }, [boards]);

  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <Text className="text-lg font-pyeojin text-black">
        커스텀 폰트 적용됨!
      </Text>
      <Pressable
        onPress={() => {
          openModal(MODAL_KEYS.STAMPSTART_MODAL);
        }}
        className="bg-red-500 px-4 py-2 rounded mt-4"
      >
        <Text className="text-white text-center">생성 모달</Text>
      </Pressable>
    </View>
  );
}
