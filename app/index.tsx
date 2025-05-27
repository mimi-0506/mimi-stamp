import BoardGrid from "@/components/BoardGrid";
import { MODAL_KEYS } from "@/constants/keys";
import { useBoardStore } from "@/stores/useBoardStore";
import { useModalStore } from "@/stores/useModalStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import tw from "twrnc";

export default function Index() {
  const openModal = useModalStore((state) => state.openModal);
  const boards = useBoardStore((state) => state.boards);
  const setBoards = useBoardStore((state) => state.setBoards);
  const nowBoard = useBoardStore((state) => state.nowBoard);

  useEffect(() => {
    const loadBoards = async () => {
      try {
        const storedBoards = await AsyncStorage.getItem("mimistamp_boards");
        if (storedBoards) {
          const parsedBoards = JSON.parse(storedBoards);
          setBoards(parsedBoards);

          if (Object.keys(parsedBoards).length === 0)
            openModal(MODAL_KEYS.STAMPSTART_MODAL);
        }
      } catch (e) {
        console.error("Failed to load boards:", e);
      }
    };

    loadBoards();
  }, []);

  useEffect(() => {
    const storageSave = async () => {
      try {
        await AsyncStorage.setItem("mimistamp_boards", JSON.stringify(boards));
      } catch (e) {
        console.error("Failed to save boards:", e);
      }
    };

    storageSave();
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
        <TitleNavigation />
  );
}
