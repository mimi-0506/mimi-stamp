import BoardGrid from "@/components/BoardGrid";
import { MODAL_KEYS } from "@/constants/keys";
import { useBoardStore } from "@/stores/useBoardStore";
import { useModalStore } from "@/stores/useModalStore";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import tw from "twrnc";

export default function Index() {
  const openModal = useModalStore((state) => state.openModal);
  const boards = useBoardStore((state) => state.boards);
  const nowBoard = useBoardStore((state) => state.nowBoard);

  useEffect(() => {
    if (Object.keys(boards).length === 0)
      openModal(MODAL_KEYS.STAMPSTART_MODAL);
  }, [boards]);

  return (
    <View style={tw`flex-1 items-center justify-center bg-white p-4`}>
      <Pressable
        onPress={() => {
          openModal(MODAL_KEYS.STAMPSTART_MODAL);
        }}
        style={tw`bg-red-500 px-4 py-2 rounded mt-4`}
      >
        <Text style={tw`text-white text-center`}>생성 모달</Text>
      </Pressable>
      {nowBoard && boards[nowBoard] && <BoardGrid board={boards[nowBoard]} />}
    </View>
  );
}
